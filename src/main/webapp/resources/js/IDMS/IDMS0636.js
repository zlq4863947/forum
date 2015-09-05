// 画面初期化する
$(function() {
	// 検証項目のblurイベント関数を指定する
	$('.validatebox-text').bind('blur', function() {
		$(this).validatebox('enableValidation').validatebox('validate');
	});

	// メールアドレスメンテナンス情報を初期化する
	initUserMailAddressInfo();
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

//対象者情報を初期化する
function getUserInfo() {
	var setting = {
		data : {"userId":$("#userId").val()},
		url : "/COMMON/getLoginAuthority.htm",
		hasLoading : true,
		hasContentType : false,
		success : function(res) {
			// 貰ったデータを画面の項目に設定する
			$("#IDMS0636Form").form('load',res);
		}
	};
	postAjax(setting);
}

//初期化チェック
function checkInit() {
	// 対象者の選択チェック
	if($("#userId").val()==""){
		$("#p_errorMessage")[0].innerHTML = '&nbsp;';
		removeAllErrorForEasyUI("IDMS0636Form");
		$("#p_errorMessage")[0].innerHTML = getMessage("E1009",["ユーザ"]);
		return false;
	}
	return true;
}

// メールアドレスメンテナンス情報を初期化する
function initUserMailAddressInfo() {
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
		$("#mailAddressId").val(id)
		// 新規登録ボタンの表示名に「変更」を変更する
		$("#btnRegister .l-btn-text").text("変更");
		$("#btnRegister").attr("onClick","update()");
		// ユーザ選択を非活性する
		$("#btnUserSelect").linkbutton('disable');
		// 親画面から渡されたメールアドレスIDが存在しない場合、エラーとする
		if(!$("#mailAddressId").val() || $("#mailAddressId").val()=="null") {
			$("#p_errorMessage")[0].innerHTML = getMessage("E2090");
			$("#btnRegister").linkbutton('disable');
			return;
		} else {
			// メールアドレスメンテナンス情報を取得する
			var setting = {
				data : {"mailAddressId":$("#mailAddressId").val()},
				url : "/IDMS0636/getMailAddressInfo.htm",
				hasLoading : true,
				hasContentType : false,
				success : function(res) {
					// 貰ったデータを画面の項目に設定する
					$("#IDMS0636Form").form('load',res);
				}
			};
			postAjax(setting);
		}
	}
}

//メールアドレスメンテナンス情報を新規登録する
function register() {
	// 初期化チェック
	if(!checkInit()) {
		return;
	}
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	removeAllErrorForEasyUI("IDMS0636Form");
	// 画面の検証
	if($('#IDMS0636Form').form('validate') ==false){
		$("#p_errorMessage")[0].innerHTML = getMessage("E2088");
		return;
	}
	parent.confirmComponent.callback = function (){
		exceRegister();
	};
	var title = 'メールアドレス登録確認';
	var message = getMessage("W1002");
	parent.confirmShow(title, message);
}

// メールアドレスメンテナンス情報新規登録のコールバック関数
function exceRegister() {
	$("#mailAddressId").attr("disabled","disabled");
	var setting = {
		data : $("#IDMS0636Form").serialize(),
		url : "/IDMS0636/register.htm",
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
	$("#mailAddressId").removeAttr("disabled");
	postAjax(setting);
}

//メールアドレスメンテナンス情報を更新する
function update() {
	// 初期化チェック
	if(!checkInit()) {
		return;
	}
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	removeAllErrorForEasyUI("IDMS0636Form");
	// 画面の検証
	if($('#IDMS0636Form').form('validate') ==false){
		$("#p_errorMessage")[0].innerHTML = getMessage("E2088");
		return;
	}
	parent.confirmComponent.callback = function (){
		exceUpdate();
	};
	var title = 'メールアドレス変更確認';
	var message = getMessage("W1016");
	parent.confirmShow(title, message);
}

//メールアドレスメンテナンス情報変更のコールバック関数
function exceUpdate() {
	var setting = {
		data : $("#IDMS0636Form").serialize(),
		url : "/IDMS0636/update.htm",
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
	postAjax(setting);
}

// 閉じる関数
function closeWin() {
	parent.closeMainDialog(null);
}