$(function() {
	// 画面表示の初期化
	Form_DoInit();
});

function Form_DoInit() {
	// 画面表示一覧の初期化
	if (parameterMap)
		initUserListInfo(parameterMap);
}
// 退職対象者により、それぞれのシステムの権限を取得
function initUserPurviewInfo(userid) {
	var setting = {
		data : {
			userId : userid
		},
		url : "/IDMS0363/getUserPurviewInfoListByUserId.htm",
		hasLoading : false,
		success : function(res) {
			if (res) {
				var accordionWrap = $('#userPurviewTypeaccordion');
				var hasData = false;
				var sHtml = "", maxRow = 0;
				var specialAccounts = res.specialAccount;
				var accounts = res.account;
				sHtml += '<div title="共有メール/共有フォルダ/ドメイン登録" data-options="" style="padding:5px;"><table class="userPurview"><thead><tr>';
				var headerString = '<table class="userPurview"><thead><tr>';
				var arrSystem = {};
				for (typeKey in specialAccounts) {
					headerString += '<th data-options="field:\'itemid'
							+ typeKey + '\'">' + typeKey + '</th>';

					hasData = true;
					var systemItem = specialAccounts[typeKey];
					maxRow = systemItem.length > maxRow ? systemItem.length
							: maxRow;
					for (var i = 0; i < systemItem.length; i++) {
						var account = systemItem[i];
						if (!arrSystem[typeKey])
							arrSystem[typeKey] = [];
						arrSystem[typeKey].push(account);
					}
				}
				var bodyString = '';
				for (var i = 0; i < maxRow; i++) {
					bodyString += '<tr>';
					for (k in arrSystem) {

						bodyString += '<td>'
								+ (isEmpty(arrSystem[k][i]) ? ""
										: arrSystem[k][i]) + '</td>';
					}
					bodyString += '</tr>';
				}
				headerString += '</tr>';
				sHtml += '' + headerString + '</thead><tbody>' + bodyString
						+ '</tbody></table></div>';
				sHtml += '</tbody></table></div>';
				if (!hasData)
					sHtml = "";
				for (typeKey in accounts) {
					var arrSystem = {};
					hasData = true;
					maxRow = 0;
					var systemItem = accounts[typeKey];
					for (var i = 0; i < systemItem.length; i++) {
						var account = systemItem[i];
						if (!arrSystem[account.systemName])
							arrSystem[account.systemName] = [];
						arrSystem[account.systemName].push(account.account);
						maxRow = arrSystem[account.systemName].length > maxRow ? arrSystem[account.systemName].length
								: maxRow;
					}
					sHtml += '<div title="' + typeKey
							+ '" data-options="" style="padding:5px;">';
					headerString = '<table class="userPurview"><thead><tr>';
					var bodyString = '';
					for (var i = 0; i < maxRow; i++) {
						bodyString += '<tr>';
						for (k in arrSystem) {
							if (i == 0) {
								headerString += '<th data-options="field:\'itemid'
										+ k + '\'">' + k + '</th>';
							}
							bodyString += '<td>'
									+ (isEmpty(arrSystem[k][i]) ? ""
											: arrSystem[k][i]) + '</td>';
						}
						bodyString += '</tr>';
					}
					headerString += '</tr>';
					sHtml += '' + headerString + '</thead><tbody>' + bodyString
							+ '</tbody></table></div>';
				}
				if (!hasData) {
					accordionWrap
							.parent()
							.html(
									'<div id="userPurviewTypeaccordion" class="" style="height:auto;">&nbsp;</div>');
				} else {
					accordionWrap
							.parent()
							.html(
									'<div id="userPurviewTypeaccordion" class="" style="height:auto;"></div>');
					$('#userPurviewTypeaccordion').append(sHtml);
				}
				$('#userPurviewTypeaccordion').accordion({
					animate : false,
					multiple : true
				});
			}
		}
	};
	postAjax(setting);
}
function initComment(userId) {
	$('#iptComment').textbox('disable');
	var setting = {
		url : "/IDMS0363/getComment.htm",
		data : JSON.stringify({
			applicationId : parameterMap.applicationId,
			userId : userId
		}),
		hasLoading : true,
		hasContentType : true,
		success : function(res) {
			if (res != null && res != undefined && res.length > 0) {
				$('#iptComment').textbox('setValue', res);
			}
		}
	};
	postAjax(setting);
}
// 退職承認処理
function btnRequest_Click() {
	checkStatus();
}
// 退職却下を処理
function btnDenial_click() {
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	if ($('#iptComment').textbox('getValue').length == 0) {
		$("#p_errorMessage")[0].innerHTML = getMessage("E1008", [ "却下理由" ]);
		return;
	}
	parent.confirmComponent.callback = function() {
		save(false);
	};
	parent.confirmShow("登録確認", getMessage("W1007"));
}
// 人事処理登録チェックロジックのマトリクス表に基づき、チェックを行う
function checkStatus() {
	var userId = parameterMap.endUserId;
	var setting = {
		url : "/IDMS0363/checkUserStatus.htm",
		data : JSON.stringify({
			retirementDate : $('#iptRetirementAfterAdjustDate').val(),
			userId : userId
		}),
		hasLoading : true,
		hasContentType : true,
		success : function(res) {
			if (res) {
				if (res.checkStatus != undefined) {
					switch (res.checkStatus) {
					case 1:// チェックの結果がOK
						$("#p_errorMessage")[0].innerHTML = '&nbsp;';
						parent.confirmComponent.callback = function() {
							save(true);
						};
						parent.confirmShow("登録確認", getMessage("W1002"));
						break;
					case 3:// すでに登録されていた退職処理があった場合は、
						$("#p_errorMessage")[0].innerHTML = getMessage("E1028",
								[ "退職" ]);
						break;
					default:
						break;
					}
				}
			}
		}
	};
	postAjax(setting);
}
// 保存処理
function save(gotoNext) {
	var setting = {
		url : "/IDMS0363/save.htm",
		data : JSON.stringify({
			retirementDate : $('#iptRetirementAfterAdjustDate').val(),
			userId : parameterMap.endUserId,
			applicationId : parameterMap.applicationId,
			comment : $('#iptComment').textbox('getValue'),
			taskId : parameterMap.taskId,
			operationType : parameterMap.operationType,
			operationOrder : parameterMap.operationOrder,
			isSaveAction : gotoNext
		}),
		hasLoading : true,
		hasContentType : true,
		success : function(res) {
			if (res) {
				if (res.status != undefined) {
					switch (res.status) {
					case 0:// 保存失敗
						(function() {
							showMessage("情報", getMessage("E1002"));
						})();
						break;
					case 1:// 保存成功
						(function() {
							if (gotoNext)// 承認
								showMessage("情報", getMessage("I1006"));
							else
								// 却下
								showMessage("情報", getMessage("I1007"));

							$("#lbtnApply").linkbutton('disable');
							$("#lbtnDrop").linkbutton('disable');
						})();
						break;
					default:
						break;
					}
				}
			}
		}
	};
	postAjax(setting);
}
// 前の画面に戻る
function btnBack_Click() {
	if (parent) {
		parent.closeMainDialog(null);
	} else
		window.close();
}
// 退職者一覧情報の初期化
function initUserListInfo(parameterMap) {
	var setting = {
		url : "/IDMS0363/getUserRetirementDate.htm",
		data : JSON.stringify({
			userId : parameterMap.endUserId,
			applicationId : parameterMap.applicationId
		}),
		hasLoading : false,
		hasContentType : true,
		success : function(res) {
			if (res && res.beforeAdjust != undefined) {
				$("#iptRetirementDate").datebox('setValue',res.beforeAdjust);
				/*
				 * if($("#iptRetirementDate").val().length==0)
				 * $("#iptRetirementDate").val("2015/03/15");
				 */
			}
			if (res && res.afterAdjust != undefined) {
				$("#iptRetirementAfterAdjustDate").val(res.afterAdjust);
				/*
				 * if($("#iptRetirementDate").val().length==0)
				 * $("#iptRetirementDate").val("2015/03/15");
				 */
			}
		}
	};

	postAjax(setting);

	setting = {
		url : "/IDMS0363/getUserInfoListByUserIdList.htm",
		data : JSON.stringify([ {
			userId : parameterMap.endUserId
		} ]),
		hasLoading : false,
		hasContentType : true,
		success : function(res) {
			if (res instanceof Array && res.length > 0) {
				var lastUserId, lastUserIdIndex, arr = [];
				for (var i = 0; i < res.length; i++) {
					if (lastUserId == undefined) {
						lastUserId = res[i].userId;
						lastUserIdIndex = 0;
					}
					// 退職者一覧情報を追加
					$('#dg').datagrid('appendRow', res[i]);
					if (lastUserId != res[i].userId) {
						arr.push(i - lastUserIdIndex);
						lastUserId = res[i].userId;
						lastUserIdIndex = i;
					}
				}
				arr.push(res.length - lastUserIdIndex);
				// 画面のターブルのセルを合併
				var startIndex = 0;
				for (var i = 0; i < arr.length; i++) {
					$('#dg').datagrid('mergeCells', {
						index : startIndex,
						field : 'userId',
						rowspan : arr[i],
						type : 'body'
					}).datagrid('mergeCells', {
						index : startIndex,
						field : 'userAlias',
						rowspan : arr[i],
						type : 'body'
					}).datagrid('mergeCells', {
						index : startIndex,
						field : 'employeeNo',
						rowspan : arr[i],
						type : 'body'
					}).datagrid('mergeCells', {
						index : startIndex,
						field : 'userName',
						rowspan : arr[i],
						type : 'body'
					}).datagrid('mergeCells', {
						index : startIndex,
						field : 'contractName',
						rowspan : arr[i],
						type : 'body'
					});
					startIndex += arr[i];
				}
				// 画面のターブルの最初行を選択
				$('#dg').datagrid('selectRow', 0);
			}
		}
	};
	postAjax(setting);
}
// ラジオボックスを構築
function userIdFormatter(value, row, index) {
	var rs = "<input type='radio' name='userid' onclick='rdoSelectUser_Change("
			+ index + ");' value='" + index + "' >";
	return rs;
}
// ラジオボックスを選択
function rdoSelectUser_Change(index) {
	$('#dg').datagrid('selectRow', index);
}
// 画面上選択された行の表示方式を制御
function onSelectRow(index, row) {
	var table = $('#dg').parent('div.datagrid-view').find(
			'div.datagrid-body>table');
	// 選択行のラジオボックスを選択
	var objParentArray = [];
	table.find('tr>td input[name=userid]').each(function(i, o) {
		objParentArray.push($(o).parent());
	});
	var found = false, foundIndex = -1;
	for (var i = (objParentArray.length - 1); i >= 0; i--) {
		var isVisible = $(objParentArray[i]).parent().is(":visible");
		while (!isVisible && i > -1) {
			$(objParentArray[i]).html(
					"<input type='radio' name='userid' onclick='rdoSelectUser_Change("
							+ i + ");' value='" + i + "' >");
			i--;
			isVisible = $(objParentArray[i]).parent().is(":visible");
		}
		if (isVisible) {
			if (i <= index && !found) {
				found = true;
				foundIndex = i;
				$(objParentArray[i]).html(
						"<input type='radio' name='userid' onclick='rdoSelectUser_Change("
								+ i + ");' value='" + i + "' checked=checked>");
			} else {
				$(objParentArray[i]).html(
						"<input type='radio' name='userid' onclick='rdoSelectUser_Change("
								+ i + ");' value='" + i + "' >");
			}
		}
	}
	// 選択行の選択
	var rows = $('#dg').datagrid({
		onSelect : function() {
		},
		onUnselect : function() {
		}
	}).datagrid('getData').rows;
	for (var i = 0; i < rows.length; i++) {
		var rowitem = rows[i];
		if (row.userId == rowitem.userId) {
			$('#dg').datagrid('selectRow', i);
		} else {
			$('#dg').datagrid('unselectRow', i);
		}
	}
	$('#dg').datagrid({
		onSelect : onSelectRow,
		onUnselect : onUnselectRow
	});
	initUserPurviewInfo(row.userId);
	if (parameterMap.mode == "1")
		initComment(row.userId);
}
// ラジオボックスを構築
function onUnselectRow(index, row) {
	var selectedRows = $('#dg').datagrid('getSelections');
	for (var i = 0; i < selectedRows.length; i++) {
		if (selectedRows[i].userId == row.userId) {
			$('#dg').datagrid('selectRow', index);
			return;
		}
	}
	if (selectedRows.length == 0)
		$('#dg').datagrid('selectRow', index);
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
