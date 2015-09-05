var statusALL = "A";
var goTaskList;

$(function() {
	Form_DoInit();
	$("#applicationStatus").combobox({
		onSelect : function(record) {
			if (record.value == statusALL) {
				$("#applicationStatus").combobox("setValues", statusALL);
			} else {
				$("#applicationStatus").combobox("unselect", statusALL);
			}
		}
	});
	$("#tt").tabs({
		onSelect : function(title) {
			if (title == "MyInbox") {
				initTaskInfo();
			}
			if (title == "照会") {
				btnSearch_Click()
			}
		}
	});
});

// 画面初期化
function Form_DoInit() {
	$("#dgReferenceList").css('display', 'block');

	findDimensions();

	initTaskInfo();
}

var winWidth = 0;
var winHeight = 0;

// サイズを取得する
function findDimensions() {

	if (window.innerWidth) {
		winWidth = window.innerWidth;
	} else if ((document.body) && (document.body.clientWidth)) {
		winWidth = document.body.clientWidth;
	}

	if (window.innerHeight) {
		winHeight = window.innerHeight;
	} else if ((document.body) && (document.body.clientHeight)) {
		winHeight = document.body.clientHeight;
	}

	if (document.documentElement && document.documentElement.clientHeight
			&& document.documentElement.clientWidth) {
		winHeight = document.documentElement.clientHeight;
		winWidth = document.documentElement.clientWidth;
	}

	$('#tt').tabs({
		height : winHeight
	});

	$("#dgTaskList").datagrid({
		height : winHeight - 80
	});

	$("#dgReferenceList").datagrid({
		height : winHeight - 240
	});
}

window.onresize = findDimensions;

// タスク情報を取得する
function initTaskInfo() {
	var setting = {
		data : null,
		url : "/MyInbox/reloading.htm",
		hasLoading : true,
		hasContentType : false,
		success : function(res) {
			if (res.errMessage) {
				errors = res.errMessage.errorList;
				var messages = "";
				$.each(errors, function(i, err) {
					messages += err.errorMessage + "<br>";
				});
				$("#p_errorMessage")[0].innerHTML = messages;
			} else {
				goTaskList = res.taskList;
				$('#dgTaskList').datagrid({
					data : res.taskList,
					onDblClickRow : function(rowIndex, rowData) {
						showTask(rowData);
					},
					onClickCell : function(index, field, value) {
						if (field == "detail") {
							showTask(goTaskList[index]);
						}
					}
				});
//				if (null == res.taskList || 0 == res.taskList.length) {
//					parent.alertShow('検索結果', '検索結果は0件です。');
//				}
				$("#taskListCount")[0].innerHTML = "取得件数："
						+ res.taskList.length + "件";
				if (null != res.statusList && 0 != res.statusList.length) {
					var statusList = new Array();
					statusList.push({
						"text" : "全て",
						"value" : "A",
					});
					for (i = 0; i < res.statusList.length; i++) {
						statusList.push({
							"text" : res.statusList[i].codeValue,
							"value" : res.statusList[i].code
						});
					}
					$("#applicationStatus").combobox('loadData', statusList);
					$("#applicationStatus").combobox('setValue', "A");
				}
			}
		}
	};
	postAjax(setting);
}

// リンクをかける
function detailLink(value, rowData, rowIndex) {
	return "color:blue;text-decoration:underline;cursor:pointer;";
}

// タスク一覧画面より承認・登録詳細画面に遷移する
function showTask(rowData) {
	getDialogObject().callback = function(data) {
		initTaskInfo();
	};
//	parent.getDialogObject().closeFlag = "true";
//	getDialogObject().closeMethod = function() {
//		initTaskInfo();
//	};
	var title = "詳細";
	var endUserId = rowData.endUserId;
	var applicationId = rowData.applicationId;
	var operationType = rowData.operationType;
	var operationOrder = rowData.operationOrder;
	var operaterId = rowData.operaterId;
	var urlInfo = rowData.url;
	var mode = 2;
	var title = "";
	// 承認
	if (operationType == "10") {
		title = "承認詳細";
		mode = 2;
	}
	// 登録
	if (operationType == "20") {
		title = "登録詳細";
		mode = 2;
	}
	// 再申請
	if (operationType == "00") {
		title = "申請詳細";
		mode = 3;
	}
	var url = urlInfo + "?" + "endUserId=" + endUserId + "&applicationId="
			+ applicationId + "&operationType=" + operationType
			+ "&operationOrder=" + operationOrder + "&operaterId=" + operaterId
			+ "&mode=" + mode;
	var width = 950;
	var height = winHeight - 50;
	parent.openMainDialog(title, url, width, height);
}

// 照会一覧画面より詳細画面に遷移する
function showDatil(rowData) {
	getDialogObject().callback = function(data) {
		btnSearch_Click();
	};
//	parent.getDialogObject().closeFlag = "true";
//	getDialogObject().closeMethod = function() {
//		btnSearch_Click();
//	};
	var title = "詳細";
	var endUserId = rowData.endUserId;
	var applicationId = rowData.applicationId;
	var urlInfo = rowData.url;
	var url = urlInfo + "?" + "endUserId=" + endUserId + "&applicationId="
			+ applicationId + "&mode=1";
	var width = 950;
	var height = $(document).height() - 50;
	parent.openMainDialog(title, url, width, height);
}

// 条件クリアボタンを押下し、入力した情報をクリアする
function btnClear_Click() {
	$("#applicationId").textbox("setValue", '');
	$("#endUserName").textbox("setValue", '');
	$("#applicantName").textbox("setValue", '');
	$("#organizationName").textbox("setValue", '');
	$("#applicationContent").textbox("setValue", '');
	$("#applicationStatus").combobox("setValues", statusALL);
	$("#applicationFromDate").datebox("setValue", '');
	$("#applicationToDate").datebox("setValue", '');
	$("#completionFromDate").datebox("setValue", '');
	$("#completionToDate").datebox("setValue", '');
}

// 検索ボタンを押下し、検索情報により、申請一覧情報を取得する
function btnSearch_Click() {
	reference = {};
	reference.applicationId = $("#applicationId").textbox("getValue");
	reference.endUserName = $("#endUserName").textbox("getValue");
	reference.applicantName = $("#applicantName").textbox("getValue");
	reference.endUserOrganizationName = $("#organizationName").textbox("getValue");
	if ($("#applicationStatus").combobox("getValues")[0] == statusALL) {
		reference.statusList = null;
	} else {
		reference.statusList = $("#applicationStatus").combobox("getValues");
	}
	reference.applicationContent = $("#applicationContent").textbox("getValue");
	reference.applicationFromDate = $("#applicationFromDate").datebox(
			"getValue");
	reference.applicationToDate = $("#applicationToDate").datebox("getValue");
	reference.completionFromDate = $("#completionFromDate").datebox("getValue");
	reference.completionToDate = $("#completionToDate").datebox("getValue");
	var setting = {
		data : JSON.stringify(reference),
		url : "/MyInbox/referenceInfo.htm",
		hasLoading : true,
		hasContentType : true,
		success : function(res) {
			if (res.errMessage) {
				errors = res.errMessage.errorList;
				var messages = "";
				$.each(errors, function(i, err) {
					messages += err.errorMessage + "<br>";
				});
				$("#p_errorMessage")[0].innerHTML = messages;
			} else {
				$('#dgReferenceList').datagrid({
					data : res.referenceList,
					onDblClickRow : function(rowIndex, rowData) {
						showDatil(rowData);
					}
				});
//				if (null == res.referenceList || 0 == res.referenceList.length) {
//					parent.alertShow('検索結果', '検索結果は0件です。');
//				}
				$("#referenceListCount")[0].innerHTML = "取得件数："
						+ res.referenceList.length + "件";
			}
		}
	};
	postAjax(setting);
}

// --- Dialog Open
// について-----------------------------------------------------------------------------

var dialogIndex = 1;

var mainDialogShow1 = new Object();
var mainDialogShow2 = new Object();
var mainDialogShow3 = new Object();
var mainDialogShow4 = new Object();
var mainDialogShow5 = new Object();

function openMainDialog(title, url, width, height) {

	$("#mainDialog" + dialogIndex)
			.html(
					"<iframe id=\"iframeInMainDialog"
							+ dialogIndex
							+ "\" name=\"iframeInMainDialog"
							+ dialogIndex
							+ "\" style=\"border: 0px;height: 100%; width: 100%\" src=\""
							+ CONTEXT_PATH + url + "\"></iframe>");

	$('#mainDialog' + dialogIndex)
			.dialog(
					{
						title : title,
						width : width,
						height : height,
						closed : true,
						cache : false,
						modal : true,
						onBeforeClose : function() {

							if (getDialogObjectByIndex(dialogIndex - 1).closeFlag != undefined
									&& getDialogObjectByIndex(dialogIndex - 1).closeFlag == "true") {

								getDialogObjectByIndex(dialogIndex - 1)
										.closeMethod();
							}
							clearDialogObject(dialogIndex - 1);
							$("#mainDialog" + (dialogIndex - 1)).html("");

							dialogIndex = dialogIndex - 1;
						},
						onResize : function() {
							$(this).dialog('center');
						}
					});

	$('#mainDialog' + dialogIndex).dialog('open');

	dialogIndex = dialogIndex + 1;
}

function closeMainDialog(data) {
	getDialogObjectByIndex(dialogIndex - 1).callback(data);

	$('#mainDialog' + (dialogIndex - 1)).dialog('close');

}

function getDialogObjectByIndex(tempIndex) {

	if (tempIndex == 1) {
		return mainDialogShow1;
	} else if (tempIndex == 2) {
		return mainDialogShow2;
	} else if (tempIndex == 3) {
		return mainDialogShow3;
	} else if (tempIndex == 4) {
		return mainDialogShow4;
	} else if (tempIndex == 5) {
		return mainDialogShow5;
	}

}

function getDialogObject() {

	if (dialogIndex == 1) {
		return mainDialogShow1;
	} else if (dialogIndex == 2) {
		return mainDialogShow2;
	} else if (dialogIndex == 3) {
		return mainDialogShow3;
	} else if (dialogIndex == 4) {
		return mainDialogShow4;
	} else if (dialogIndex == 5) {
		return mainDialogShow5;
	}

}

function clearDialogObject(clearIndex) {

	if (clearIndex == 1) {
		mainDialogShow1 = new Object();
	} else if (clearIndex == 2) {
		mainDialogShow2 = new Object();
	} else if (clearIndex == 3) {
		mainDialogShow3 = new Object();
	} else if (clearIndex == 4) {
		mainDialogShow4 = new Object();
	} else if (clearIndex == 5) {
		mainDialogShow5 = new Object();
	}

}

// --- Dialog Open
// について-----------------------------------------------------------------------------

var confirmComponent = new Object();

function confirmShow(title, message) {
	$.messager.confirm(title, message, function(r) {
		if (r) {
			confirmComponent.callback();
		}
	});
}

function alertShow(title, message) {
	jQuery.messager.alert(title, message);
}

function toLogin() {
	window.location.href = CONTEXT_PATH + "/IDMS0000/IDMS0000.htm";
}