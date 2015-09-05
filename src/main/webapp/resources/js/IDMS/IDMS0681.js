// 画面を初期化
$(document).ready(function() {
	Form_DoInit();
});

function Form_DoInit() {
	if('edit' == model){
		$("#register .l-btn-text").text("変更");
		getOrganizationByDate(organizationCd,useFromDate);
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
		$("#organizationCd")[0].value = organizationCd;
		$('#btnSelectOrg').linkbutton({
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

function getOrganizationByDate(organizationCd,useFromDate){
	var setting = {
			data : {organizationCd:organizationCd,userDate:useFromDate},
			url : "/IDMS0681/organizationInfo.htm",
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
					if (null != res.organizationInfo) {
						$("#organizationName").textbox("setValue",res.organizationInfo.organizationName);
						$("#effectiveDate").textbox("setValue",dateFormatter(res.organizationInfo.effectiveDate));
						$("#expireDate").textbox("setValue",dateFormatter(res.organizationInfo.expireDate));
						$("#organizationRank").textbox("setValue",res.organizationInfo.organizationRank);
						if ("1" == res.organizationInfo.branchFlag){
							$("#branchFlag").prop("checked","true"); 
						}else{
							$("#branchFlag").removeAttr("checked");
						}
						if ("1" == res.organizationInfo.shopFlag){
							$("#shopFlag").prop("checked","true"); 
						}else{
							$("#shopFlag").removeAttr("checked");
						}
						if ("1" == res.organizationInfo.applicableSetFlag){
							$("#applicableSetFlag").prop("checked","true"); 
						}else{
							$("#applicableSetFlag").removeAttr("checked");
						}
						$("#unitCd").textbox("setValue",res.organizationInfo.unitCd);
					}else{
						$("#p_errorMessage")[0].innerHTML = goMessages.E2099;
						$('#register').linkbutton({
							disabled:true
						});
					}
				}
			}
		};
		postAjax(setting);
}
function initSystemInfo() {
	var setting = {
		data : null,
		url : "/IDMS0681/reloading.htm",
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

// 組織選択ボタンを押下し、組織選択画面を表示する
function btnSelectOrg_click() {
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	// コールバック関数を実行
	parent.getDialogObject().callback = function (data){ 
		if(data != null) {
			// 組織を設定する
			$("#organizationCd")[0].value = data.organizationCode;
			$("#organizationName").textbox("setValue",data.organizationName);
			getOrganizationInfo(data);
		}
	};
	var title = "組織選択";
	var url = "/IDMS0012/IDMS0012.htm?"
	+ "organizationCode=" + $("#organizationCd").val()
	+ "&organizationName=" + $("#organizationName").val()
	+ "&oldOrganizationFlag=2";
	var width = 650;
	var height = 610;
	// 組織選択画面を呼び出す
	parent.openMainDialog(title, url, width, height);
}

//組織基本情報を取得する
function getOrganizationInfo(data) {
		var setting = {
			data : {
				"organizationCd" : data.organizationCode
			},
			url : "/IDMS0681/baseOrganization.htm",
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
					if (null != res.organizationInfo) {
						$("#effectiveDate").textbox("setValue",dateFormatter(res.organizationInfo.effectiveDate));
						$("#expireDate").textbox("setValue",dateFormatter(res.organizationInfo.expireDate));
						$("#organizationRank").textbox("setValue",res.organizationInfo.organizationRank);
						if ("1" == res.organizationInfo.branchFlag){
							$("#branchFlag").prop("checked","true"); 
						}else{
							$("#branchFlag").removeAttr("checked");
						}
						if ("1" == res.organizationInfo.shopFlag){
							$("#shopFlag").prop("checked","true"); 
						}else{
							$("#shopFlag").removeAttr("checked");
						}
						if ("1" == res.organizationInfo.applicableSetFlag){
							$("#applicableSetFlag").prop("checked","true"); 
						}else{
							$("#applicableSetFlag").removeAttr("checked");
						}
						$("#unitCd").textbox("setValue",res.organizationInfo.unitCd);
					}
				}
			}
		};
		postAjax(setting);
}

//日付の格式化
function dateFormatter(value) {
	if (value == undefined || value == null || value == "") {
		return null;
	}
	var unixTimestamp = new Date(value);
	return unixTimestamp.format('yyyy/MM/dd');
}

// 登録ボタンを押下する、組織システム情報を登録する
function btnRegister_click(){
	$("#p_errorMessage")[0].innerHTML = "&nbsp;";
	var effectiveDate = new Date($("#effectiveDate").textbox("getValue"));
	var useFromDate = new Date($("#useFromDate").datebox("getValue"));
	var expireDateInfo = $("#expireDate").textbox("getValue");
	var useToDateInfo = $("#useToDate").datebox("getValue");
	var organizationCode = $("#organizationCd")[0].value;
	if ($('#IDMS0681Form').form('validate') == false || null == organizationCode || "" == organizationCode) {
		$("#p_errorMessage")[0].innerHTML = "画面にエラーがありますので、修正してください。";
		return;
	}else if(effectiveDate > useFromDate){
		// 組織システム紐付設定の適用開始日が組織または、組織の適用開始日より前になります。
		$("#p_errorMessage")[0].innerHTML = getMessage("E2096");
		return;
	}else if(null != expireDateInfo && null != useToDateInfo){
		var expireDate = new Date(expireDateInfo);
		var orgSysUseToDate = new Date(useToDateInfo);
		if(orgSysUseToDate > expireDate){
			// 組織システム紐付設定の適用終了日がシステムの適用終了日より先になります。
			$("#p_errorMessage")[0].innerHTML = getMessage("E2097");
			return;
		}
	}
	var formInfo = {};
	formInfo.organizationCd = organizationCode;
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
			url : "/IDMS0681/register.htm",
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