// 画面初期化する
$(function() {
	// 検証項目のblurイベント関数を指定する
	$('.validatebox-text').bind('blur', function() {
		$(this).validatebox('enableValidation').validatebox('validate');
	});

	// システム権限グループメニューメンテナンス情報を初期化する
	initSystemAuthorityInfo();
});

// インバリッドのスタイルを削除する
function removeValidate(){
	$("#authorityGroupMenuCd").nextAll().removeClass("textbox-invalid");
	$("#authorityGroupMenuCd").next().children().removeClass("validatebox-invalid");
	$("#authorityGroupMenuName").nextAll().removeClass("textbox-invalid");
	$("#authorityGroupMenuName").next().children().removeClass("validatebox-invalid");
}

// システム権限グループメニューメンテナンス情報を初期化する
function initSystemAuthorityInfo() {
	$("#btnRegister").linkbutton('enable');
	var callData = getCallInfo();
	//新規の場合
	if(!callData.systemCd || callData.systemCd=="null") {
		$("#createUserName").textbox("setValue",$("#loginUserName").val());
		$("#updateUserName").textbox("setValue",$("#loginUserName").val());
		// 新規登録ボタンの表示名に「新規登録」を設定する
		$("#btnRegister .l-btn-text").text("新規登録");
		$("#btnRegister").attr("onClick","register()");
	} else {//編集の場合数値
		$("#systemCd").textbox("setValue",callData.systemCd);
		$("#authorityGroupMenuCd").textbox("setValue",callData.authorityGroupMenuCd);
		// 新規登録ボタンの表示名に「変更」を変更する
		$("#btnRegister .l-btn-text").text("変更");
		$("#btnRegister").attr("onClick","update()");
		// 親画面から渡されたシステムコードが存在しない場合、エラーとする
		if(!$("#systemCd").textbox("getValue") || $("#systemCd").textbox("getValue")=="null") {
			$("#p_errorMessage")[0].innerHTML = getMessage("E2090");
			$("#btnRegister").linkbutton('disable');
			return;
		} else {
			// システム権限グループメニューメンテナンス情報を取得する
			var setting = {
				data : {
					"systemCd":$("#systemCd").val(),
					"authorityGroupMenuCd":$("#authorityGroupMenuCd").val()},
				url : "/IDMS0640/getSystemAuthorityInfo.htm",
				hasLoading : true,
				hasContentType : false,
				success : function(res) {
					// 貰ったデータを画面の項目に設定する
					$("#IDMS0640Form").form('load',res);
					// 下記の項目が編集不可にする
					// システムコード
		  			$("#systemCd").textbox("disable");
					// システム権限グループメニューコード
		  			$("#authorityGroupMenuCd").textbox("disable");
				}
			};
			postAjax(setting);
		}
	}
}

// システム権限グループメニューメンテナンス情報を新規登録する
function register() {
	removeValidate();
	$("#p_errorMessage")[0].innerHTML = "&nbsp;";
	removeAllErrorForEasyUI("IDMS0640Form");
	// 画面の検証
	if($('#IDMS0640Form').form('validate') ==false){
		$("#p_errorMessage")[0].innerHTML = getMessage("E2088");
		return;
	}
	parent.confirmComponent.callback = function (){
		exceRegister();
	};
	var title = "システム登録確認";
	var message = getMessage("W1002");
	parent.confirmShow(title, message);
}

// システム権限グループメニューメンテナンス情報新規登録のコールバック関数
function exceRegister() {
	var setting = {
		data : $("#IDMS0640Form").serialize() + "&systemName=" + $("#systemCd").textbox("getText"),
		url : "/IDMS0640/register.htm",
		hasLoading : true,
		success : function(res) {
			if(!res.result) { // 実行失敗の場合
				$("#p_errorMessage")[0].innerHTML = res.errorMessage;
				// 権限グループメニューコードの重複エラー
				if(res.errorCode == "E2093") {
					// 背景色に赤色を設定する
					$("#authorityGroupMenuCd").nextAll().addClass("textbox-invalid");
					$("#authorityGroupMenuCd").next().children().addClass("validatebox-invalid");
				} else if(res.errorCode == "E2082") { // 権限グループメニュー名称の重複エラー
					// 背景色に赤色を設定する
					$("#authorityGroupMenuName").nextAll().addClass("textbox-invalid");
					$("#authorityGroupMenuName").next().children().addClass("validatebox-invalid");
				}
			} else { // 実行成功の場合
				$.messager.show({
					title:"情報",
					msg:getMessage("I1002"),
					showType:"show",
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

// システム権限グループメニューメンテナンス情報を更新する
function update() {
	$("#p_errorMessage")[0].innerHTML = "&nbsp;";
	removeValidate();
	removeAllErrorForEasyUI("IDMS0640Form");
	// 画面の検証
	if($("#IDMS0640Form").form("validate") ==false){
		$("#p_errorMessage")[0].innerHTML = getMessage("E2088");
		return;
	}
	parent.confirmComponent.callback = function (){
		exceUpdate();
	};
	var title = "システム変更確認";
	var message = getMessage("W1016");
	parent.confirmShow(title, message);
}

// システム権限グループメニューメンテナンス情報変更のコールバック関数
function exceUpdate() {
	// 「システムコード」を活性化にする
	$("#systemCd").textbox("enable");
	// 「権限グループメニューコード」を活性化にする
	$("#authorityGroupMenuCd").textbox("enable");
	var setting = {
		data : $("#IDMS0640Form").serialize() + "&systemName=" + $("#systemCd").textbox("getText"),
		url : "/IDMS0640/update.htm",
		hasLoading : true,
		success : function(res) {
			if(!res.result) { // 実行失敗の場合
				$("#p_errorMessage")[0].innerHTML = res.errorMessage;
				// 権限グループメニュー名称の重複エラー
				if(res.errorCode == "E2082") {
					// 背景色に赤色を設定する
					$("#authorityGroupMenuName").nextAll().addClass("textbox-invalid");
					$("#authorityGroupMenuName").next().children().addClass("validatebox-invalid");
				}
			} else { // 実行成功の場合
				$.messager.show({
					title:"情報",
					msg:getMessage("I1016"),
					showType:"show",
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
	// 「システムコード」を非活性にする
	$("#systemCd").textbox("disable");
	// 「権限グループメニューコード」を非活性にする
	$("#authorityGroupMenuCd").textbox("disable");
	postAjax(setting);
}

// 閉じる関数
function closeWin() {
	parent.closeMainDialog(null);
}