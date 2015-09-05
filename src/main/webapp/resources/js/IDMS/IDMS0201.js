/**
 * 
 */

// 文書番号
var fileNumber = "";

var systemCd = "";

$(function() {

	$('#tblMatchResult').datagrid({
		onLoadSuccess : function(data) {
			$(this).datagrid("autoMergeCells", [ 'accountCsv', 'accountId', 'userAlias', 'employeeNo', 'userName' ]);
		}
	});

});


var inputObjectId;

function btnReferenceClick(){

	// エラー内容をクリアする
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	inputObjectId = Math.random() + "";
	inputObjectId = 'file_' + inputObjectId.substring(inputObjectId.indexOf('.') + 1);
	$("div.fileControlWrapHide").html(
			"<input id='" + inputObjectId + "' name='" + inputObjectId + "' type='file'  />").find('input[type]')
			.bind(
					'change',
					function(e) {
						// CSVファイルのパス
						$("#csvFileName").textbox("setValue", "");
						var fileExtName = getFileExtensionName(getFileName($(this).val()));
						if (fileExtName.toLowerCase() == "csv") {
							// CSVファイルのパス
							$("#csvFileName").textbox("setValue", $(this).val());
							
							$('#btnReadFile').linkbutton({
								disabled : false
							});
							
							clear();
							
						} else {
							
							$("#p_errorMessage")[0].innerHTML = getMessage("I1014");
						}
					}).click();
}

// クリア
function clear(){
	// ファイルチェック一覧をクリアする
	$("#tblCheckResult").datagrid({ height : 'auto' });
	$('#tblCheckResult').datagrid('loadData', []);
	// マッチング結果一覧をクリアする
	$("#tblMatchResult").datagrid({ height : 'auto' });
	$('#tblMatchResult').datagrid('loadData', []);
	
	// マッチングボタン
	$('#btnMatch').linkbutton({
		disabled : true
	});

	// エラーCSV出力
	$('#btnErrorOutput').linkbutton({
		disabled : true
	});

	// 更新ボタン
	$('#btnUpdate').linkbutton({
		disabled : true
	});

	// マッチングCSV出力ボタン
	$('#btnMatchOutPut').linkbutton({
		disabled : true
	});
	
	// 文書番号
	fileNumber = "";
	
	// システムコード
	systemCd = "";
}

//変数値の判断
function isEmpty(v) {
	return typeof v == 'undefined' || v == null || v.length == 0;
}

// 読込ボタンの処理
function btnReadFileClick(){
	
	var filePath = $("#csvFileName").textbox("getValue");
	
	if(isEmpty(filePath)){
		$("#p_errorMessage")[0].innerHTML = "CSVファイルを選択して下さい。";
		return;
	}
	
	// システムコード
	systemCd = $("#selSystem").combobox("getValue");

	var setting = {
			url : "/IDMS0201/importCsvFile.htm"+ "?" + "systemCd=" + systemCd,
			hasLoading : true,
			fileElementId : inputObjectId,
			success : function(res) {
				if (setting.hasLoading == true) {
					hiddenLoading();
				}
				
				// 読込ボタンを無効化にする
				$('#btnReadFile').linkbutton({
					disabled : true
				});
				
				// ファイルチェック一覧を再設定する
				if (res.errorList) {
					
					var height = parent.getMainFrameHeight() - 600;
					
					$('#tblCheckResult').datagrid('loadData', res.errorList);
					
					if(res.errorList.length <= 14){
						$("#tblCheckResult").datagrid({ height : 'auto' });
					} else {
						$("#tblCheckResult").datagrid({ height : height });
					}
					
					$('#btnErrorOutput').linkbutton({
							disabled : false
						});
				} else {
					// 文書番号
					fileNumber = res.fileNumber;
					$('#btnMatch').linkbutton({
							disabled : false
						});
				}

			}
		};

	ajaxUpload(setting);
}

function btnMatch_Click(){
	
	// エラー内容をクリアする
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	
	var setting = {
			data : {
				"systemCd" : systemCd,
				"fileNumber" : fileNumber
			},
			url : "/IDMS0201/getMatchResult.htm",
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
					
					if(res.matchResult.length > 0){
						var height = parent.getMainFrameHeight() - 600;
						
						$('#tblMatchResult').datagrid('loadData', res.matchResult);
						if(res.matchResult.length <= 14){
							$("#tblMatchResult").datagrid({ height : 'auto' });
						} else {
							$("#tblMatchResult").datagrid({ height : height });
						}
						
						// 更新ボタン
						$('#btnUpdate').linkbutton({
							disabled : false
						});
						// マッチングCSV出力ボタン
						$('#btnMatchOutPut').linkbutton({
							disabled : false
						});
					} else {
						parent.alertShow('', '当該システムはID管理システムと一致しています。');
					}

				}

			}
		};
	postAjax(setting);
}

function operationTypeFormatter(value, row, index) {
	if (value == '1') {
		return '新規'
	} else if (value == '2') {
		return '変更'
	} else if (value == '3') {
		return '削除'
	}
}

function choiceFormatter(value, row, index) {
	if(value == '1'){
		return "<button type=\"button\" class=\"l-btn\" onclick=\"btnChoice_Click('" + row.operationType +"','"+ row.accountCsv + "')\" style=\"width: 40px;\">選択</button>";
	} else {
		return "";
	}
}

var choice_operationType = "";
var choice_accountCsv = "";

function btnChoice_Click(dataSrc1, dataSrc2){
	// エラー内容をクリアする
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	
	choice_operationType = dataSrc1;
	choice_accountCsv = dataSrc2;
	
	parent.getDialogObject().callback = function(data) {
		if(data && data.endUserId && data.endUserId[0] && data.endUserId[0] != 'null'){
			var setting = {
					data : {"userId":data.endUserId[0]},
					url : "/COMMON/getLoginAuthority.htm",
					hasLoading : true,
					hasContentType : false,
					success : function(res) {
					    
					    var allRowDatas = $('#tblMatchResult').datagrid("getData").rows;
					    
						for (var j = 0; j < allRowDatas.length; j++) {
							if (allRowDatas[j].operationType == choice_operationType && allRowDatas[j].accountCsv == choice_accountCsv) {
								
								allRowDatas[j].userId = res.userId;
								allRowDatas[j].userAlias = res.userAlias;
								allRowDatas[j].employeeNo = res.employeeNo;
								allRowDatas[j].userName = res.userName;
							}
						}
					    
						
						$('#tblMatchResult').datagrid('loadData', allRowDatas);
					    
					}
				};
				postAjax(setting);
		}
	}
	
	var title = "対象者選択";
	var url = "/IDMS0011/IDMS0011.htm?checkFlag=1";
	var width = 642;
	var height = 605;
	parent.openMainDialog(title, url, width, height);
}

// エラーCSV出力
function btnErrorOutput_Click(){
	// エラー内容をクリアする
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';

	var checkResults = $("#tblCheckResult").datagrid("getData").rows;

	var setting = {
			data : JSON.stringify(checkResults),
			url : "/IDMS0201/saveErrorCSV.htm",
			hasLoading : true,
			hasContentType : true,
			success : function(res) {
				if(res) {
					
					var url = CONTEXT_PATH + "/IDMS0201/downloadErrorCSV.htm";
					
					$("<iframe style='display:none;'>").appendTo($("div#divdownload")).attr(
							"src", url);
					
				}
			}
		};
		postAjax(setting);
}

// マッチングCSV出力
function btnMatchOutPut_Click(){
	// エラー内容をクリアする
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';

	var matchResults = $('#tblMatchResult').datagrid("getData").rows;
	
	var setting = {
			data : JSON.stringify(matchResults),
			url : "/IDMS0201/saveMatchCSV.htm",
			hasLoading : true,
			hasContentType : true,
			success : function(res) {
				if(res) {
					
					var url = CONTEXT_PATH + "/IDMS0201/downloadMatchCSV.htm";
					
					$("<iframe style='display:none;'>").appendTo($("div#divdownload")).attr(
							"src", url);
					
				}
			}
		};

	postAjax(setting);
	
}

// 更新ボタン
function btnUpdate_Click(){
	// エラー内容をクリアする
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';

	var choiceFlag = true;

	var matchResults = $('#tblMatchResult').datagrid("getData").rows;
	for (var j = 0; j < matchResults.length; j++) {
		if (matchResults[j].operationType == "1" && matchResults[j].userId) {
			choiceFlag = false;
		}
	}

	if(choiceFlag){
		// 更新対象がありません。
		$("#p_errorMessage")[0].innerHTML = getMessage("E1002");
		return;
	}
	
	parent.confirmComponent.callback = function (){
		exceUpdate();
	};
	
	parent.confirmShow('更新確認', getMessage("W1021"));
}

// 更新処理
function exceUpdate(){
	var matchResults = $('#tblMatchResult').datagrid("getData").rows;
	
	var choiceData = [];
	
	for (var j = 0; j < matchResults.length; j++) {
		// 新規で、ユーザがあるのレコード
		if (matchResults[j].operationType == "1" && matchResults[j].userId) {
			choiceData.push(matchResults[j]);
		}
	}
	
	var setting = {
			data : JSON.stringify(choiceData),
			url : "/IDMS0201/insertAuthority.htm",
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
					
					if(res.status == "true"){
						
						parent.alertShow('', getMessage('I1003'));
						$('#btnUpdate').linkbutton({
							disabled : true
						});
					}

				}

			}
		};
	postAjax(setting);
}