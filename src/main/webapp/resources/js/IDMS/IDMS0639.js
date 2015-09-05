// 画面初期化する
$(function() {
	// 検証項目のblurイベント関数を指定する
	$('.validatebox-text').bind('blur', function() {
		$(this).validatebox('enableValidation').validatebox('validate');
	});

	// システムメンテナンス情報を初期化する
	initSystemInfo();
});

//インバリッドのスタイルを削除する
function removeValidate(){
	$("#systemCd").nextAll().removeClass("textbox-invalid");
	$("#systemCd").next().children().removeClass("validatebox-invalid");
	$("#systemName").nextAll().removeClass("textbox-invalid");
	$("#systemName").next().children().removeClass("validatebox-invalid");
}

// システムメンテナンス情報を初期化する
function initSystemInfo() {
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
		$("#systemCd").textbox("setValue",id)
		// 新規登録ボタンの表示名に「変更」を変更する
		$("#btnRegister .l-btn-text").text("変更");
		$("#btnRegister").attr("onClick","update()");
		// 親画面から渡されたシステムコードが存在しない場合、エラーとする
		if(!$("#systemCd").textbox("getValue") || $("#systemCd").textbox("getValue")=="null") {
			$("#p_errorMessage")[0].innerHTML = getMessage("E2090");
			$("#btnRegister").linkbutton('disable');
			return;
		} else {
			// システムメンテナンス情報を取得する
			var setting = {
				data : {"systemCd":$("#systemCd").val()},
				url : "/IDMS0639/getSystemInfo.htm",
				hasLoading : true,
				hasContentType : false,
				success : function(res) {
					// 貰ったデータを画面の項目に設定する
					$("#IDMS0639Form").form('load',res);
					// 下記の項目が編集不可にする
					// システムコード
		  			$('#systemCd').textbox('disable');
					// 適用開始日
		  			$('#effectiveDate').textbox('disable');
				}
			};
			postAjax(setting);
		}
	}
}

//システムメンテナンス情報を新規登録する
function register() {
	removeValidate();
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	removeAllErrorForEasyUI("IDMS0639Form");
	// 画面の検証
	if($('#IDMS0639Form').form('validate') ==false){
		$("#p_errorMessage")[0].innerHTML = getMessage("E2088");
		return;
	}
	parent.confirmComponent.callback = function (){
		exceRegister();
	};
	var title = 'システム登録確認';
	var message = getMessage("W1002");
	parent.confirmShow(title, message);
}

// システムメンテナンス情報新規登録のコールバック関数
function exceRegister() {
	var setting = {
		data : $("#IDMS0639Form").serialize(),
		url : "/IDMS0639/register.htm",
		hasLoading : true,
		success : function(res) {
			if(!res.result) { // 実行失敗の場合
				$("#p_errorMessage")[0].innerHTML = res.errorMessage;
				// システムコードの重複エラー
				if(res.errorCode == "E2084") {
					// 背景色に赤色を設定する
					$("#systemCd").nextAll().addClass("textbox-invalid");
					$("#systemCd").next().children().addClass("validatebox-invalid");
				} else if(res.errorCode == "E2085") { // システム名の重複エラー
					// 背景色に赤色を設定する
					$("#systemName").nextAll().addClass("textbox-invalid");
					$("#systemName").next().children().addClass("validatebox-invalid");
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

//システムメンテナンス情報を更新する
function update() {
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	removeValidate();
	removeAllErrorForEasyUI("IDMS0639Form");
	// 画面の検証
	if($('#IDMS0639Form').form('validate') ==false){
		$("#p_errorMessage")[0].innerHTML = getMessage("E2088");
		return;
	}
	parent.confirmComponent.callback = function (){
		exceUpdate();
	};
	var title = 'システム変更確認';
	var message = getMessage("W1016");
	parent.confirmShow(title, message);
}

//システムメンテナンス情報変更のコールバック関数
function exceUpdate() {
	// 「システムコード」を活性化にする
	$("#systemCd").textbox('enable');
	// 「適用開始日」を活性化にする
	$('#effectiveDate').textbox('enable');
	var setting = {
		data : $("#IDMS0639Form").serialize(),
		url : "/IDMS0639/update.htm",
		hasLoading : true,
		success : function(res) {
			if(!res.result) { // 実行失敗の場合
				$("#p_errorMessage")[0].innerHTML = res.errorMessage;
				// システムコードの重複エラー
				if(res.errorCode == "E2085") { // システム名の重複エラー
					// 背景色に赤色を設定する
					$("#systemName").nextAll().addClass("textbox-invalid");
					$("#systemName").next().children().addClass("validatebox-invalid");
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
	// 「システムコード」を非活性にする
	$("#systemCd").textbox('disable');
	// 「適用開始日」を非活性にする
	$('#effectiveDate').textbox('disable');
	postAjax(setting);
}

// 閉じる関数
function closeWin() {
	parent.closeMainDialog(null);
}