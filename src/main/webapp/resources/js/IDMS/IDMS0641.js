// 画面初期化する
$(function() {
	// 検証項目のblurイベント関数を指定する
	$('.validatebox-text').bind('blur', function() {
		$(this).validatebox('enableValidation').validatebox('validate');
	});

	// 登録完了通知メンテナンス情報を初期化する
	initRegisterCompletionNotice();
});

//対象者選択画面を呼び出す
function openUserSelect() {
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	// コールバック関数を実行
	parent.getDialogObject().callback = function (data){
		if(data != null) {
			// ユーザＩＤを設定する
			$("#userId").val(data.endUserId[0]);
			// 組織コードを設定する
			$("#organizationCd").val(data.organizationCode[0]);
			// 対象者情報を取得する
			getUserInfo();
			// メールを初期化する
			initMailAddress();
		}
	};
	var title = "対象者選択";
	var url = "/IDMS0011/IDMS0011.htm?showProspectiveEmployeeInfo=0&"+ "userId=" + $('#userId').val()
			+ "&checkFlag=1" + "&organizationCode=" + $("#organizationCd").val();
	var width = 650;
	var height = 610;
	// 対象者選択画面を呼び出す
	parent.openMainDialog(title, url, width, height);
}

// メールを初期化する
function initMailAddress() {
	// メールアドレスを活性化にする
	$("#mailAddressId").combobox("enable");
	// メールアドレスを初期化する
	$("#mailAddressId").combobox("clear");
	// メールアドレスをリロードする
	$("#mailAddressId").combobox("reload",CONTEXT_PATH+"/COMMON/getMailListByUserId.htm?userId="+$("#userId").val());
}

//対象者情報を初期化する
function getUserInfo() {
	var setting = {
		data : {"userId":$("#userId").val()},
		url : "/COMMON/getLoginAuthority.htm",
		hasLoading : true,
		hasContentType : false,
		success : function(res) {
			// 貰ったデータを画面の項目に設定する
			$("#IDMS0641Form").form('load',res);
			// メールを初期化する
			initMailAddress();
		}
	};
	postAjax(setting);
}

//初期化チェック
function checkInit() {
	// 対象者の選択チェック
	if($("#userId").val()==""){
		$("#p_errorMessage")[0].innerHTML = '&nbsp;';
		removeAllErrorForEasyUI("IDMS0641Form");
		$("#p_errorMessage")[0].innerHTML = getMessage("E1009",["ユーザ"]);
		return false;
	}
	// メールアドレスの選択チェック
	if($("#mailAddressId").combobox("getValue")==""){
		$("#p_errorMessage")[0].innerHTML = '&nbsp;';
		removeAllErrorForEasyUI("IDMS0641Form");
		$("#p_errorMessage")[0].innerHTML = getMessage("E1009",["メールアドレス"]);
		return false;
	}
	return true;
}

// 登録完了通知メンテナンス情報を初期化する
function initRegisterCompletionNotice() {
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
		$("#mailAddressId").textbox("setValue",callData.mailaddressId);
		// 「システムコード」を非活性にする
		$("#systemCd").textbox("disable");
		// 新規登録ボタンの表示名に「変更」を変更する
		$("#btnRegister .l-btn-text").text("変更");
		$("#btnRegister").attr("onClick","update()");
		// 登録完了通知メンテナンス情報を取得する
		var setting = {
			data : {"systemCd":$("#systemCd").val(),"mailAddressId":$("#mailAddressId").val()},
			url : "/IDMS0641/getRegisterCompletionNotice.htm",
			hasLoading : true,
			hasContentType : false,
			success : function(res) {
				var oldMailAddressId = res.mailAddressId;
				// メールアドレスIDを削除する
				delete res.mailAddressId;
				// 貰ったデータを画面の項目に設定する
				$("#IDMS0641Form").form('load',res);
				$("#oldMailAddressId").val(oldMailAddressId);
				// メールを初期化する
				initMailAddress();
				$("#mailAddressId").combobox("setValue",$("#oldMailAddressId").val());
			}
		};
		postAjax(setting);
	}
}

//登録完了通知メンテナンス情報を新規登録する
function register() {
	// 初期化チェック
	if(!checkInit()) {
		return;
	}
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	removeAllErrorForEasyUI("IDMS0641Form");
	// 画面の検証
	if($('#IDMS0641Form').form('validate') ==false){
		$("#p_errorMessage")[0].innerHTML = getMessage("E2088");
		return;
	}
	parent.confirmComponent.callback = function (){
		exceRegister();
	};
	var title = '登録完了通知登録確認';
	var message = getMessage("W1002");
	parent.confirmShow(title, message);
}

// 登録完了通知メンテナンス情報新規登録のコールバック関数
function exceRegister() {
	var setting = {
		data : $("#IDMS0641Form").serialize(),
		url : "/IDMS0641/register.htm",
		hasLoading : true,
		success : function(res) {
			if(!res.result) { // 実行失敗の場合
				$("#p_errorMessage")[0].innerHTML = res.errorMessage;
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

//登録完了通知メンテナンス情報を更新する
function update() {
	// 初期化チェック
	if(!checkInit()) {
		return;
	}
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	removeAllErrorForEasyUI("IDMS0641Form");
	// 画面の検証
	if($('#IDMS0641Form').form('validate') ==false){
		$("#p_errorMessage")[0].innerHTML = getMessage("E2088");
		return;
	}
	// メールＩＤが変わらない場合
	if($("#oldMailAddressId").val()==$("#mailAddressId").combobox("getValue")){
		removeAllErrorForEasyUI("IDMS0641Form");
		$("#p_errorMessage")[0].innerHTML = getMessage("E2094");
		return;
	}
	parent.confirmComponent.callback = function (){
		exceUpdate();
	};
	var title = '登録完了通知変更確認';
	var message = getMessage("W1016");
	parent.confirmShow(title, message);
}

//登録完了通知メンテナンス情報変更のコールバック関数
function exceUpdate() {
	// 「システムコード」を活性化にする
	$("#systemCd").textbox("enable");
	var setting = {
		data : $("#IDMS0641Form").serialize(),
		url : "/IDMS0641/update.htm",
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
	// 「システムコード」を非活性にする
	$("#systemCd").textbox("disable");
	postAjax(setting);
}

// 閉じる関数
function closeWin() {
	parent.closeMainDialog(null);
}