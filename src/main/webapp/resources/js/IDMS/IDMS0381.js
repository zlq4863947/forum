// 画面初期化する
$(function() {
	// 検証項目のblurイベント関数を指定する
	$('.validatebox-text').bind('blur', function() {
		$(this).validatebox('enableValidation').validatebox('validate');
	});
	setGridHeader("regErrorMsgGrid");
	setGridHeader("registerMsgGrid");
	setGridHeader("privilegeHandleGrid");
	setGridHeader("errorMsgGrid");
});
var csvData;
var dataType;

// gridの中央揃え
function setGridHeader(gridId) {
	$("#" + gridId).datagrid(
			{
				onBeforeLoad : function(data) {
					var trTitle = $(this).parent("div.datagrid-view").find(
							"div.datagrid-header>div table tr");
					trTitle.find("td[field]").each(function(i, o) {
						$(this).children("div").css("text-align", "center");
					});
				}
			});
}

// 人事csvファイル選択画面を呼び出し
function btnUploadCSV_Click() {
	dataType = "1";
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	var inputObjectId = Math.random() + "";
	inputObjectId = 'file_'
			+ inputObjectId.substring(inputObjectId.indexOf('.') + 1);
	$("div.fileControlWrapHide").html(
			"<input id='" + inputObjectId + "' name='" + inputObjectId
					+ "' type='file'  />").find('input[type]')
			.bind(
					'change',
					function(e) {
						var fileExtName = getFileExtensionName(getFileName($(
								this).val()));
						if (fileExtName.toLowerCase() == "csv") {
							var setting = {
								url : "/IDMS0381/importCsvFile.htm",
								hasLoading : true,
								fileElementId : inputObjectId,
								success : function(res) {
									if (setting.hasLoading == true)
										hiddenLoading();
									// 登録エラー内容をクリアする
									$('#regErrorMsgGrid').datagrid('loadData',
											[]);
									// 登録内容をクリアする
									$('#registerMsgGrid').datagrid('loadData',
											[]);
									// 特権登録内容をクリアする
									$('#privilegeHandleGrid').datagrid(
											'loadData', []);
									// エラー内容を表示する
									$("#errorMsgGrid").datagrid("loadData", {
										"rows" : res.errorMsgList
									})
									// 登録ボタンを非活性にする
									$("#btnRegister").linkbutton("disable");
									// エラーが発生した場合
									if (res.errorMsgList
											&& res.errorMsgList.length > 0) {
										// チェックボタンを非活性にする
										$("#btnCheck").linkbutton("disable");
									} else {
										// チェックボタンを活性化にする
										$("#btnCheck").linkbutton("enable");
									}
									csvData = res.idms0381List;
								}
							};
							ajaxUpload(setting);
						} else {
							$.messager.alert('情報 ', getMessage("I1014"));
						}
					}).click();
}

// 特権csvファイル選択画面を呼び出し
function btnUploadPrivilegeCSV_Click() {
	dataType = "2";
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	var inputObjectId = Math.random() + "";
	inputObjectId = 'file_'
			+ inputObjectId.substring(inputObjectId.indexOf('.') + 1);
	$("div.fileControlWrapHide").html(
			"<input id='" + inputObjectId + "' name='" + inputObjectId
					+ "' type='file'  />").find('input[type]')
			.bind(
					'change',
					function(e) {
						var fileExtName = getFileExtensionName(getFileName($(
								this).val()));
						if (fileExtName.toLowerCase() == "csv") {
							var setting = {
								url : "/IDMS0381/importPrivilegeCSV.htm",
								hasLoading : true,
								fileElementId : inputObjectId,
								success : function(res) {
									if (setting.hasLoading == true)
										hiddenLoading();
									// 登録エラー内容をクリアする
									$('#regErrorMsgGrid').datagrid('loadData',
											[]);
									// 人事登録内容をクリアする
									$('#registerMsgGrid').datagrid('loadData',
											[]);
									// 特権登録内容をクリアする
									$('#privilegeHandleGrid').datagrid(
											'loadData', []);
									// エラー内容を表示する
									$("#errorMsgGrid").datagrid("loadData", {
										"rows" : res.errorMsgList
									})
									// 登録ボタンを非活性にする
									$("#btnRegister").linkbutton("disable");
									// エラーが発生した場合
									if (res.errorMsgList
											&& res.errorMsgList.length > 0) {
										// チェックボタンを非活性にする
										$("#btnCheck").linkbutton("disable");
									} else {
										// チェックボタンを活性化にする
										$("#btnCheck").linkbutton("enable");
									}
									csvData = res.idms0381List;
								}
							};
							ajaxUpload(setting);
						} else {
							$.messager.alert('情報 ', getMessage("I1014"));
						}
					}).click();
}

function btnCheck_Click() {
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	// 人事の場合
	if (dataType == "1") {
		var setting = {
			data : JSON.stringify(csvData),
			url : "/IDMS0381/checkCsvData.htm",
			hasLoading : true,
			hasContentType : true,
			success : function(res) {
				// 取込ファイルの内容がすべて正常データの場合
				if (res.errorMsgList.length == 0) {
					// 登録エラー内容をクリアする
					$('#regErrorMsgGrid').datagrid('loadData', []);
					// 登録内容を表示する
					$("#registerMsgGrid").datagrid("loadData", {
						"rows" : res.idms0381List
					});
					// 登録ボタンを活性化する
					$("#btnRegister").linkbutton("enable");
				} else {
					// 登録内容をクリアする
					$('#registerMsgGrid').datagrid('loadData', []);
					// 登録エラー内容を表示する
					$("#regErrorMsgGrid").datagrid("loadData", {
						"rows" : res.errorMsgList
					})
					// 登録ボタンを非活性にする
					$("#btnRegister").linkbutton("disable");
				}
			}
		};
		postAjax(setting);
	} else if (dataType == "2") { // 特権の場合
		var setting = {
			data : JSON.stringify(csvData),
			url : "/IDMS0381/checkPrivilegeCsvData.htm",
			hasLoading : true,
			hasContentType : true,
			success : function(res) {
				// 取込ファイルの内容がすべて正常データの場合
				if (res.errorMsgList.length == 0) {
					// 登録エラー内容をクリアする
					$('#regErrorMsgGrid').datagrid('loadData', []);
					// 登録内容を表示する
					$("#privilegeHandleGrid").datagrid("loadData", {
						"rows" : res.idms0381List
					});
					// 登録ボタンを活性化する
					$("#btnRegister").linkbutton("enable");
				} else {
					// 登録内容をクリアする
					$('#registerMsgGrid').datagrid('loadData', []);
					// 登録エラー内容を表示する
					$("#regErrorMsgGrid").datagrid("loadData", {
						"rows" : res.errorMsgList
					})
					// 登録ボタンを非活性にする
					$("#btnRegister").linkbutton("disable");
				}
			}
		};
		postAjax(setting);
	}
}

function btnRegister_Click() {
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	// 人事の場合
	if (dataType == "1") {
		var setting = {
			data : JSON.stringify(csvData),
			url : "/IDMS0381/register.htm",
			hasLoading : true,
			hasContentType : true,
			success : function(res) {
				if (!res.result) { // 実行失敗の場合
					$("#p_errorMessage")[0].innerHTML = res.errorMessage;
				} else { // 実行成功の場合
					// チェックボタンを非活性にする
					$("#btnCheck").linkbutton("disable");
					// 登録ボタンを非活性にする
					$("#btnRegister").linkbutton("disable");
					$.messager.show({
						title : '情報',
						msg : getMessage("I1002"),
						showType : 'show',
						style : {
							right : '',
							top : '',
							bottom : -document.body.scrollTop
									- document.documentElement.scrollTop
						}
					});
				}
			}
		};
		postAjax(setting);
	} else if (dataType == "2") { // 特権の場合
		var setting = {
			data : JSON.stringify(csvData),
			url : "/IDMS0381/registerPrivilege.htm",
			hasLoading : true,
			hasContentType : true,
			success : function(res) {
				if (!res.result) { // 実行失敗の場合
					$("#p_errorMessage")[0].innerHTML = res.errorMessage;
				} else { // 実行成功の場合
					// チェックボタンを非活性にする
					$("#btnCheck").linkbutton("disable");
					// 登録ボタンを非活性にする
					$("#btnRegister").linkbutton("disable");
					$.messager.show({
						title : '情報',
						msg : getMessage("I1002"),
						showType : 'show',
						style : {
							right : '',
							top : '',
							bottom : -document.body.scrollTop
									- document.documentElement.scrollTop
						}
					});
				}
			}
		};
		postAjax(setting);
	}
}

// 日付の格式化
function dateFormatter(value, row, index) {
	if (value == undefined || value == null || value == "") {
		return null;
	}
	var unixTimestamp = new Date(value);
	return unixTimestamp.format('yyyy/MM/dd');
}