// 画面初期化する
$(function() {
	// 検証項目のblurイベント関数を指定する
	$('.validatebox-text').bind('blur', function() {
		$(this).validatebox('enableValidation').validatebox('validate');
	});

	// 登録役割メンテナンス情報を初期化する
	initRegisterRoleInfo();
});

//インバリッドのスタイルを削除する
function removeValidate(){
	$("#registerRoleCd").nextAll().removeClass("textbox-invalid");
	$("#registerRoleCd").next().children().removeClass("validatebox-invalid");
	$("#registerRoleName").nextAll().removeClass("textbox-invalid");
	$("#registerRoleName").next().children().removeClass("validatebox-invalid");
}

// 登録役割メンテナンス情報を初期化する
function initRegisterRoleInfo() {
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
		$("#registerRoleCd").textbox("setValue",id)
		// 新規登録ボタンの表示名に「変更」を変更する
		$("#btnRegister .l-btn-text").text("変更");
		$("#btnRegister").attr("onClick","update()");
		// 親画面から渡された登録役割コードが存在しない場合、エラーとする
		if(!$("#registerRoleCd").textbox("getValue") || $("#registerRoleCd").textbox("getValue")=="null") {
			$("#p_errorMessage")[0].innerHTML = getMessage("E2090");
			$("#btnRegister").linkbutton('disable');
			return;
		} else {
			// 登録役割メンテナンス情報を取得する
			var setting = {
				data : {"registerRoleCd":$("#registerRoleCd").val()},
				url : "/IDMS0635/getRegisterRoleInfo.htm",
				hasLoading : true,
				hasContentType : false,
				success : function(res) {
					// 貰ったデータを画面の項目に設定する
					$("#IDMS0635Form").form('load',res);
					// 下記の項目が編集不可にする
					// 登録役割コード
		  			$('#registerRoleCd').textbox('disable');
				}
			};
			postAjax(setting);
		}
	}
}

//登録役割メンテナンス情報を新規登録する
function register() {
	removeValidate();
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	removeAllErrorForEasyUI("IDMS0635Form");
	// 画面の検証
	if($('#IDMS0635Form').form('validate') ==false){
		$("#p_errorMessage")[0].innerHTML = getMessage("E2088");
		return;
	}
	parent.confirmComponent.callback = function (){
		exceRegister();
	};
	var title = '登録役割登録確認';
	var message = getMessage("W1002");
	parent.confirmShow(title, message);
}

// 登録役割メンテナンス情報新規登録のコールバック関数
function exceRegister() {
	var setting = {
		data : $("#IDMS0635Form").serialize(),
		url : "/IDMS0635/register.htm",
		hasLoading : true,
		success : function(res) {
			if(!res.result) { // 実行失敗の場合
				$("#p_errorMessage")[0].innerHTML = res.errorMessage;
				// 登録役割コードの重複エラー
				if(res.errorCode == "E2084") {
					// 背景色に赤色を設定する
					$("#registerRoleCd").nextAll().addClass("textbox-invalid");
					$("#registerRoleCd").next().children().addClass("validatebox-invalid");
				} else if(res.errorCode == "E2085") { // 登録役割名の重複エラー
					// 背景色に赤色を設定する
					$("#registerRoleName").nextAll().addClass("textbox-invalid");
					$("#registerRoleName").next().children().addClass("validatebox-invalid");
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

//登録役割メンテナンス情報を更新する
function update() {
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	removeValidate();
	removeAllErrorForEasyUI("IDMS0635Form");
	// 画面の検証
	if($('#IDMS0635Form').form('validate') ==false){
		$("#p_errorMessage")[0].innerHTML = getMessage("E2088");
		return;
	}
	parent.confirmComponent.callback = function (){
		exceUpdate();
	};
	var title = '登録役割変更確認';
	var message = getMessage("W1016");
	parent.confirmShow(title, message);
}

//登録役割メンテナンス情報変更のコールバック関数
function exceUpdate() {
	// 「登録役割コード」を活性化にする
	$("#registerRoleCd").textbox('enable');
	var setting = {
		data : $("#IDMS0635Form").serialize(),
		url : "/IDMS0635/update.htm",
		hasLoading : true,
		success : function(res) {
			if(!res.result) { // 実行失敗の場合
				$("#p_errorMessage")[0].innerHTML = res.errorMessage;
				// 登録役割コードの重複エラー
				if(res.errorCode == "E2085") { // 登録役割名の重複エラー
					// 背景色に赤色を設定する
					$("#registerRoleName").nextAll().addClass("textbox-invalid");
					$("#registerRoleName").next().children().addClass("validatebox-invalid");
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
	// 「登録役割コード」を非活性にする
	$("#registerRoleCd").textbox('disable');
	postAjax(setting);
}

// 閉じる関数
function closeWin() {
	parent.closeMainDialog(null);
}