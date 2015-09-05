// 画面初期化する
$(function() {
	// 検証項目のblurイベント関数を指定する
	$('.validatebox-text').bind('blur', function() {
		$(this).validatebox('enableValidation').validatebox('validate');
	});

	// コードメンテナンス情報を初期化する
	initCodeInfo();
});

//インバリッドのスタイルを削除する
function removeValidate() {
	$("#codeGroup").nextAll().removeClass("textbox-invalid");
	$("#codeGroup").next().children().removeClass("validatebox-invalid");
	$("#code").nextAll().removeClass("textbox-invalid");
	$("#code").next().children().removeClass("validatebox-invalid");
}

// コードメンテナンス情報を初期化する
function initCodeInfo() {
	$("#btnRegister").linkbutton('enable');
	var callData = getCallInfo();
	//新規の場合
	if(!callData.codeGroup || callData.codeGroup=="null") {
		$("#createUserName").textbox("setValue",$("#loginUserName").val());
		$("#updateUserName").textbox("setValue",$("#loginUserName").val());
		// 新規登録ボタンの表示名に「新規登録」を設定する
		$("#btnRegister .l-btn-text").text("新規登録");
		$("#btnRegister").attr("onClick","register()");
	} else {//編集の場合数値			
		$("#code").textbox("setValue",callData.code);
		$("#codeGroup").textbox("setValue",callData.codeGroup);
		// 新規登録ボタンの表示名に「変更」を変更する
		$("#btnRegister .l-btn-text").text("変更");
		$("#btnRegister").attr("onClick","update()");
		// コードメンテナンス情報を取得する
		var setting = {
			data : {"codeGroup":$("#codeGroup").val(),"code":$("#code").val()},
			url : "/IDMS0638/getCodeInfo.htm",
			hasLoading : true,
			hasContentType : false,
			success : function(res) {
				// 貰ったデータを画面の項目に設定する
				$("#IDMS0638Form").form('load',res);
				// 下記の項目が編集不可にする
				// コード
	  			$('#code').textbox('disable');
				// コードグループ
	  			$('#codeGroup').textbox('disable');
			}
		};
		postAjax(setting);
	}
}

//コードメンテナンス情報を新規登録する
function register() {
	removeValidate();
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	removeAllErrorForEasyUI("IDMS0638Form");
	// 画面の検証
	if($('#IDMS0638Form').form('validate') ==false){
		$("#p_errorMessage")[0].innerHTML = getMessage("E2088");
		return;
	}
	parent.confirmComponent.callback = function (){
		exceRegister();
	};
	var title = 'コード登録確認';
	var message = getMessage("W1002");
	parent.confirmShow(title, message);
}

// コードメンテナンス情報新規登録のコールバック関数
function exceRegister() {
	var setting = {
		data : $("#IDMS0638Form").serialize(),
		url : "/IDMS0638/register.htm",
		hasLoading : true,
		success : function(res) {
			if(!res.result) { // 実行失敗の場合
				$("#p_errorMessage")[0].innerHTML = res.errorMessage;
				// コードグループまたはコードの重複エラー
				if(res.errorCode == "E2092") {
					// 背景色に赤色を設定する
					$("#codeGroup").nextAll().addClass("textbox-invalid");
					$("#codeGroup").next().children().addClass("validatebox-invalid");
					$("#code").nextAll().addClass("textbox-invalid");
					$("#code").next().children().addClass("validatebox-invalid");
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

//コードメンテナンス情報を更新する
function update() {
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	removeValidate();
	removeAllErrorForEasyUI("IDMS0638Form");
	// 画面の検証
	if($('#IDMS0638Form').form('validate') ==false){
		$("#p_errorMessage")[0].innerHTML = getMessage("E2088");
		return;
	}
	parent.confirmComponent.callback = function (){
		exceUpdate();
	};
	var title = 'コード変更確認';
	var message = getMessage("W1016");
	parent.confirmShow(title, message);
}

//コードメンテナンス情報変更のコールバック関数
function exceUpdate() {
	// 「グループコードコード」を活性化にする
	$("#codeGroup").textbox('enable');
	// 「コード」を活性化にする
	$("#code").textbox('enable');
	var setting = {
		data : $("#IDMS0638Form").serialize(),
		url : "/IDMS0638/update.htm",
		hasLoading : true,
		success : function(res) {
			if(!res.result) { // 実行失敗の場合
				$("#p_errorMessage")[0].innerHTML = res.errorMessage;
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
	// 「グループコードコード」を非活性にする
	$("#codeGroup").textbox('disable');
	// 「コードコード」を非活性にする
	$("#code").textbox('disable');
	postAjax(setting);
}

// 閉じる関数
function closeWin() {
	parent.closeMainDialog(null);
}