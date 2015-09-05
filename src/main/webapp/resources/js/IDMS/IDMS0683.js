$(function() {
	Form_DoInit();
});

function Form_DoInit() {
	initSystemAndContractInfo();
}

function initSystemAndContractInfo() {
	var setting = {
		data : null,
		url : "/IDMS0683/reloading.htm",
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
					var systemInfoArrList = new Array();
					systemInfoArrList.push({
						"text" : COMBOBOX_BLANK_OPTION_TEXT,
						"value" : ""
					});
					for (var i = 0; i < res.systemListInfo.length; i++) {
						systemInfoArrList.push({
							"text" : res.systemListInfo[i].text,
							"value" : res.systemListInfo[i].value
						});
					}
					$("#systemInfo").combobox("loadData",systemInfoArrList);
				}
				if (null != res.contractListInfo
						&& 0 != res.contractListInfo.length) {
					var contractInfoArrList = new Array();
					contractInfoArrList.push({
						"text" : COMBOBOX_BLANK_OPTION_TEXT,
						"value" : ""
					});
					for (var i = 0; i < res.contractListInfo.length; i++) {
						contractInfoArrList.push({
							"text" : res.contractListInfo[i].text,
							"value" : res.contractListInfo[i].value
						});
					}
					$("#contractInfo").combobox("loadData",contractInfoArrList);
				}
			}
		}
	};
	postAjax(setting);
}

//画面上選択された行の表示方式を制御
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

// 検索ボタンを押下し、検索情報により、一覧情報を取得する
function btnSearch_Click() {
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	var contractCd = $("#contractInfo").combobox("getValue");
	var systemCd = $("#systemInfo").combobox("getValue");
	if (("" == contractCd || undefined == contractCd)  && ("" == systemCd || undefined == systemCd)) {
		$("#p_errorMessage")[0].innerHTML = "検索条件を入力してください。";
		return;
	}
	var setting = {
		data : {"contractCd":contractCd,"systemCd":systemCd},
		url : "/IDMS0683/contractSystem.htm",
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
				$('#dg').datagrid({
					data : res.contractSystemList,
					onCheckAll:function(rows){
						var trs = $(this).parent('div.datagrid-view').find('div.datagrid-body>table tr');
						for(var i=0;i<trs.length;i++){
							var checkBox =$(trs[i]).find("input");
							if (checkBox.attr("disabled")=="disabled") {
								checkBox.attr("checked",false);
							}
						}
					},
					onDblClickRow : function(rowIndex, rowData) {
						showDatil(rowData);
					},
					onLoadSuccess:function(data){
						var trs = $(this).parent('div.datagrid-view').find('div.datagrid-body>table tr');
						trs.find("td[field]").each(function(i,o){
							if($(this).attr("field")=="systemName" 
								|| $(this).attr("field")=="createBy"
								|| $(this).attr("field")=="updateBy")
								$(this).attr("title",$(this).text());
						});
					}
				});
//				if (null == res.contractSystemList || 0 == res.contractSystemList.length) {
//					parent.alertShow('検索結果', '検索結果は0件です。');
//				}
			}
		}
	};
	postAjax(setting);
}

//新規で契約形態システム紐付登録画面を呼び出し
function btnNew_Click() {
	openDialog({
		model : 'new'
	});
}
// 契約形態システム紐付登録画面に遷移する
function showDatil(rowData) {
	parent.getDialogObject().callback = function(data) {
	};
	openDialog({
		contractCd:rowData.contractCd,
		useFromDate:rowData.effectiveDate,
		useToDate:rowData.expireDate,
		systemCd:rowData.systemCd,
		systemName:rowData.systemName,
		model : 'edit'
	});
}

//編集リンクをかける
function systemCdFormatter(value, row, index) {
	var rs = "<a href=\"javascript:void();\" onclick=\"openDialog({contractCd:'"
			+ row.contractCd + "',useFromDate:'" + row.effectiveDate + "',useToDate:'" 
			+ row.expireDate + "',systemCd:'" + value + "',systemName:'" 
			+ row.systemName + "',model:'edit'";
	rs += "});return false;\" class='easyui-linkbutton' style='color:blue;text-decoration:underline'>";
	rs += "編集";
	rs += "</a>";
	return rs;
}

// 契約形態システム紐付登録画面を呼び出し
function openDialog(paramObj) {
	parent.getDialogObject().closeFlag = "true";
	parent.getDialogObject().closeMethod = function() {
		btnSearch_Click();
	};

	parent.getDialogObject().callback = function(data) {
		btnSearch_Click();
	};

	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	var title = "契約形態システム紐付登録";
	var url = "/IDMS0684/IDMS0684.htm";
	var queryString = "";
	if (paramObj) {
		url += "?";
		for (key in paramObj)
			queryString += (queryString.length == 0 ? "" : "&") + key + "="
					+ paramObj[key];
	}
	url += queryString;
	var winHeight = window.innerHeight;
	var width = 900;
	var height = winHeight-50;
	parent.openMainDialog(title, url, width, height);
}

// 削除のチェックを行う
function btnDelete_Click() {
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	var rowDatas = $('#dg').datagrid("getChecked");
	if (rowDatas.length == 0) {
		$("#p_errorMessage")[0].innerHTML = getMessage("E1009", ["削除対象"]);
		return;
	}
	checkData();
}

// 契約形態システムの情報を削除する時、チェックを行う。
function checkData() {
	var result = true, index = -1, message = "", lastRow = null;
	var rowDatas = $('#dg').datagrid("getChecked");
	var orgSysList = new Array();
	var formInfo = {};
	for (var i = 0; i < rowDatas.length; i++) {
		var rowData = rowDatas[i];
		orgSysList.push({
			"contractCd" : rowData.contractCd,
			"systemCd" : rowData.systemCd,
			"useFromDate" : rowData.effectiveDate
		});
	}
	formInfo.orgSysList = orgSysList;
	var setting = {
			data : JSON.stringify(orgSysList),
			url : "/IDMS0683/application.htm",
			hasLoading : true,
			hasContentType : true,
			success : function(res) {
				if (res.errorResultDto) {
					errors = res.errorResultDto.errorList;
					$.each(errors, function(i, err) {
						result = false;
						message = err.errorMessage;
					});
				} else {
					if (null != res.applicationList && 0 != res.applicationList.length) {
						result = false;
						var contractCd = res.applicationList[0].end_user_contract_cd;
						var systemCd = res.applicationList[0].systemCd;
						// 当該契約形態システムの紐付は他のユーザが申請中なので、削除できません。
						message = getMessage("E2098");
						// TODO 申請済みのチェック
						// TODO 組織内の承認、登録ルートのチェック
						for (var i = 0; i < rowDatas.length; i++) {
							var rowData = rowDatas[i];
							if (contractCd == rowData.contractCd && systemCd == rowData.systemCd){
								index = i;
								lastRow = rowData;
								break;
							}
						}
					}
					if (!result) {
						if (result.index > -1)
							$('#dg').datagrid('selectRow', $('#dg').datagrid("getRowIndex", lastRow));
						$("#p_errorMessage")[0].innerHTML = message;
					} else {
						parent.confirmComponent.callback = function() {
							var rowDatas = $('#dg').datagrid("getChecked");
							deleteData(rowDatas);
						};
						var title = '削除確認';
						var message = getMessage("W1004");
						parent.confirmShow(title, message);
					}
				}
			}
		};
	postAjax(setting);
}

// 契約形態システム情報削除を行う
function deleteData(rowDatas){
	var setting = {
			url : "/IDMS0683/deleteConSysInfo.htm",
			data : JSON.stringify(rowDatas),
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
					parent.alertShow('削除完了処理', goMessages.I1004);
					btnSearch_Click();
				}

			}
		};
		postAjax(setting);
}