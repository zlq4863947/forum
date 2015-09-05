// 画面初期化する
$(function() {
	// 検証項目のblurイベント関数を指定する
	$('.validatebox-text').bind('blur', function() {
		$(this).validatebox('enableValidation').validatebox('validate');
	});

	// 承認役割メンテナンス情報を初期化する
	initApprovalRoleInfo();
});

//インバリッドのスタイルを削除する
function removeValidate(){
	$("#approvalRoleCd").nextAll().removeClass("textbox-invalid");
	$("#approvalRoleCd").next().children().removeClass("validatebox-invalid");
	$("#approvalRoleName").nextAll().removeClass("textbox-invalid");
	$("#approvalRoleName").next().children().removeClass("validatebox-invalid");
}

// 承認役割メンテナンス情報を初期化する
function initApprovalRoleInfo() {
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
		$("#approvalRoleCd").textbox("setValue",id)
		// 新規登録ボタンの表示名に「変更」を変更する
		$("#btnRegister .l-btn-text").text("変更");
		$("#btnRegister").attr("onClick","update()");
		// 親画面から渡された承認役割コードが存在しない場合、エラーとする
		if(!$("#approvalRoleCd").textbox("getValue") || $("#approvalRoleCd").textbox("getValue")=="null") {
			$("#p_errorMessage")[0].innerHTML = getMessage("E2090");
			$("#btnRegister").linkbutton('disable');
			return;
		} else {
			// 承認役割メンテナンス情報を取得する
			var setting = {
				data : {"approvalRoleCd":$("#approvalRoleCd").val()},
				url : "/IDMS0634/getApprovalRoleInfo.htm",
				hasLoading : true,
				hasContentType : false,
				success : function(res) {
					// 貰ったデータを画面の項目に設定する
					$("#IDMS0634Form").form('load',res);
					// 下記の項目が編集不可にする
					// 承認役割コード
		  			$('#approvalRoleCd').textbox('disable');
				}
			};
			postAjax(setting);
		}
	}
}

//承認役割メンテナンス情報を新規登録する
function register() {
	removeValidate();
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	removeAllErrorForEasyUI("IDMS0634Form");
	// 画面の検証
	if($('#IDMS0634Form').form('validate') ==false){
		$("#p_errorMessage")[0].innerHTML = getMessage("E2088");
		return;
	}
	parent.confirmComponent.callback = function (){
		exceRegister();
	};
	var title = '承認役割登録確認';
	var message = getMessage("W1002");
	parent.confirmShow(title, message);
}

// 承認役割メンテナンス情報新規登録のコールバック関数
function exceRegister() {
	var setting = {
		data : $("#IDMS0634Form").serialize(),
		url : "/IDMS0634/register.htm",
		hasLoading : true,
		success : function(res) {
			if(!res.result) { // 実行失敗の場合
				$("#p_errorMessage")[0].innerHTML = res.errorMessage;
				// 承認役割コードの重複エラー
				if(res.errorCode == "E2084") {
					// 背景色に赤色を設定する
					$("#approvalRoleCd").nextAll().addClass("textbox-invalid");
					$("#approvalRoleCd").next().children().addClass("validatebox-invalid");
				} else if(res.errorCode == "E2085") { // 承認役割名の重複エラー
					// 背景色に赤色を設定する
					$("#approvalRoleName").nextAll().addClass("textbox-invalid");
					$("#approvalRoleName").next().children().addClass("validatebox-invalid");
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

//承認役割メンテナンス情報を更新する
function update() {
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	removeValidate();
	removeAllErrorForEasyUI("IDMS0634Form");
	// 画面の検証
	if($('#IDMS0634Form').form('validate') ==false){
		$("#p_errorMessage")[0].innerHTML = getMessage("E2088");
		return;
	}
	parent.confirmComponent.callback = function (){
		exceUpdate();
	};
	var title = '承認役割変更確認';
	var message = getMessage("W1016");
	parent.confirmShow(title, message);
}

//承認役割メンテナンス情報変更のコールバック関数
function exceUpdate() {
	// 「承認役割コード」を活性化にする
	$("#approvalRoleCd").textbox('enable');
	var setting = {
		data : $("#IDMS0634Form").serialize(),
		url : "/IDMS0634/update.htm",
		hasLoading : true,
		success : function(res) {
			if(!res.result) { // 実行失敗の場合
				$("#p_errorMessage")[0].innerHTML = res.errorMessage;
				// 承認役割コードの重複エラー
				if(res.errorCode == "E2085") { // 承認役割名の重複エラー
					// 背景色に赤色を設定する
					$("#approvalRoleName").nextAll().addClass("textbox-invalid");
					$("#approvalRoleName").next().children().addClass("validatebox-invalid");
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
	// 「承認役割コード」を非活性にする
	$("#approvalRoleCd").textbox('disable');
	postAjax(setting);
}

// 閉じる関数
function closeWin() {
	parent.closeMainDialog(null);
}