var goForm = new Object();
var goAppDetail = new Object();
var goDetailFrame = false;
var goReturnUser = new Array();
var detailEnableFlag = DETAIL_ENABLE_FLAG_APPROVAL;

// 画面を初期化
$(document).ready(function() {
	var height = parent.winHeight - 200;
	document.getElementById("application").style.height = height + "px";
	loadPage();
});

// 画面を初期化
function loadPage() {
	var applicationInfo = {};
	applicationInfo.applicationId = $('#applicationId').textbox('getValue');
	applicationInfo.endUserId = $("#endUserId")[0].value;
	applicationInfo.operationOrder = $('#operationOrder')[0].value;
	applicationInfo.operationType = $('#operationType')[0].value;
	applicationInfo.operaterId = $('#operaterId')[0].value;
	var mode = $("#mode")[0].value;
	if ('1' == mode) {
		$("#divReason").remove();
		$("#btnRequest").hide();
		$("#btnDenial").hide();
		$("#lblBack").hide();
		$("#btnRemand").hide();
		$("#returnUserInfo").combobox('destroy');
	}
	var setting = {
		data : applicationInfo,
		url : "/IDMS0112/loading.htm",
		hasLoading : true,
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
				applicationContent(res.form);
				showInfo(res.form);
				if (null != res.operationOrderList
						&& 0 != res.operationOrderList.length) {
					var operationOrderList = new Array();
					operationOrderList.push({
						"text" : COMBOBOX_BLANK_OPTION_TEXT,
						"value" : ""
					});
					for (i = 0; i < res.operationOrderList.length; i++) {
						operationOrderList.push(res.operationOrderList[i])
					}
					goReturnUser = operationOrderList;
					$("#returnUserInfo").combobox('loadData',
							operationOrderList);
				}
				// 申請詳細画面を表示かどうか設定
				var formType = goForm.applicationDetailFormType;
				if (formType != undefined && formType != null && formType != "") {
					try {
						var typeInt = parseInt(formType);
						if (1 <= typeInt && typeInt <= 8) {
							if (goForm.applicationInfoItem == null
									|| goForm.applicationInfoItem == undefined) {
								goForm.applicationInfoItem = {};
							}
							goDetailFrame = true;
						}
					} catch (e) {

					}
				}
				if (goDetailFrame) {

					initDetail();
				}
			}
		}
	};
	postAjax(setting);
}

// データを初期化
function applicationContent(form) {
	document.getElementById('organizationCode').value = form.organizationCode;
	$("#organizationName").textbox("setValue", form.organizationName);
	document.getElementById('contractCode').value = form.contractCode;
	$("#contractName").textbox("setValue", form.contractName);
	document.getElementById('endUserId').value = form.endUserId;
	$("#userAlias").textbox("setValue", form.userAlias);
	$("#employeeNo").textbox("setValue", form.employeeNo);
	$("#userName").textbox("setValue", form.userName);
	$("#classInfoName").textbox("setValue", form.classInfoName);
	$("#classInfo")[0].value = form.classInfo;
	$("#systemInfoName").textbox("setValue", form.systemInfoName);
	$("#systemInfo")[0].value = form.systemInfo;
	$("#categoryInfoName").textbox("setValue", form.categoryInfoName);
	$("#categoryInfo")[0].value = form.categoryInfo;
	$("#useStartDate").datebox("setValue", form.useFromDate);
	$("#useFromDate").datebox("setValue", form.useFromDate);
	$("#useToDate").datebox("setValue", form.useToDate);
	$("#account1").textbox("setValue", form.account1);
	$("#applyContractName").textbox("setValue", form.applyContractName);
	// 設計書のバージョン0.9.2により、ソースコードを対応する START
	var pattern = form.applciationCommonFormPattern;
	if (APPLCIATION_COMMON_FORM_PATTERN_ONE == pattern
			|| APPLCIATION_COMMON_FORM_PATTERN_TWO == pattern
			|| APPLCIATION_COMMON_FORM_PATTERN_THREE == pattern
			|| APPLCIATION_COMMON_FORM_PATTERN_SEVEN == pattern
			|| APPLCIATION_COMMON_FORM_PATTERN_ELEVEN == pattern
			|| APPLCIATION_COMMON_FORM_PATTERN_TWELVE == pattern
			|| APPLCIATION_COMMON_FORM_PATTERN_FIFTEEN == pattern) {
		$("#authorityGroup").textbox("setValue", form.authorityGroup);
	} else if (APPLCIATION_COMMON_FORM_PATTERN_FIVE == pattern
			|| APPLCIATION_COMMON_FORM_PATTERN_EIGHT == pattern
			|| APPLCIATION_COMMON_FORM_PATTERN_NINE == pattern
			|| APPLCIATION_COMMON_FORM_PATTERN_TWENTY_FIRST == pattern
			|| APPLCIATION_COMMON_FORM_PATTERN_TWENTY_SECOND == pattern
			|| APPLCIATION_COMMON_FORM_PATTERN_TWENTY_THREE == pattern) {
		$("#authorityGroup").textbox("setValue", form.authorityName);
	}
	// 設計書のバージョン0.9.2により、ソースコードを対応する END
	if (null != form.selectListInfo && 0 != form.selectListInfo.length) {
		for (var i = 0; i < form.selectListInfo.length; i++) {
			var no = new Option();
			no.value = form.selectListInfo[i].value;
			no.text = form.selectListInfo[i].text;
			$("#selectAuthorityList")[0].add(no);
		}
	}
	if (null == form.selectListInfo || 5 >= form.selectListInfo.length) {
		$("#linkListButton").hide();
	}
	$("#applicationReason").textbox("setValue", form.applicationReason);
	$("#endUserOrganizationName").textbox("setValue",
			form.endUserOrganizationOfficeName);
	("#endUserOrganizationCd")[0].value = form.endUserOrganizationCd;
}

// 画面の表示制御
function showInfo(data) {
	var applciationPatten = data.applciationCommonFormPattern;
	if (null == applciationPatten) {
		return;
	}
	// 設計書のバージョン0.9.2により、ソースコードを対応する START
	var patten = {
		'1' : [ '1', '0', '1', '1', '0' ],
		'2' : [ '1', '0', '0', '1', '0' ],
		'3' : [ '1', '0', '0', '2', '0' ],
		'4' : [ '1', '0', '1', '0', '1' ],
		'5' : [ '0', '1', '2', '1', '0' ],
		'6' : [ '1', '0', '0', '0', '1' ],
		'7' : [ '1', '0', '2', '2', '0' ],
		'8' : [ '1', '0', '1', '1', '0' ],
		'9' : [ '1', '0', '0', '1', '0' ],
		'10' :[ '1', '0', '2', '0', '1' ],
		'11' :[ '0', '1', '1', '1', '0' ],
		'12' :[ '0', '1', '0', '1', '0' ],
		'13' :[ '0', '1', '1', '0', '1' ],
		'14' :[ '0', '1', '0', '0', '1' ],
		'15' :[ '0', '1', '2', '2', '0' ],
		'16' :[ '0', '1', '1', '0', '0' ],
		'17' :[ '0', '1', '0', '0', '0' ],
		'18' :[ '1', '0', '0', '0', '0' ],
		'19' :[ '1', '0', '1', '0', '0' ],
		'20' :[ '1', '0', '0', '0', '2' ],
		'21' :[ '0', '1', '1', '1', '0' ],
		'22' :[ '1', '0', '0', '1', '0' ],
		'23' :[ '1', '0', '0', '1', '0' ]
	};
	// 設計書のバージョン0.9.2により、ソースコードを対応する END
	for (var i = 0; i < 5; i++) {
		var itemControll = patten[applciationPatten][i];
		// 利用開始
		if (i == 0 && itemControll == '0') {
			$("#tr01").hide();
		}

		// 利用期間－開始、終了
		if (i == 1 && itemControll == '0') {
			$("#tr02").hide();
		}
		// 登録時詳細入力フラグが'1'の場合、権限情報を表示しない
		if ("1" == data.registerDetailInputFlag) {
			$("#tr04").hide();
			$("#tr05").hide();
		} else {
			// 権限/グループ/メニュー（入力）と権限/グループ/メニュー（選択）
			if (i == 3 && itemControll == '0') {
				$("#tr04").hide();
			}
			// 権限/グループ/メニュー検索条件
			if (i == 4) {
				if (itemControll == '1') {
					var applicationShowType = data.applicationShowType;
					if (APPLICATION_SHOW_TYPE_ONE != applicationShowType
							&& APPLICATION_SHOW_TYPE_TWO != applicationShowType
							&& APPLICATION_SHOW_TYPE_THREE != applicationShowType
							&& APPLICATION_SHOW_TYPE_FOUR != applicationShowType
							&& APPLICATION_SHOW_TYPE_FIVE != applicationShowType) {
						$("#tr05").hide();
					} else {
						$("#tr05").show();
					}
				} else if (itemControll == '0') {
					$("#tr05").hide();
				}
			}
		}
	}
}

// 承認ボタンを押下する時、このメッソドを実行する
function btnRequest_click() {
	
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	$("#returnUserInfo").combobox({
		required : false,
		validType:null
	});
	var application = {};
	application.applicationId = $('#applicationId').textbox('getValue');
	application.endUserId = $('#endUserId')[0].value;
	application.operationOrder = $('#operationOrder')[0].value;
	application.operationType = $('#operationType')[0].value;
	application.operaterId = $('#operaterId')[0].value;
	application.reasonMemo = $('#reasonMemo').textbox('getValue');
	application.operationContent = "03";
	application.taskId = $('#taskId')[0].value;
	$("#reasonMemo").textbox({
		required : false
	});
	if ($('#IDMS0112Form').form('validate') == false) {
		$("#p_errorMessage")[0].innerHTML = "画面にエラーがありますので、修正してください。";
		return;
	}
	parent.confirmComponent.callback = function() {
		excRequest(application);
	};
	var title = '承認確認';
	parent.confirmShow(title, goMessages.W1006);
}

function funCallBack() {
	$('#btnRequest').linkbutton({
		disabled : true
	});
	$('#btnDenial').linkbutton({
		disabled : true
	});
	$('#btnRemand').linkbutton({
		disabled : true
	});
	$('#returnUserInfo').combobox({
		disabled : true
	});
}
// 承認処理を実行する
function excRequest(application) {
	var setting = {
		data : application,
		url : "/IDMS0112/apply.htm",
		hasLoading : true,
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
					funCallBack();
					parent.alertShow('承認処理', goMessages.I1006);
				}
			}
		}
	};
	postAjax(setting);
}

// 却下ボタンを押下する、申請フーロを却下する
function btnDenial_click() {
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	$("#returnUserInfo").combobox({
		required : false,
		validType:null
	});
	var inputFlag = false;
	var application = {};
	application.applicationId = $('#applicationId').textbox('getValue');
	application.endUserId = $('#endUserId')[0].value;
	application.operationOrder = $('#operationOrder')[0].value;
	application.operationType = $('#operationType')[0].value;
	application.operaterId = $('#operaterId')[0].value;
	application.reasonMemo = $('#reasonMemo').textbox('getValue');
	application.operationContent = "04";
	application.taskId = $('#taskId')[0].value;
	if (null == application.reasonMemo || "" == application.reasonMemo) {
		$("#reasonMemo").textbox({
			required : true
		});
		inputFlag = true;
	}
	if ($('#IDMS0112Form').form('validate') == false || inputFlag) {
		$("#p_errorMessage")[0].innerHTML = "画面にエラーがありますので、修正してください。";
		return;
	}
	parent.confirmComponent.callback = function() {
		excDenial(application);
	};
	var title = '却下確認';
	parent.confirmShow(title, goMessages.W1007);
}

// 却下処理を実行する
function excDenial(application) {
	var setting = {
		data : application,
		url : "/IDMS0112/quit.htm",
		hasLoading : true,
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
					funCallBack();
					parent.alertShow('却下処理', goMessages.I1007);
				}
			}
		}
	};
	postAjax(setting);
}

// 差戻しボタンを押下する、申請フーロを差戻しする
function btnRemand_click() {
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	var inputFlag = false;
	var application = {};
	application.applicationId = $('#applicationId').textbox('getValue');
	application.endUserId = $('#endUserId')[0].value;
	application.operationOrder = $('#operationOrder')[0].value;
	application.operationType = $('#operationType')[0].value;
	application.operaterId = $('#operaterId')[0].value;
	application.reasonMemo = $('#reasonMemo').textbox('getValue');
	application.operationContent = "06";
	application.taskId = $('#taskId')[0].value;
	application.returnUser = $("#returnUserInfo").combobox('getValue');
	if ("" == application.reasonMemo) {
		$("#reasonMemo").textbox({
			required : true
		});
		inputFlag = true;
	}
	if ("" == application.returnUser || undefined == application.returnUser) {
		$("#returnUserInfo").combobox({
			required : true,
			validType:"needSelect['#returnUserInfo']"
		});
		$("#returnUserInfo").combobox('loadData',goReturnUser);
	}
	if ($('#IDMS0112Form').form('validate') == false || inputFlag) {
		$("#p_errorMessage")[0].innerHTML = "画面にエラーがありますので、修正してください。";
		return;
	}
	parent.confirmComponent.callback = function() {
		excRemand(application);
	};
	var title = '差戻し確認';
	parent.confirmShow(title, goMessages.W1008);
}

// 差戻し処理を実行する
function excRemand(application) {
	var setting = {
		data : application,
		url : "/IDMS0112/back.htm",
		hasLoading : true,
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
					funCallBack();
					parent.alertShow('差戻し処理', goMessages.I1008);
				}
			}
		}
	};
	postAjax(setting);
}

// 閉じるボタンを押下する時、このメッソドを実行する
function btnBack_click() {
	parent.closeMainDialog();
}

// 権限一覧情報を取得する
function btnList_click() {
	var selectList = $('#selectAuthorityList')[0].options;
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

// 承認ルート
function btnRoute_click() {
	parent.getDialogObject().callback = function(data) {
		// なし
	};
	var endUserOrganization = document.getElementById('endUserOrganizationCd').value;
	var systemCd = $("#systemInfo")[0].value;
	var endUserId = $("#endUserId")[0].value;
	var title = "承認ルート";
	var url = "/IDMS0013/IDMS0013.htm" + "?" + "systemCd=" + systemCd
			+ "&endUserId=" + endUserId + "&organizationCd="
			+ endUserOrganization + "&applicationId=" + goForm.applicationId + "&screenId=IDMS0112";
	var width = 890;
	var height = 400;
	parent.openMainDialog(title, url, width, height);

}