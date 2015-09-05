var goForm = new Object();
var goAppDetail = new Object();
var goAuthorityList = new Array();
var goDetailFrame = false;

var detailEnableFlag = DETAIL_ENABLE_FLAG_REGISTER;

// 画面を初期化
$(document).ready(function() {
	var height = parent.winHeight - 200;
	document.getElementById("application").style.height = height + "px";
	loadPage();
	$("#searchInfo").bind('keydown', function(e){
		if (e.keyCode == 13){
			btnSearch_click();
		}
	});
});

// 画面を初期化
function loadPage() {
	var applicationInfo = {};
	applicationInfo.applicationId = $('#applicationId').textbox('getValue');
	applicationInfo.endUserId = $("#endUserId")[0].value;
	var setting = {
		data : applicationInfo,
		url : "/IDMS0113/loading.htm",
		hasLoading : true,
		success : function(res) {
			if (res.errorResultDto) {
				var errors = res.errorResultDto.errorList;
				var messages = "";
				$.each(errors, function(i, err) {
					messages += err.errorMessage + "<br>";
				});
				$("#p_errorMessage")[0].innerHTML = messages;
			} else {
				goForm = res.form;
				showInfo(res.form);
				applicationContent(res.form);
				// 申請詳細画面を表示かどうか設定
				var formType = goForm.applicationDetailFormType;
				if (formType != undefined && formType != null && formType != "") {
					try {
						var typeInt = parseInt(formType);
						if (1 <= typeInt && typeInt <= 8) {
							if (goForm.applicationInfoItem == undefined
									|| goForm.applicationInfoItem == null) {
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
				if (SYSTEM_SHARE_MAILING_LIST == res.form.systemInfo
						&& (SYSTEM_CATEGORY_INSERT == res.form.categoryInfo || SYSTEM_CATEGORY_DELETE == res.form.categoryInfo)) {
					$('#btnRemand').linkbutton({
						disabled : true
					});
				}
			}
		}
	};
	postAjax(setting);
}
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
	var pattern = form.applciationCommonFormPattern;
	var registerFag = form.registerDetailInputFlag;
	// 設計書のバージョン0.9.2により、ソースコードを対応する START
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
		var authorityListInfo = new Array();
		if (form.authorityList != null && form.authorityList.length != 0) {
			authorityListInfo.push({
				"text" : COMBOBOX_BLANK_OPTION_TEXT,
				"value" : ""
			});
			for (var i = 0; i < form.authorityList.length; i++) {
				authorityListInfo.push({
					"text" : form.authorityList[i].text,
					"value" : form.authorityList[i].value
				});
			}
		}
		$("#authorityInfo").combobox('loadData', authorityListInfo);
		$("#authorityInfo").combobox("setValue", form.authorityInfo);
	}
	// 設計書のバージョン0.9.2により、ソースコードを対応する END
	if (null != form.selectListInfo && 0 != form.selectListInfo.length) {
		for (var i = 0; i < form.selectListInfo.length; i++) {
			var no = new Option();
			no.value = form.selectListInfo[i].value;
			no.text = form.selectListInfo[i].text;
			if ('1' == registerFag) {
				$("#selectList")[0].add(no);
				if (APPLCIATION_COMMON_FORM_PATTERN_TWENTY == pattern) {
					setDisabled();
				}
			} else {
				$("#selectAuthorityList")[0].add(no);
			}
		}
	} else {
		if ('1' == registerFag) {
			$("#selectList").addClass(
					"textbox-invalid textbox-prompt validatebox-invalid");
		}
	}
	if (null == form.selectListInfo || 5 >= form.selectListInfo.length) {
		$("#linkListButton").hide();
	}
	if (jQuery("#authorityList").length > 0 && null != form.authorityListInfo
			&& 0 != form.authorityListInfo.length) {
		for (var i = 0; i < form.authorityListInfo.length; i++) {
			var no = new Option();
			no.value = form.authorityListInfo[i].value;
			no.text = form.authorityListInfo[i].text;
			$("#authorityList")[0].add(no);
		}
		goAuthorityList = form.authorityListInfo;
	}
	$("#applicationReason").textbox("setValue", form.applicationReason);
	$("#endUserOrganizationName").textbox("setValue",
			form.endUserOrganizationOfficeName);
	document.getElementById('endUserOrganizationCd').value = form.endUserOrganizationCd;
}

// 権限一覧が非活性設定
function setDisabled() {
	$("#tblAuthority").css({
		"background" : "rgb(235, 235, 228)"
	});
	$("#authorityList").css({
		"background" : "rgb(235, 235, 228)"
	});
	$("#selectList").css({
		"background" : "rgb(235, 235, 228)"
	});
	$('#searchInfo').attr("disabled",true);
	$("#searchInfo").css({
		"background" : "rgb(235, 235, 228)"
	});
	$('#btnSearch').linkbutton({
		disabled : true
	});
	$("#authorityList").attr("disabled", true);
	$("#selectList").attr("disabled", true);
	
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
}

// 画面の表示制御
function showInfo(data) {
	var applciationPatten = data.applciationCommonFormPattern;
	if (null == applciationPatten) {
		return;
	}
	// 設計書のバージョン0.9.2により、ソースコードを対応する START
	var patten = {
		'1' : [ '1', '0', '1', '1', '0', '0' ],
		'2' : [ '1', '0', '0', '1', '0', '0' ],
		'3' : [ '1', '0', '0', '2', '0', '0' ],
		'4' : [ '1', '0', '1', '0', '0', '1' ],
		'5' : [ '0', '1', '2', '0', '1', '0' ],
		'6' : [ '1', '0', '0', '0', '0', '1' ],
		'7' : [ '1', '0', '2', '2', '0', '0' ],
		'8' : [ '1', '0', '1', '0', '1', '0' ],
		'9' : [ '1', '0', '0', '0', '1', '0' ],
		'10' : [ '1', '0', '2', '0', '0', '1' ],
		'11' : [ '0', '1', '1', '1', '0', '0' ],
		'12' : [ '0', '1', '0', '1', '0', '0' ],
		'13' : [ '0', '1', '1', '0', '0', '1' ],
		'14' : [ '0', '1', '0', '0', '0', '1' ],
		'15' : [ '0', '1', '2', '2', '0', '0' ],
		'16' : [ '0', '1', '1', '0', '0', '0' ],
		'17' : [ '0', '1', '0', '0', '0', '0' ],
		'18' : [ '1', '0', '0', '0', '0', '0' ],
		'19' : [ '1', '0', '1', '0', '0', '0' ],
		'20' : [ '1', '0', '0', '0', '0', '2' ],
		'21' : [ '0', '1', '1', '0', '1', '0' ],
		'22' : [ '1', '0', '1', '0', '2', '0' ],
		'23' : [ '1', '0', '1', '0', '1', '0' ]
	};

	// 新規パターン
	if (APPLCIATION_COMMON_FORM_PATTERN_ONE != applciationPatten
			&& APPLCIATION_COMMON_FORM_PATTERN_FOUR != applciationPatten
			&& APPLCIATION_COMMON_FORM_PATTERN_ELEVEN != applciationPatten
			&& APPLCIATION_COMMON_FORM_PATTERN_THIRTEEN != applciationPatten
			&& APPLCIATION_COMMON_FORM_PATTERN_TWENTY_FIRST != applciationPatten) {
		$("#authorityGroupButton01").linkbutton({
			disabled : true
		});
		$("#authorityGroupButton02").linkbutton({
			disabled : true
		});
		$("#authorityGroupButton03").linkbutton({
			disabled : true
		});
	} else {
		$('#authorityGroupButton01').linkbutton('enable');
		$('#authorityGroupButton02').linkbutton('enable');
		$('#authorityGroupButton03').linkbutton('enable');
	}
	// 設計書のバージョン0.9.2により、ソースコードを対応する END
	for (var i = 0; i < 6; i++) {
		var itemControll = patten[applciationPatten][i];
		// 利用開始
		if (i == 0 && itemControll == '0') {
			$("#tr01").hide();
		}

		// 利用期間－開始、終了
		if (i == 1 && itemControll == '0') {
			$("#tr02").hide();
		}

		// 権限/グループ/メニュー（入力）
		if (i == 3) {
			if (itemControll == '1') {
				// 登録時詳細入力フラグが非'1'の場合、権限情報が入力できない
				if ("1" != data.registerDetailInputFlag) {
					$("#authorityGroup").textbox({
						disabled : true
					});
				} else {
					$('#authorityGroup').textbox('enable');
					$("#authorityGroup").textbox({
						required : true,
						validType : 'maxLength[100]'
					});
				}
			} else if (itemControll == '0') {
				$("#tr04").hide();
				$("#authorityGroup").textbox({
					disabled : true
				});
			} else if (itemControll == '2') {
				$("#authorityGroup").textbox({
					disabled : true
				});
			}
			if ("1" != data.registerDetailInputFlag) {
				$("#authorityGroupButton01").remove();
			}
		}

		// 権限/グループ/メニュー（選択）
		if (i == 4) {
			if (itemControll == '1') {
				// 登録時詳細入力フラグが非'1'の場合、権限情報が入力できない
				if ("1" != data.registerDetailInputFlag) {
					$("#authorityInfo").combobox({
						disabled : true
					});
				} else {
					$("#authorityInfo").combobox({
						required : true
					});
				}
			} else if (itemControll == '0') {
				$("#tr05").hide();
			} else if (itemControll == '2') {
				$("#authorityInfo").combobox({
					disabled : true
				});
			}
			if ("1" != data.registerDetailInputFlag) {
				$("#authorityGroupButton02").remove();
			}
		}

		// 登録時詳細入力フラグが非'1'の場合、権限情報が入力できない
		if ("1" != data.registerDetailInputFlag && i == 5) {
			// 権限/グループ/メニュー検索条件
			if (itemControll == '1') {
				var applicationShowType = data.applicationShowType;
				if (APPLICATION_SHOW_TYPE_ONE != applicationShowType 
						&& APPLICATION_SHOW_TYPE_TWO != applicationShowType
						&& APPLICATION_SHOW_TYPE_THREE != applicationShowType
						&& APPLICATION_SHOW_TYPE_FOUR != applicationShowType
						&& APPLICATION_SHOW_TYPE_FIVE != applicationShowType) {
					$("#tr06").hide();
				} else {
					$("#tr06").show();
				}
			} else if (itemControll == '0') {
				$("#tr06").hide();
			}
			$("#tr07").remove();
		} else if ("1" == data.registerDetailInputFlag && i == 5) {
			$("#tr06").hide();
			// 権限/グループ/メニュー検索条件
			if (i == 5) {
				if (itemControll == '1') {
					var applicationShowType = data.applicationShowType;
					if (APPLICATION_SHOW_TYPE_ONE != applicationShowType
							&& APPLICATION_SHOW_TYPE_TWO != applicationShowType
							&& APPLICATION_SHOW_TYPE_THREE != applicationShowType
							&& APPLICATION_SHOW_TYPE_FOUR != applicationShowType
							&& APPLICATION_SHOW_TYPE_FIVE != applicationShowType) {
						$("#tr07").remove();
					} else {
						$("#tr07").show();
					}
				} else if (itemControll == '0') {
					$("#tr07").remove();
				}
			}
		}
	}
}

var checkDetailFormResult = true;

// 登録完了ボタンを押下する時、このメッソドを実行する
function btnRequest_click() {
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	$("#reasonMemo").textbox({
		required : false
	});
	if ($('#IDMS0113Form').form('validate') == false) {
		$("#p_errorMessage")[0].innerHTML = "画面にエラーがありますので、修正してください。";
		return;
	}
	var registerFlag = goForm.registerDetailInputFlag;
	var pattern = goForm.applciationCommonFormPattern;
	var application = {};
	application.applicationId = $('#applicationId').textbox('getValue');
	application.endUserId = $('#endUserId')[0].value;
	application.operationOrder = $('#operationOrder')[0].value;
	application.operationType = $('#operationType')[0].value;
	application.operaterId = $('#operaterId')[0].value;
	application.reasonMemo = $('#reasonMemo').textbox('getValue');
	application.operationContent = "05";
	application.taskId = $('#taskId')[0].value;
	// 共有フォルダの新規作成時、
	if (goForm.systemInfo == '21' && goForm.categoryInfo == '1') {
		// ドライブコード(127.jspはincludeなので、直接に取得する)
		application.driveCd = $("#itemText5").combobox('getValue');
	}

	// 設計書のバージョン0.9.2により、ソースコードを対応する START
	if ('1' == registerFlag) {
		if (APPLCIATION_COMMON_FORM_PATTERN_ONE == pattern
				|| APPLCIATION_COMMON_FORM_PATTERN_TWO == pattern
				|| APPLCIATION_COMMON_FORM_PATTERN_ELEVEN == pattern
				|| APPLCIATION_COMMON_FORM_PATTERN_TWELVE == pattern
				|| APPLCIATION_COMMON_FORM_PATTERN_THREE == pattern
				|| APPLCIATION_COMMON_FORM_PATTERN_SEVEN == pattern
				|| APPLCIATION_COMMON_FORM_PATTERN_FIFTEEN == pattern) {
			application.authorityGroup = $('#authorityGroup').textbox(
					'getValue');
		}else if (APPLCIATION_COMMON_FORM_PATTERN_FIVE == pattern
				|| APPLCIATION_COMMON_FORM_PATTERN_EIGHT == pattern
				|| APPLCIATION_COMMON_FORM_PATTERN_NINE == pattern
				|| APPLCIATION_COMMON_FORM_PATTERN_TWENTY_FIRST == pattern
				|| APPLCIATION_COMMON_FORM_PATTERN_TWENTY_SECOND == pattern
				|| APPLCIATION_COMMON_FORM_PATTERN_TWENTY_THREE == pattern) {
			application.authorityGroup = $('#authorityInfo').combobox(
					'getValue');
		}else if (APPLCIATION_COMMON_FORM_PATTERN_FOUR == pattern
				|| APPLCIATION_COMMON_FORM_PATTERN_SIX == pattern
				|| APPLCIATION_COMMON_FORM_PATTERN_TEN == pattern
				|| APPLCIATION_COMMON_FORM_PATTERN_THIRTEEN == pattern
				|| APPLCIATION_COMMON_FORM_PATTERN_FOURTEEN == pattern
				|| APPLCIATION_COMMON_FORM_PATTERN_TWENTY == pattern) {
			var autority = document.getElementById('selectList').options;
			// 一覧権限
			if (null != autority && autority.length != 0) {
				var authorityList = new Array();
				for (var i = 0; i < autority.length; i++) {
					authorityList.push({
						"text" : autority[i].text,
						"value" : autority[i].value
					});
				}
				application.authorityList = authorityList;
			}
		}
	}
	// 設計書のバージョン0.9.2により、ソースコードを対応する END
	parent.confirmComponent.callback = function() {
		excRequest(application);
	};
	var title = '登録確認';
	parent.confirmShow(title, goMessages.W1002);
}

// 登録処理を実行する
function excRequest(application) {
	var setting = {
		data : JSON.stringify(application),
		url : "/IDMS0113/register.htm",
		hasLoading : true,
		hasContentType : true,
		success : function(res) {
			if (res.errorResultDto) {
				var errors = res.errorResultDto.errorList;
				var messages = "";
				$.each(errors, function(i, err) {
					messages += err.errorMessage + "<br>";
				});
				$("#p_errorMessage")[0].innerHTML = messages;
			} else {
				if (null != res.success) {
					$('#btnRequest').linkbutton({
						disabled : true
					});
					$('#btnRemand').linkbutton({
						disabled : true
					});
					parent.alertShow('登録完了処理', goMessages.I1002);
				}
			}
		}
	};
	postAjax(setting);
}

// 差戻しボタンを押下する、申請フーロを差戻しする
function btnRemand_click() {
	var reasonMemo = $('#reasonMemo').textbox('getValue');
	var inputFlag = false;
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	if ("" == reasonMemo) {
		$("#reasonMemo").textbox({
			required : true
		});
		inputFlag = true;
	}
	if ($('#IDMS0113Form').form('validate') == false || inputFlag) {
		$("#p_errorMessage")[0].innerHTML = "画面にエラーがありますので、修正してください。";
		return;
	}
	var application = {};
	application.applicationId = $('#applicationId').textbox('getValue');
	application.endUserId = $('#endUserId')[0].value;
	application.operationOrder = $('#operationOrder')[0].value;
	application.operationType = $('#operationType')[0].value;
	application.operaterId = $('#operaterId')[0].value;
	application.reasonMemo = reasonMemo;
	application.operationContent = "06";
	application.taskId = $('#taskId')[0].value;
	application.returnUser = "001";
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
		url : "/IDMS0113/back.htm",
		hasLoading : true,
		success : function(res) {
			if (res.errorResultDto) {
				var errors = res.errorResultDto.errorList;
				var messages = "";
				$.each(errors, function(i, err) {
					messages += err.errorMessage + "<br>";
				});
				$("#p_errorMessage")[0].innerHTML = messages;
			} else {
				if (null != res.success) {
					$('#btnRequest').linkbutton({
						disabled : true
					});
					$('#btnRemand').linkbutton({
						disabled : true
					});
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
	var endUserOrganization = $('#endUserOrganizationCd')[0].value;
	var systemCd = $("#systemInfo")[0].value;
	var endUserId = $("#endUserId")[0].value;
	var title = "承認ルート";
	var url = "/IDMS0013/IDMS0013.htm" + "?" + "systemCd=" + systemCd
			+ "&endUserId=" + endUserId + "&organizationCd="
			+ endUserOrganization + "&applicationId=" + goForm.applicationId + "&screenId=IDMS0113";
	var width = 890;
	var height = 400;
	parent.openMainDialog(title, url, width, height);

}

// 検索ボタンを押した、権限を検索する
function btnSearch_click() {
	var searchInfo = $("#searchInfo")[0].value;
	$("#authorityList")[0].length = 0;
	if (null != searchInfo && "" != searchInfo) {
		for (i = 0; i < goAuthorityList.length; i++) {
			if (goAuthorityList[i].text.indexOf(searchInfo) > -1) {
				var no = new Option();
				no.value = goAuthorityList[i].value;
				no.text = goAuthorityList[i].text;
				$("#authorityList")[0].add(no);
			}
		}
	} else {
		for (i = 0; i < goAuthorityList.length; i++) {
			var no = new Option();
			no.value = goAuthorityList[i].value;
			no.text = goAuthorityList[i].text;
			$("#authorityList")[0].add(no);
		}
	}
}

// ユーザ選択ボタンを押下した、、このメソッドを実行する
function btnRefUser_click() {
	parent.getDialogObject().callback = function(data) {
		setAuthorityInfo(data);
	};
	var title = "対象者選択";
	var url = "/IDMS0011/IDMS0011.htm" + "?" + "userId=" + null
			+ "&organizationCode=" + null + "&checkFlag=1";
	var width = 652;
	var height = 610;
	parent.openMainDialog(title, url, width, height);
}

// ユーザの権限を取得する
function setAuthorityInfo(data) {
	if(null == data || null == data.endUserId || 0 == data.endUserId.length){
		return;
	}
	var setting = {
		data : {
			"endUserId" : data.endUserId[0],
			"systemInfo" : $('#systemInfo')[0].value
		},
		url : "/IDMS0101/userAuthorityInfo.htm",
		hasLoading : true,
		success : function(res) {
			if (res.errorResultDto) {
				var errors = res.errorResultDto.errorList;
				var messages = "";
				$.each(errors, function(i, err) {
					messages += err.errorMessage + "<br>";
				});
				$("#p_errorMessage")[0].innerHTML = messages;
			} else {
				$("#authorityList")[0].options.length = 0;
				$("#selectList")[0].options.length = 0;
				var pattern = goForm.applciationCommonFormPattern;
				// 設計書のバージョン0.9.2により、ソースコードを対応する START
				if (null != res.authorityInfo && 0 != res.authorityInfo.length) {
					if (APPLCIATION_COMMON_FORM_PATTERN_ONE == pattern
							|| APPLCIATION_COMMON_FORM_PATTERN_ELEVEN == pattern
							|| APPLCIATION_COMMON_FORM_PATTERN_TWENTY_FIRST == pattern
							|| APPLCIATION_COMMON_FORM_PATTERN_TWENTY_SECOND == pattern) {
						$('#authorityGroup').combobox('getValue',
								res.authorityInfo[0].value);
					} else if (APPLCIATION_COMMON_FORM_PATTERN_FOUR == pattern
							|| APPLCIATION_COMMON_FORM_PATTERN_THIRTEEN == pattern) {
						for (var i = 0; i < res.authorityInfo.length; i++) {
							var no = new Option();
							no.value = res.authorityInfo[i].value;
							no.text = res.authorityInfo[i].text;
							$("#selectList")[0].add(no);
						}
						$("#selectList")
								.removeClass(
										"textbox-invalid textbox-prompt validatebox-invalid");
						removeDisabled();
						$("#selectList").attr("disabled", false);
					}
					// 設計書のバージョン0.9.2により、ソースコードを対応する END
				} else {
					if (APPLCIATION_COMMON_FORM_PATTERN_FOUR == pattern
							|| APPLCIATION_COMMON_FORM_PATTERN_THIRTEEN == pattern) {
						$("#selectList")
								.addClass(
										"textbox-invalid textbox-prompt validatebox-invalid");
					}
				}
				
				if (null != res.authorityList && 0 != res.authorityList.length) {
					for (var i = 0; i < res.authorityList.length; i++) {
						var no = new Option();
						no.value = res.authorityList[i].value;
						no.text = res.authorityList[i].text;
						$("#authorityList")[0].add(no);
					}
					goAuthorityList = res.authorityList;
					removeDisabled();
					$("#selectList").attr("disabled", false);
				}else{
					goAuthorityList = [];
				}
				if ((null == res.authorityInfo || 0 == res.authorityInfo.length)
						&& (null == res.authorityList || 0 == res.authorityList.length)) {
					setDisabled();
					$("#selectList").attr("disabled", true);
				}
				
			}
		}
	};
	postAjax(setting);
}