$(function() {
	Form_DoInit();
});

function Form_DoInit() {
	// 画面表示の初期化
	// initUserInfo();
	// 画面表示一覧の初期化
	initUserListInfo();
}
// 新規で内定者入力画面を呼び出し
function btnNew_Click() {
	openDialog({
		model : 'new'
	});
}
// 登録のチェックを行う
function btnEnter_Click() {
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	var result = checkData();
	if (!result.result) {
		if (result.index > -1)
			$('#dg').datagrid('selectRow', result.index);
		$("#p_errorMessage")[0].innerHTML = result.message;
	} else {
		parent.confirmComponent.callback = function() {
			var rowDatas = $('#dg').datagrid("getChecked");
			updateData(rowDatas);
		};
		var title = '登録確認';
		var message = getMessage("W1002");
		parent.confirmShow(title, message);
	}
}
// 内定者予定登録を行う
function updateData(rowDatas) {
	var setting = {
		url : "/IDMS0312/createPersonnelHandle.htm",
		data : JSON.stringify(rowDatas),
		hasLoading : true,
		hasContentType : true,
		success : function(res) {
			if (res) {
				if (res.status == true) {
					showMessage('情報', getMessage("I1002"));
					initUserListInfo();
				} else {
					if (res.errorResultDto && res.errorResultDto.errorList
							&& res.errorResultDto.errorList[0]
							&& res.errorResultDto.errorList[0].errorMessage)
						showMessage('情報',
								res.errorResultDto.errorList[0].errorMessage);
					else
						showMessage('情報', getMessage("E2007"));
				}
			}

		}
	};
	postAjax(setting);
}
// 登録済みの内定者予定をキャンセル
function btnCancel_Click() {
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	var result = checkCancelData();
	if (!result.result) {
		if (result.index > -1)
			$('#dg').datagrid('selectRow', result.index);
		$("#p_errorMessage")[0].innerHTML = result.message;
	} else {
		var rowDatas = $('#dg').datagrid("getChecked");
		var setting = {
			url : "/IDMS0312/checkStatus.htm",
			data : JSON.stringify(rowDatas),
			hasLoading : true,
			hasContentType : true,
			success : function(res) {
				if (res) {
					if (res.status == "0") {
						parent.confirmComponent.callback = function() {
							var setting = {
								url : "/IDMS0312/updatePersonnelHandleStatus.htm",
								data : JSON.stringify(rowDatas),
								hasLoading : true,
								hasContentType : true,
								success : function(res) {
									showMessage('情報', getMessage("I1011"));
									initUserListInfo();
								}
							};
							postAjax(setting);
						};
						var title = '入社予定取消';
						var message = getMessage("W1003");
						parent.confirmShow(title, message);
					} else if (res.status == "1" || res.status == "2") {
						if (res.userId != undefined && res.userId.length > 0) {
							var rows = $('#dg').datagrid("getData").rows;
							for (var i = 0; i < rows.length; i++) {
								if (rows[i].userId == res.userId) {
									$('#dg').datagrid('selectRow', i);
									break;
								}
							}
						}
						parent.confirmComponent.callback = function() {
							var setting = {
								url : "/IDMS0312/updatePersonnelHandleStatus.htm",
								data : JSON.stringify(rowDatas),
								hasLoading : true,
								hasContentType : true,
								success : function(res) {
									showMessage('情報', getMessage("I1011"));
									initUserListInfo();
								}
							};
							postAjax(setting);
						};
						var title = '入社予定取消';
						var message = getMessage("W1013");
						parent.confirmShow(title, message);
					}
				}
			}
		};
		postAjax(setting);
	}
}
// 内定者一覧の初期化
function initUserListInfo() {
	var setting = {
		url : "/IDMS0312/getProspectiveEmployeeList.htm",
		hasLoading : true,
		hasContentType : false,
		success : function(res) {
			if (res instanceof Array) {
				$('#dg')
						.datagrid(
								{
									data : res,
									onCheckAll : function(rows) {
										var trs = $(this).parent(
												'div.datagrid-view').find(
												'div.datagrid-body>table tr');
										for (var i = 0; i < trs.length; i++) {
											var checkBox = $(trs[i]).find(
													"input");
											if (checkBox.attr("disabled") == "disabled") {
												// $(
												// trs[i]).find("input").attr("disabled","disabled");
												checkBox.attr("checked", false);
											}
										}
									},
									onLoadSuccess : function(data) {
										var trs = $(this).parent(
												'div.datagrid-view').find(
												'div.datagrid-body>table tr');
										for (var i = 0; i < data.rows.length; i++) {
											var rowData = data.rows[i];
											if (isEmpty(rowData.mailboxCreateFlag)
													|| (rowData.mailboxCreateFlag == "1" && isEmpty(rowData.mailboxCreateServer))
													|| isEmpty(rowData.userId)
													|| isEmpty(rowData.scheduledEntryCompanyDate)
													|| isEmpty(rowData.userAlias)
													|| (rowData.contractCd != "06" && isEmpty(rowData.employeeNo))
													|| isEmpty(rowData.lastName)
													|| isEmpty(rowData.firstName)
													|| isEmpty(rowData.userName)
													|| isEmpty(rowData.lastNameKana)
													|| isEmpty(rowData.firstNameKana)
													|| isEmpty(rowData.userNameKana)
													|| isEmpty(rowData.organizationName)
													|| isEmpty(rowData.contractName)
													|| (rowData.adCreateFlag == "1" && isEmpty(rowData.adCreateServer))) {
												$(trs[i]).find("input").attr(
														"disabled", "disabled");
											}
										}
										trs
												.find("td[field]")
												.each(
														function(i, o) {
															if ($(this).attr(
																	"field") == "organizationName"
																	|| $(this)
																			.attr(
																					"field") == "mailboxCreateResult")
																$(this)
																		.attr(
																				"title",
																				$(
																						this)
																						.text());
														});
									}
								});

			}
		}
	};
	postAjax(setting);
}
// 内定者入力画面を呼び出し
function openDialog(paramObj) {
	parent.getDialogObject().closeFlag = "true";
	parent.getDialogObject().closeMethod = function() {
		initUserListInfo();
	};

	parent.getDialogObject().callback = function(data) {
		initUserListInfo();
	};

	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	var title = "内定者情報";
	var url = "/IDMS0311/IDMS0311.htm";// ?from=IDMS0312
	if (paramObj) {
		url += "?";
		var queryString = "";
		for (key in paramObj)
			queryString += (queryString.length == 0 ? "" : "&") + key + "="
					+ paramObj[key];
	}
	url += queryString;
	var width = 735;
	var height = 590;
	parent.openMainDialog(title, url, width, height);
}

// 編集・詳細リンクをかける
function userIdFormatter(value, row, index) {
	var rs = "<a href=\"javascript:void();\" onclick=\"openDialog({userId:'"
			+ value + "',model:";
	rs += isEmpty(row.personnelHandleId) ? "'edit'" : "'view'";
	rs += "});return false;\" class='easyui-linkbutton' style='color:blue;text-decoration:underline'>";
	if (!isEmpty(row.personnelHandleId)) {
		if ((!isEmpty(row.cancelFlag)) && (row.cancelFlag != "1")
				|| isEmpty(row.cancelFlag)) {
			rs += "詳細";
		} else {
			rs += "編集";
		}
	} else {
		rs += "編集";
	}
	rs += "</a>";
	return rs;
}
// 待ち行列に内定者登録済みの場合は、「○」。他の場合は、「空」です。
function personnelHandleIdFormatter(value, row, index) {
	if (isEmpty(value)) {
		return "";
	} else {
		if (isEmpty(row.cancelFlag) || row.cancelFlag != "1") {
			return "○";
		}
	}
}
// 画面上選択された行の表示方式を制御
var lastSelectedIndex = -1;
function onSelectRow(index, row) {
	if (lastSelectedIndex == index) {

	} else {
		if (lastSelectedIndex < 0) {

		} else {
			$('#dg').datagrid('unselectRow', lastSelectedIndex);
		}
	}
	lastSelectedIndex = index;
}
// 内定者を登録時、チェックを行う。
function checkData() {
	var result = true, index = -1, message = "", lastRow = null;
	;
	var rowDatas = $('#dg').datagrid("getChecked");
	if (rowDatas.length == 0) {
		result = false;
		message = getMessage("E1009", [ "入社登録データ" ]);
	}

	for (var i = 0; i < rowDatas.length && result; i++) {
		var rowData = rowDatas[i];
		index = i;
		lastRow = rowData;
		if (isEmpty(rowData.mailboxCreateFlag)) {
			result = false;
			message = getMessage("E1008", [ "メールボックス作成フラグ" ]);
		} else if (rowData.mailboxCreateFlag == "1" && result) {
			if (isEmpty(rowData.mailboxCreateServer)) {
				result = false;
				message = getMessage("E1008", [ "メールボックス作成先" ]);
			}
		} else if (rowData.mailboxCreateFlag == "0") {

		} else {
			result = false;
			message = getMessage("E1008", [ "メールボックス作成フラグ" ]);
		}
		if (isEmpty(rowData.userId) && result) {
			message = getMessage("E1008", [ "ユーザID" ]);
			result = false;
		}
		if (isEmpty(rowData.scheduledEntryCompanyDate) && result) {
			message = getMessage("E1008", [ "入社予定日" ]);
			result = false;
		}
		if (isEmpty(rowData.userAlias) && result) {
			message = getMessage("E1008", [ "エイリアス" ]);
			result = false;
		}
		if (rowData.contractCd != "06") {// 委託業者の社員番号はなし可能
			if (isEmpty(rowData.employeeNo) && result) {
				message = getMessage("E1008", [ "社員番号" ]);
				result = false;
			}
		}
		if (isEmpty(rowData.lastName) && result) {
			message = getMessage("E1008", [ "姓" ]);
			result = false;
		}
		if (isEmpty(rowData.firstName) && result) {
			message = getMessage("E1008", [ "名" ]);
			result = false;
		}
		if (isEmpty(rowData.userName) && result) {
			message = getMessage("E1008", [ "氏名" ]);
			result = false;
		}
		if (isEmpty(rowData.lastNameKana) && result) {
			message = getMessage("E1008", [ "姓カナ" ]);
			result = false;
		}
		if (isEmpty(rowData.firstNameKana) && result) {
			message = getMessage("E1008", [ "名カナ" ]);
			result = false;
		}
		if (isEmpty(rowData.userNameKana) && result) {
			message = getMessage("E1008", [ "氏名カナ" ]);
			result = false;
		}
		if (isEmpty(rowData.organizationName) && result) {
			message = getMessage("E1008", [ "組織" ]);
			result = false;
		}
		if (isEmpty(rowData.contractName) && result) {
			message = getMessage("E1008", [ "契約形態" ]);
			result = false;
		}
		/*
		 * if(isEmpty(rowData.contractCompanyName) && result){ message =
		 * goMessages.E1008.replace("{0}","委託会社名"); result = false; }
		 */
		// 当該データが待ち行列に存在しない場合は
		if (isEmpty(rowData.personnelHandleId) && result) {

		} else {
			// //当該データが待ち行列に存在する場合は
			if (result) {
				result = false;
				message = getMessage("I1012", [ "入社登録" ]);
			}
		}
	}
	index = index > -1 ? $('#dg').datagrid("getRowIndex", lastRow) : -1;
	return {
		result : result,
		index : index,
		message : message
	};
}
// 内定者をキャンセル時、チェックを行う。
function checkCancelData() {
	var result = true, index = -1, message = "", lastRow = null;
	;
	var rowDatas = $('#dg').datagrid("getChecked");
	if (rowDatas.length == 0) {
		result = false;
		message = getMessage("E1009", [ "入社予定取消データ" ]);
	}

	for (var i = 0; i < rowDatas.length && result; i++) {
		var rowData = rowDatas[i];
		index = i;
		lastRow = rowData;
		// 当該データが待ち行列に存在しない場合は
		if (isEmpty(rowData.personnelHandleId) && result) {
			result = false;
			message = getMessage("E2009");
		}
	}
	index = index > -1 ? $('#dg').datagrid("getRowIndex", lastRow) : -1;
	return {
		result : result,
		index : index,
		message : message
	};
}
// 変数値の判断
function isEmpty(v) {
	return typeof v == 'undefined' || v == null || v.length == 0;
}
// 画面にメッセージを表示
function showMessage(title, message) {
	$.messager.show({
		title : title,
		msg : message,
		showType : 'show',
		style : {
			right : '',
			top : '',
			bottom : -document.body.scrollTop
					- document.documentElement.scrollTop
		}
	});
}

// 画面の選択データを出力
function btnCsv_Click(u) {
	var rowDatas = $('#dg').datagrid("getChecked");
	if (rowDatas.length == 0) {
		result = false;
		message = getMessage("E1009", [ "入社登録データ" ]);
	}
	var userIds = [];
	rowDatas = $('#dg').datagrid("getData").rows;
	for (var i = 0; i < rowDatas.length; i++) {
		var rowData = rowDatas[i];
		userIds.push(rowData.userId);
	}
	var url = u + "?userIds=" + escape(userIds) + "&" + new Date().getTime();
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	url += Math.random() + new Date().getTime();
	$("<iframe style='display:none;'>").appendTo($("div#divdownload")).attr(
			"src", url);
}

function btnUploadCSV_Click() {
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	var inputObjectId = Math.random() + "";
	inputObjectId = 'file_'
			+ inputObjectId.substring(inputObjectId.indexOf('.') + 1);
	$("div.fileControlWrapHide").html(
			"<input id='" + inputObjectId + "' name='" + inputObjectId
					+ "' type='file'  />").find('input[type]').bind(
			'change',
			function(e) {
				var fileExtName = getFileExtensionName(getFileName($(this)
						.val()));
				if (fileExtName.toLowerCase() == "csv") {
					var setting = {
						url : "/IDMS0312/updateByCsvFile.htm",
						hasLoading : true,
						fileElementId : inputObjectId,
						success : function(res, status) {
							if (setting.hasLoading == true)
								hiddenLoading();
							if (res.status == "0") {
								$("#p_errorMessage")[0].innerHTML = getMessage("E9002");
								if (res.data && res.data.length > 0) {
									$("div#divMain").css("display", "none");
									$("div#divErrDetail").html("<table id='errdg'></table>");
									$("#errdg").datagrid({
										width:1000,
										data : res.data,
										singleSelect:true,
										columns : [ [ {
											field : 'line',
											title : '行',
											width : 50,
											halign:'center'
										}, {
											field : 'itemName',
											title : 'エラー項目',
											width : 100,
											halign:'center'
										}, {
											field : 'currentValue',
											title : '項目内容',
											width : 300,
											halign:'center'
										}, {
											field : 'message',
											title : 'エラー内容',
											width : 500,
											halign:'center'
										} ] ]
									});
									$("div#divErrorReport").css("display", "");
								}
							} else {
								showMessage('情報', getMessage("I1002"));
							}
						}
					};
					ajaxUpload(setting);
				} else {
					$.messager.alert('情報 ', getMessage("I1014"));
					initUserListInfo();
				}
			}).click();
}

function btnBack_Click() {
	$("div#divMain").css("display", "");
	$("div#divErrorReport").css("display", "none");
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
}