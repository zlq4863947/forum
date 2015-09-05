// 画面初期化する
$(function() {
	// 検証項目のblurイベント関数を指定する
	$('.validatebox-text').bind('blur', function() {
		$(this).validatebox('enableValidation').validatebox('validate');
	});

	// 契約形態メンテナンス情報を初期化する
	initContractInfo();
});

//インバリッドのスタイルを削除する
function removeValidate(){
	$("#contractCd").nextAll().removeClass("textbox-invalid");
	$("#contractCd").next().children().removeClass("validatebox-invalid");
	$("#contractName").nextAll().removeClass("textbox-invalid");
	$("#contractName").next().children().removeClass("validatebox-invalid");
}

// 契約形態メンテナンス情報を初期化する
function initContractInfo() {
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
		$("#contractCd").textbox("setValue",id)
		// 新規登録ボタンの表示名に「変更」を変更する
		$("#btnRegister .l-btn-text").text("変更");
		$("#btnRegister").attr("onClick","update()");
		// 親画面から渡された契約形態コードが存在しない場合、エラーとする
		if(!$("#contractCd").textbox("getValue") || $("#contractCd").textbox("getValue")=="null") {
			$("#p_errorMessage")[0].innerHTML = getMessage("E2090");
			$("#btnRegister").linkbutton('disable');
			return;
		} else {
			// 契約形態メンテナンス情報を取得する
			var setting = {
				data : {"contractCd":$("#contractCd").val()},
				url : "/IDMS0633/getContractInfo.htm",
				hasLoading : true,
				hasContentType : false,
				success : function(res) {
					// 貰ったデータを画面の項目に設定する
					$("#IDMS0633Form").form('load',res);
					// 下記の項目が編集不可にする
					// 契約形態コード
		  			$('#contractCd').textbox('disable');
				}
			};
			postAjax(setting);
		}
	}
}

//契約形態メンテナンス情報を新規登録する
function register() {
	removeValidate();
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	removeAllErrorForEasyUI("IDMS0633Form");
	// 画面の検証
	if($('#IDMS0633Form').form('validate') ==false){
		$("#p_errorMessage")[0].innerHTML = getMessage("E2088");
		return;
	}
	parent.confirmComponent.callback = function (){
		exceRegister();
	};
	var title = '契約形態登録確認';
	var message = getMessage("W1002");
	parent.confirmShow(title, message);
}

// 契約形態メンテナンス情報新規登録のコールバック関数
function exceRegister() {
	var setting = {
		data : $("#IDMS0633Form").serialize(),
		url : "/IDMS0633/register.htm",
		hasLoading : true,
		success : function(res) {
			if(!res.result) { // 実行失敗の場合
				$("#p_errorMessage")[0].innerHTML = res.errorMessage;
				// 契約形態コードの重複エラー
				if(res.errorCode == "E2084") {
					// 背景色に赤色を設定する
					$("#contractCd").nextAll().addClass("textbox-invalid");
					$("#contractCd").next().children().addClass("validatebox-invalid");
				} else if(res.errorCode == "E2085") { // 契約形態名の重複エラー
					// 背景色に赤色を設定する
					$("#contractName").nextAll().addClass("textbox-invalid");
					$("#contractName").next().children().addClass("validatebox-invalid");
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

//契約形態メンテナンス情報を更新する
function update() {
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	removeValidate();
	removeAllErrorForEasyUI("IDMS0633Form");
	// 画面の検証
	if($('#IDMS0633Form').form('validate') ==false){
		$("#p_errorMessage")[0].innerHTML = getMessage("E2088");
		return;
	}
	parent.confirmComponent.callback = function (){
		exceUpdate();
	};
	var title = '契約形態変更確認';
	var message = getMessage("W1016");
	parent.confirmShow(title, message);
}

//契約形態メンテナンス情報変更のコールバック関数
function exceUpdate() {
	// 「契約形態コード」を活性化にする
	$("#contractCd").textbox('enable');
	var setting = {
		data : $("#IDMS0633Form").serialize(),
		url : "/IDMS0633/update.htm",
		hasLoading : true,
		success : function(res) {
			if(!res.result) { // 実行失敗の場合
				$("#p_errorMessage")[0].innerHTML = res.errorMessage;
				// 契約形態コードの重複エラー
				if(res.errorCode == "E2085") { // 契約形態名の重複エラー
					// 背景色に赤色を設定する
					$("#contractName").nextAll().addClass("textbox-invalid");
					$("#contractName").next().children().addClass("validatebox-invalid");
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
	// 「契約形態コード」を非活性にする
	$("#contractCd").textbox('disable');
	postAjax(setting);
}

// 閉じる関数
function closeWin() {
	parent.closeMainDialog(null);
}