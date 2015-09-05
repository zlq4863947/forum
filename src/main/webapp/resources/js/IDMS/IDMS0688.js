// 画面初期化する
$(function() {
	// 検証項目のblurイベント関数を指定する
	$('.validatebox-text').bind('blur', function() {
		$(this).validatebox('enableValidation').validatebox('validate');
	});
});

// 検索ボタンを押下し、検索情報により、タブメニュー紐付一覧情報を取得する
function btnSearch_Click() {
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	removeAllErrorForEasyUI("IDMS0688Form");
	// 画面の検証
	if($("#IDMS0688Form").form("validate") ==false){
		$("#p_errorMessage")[0].innerHTML = getMessage("E2088");
		return;
	}
	var setting = {
		data :  $("#IDMS0688Form").serialize(),
		url : "/IDMS0688/getTabMenuInfo.htm",
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
				// タブメニュー紐付一覧情報を表示する
				$("#tabMenuGrid").datagrid("loadData",{"rows": res});
			}
		}
	};
	postAjax(setting);
}


//タブメニュー紐付登録画面を呼び出し
function btnRegister_Click() {
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	var title = "タブメニュー紐付登録";
	var url = "/IDMS0689/IDMS0689.htm";
	var height = 320;
	var width = 650;
	parent.getDialogObject().callback = function(data) {
		btnSearch_Click();
	}
	parent.openMainDialog(title, url, width, height);
}

// 条件クリアする
function btnClear_Click() {
	$("#IDMS0688Form").form("clear");
}

//日付の格式化
function dateFormatter(value, row, index) {
	if (value == undefined || value == null || value == "") {
		return null;
	}
	var unixTimestamp = new Date(value);
	return unixTimestamp.format('yyyy/MM/dd');
}

//画面上選択された行の表示方式を制御
var lastSelectedIndex = -1;
function onSelectRow(index, row) {
	if (lastSelectedIndex == index) {

	} else {
		if (lastSelectedIndex < 0) {

		} else {
			$('#tabMenuGrid').datagrid('unselectRow', lastSelectedIndex);
		}
	}
	lastSelectedIndex = index;
}

function btnDelete_Click(){
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	
	var rowDatas = $('#tabMenuGrid').datagrid("getChecked");
	
	if (rowDatas.length == 0) {
		$("#p_errorMessage")[0].innerHTML = getMessage("E1009", ["削除対象"]);
		return;
	}
	
	parent.confirmComponent.callback = function() {
		var rowDatas = $('#tabMenuGrid').datagrid("getChecked");
		deleteData(rowDatas);
	};
	var title = '削除確認';
	var message = getMessage("W1004");
	parent.confirmShow(title, message);
}

// タブメニュー紐付情報を削除する
function deleteData(rowDatas){
	var setting = {
			url : "/IDMS0688/delTabMenuInfo.htm",
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