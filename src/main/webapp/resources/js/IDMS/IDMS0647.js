// 画面初期化する
$(function() {
	// 検証項目のblurイベント関数を指定する
	$('.validatebox-text').bind('blur', function() {
		$(this).validatebox('enableValidation').validatebox('validate');
	});

	// タブメンテナンス情報を初期化する
	initTabInfo();
});

//インバリッドのスタイルを削除する
function removeValidate(){
	$("#tabCd").nextAll().removeClass("textbox-invalid");
	$("#tabCd").next().children().removeClass("validatebox-invalid");
	$("#tabName").nextAll().removeClass("textbox-invalid");
	$("#tabName").next().children().removeClass("validatebox-invalid");
}

// タブメンテナンス情報を初期化する
function initTabInfo() {
	$("#btnRegister").linkbutton('enable');
	var id = getCallInfo();
	//新規の場合
	if(!id || id=="null") {
		$("#createUserName").textbox("setValue",$("#loginUserName").val());
		$("#updateUserName").textbox("setValue",$("#loginUserName").val());
		// 新規登録ボタンの表示名に「新規登録」を設定する
		$("#btnRegister .l-btn-text").text("新規登録");
		$("#btnRegister").attr("onClick","register()");
	} else {//編集の場合数値			
		$("#tabCd").textbox("setValue",id)
		// 新規登録ボタンの表示名に「変更」を変更する
		$("#btnRegister .l-btn-text").text("変更");
		$("#btnRegister").attr("onClick","update()");
		// 親画面から渡されたタブコードが存在しない場合、エラーとする
		if(!$("#tabCd").textbox("getValue") || $("#tabCd").textbox("getValue")=="null") {
			$("#p_errorMessage")[0].innerHTML = getMessage("E2090");
			$("#btnRegister").linkbutton('disable');
			return;
		} else {
			// タブメンテナンス情報を取得する
			var setting = {
				data : {"tabCd":$("#tabCd").val()},
				url : "/IDMS0647/getTabInfo.htm",
				hasLoading : true,
				hasContentType : false,
				success : function(res) {
					// 貰ったデータを画面の項目に設定する
					$("#IDMS0647Form").form('load',res);
					// 下記の項目が編集不可にする
					// タブコード
		  			$('#tabCd').textbox('disable');
				}
			};
			postAjax(setting);
		}
	}
}

//タブメンテナンス情報を新規登録する
function register() {
	removeValidate();
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	removeAllErrorForEasyUI("IDMS0647Form");
	// 画面の検証
	if($('#IDMS0647Form').form('validate') ==false){
		$("#p_errorMessage")[0].innerHTML = getMessage("E2088");
		return;
	}
	parent.confirmComponent.callback = function (){
		exceRegister();
	};
	var title = 'タブ登録確認';
	var message = getMessage("W1002");
	parent.confirmShow(title, message);
}

// タブメンテナンス情報新規登録のコールバック関数
function exceRegister() {
	var setting = {
		data : $("#IDMS0647Form").serialize(),
		url : "/IDMS0647/register.htm",
		hasLoading : true,
		success : function(res) {
			if(!res.result) { // 実行失敗の場合
				$("#p_errorMessage")[0].innerHTML = res.errorMessage;
				// タブコードの重複エラー
				if(res.errorCode == "E2084") {
					// 背景色に赤色を設定する
					$("#tabCd").nextAll().addClass("textbox-invalid");
					$("#tabCd").next().children().addClass("validatebox-invalid");
				} else if(res.errorCode == "E2085") { // タブ名の重複エラー
					// 背景色に赤色を設定する
					$("#tabName").nextAll().addClass("textbox-invalid");
					$("#tabName").next().children().addClass("validatebox-invalid");
				}
			} else { // 実行成功の場合
				$.messager.show({
					title:'情報',
					msg:getMessage("I1002"),
					showType:'show',
					style:{
						right:'',
						top:'',
						bottom:-document.body.scrollTop-document.documentElement.scrollTop
					}
				});
				setTimeout(function () {
					parent.closeMainDialog(null);
			    }, 1000);
			}
		}
	};
	postAjax(setting);
}

//タブメンテナンス情報を更新する
function update() {
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	removeValidate();
	removeAllErrorForEasyUI("IDMS0647Form");
	// 画面の検証
	if($('#IDMS0647Form').form('validate') ==false){
		$("#p_errorMessage")[0].innerHTML = getMessage("E2088");
		return;
	}
	parent.confirmComponent.callback = function (){
		exceUpdate();
	};
	var title = 'タブ変更確認';
	var message = getMessage("W1016");
	parent.confirmShow(title, message);
}

//タブメンテナンス情報変更のコールバック関数
function exceUpdate() {
	// 「タブコード」を活性化にする
	$("#tabCd").textbox('enable');
	var setting = {
		data : $("#IDMS0647Form").serialize(),
		url : "/IDMS0647/update.htm",
		hasLoading : true,
		success : function(res) {
			if(!res.result) { // 実行失敗の場合
				$("#p_errorMessage")[0].innerHTML = res.errorMessage;
				// タブコードの重複エラー
				if(res.errorCode == "E2085") { // タブ名の重複エラー
					// 背景色に赤色を設定する
					$("#tabName").nextAll().addClass("textbox-invalid");
					$("#tabName").next().children().addClass("validatebox-invalid");
				}
			} else { // 実行成功の場合
				$.messager.show({
					title:'情報',
					msg:getMessage("I1016"),
					showType:'show',
					style:{
						right:'',
						top:'',
						bottom:-document.body.scrollTop-document.documentElement.scrollTop
					}
				});
				setTimeout(function () {
					parent.closeMainDialog(null);
			    }, 1000);
			}
		}
	};
	// 「タブコード」を非活性にする
	$("#tabCd").textbox('disable');
	postAjax(setting);
}

// 閉じる関数
function closeWin() {
	parent.closeMainDialog(null);
}