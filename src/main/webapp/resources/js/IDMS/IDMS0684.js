// 画面を初期化
$(document).ready(function() {
//	var height = window.innerHeight - 110;
//	document.getElementById("systemDiv").style.height = height + "px";
	Form_DoInit();
	$("#contractInfo").combobox({
		onSelect : function(n, o) {
			var contractCode = $('#contractInfo').combobox('getValue');
			getContract(contractCode);
		}
	});
});

function Form_DoInit() {
	initContractInfo();
	if('edit' == model){
		$("#register .l-btn-text").text("変更");
		getContract(contractCd);
		$('#useFromDate').datebox({
			disabled:true
		});
		$('#useFromDate').datebox('setValue', useFromDate);
		if("null" != useToDate){
			$('#useToDate').datebox('setValue', useToDate);
		}
		var no = new Option();
		no.value = systemCd;
		no.text = systemName;
		$("#selectList")[0].add(no);
		$("#selectList").attr("disabled", true);
		$("#systemList").attr("disabled", true);
		$('#contractInfo').combobox({
			disabled:true
		});
		$('#moveLeft').linkbutton({
			disabled : true
		});
		$('#moveAllLeft').linkbutton({
			disabled : true
		});
		$('#moveRight').linkbutton({
			disabled : true
		});
		$('#moveAllRight').linkbutton({
			disabled : true
		});
	}else{
		initSystemInfo();
	}
}

// 契約形態リスト情報を取得する
function initContractInfo(){
	var setting = {
			data : null,
			url : "/IDMS0684/reloadContract.htm",
			hasLoading : true,
			hasContentType : false,
			success : function(res) {
				if (res.errorResultDto) {
					errors = res.errorResultDto.errorList;
					var messages = "";
					$.each(errors, function(i, err) {
						messages += err.errorMessage + "<br>";
					});
					$("#p_errorMessage")[0].innerHTML = messages;
				} else {
					if (null != res.contractListInfo
							&& 0 != res.contractListInfo.length) {
						$("#contractInfo").combobox("loadData",res.contractListInfo);
					}
					$("#contractInfo").combobox({
						required:true
					});
					if('edit' == model){
						$('#contractInfo').combobox('setValue', contractCd);
						var contractCode = $('#contractInfo').combobox('getValue');
						if(undefined == contractCode){
							$("#p_errorMessage")[0].innerHTML = goMessages.E2100;
							$('#register').linkbutton({
								disabled:true
							});
						}
					}
				}
			}
		};
		postAjax(setting);
}

// 契約形態基本情報を取得する
function getContract(contractCd){
	var setting = {
			data : {contractCd:contractCd},
			url : "/IDMS0684/contractInfo.htm",
			hasLoading : true,
			hasContentType : false,
			success : function(res) {
				if (res.errorResultDto) {
					errors = res.errorResultDto.errorList;
					var messages = "";
					$.each(errors, function(i, err) {
						messages += err.errorMessage + "<br>";
					});
					$("#p_errorMessage")[0].innerHTML = messages;
				} else {
					if (null != res.contractInfo) {
						if ("1" == res.contractInfo.personalFolderFlag){
							$("#personalFolderFlag").prop("checked","true");
						}else{
							$("#personalFolderFlag").removeAttr("checked");
						}
					}
				}
			}
		};
		postAjax(setting);
}

// システム情報リスト情報を取得する
function initSystemInfo() {
	var setting = {
		data : null,
		url : "/IDMS0684/reloadSystem.htm",
		hasLoading : true,
		hasContentType : false,
		success : function(res) {
			if (res.errorResultDto) {
				errors = res.errorResultDto.errorList;
				var messages = "";
				$.each(errors, function(i, err) {
					messages += err.errorMessage + "<br>";
				});
				$("#p_errorMessage")[0].innerHTML = messages;
			} else {
				if (null != res.systemListInfo
						&& 0 != res.systemListInfo.length) {
					for (var i = 0; i < res.systemListInfo.length; i++) {
						var no = new Option();
						no.value = res.systemListInfo[i].value;
						no.text = res.systemListInfo[i].text;
						$("#systemList")[0].add(no);
					}
				}
				$("#selectList").addClass(
				"textbox-invalid textbox-prompt validatebox-invalid");
			}
		}
	};
	postAjax(setting);
}

// 登録ボタンを押下する、契約形態システム情報を登録する
function btnRegister_click(){
	$("#p_errorMessage")[0].innerHTML = "&nbsp;";
	var useFromDate = new Date($("#useFromDate").textbox("getValue"));
	var useToDateInfo = $("#useToDate").datebox("getValue");
	var contractCode = $("#contractInfo").combobox("getValue");
	if ($('#IDMS0684Form').form('validate') == false || null == contractCode || "" == contractCode) {
		$("#p_errorMessage")[0].innerHTML = "画面にエラーがありますので、修正してください。";
		return;
	}
	var formInfo = {};
	formInfo.contractCd = contractCode;
	formInfo.effectiveDate = $("#useFromDate").datebox("getValue");
	formInfo.expireDate = $("#useToDate").datebox("getValue");
	formInfo.model = model;
	if('edit' == model && "null" != useToDate){
		formInfo.oldexpireDate = useToDate;
	}
	// 選択システム
	var selectList = document.getElementById('selectList').options;
	var selectListInfo = new Array();
	for (var i = 0; i < selectList.length; i++) {
		selectListInfo.push({
				"text" : selectList[i].text,
				"value" : selectList[i].value
			});
	}
	formInfo.systemList = selectListInfo;
	parent.confirmComponent.callback = function() {
		excRequest(formInfo);
	};
	var title = '登録確認';
	var message = getMessage("W1002");
	if('edit' == model){
		title = '更新確認';
		message = getMessage("W1016");
	}
	parent.confirmShow(title, message);
}

function excRequest(formInfo){
	var setting = {
			data : JSON.stringify(formInfo),
			url : "/IDMS0684/register.htm",
			hasLoading : true,
			hasContentType : true,
			success : function(res) {
				if (res.errorResultDto) {
					errors = res.errorResultDto.errorList;
					var messages = "";
					$.each(errors, function(i, err) {
						messages += err.errorMessage + "<br>";
					});
					$("#p_errorMessage")[0].innerHTML = messages;
				} else {
					if (null != res.success) {
						if('edit' == model){
							$.messager.show({
								title:'情報',
								msg:getMessage("I1016"),
								showType:'show',
								style:{
									right:'',
									top:'',
									bottom:-document.body.scrollTop-document.documentElement.scrollTop
								}
							});
						}else{
							$.messager.show({
								title:'情報',
								msg:getMessage("I1002"),
								showType:'show',
								style:{
									right:'',
									top:'',
									bottom:-document.body.scrollTop-document.documentElement.scrollTop
								}
							});
						}
						setTimeout(function () {
							parent.closeMainDialog(null);
					    }, 1000);
					}
				}
			}
		};
		postAjax(setting);
}

function setSelectListStatus(){
	var length = $("#selectList option").length;
	if(0 == length){
		$("#selectList").addClass(
		"textbox-invalid textbox-prompt validatebox-invalid");
	}else{
		$("#selectList").removeClass(
		"textbox-invalid textbox-prompt validatebox-invalid");
	}
}

// 戻る
function btnBack_click(){
	parent.closeMainDialog(null);
}