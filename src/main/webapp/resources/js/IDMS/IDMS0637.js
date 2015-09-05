// 画面初期化する
$(function() {
	// 検証項目のblurイベント関数を指定する
	$('.validatebox-text').bind('blur', function() {
		$(this).validatebox('enableValidation').validatebox('validate');
	});

	// ドライブメンテナンス情報を初期化する
	initDriveInfo();
});

//インバリッドのスタイルを削除する
function removeValidate(){
	$("#driveCd").nextAll().removeClass("textbox-invalid");
	$("#driveCd").next().children().removeClass("validatebox-invalid");
}

//初期化チェック
function checkInit() {
	removeValidate();
	return true;
}

// ドライブメンテナンス情報を初期化する
function initDriveInfo() {
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
		$("#driveCd").val(id)
		// 新規登録ボタンの表示名に「変更」を変更する
		$("#btnRegister .l-btn-text").text("変更");
		$("#btnRegister").attr("onClick","update()");
		// ユーザ選択を非活性する
		$("#btnUserSelect").linkbutton('disable');
		// 親画面から渡されたドライブIDが存在しない場合、エラーとする
		if(!$("#driveCd").val() || $("#driveCd").val()=="null") {
			$("#p_errorMessage")[0].innerHTML = getMessage("E2090");
			$("#btnRegister").linkbutton('disable');
			return;
		} else {
			// ドライブメンテナンス情報を取得する
			var setting = {
				data : {"driveCd":$("#driveCd").val()},
				url : "/IDMS0637/getDriveInfo.htm",
				hasLoading : true,
				hasContentType : false,
				success : function(res) {
					// 貰ったデータを画面の項目に設定する
					$("#IDMS0637Form").form('load',res);
					// 下記の項目が編集不可にする
					// ドライブコード
		  			$('#driveCd').textbox('disable');
				}
			};
			postAjax(setting);
		}
	}
}

//ドライブメンテナンス情報を新規登録する
function register() {
	// 初期化チェック
	if(!checkInit()) {
		return;
	}
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	removeAllErrorForEasyUI("IDMS0637Form");
	// 画面の検証
	if($('#IDMS0637Form').form('validate') ==false){
		$("#p_errorMessage")[0].innerHTML = getMessage("E2088");
		return;
	}
	parent.confirmComponent.callback = function (){
		exceRegister();
	};
	var title = 'ドライブ登録確認';
	var message = getMessage("W1002");
	parent.confirmShow(title, message);
}

// ドライブメンテナンス情報新規登録のコールバック関数
function exceRegister() {
	var setting = {
		data : $("#IDMS0637Form").serialize(),
		url : "/IDMS0637/register.htm",
		hasLoading : true,
		success : function(res) {
			if(!res.result) { // 実行失敗の場合
				$("#p_errorMessage")[0].innerHTML = res.errorMessage;
				// ドライブコードの重複エラー
				if(res.errorCode == "E2084") {
					// 背景色に赤色を設定する
					$("#driveCd").nextAll().addClass("textbox-invalid");
					$("#driveCd").next().children().addClass("validatebox-invalid");
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

//ドライブメンテナンス情報を更新する
function update() {
	// 初期化チェック
	if(!checkInit()) {
		return;
	}
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	removeAllErrorForEasyUI("IDMS0637Form");
	// 画面の検証
	if($('#IDMS0637Form').form('validate') ==false){
		$("#p_errorMessage")[0].innerHTML = getMessage("E2088");
		return;
	}
	parent.confirmComponent.callback = function (){
		exceUpdate();
	};
	var title = 'ドライブ変更確認';
	var message = getMessage("W1016");
	parent.confirmShow(title, message);
}

//ドライブメンテナンス情報変更のコールバック関数
function exceUpdate() {
	// 「ドライブコード」を活性化にする
	$('#driveCd').textbox('enable');
	var setting = {
		data : $("#IDMS0637Form").serialize(),
		url : "/IDMS0637/update.htm",
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
	// 「ドライブコード」を非活性にする
	$('#driveCd').textbox('disable');
	postAjax(setting);
}

// 閉じる関数
function closeWin() {
	parent.closeMainDialog(null);
}