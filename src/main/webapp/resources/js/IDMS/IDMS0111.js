var detailFrame = false;

var goForm;

var detailEnableFlag = DETAIL_ENABLE_FLAG_APPLY;

$(document).ready(function() {
	$("#trApplicationId").hide();

	var mode = $("#mode")[0].value;
	if (mode == "1") {
		var setting = {
			data : null,
			url : "/IDMS0111/reloading.htm",
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

					goForm = res.form;

					if (goForm.applicationId != undefined
							&& goForm.applicationId != null
							&& goForm.applicationId != "") {
						$("#trApplicationId").show();
						$("#btnDismissal")[0].style.display = 'block';
						$("#btnClose")[0].style.display = 'block';
					} else {
						$("#trApplicationId").hide();
						$("#btnDismissal")[0].style.display = 'none';
						$("#btnClose")[0].style.display = 'none';
					}

					// 申請組織のコンボボックスを初期化
					setComboEndUserOrganization(res.organizationList);

					// 組織
					$("#organizationName").textbox("setValue",
							goForm.organizationName);
					// 契約形態
					$("#contractName").textbox("setValue",
							goForm.contractName);
					// エイリアス
					$("#userAlias").textbox("setValue",
							goForm.userAlias);
					// 社員番号
					$("#employeeNo").textbox("setValue",
							goForm.employeeNo);
					// 氏名
					$("#userName").textbox("setValue",
							goForm.userName);

					// 申請ID
					$("#applicationId").textbox("setValue",
							goForm.applicationId);
					// 分類
					$("#classInfoName").textbox("setValue",
							goForm.classInfoName);
					// システム
					$("#systemInfoName").textbox("setValue",
							goForm.systemInfoName);
					// カテゴリ
					$("#categoryInfoName").textbox("setValue",
							goForm.categoryInfoName);
					// カテゴリ
					$("#applyContractName").textbox("setValue",
							goForm.applyContractName);

					// 申請理由/備考
					$("#applicationReason").textbox("setValue",
							goForm.applicationReason);

					$("#useStartDate").textbox("setValue",
							goForm.useStartDate);
					$("#useFromDate").textbox("setValue",
							goForm.useFromDate);
					$("#useToDate").textbox("setValue",
							goForm.useToDate);

					if (goForm.account1 != undefined
							&& goForm.account1 != null
							&& goForm.account1 != "") {
						$("#account1").textbox("setValue",
								goForm.account1);
					} else {
						$("#account1").textbox("setValue",
								goForm.account2);
					}

					if (goForm.authorityGroup != undefined
							&& goForm.authorityGroup != null
							&& goForm.authorityGroup != "") {
						// 権限/グループ/メニュー(入力)
						$("#authorityGroup").textbox(
								"setValue",
								goForm.authorityGroup);
					} else {
						// 権限/グループ/メニュー(単一選択)
						$("#authorityGroup").textbox(
								"setValue",
								goForm.authorityName);
					}

					if (goForm.selectListInfo != undefined
							&& goForm.selectListInfo != null
							&& goForm.selectListInfo.length != undefined
							&& goForm.selectListInfo.length != null) {
						// 権限/グループ/メニュー(複数選択)
						for (var i = 0; i < goForm.selectListInfo.length; i++) {
							var no = new Option();
							no.value = goForm.selectListInfo[i].value;
							no.text = goForm.selectListInfo[i].text;
							$("#selectListUp")[0].add(no);
						}
						if (null == goForm.selectListInfo
								|| 5 >= goForm.selectListInfo.length) {
							$("#linkListButton").hide();
						}
					}

					// 登録時詳細入力フラグが「１」の場合、本画面（申請詳細）が非表示、申請登録画面に表示
					if (goForm.registerDetailInputFlag == "1") {
						$("#trAuthoritySingle").hide();
						$("#trAuthorityMultiple").hide();
					} else {

						if (goForm.applciationCommonFormPattern == "1"
								|| goForm.applciationCommonFormPattern == "2"
								|| goForm.applciationCommonFormPattern == "3"
								|| goForm.applciationCommonFormPattern == "5"
								|| goForm.applciationCommonFormPattern == "7"
								|| goForm.applciationCommonFormPattern == "8"
								|| goForm.applciationCommonFormPattern == "9"
								|| goForm.applciationCommonFormPattern == "11"
								|| goForm.applciationCommonFormPattern == "12"
								|| goForm.applciationCommonFormPattern == "15"
								|| goForm.applciationCommonFormPattern == "21"
								|| goForm.applciationCommonFormPattern == "22"
								|| goForm.applciationCommonFormPattern == "23") {
							$("#trAuthoritySingle").show();
							$("#trAuthorityMultiple").hide();
						} else if (goForm.applciationCommonFormPattern == "4"
								|| goForm.applciationCommonFormPattern == "6"
								|| goForm.applciationCommonFormPattern == "10"
								|| goForm.applciationCommonFormPattern == "13"
								|| goForm.applciationCommonFormPattern == "14"
								|| goForm.applciationCommonFormPattern == "20") {
							$("#trAuthoritySingle").hide();
							$("#trAuthorityMultiple").show();
						} else if (goForm.applciationCommonFormPattern == "16"
								|| goForm.applciationCommonFormPattern == "17"
								|| goForm.applciationCommonFormPattern == "18"
								|| goForm.applciationCommonFormPattern == "19") {
							$("#trAuthoritySingle").hide();
							$("#trAuthorityMultiple").hide();
						} else {
							$("#trAuthoritySingle").hide();
							$("#trAuthorityMultiple").hide();
						}

					}

					if (goForm.applciationCommonFormPattern == "5"
							|| goForm.applciationCommonFormPattern == "11"
							|| goForm.applciationCommonFormPattern == "12"
							|| goForm.applciationCommonFormPattern == "13"
							|| goForm.applciationCommonFormPattern == "14"
							|| goForm.applciationCommonFormPattern == "15"
							|| goForm.applciationCommonFormPattern == "16"
							|| goForm.applciationCommonFormPattern == "17"
							|| goForm.applciationCommonFormPattern == "21") {
						$("#trUseStartDate").hide();
					} else {
						$("#trUseFromToDate").hide();
					}
					
					if (goForm.registerDetailInputFlag != '1'
						&& goForm.applicationDetailFormType != undefined
							&& goForm.applicationDetailFormType != null
							&& goForm.applicationDetailFormType != "") {
						try {
							var typeInt = parseInt(goForm.applicationDetailFormType);

							if (1 <= typeInt && typeInt <= 8) {
								if (goForm.applicationInfoItem == undefined
										|| goForm.applicationInfoItem == null) {
									goForm.applicationInfoItem = {};
								}
								detailFrame = true;
							}

						} catch (e) {

						}

					}

					if (detailFrame) {

						initDetail();
					}
				}

			}
		};
		postAjax(setting);
	}

	var height = $(document).height();
	document.getElementById("scrollPanel").style.height = (height - 120)
			+ "px";
});

// 申請組織のコンボボックスを初期化
function setComboEndUserOrganization(dataList){
	
	var arrList = new Array();

	var tempEndUserOrganizationOfficeCd = "";
	
	if (dataList != null && dataList.length != 0) {
		for ( var i = 0; i < dataList.length; i++) {
			arrList.push({
				"text" : dataList[i].text,
				"value" : dataList[i].value
			});
			
			if(dataList[i].value == goForm.endUserOrganizationOfficeCd){
				tempEndUserOrganizationOfficeCd = goForm.endUserOrganizationOfficeCd;
			}
		}
	}
	
	goForm.endUserOrganizationOfficeCd = tempEndUserOrganizationOfficeCd;

	$("#endUserOrganization").combobox('loadData', arrList);
	$("#endUserOrganization").combobox('setValue', goForm.endUserOrganizationOfficeCd);
	$("#endUserOrganization").combobox('enable');
	
}

function back() {
	
	goForm.endUserOrganizationOfficeCd = $("#endUserOrganization").combobox("getValue");
	goForm.endUserOrganizationOfficeName = $("#endUserOrganization").combobox("getText");
	
	// 詳細画面のデータを取得する
	if(detailFrame){
		goAppDetail.editAppDetail();
	}

	var setting = {
		data : JSON.stringify(goForm),
		url : "/IDMS0111/back.htm",
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
					window.location.href = CONTEXT_PATH + "/IDMS0101/IDMS0101.htm?mode=2";
			}

		}
	};
	postAjax(setting);
}

var goAppDetail = new Object();
var checkDetailFormResult = true;

// 申請
function apply(){
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	
	if($('#IDMS0111FormOrg').form('validate') ==false){
		$("#p_errorMessage")[0].innerHTML = "申請組織を選択して下さい。";
		return;
	}
	if($('#IDMS0111Form').form('validate') ==false){
		$("#p_errorMessage")[0].innerHTML = "画面にエラーがありますので、修正してください。";
		return;
	}
	
	// 詳細画面のデータを取得する
	if(detailFrame){
		var detailCheckResult = checkAppDetail();
		if(detailCheckResult == false){
			return;
		}
	}
	
	parent.confirmComponent.callback = function (){
		exceApply();
	};
	
	var title = '申請確認';
	var message = '申請しますか？';
	parent.confirmShow(title, message);
	
}

function exceApply(){

	// 詳細画面のデータを取得する
	if(detailFrame){
		goAppDetail.editAppDetail();
	}
	
	goForm.endUserOrganizationOfficeCd = $("#endUserOrganization").combobox("getValue");
	goForm.endUserOrganizationOfficeName = $("#endUserOrganization").combobox("getText");

	var setting = {
			data : JSON.stringify(goForm),
			url : "/IDMS0111/apply.htm",
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

					if(res.applicationId != undefined && res.applicationId != null && res.applicationId != ""){
						$('#btnApply').linkbutton({
							disabled : true
						});
						$('#btnBack').linkbutton({
							disabled : true
						});
						
						$("#trApplicationId").show();
						// 申請ID
						$("#applicationId").textbox("setValue", res.applicationId);
						
						$.messager.show({
							title:'情報',
							msg:'申請フローを起動しました。' + '<br>申請ID：' + res.applicationId,
							showType:'slide',
							style:{
								left:'',
			                    right:0,
			                    top:document.body.scrollTop+document.documentElement.scrollTop,
			                    bottom:''
							}
						});
					}
					

					if(goForm.applicationId != undefined && goForm.applicationId != null && goForm.applicationId != ""){
						$('#btnApply').linkbutton({
							disabled : true
						});
						$('#btnDismissal').linkbutton({
							disabled : true
						});
						$('#btnBack').linkbutton({
							disabled : true
						});
						
						$.messager.show({
							title:'情報',
							msg: goMessages.I1005,
							showType:'slide',
							style:{
								left:'',
			                    right:0,
			                    top:document.body.scrollTop+document.documentElement.scrollTop,
			                    bottom:''
							}
						});
					}
				}

			}
		};
		postAjax(setting);
	
}

// 承認ルート
function popupRoute(){
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	
	if($('#IDMS0111FormOrg').form('validate') ==false){
		$("#p_errorMessage")[0].innerHTML = "申請組織を選択して下さい。";
		return;
	}
	
	parent.getDialogObject().callback = function (data){
		//なし
	};

	// 組織コード＋役職コード
	var endUserOrganizationOffice = $("#endUserOrganization").combobox("getValue");
	
	var title = "承認ルート";
	var url = "/IDMS0013/IDMS0013.htm" + "?" + "systemCd=" + goForm.systemInfo
		+ "&categoryCd=" + goForm.categoryInfo
		+ "&endUserId=" + goForm.endUserId
		+ "&organizationOfficeCd=" + endUserOrganizationOffice
		+ "&applyContractCode=" + goForm.applyContractCode + "&screenId=IDMS0111";
	
	if(goForm.applicationId != undefined && goForm.applicationId != null && goForm.applicationId != ""){
		url = url + "&applicationId=" + goForm.applicationId;
	}
	
	var width = 890;
	var height = 400;
	parent.openMainDialog(title, url, width, height);
	
}

// 取消
function dismissal(){
	
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	
	if($('#IDMS0111FormOrg').form('validate') ==false){
		$("#p_errorMessage")[0].innerHTML = "申請組織を選択して下さい。";
		return;
	}
	
	if($('#IDMS0111Form').form('validate') ==false){
		$("#p_errorMessage")[0].innerHTML = "画面にエラーがありますので、修正してください。";
		return;
	}
	
	parent.confirmComponent.callback = function (){
		exceDismissal();
	};
	
	var title = '取消確認';
	var message = '該当する申請は取消しますか？';
	parent.confirmShow(title, message);
}


function exceDismissal(){

	goForm.endUserOrganizationOfficeCd = $("#endUserOrganization").combobox("getValue");
	goForm.endUserOrganizationOfficeName = $("#endUserOrganization").combobox("getText");
	
	var setting = {
			data : JSON.stringify(goForm),
			url : "/IDMS0111/dismissal.htm",
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
						$('#btnApply').linkbutton({
							disabled : true
						});
						$('#btnDismissal').linkbutton({
							disabled : true
						});
						$('#btnBack').linkbutton({
							disabled : true
						});
						parent.alertShow('取消処理', '取消しました。');
					}

				}

			}
		};
		postAjax(setting);
	
}

function btnClose_click(){
	
	parent.closeMainDialog();
}


//権限一覧情報を取得する
function btnList_click() {
	var selectList = $('#selectListUp')[0].options;
	var authority = new Array();
	for (var i = 0; i < selectList.length; i++) {
		var application = new Object();
		application.value = selectList[i].value;
		application.text = selectList[i].text;
		authority.push(application);
	}
	var applicationInfo = {};
	applicationInfo.applicationAuthorityList = authority;
	parent.getDialogObject().closeFlag = "true";
	parent.getDialogObject().closeMethod = function() {
	};

	parent.getDialogObject().callback = function(data) {
	};
	var setting = {
		data : JSON.stringify(applicationInfo),
		url : "/IDMS0014/IDMS0014.htm",
		hasLoading : true,
		hasContentType : true,
		success : function(res) {
			parent.getDialogObject().callback = function(data) {
			};
			var title = "権限一覧";
			var url = "/IDMS0014/reloading.htm";
			var width = 408;
			var height = 450;
			parent.openMainDialog(title, url, width, height);
		}
	};
	postAjax(setting);
}