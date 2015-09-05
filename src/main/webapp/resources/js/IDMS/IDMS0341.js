// 画面初期化する
$(function() {
	// 検証項目のblurイベント関数を指定する
	$('.validatebox-text').bind('blur', function() {
		$(this).validatebox('enableValidation').validatebox('validate');
	});
});

//インバリッドのスタイルを削除する
function removeValidate(){
	$("#changeContractCd").nextAll().removeClass("textbox-invalid");
	$("#changeContractCd").next().children().removeClass("validatebox-invalid");
}

//初期化チェック
function checkInit() {
	removeValidate();
	// 対象者の選択チェック
	if($("#userId").val()==""){
		$("#p_errorMessage")[0].innerHTML = '&nbsp;';
		removeAllErrorForEasyUI("IDMS0341Form");
		$("#p_errorMessage")[0].innerHTML = getMessage("E1009",["対象者"]);
		return false;
	}
	// 契約形態の重複チィック
	if($("#changeContractCd").combobox("getValue") == $("#contractCd").val()) {
		$("#p_errorMessage")[0].innerHTML = '&nbsp;';
		removeAllErrorForEasyUI("IDMS0341Form");
		// 変更後の契約形態の背景色に赤色を設定する
		$("#changeContractCd").nextAll().addClass("textbox-invalid");
		$("#changeContractCd").next().children().addClass("validatebox-invalid");
		$("#p_errorMessage")[0].innerHTML = getMessage("E2089",["契約形態"]);
		return false;
	}
	return true;
}

// 対象者選択画面を呼び出す
function openUserSelect() {
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	// コールバック関数を実行
	parent.getDialogObject().callback = function (data){
		if(data != null) {
			// ユーザＩＤを設定する
			$("#userId").val(data.endUserId[0]);
			// 対象者情報を取得するする
			getUserInfo();
		}
	};
	var title = "対象者選択";
	var url = "/IDMS0011/IDMS0011.htm?showProspectiveEmployeeInfo=0&"+ "userId=" + $('#userId').val()
			+ "&organizationCode=" + $('#organizationCd').val() + "&checkFlag=1" + "&authorityFlag=1&screenId=IDMS0341";
	var width = 650;
	var height = 610;
	// 対象者選択画面を呼び出す
	parent.openMainDialog(title, url, width, height);
}

//対象者情報を初期化する
function getUserInfo() {
	var setting = {
		data : {"userId":$("#userId").val()},
		url : "/IDMS0341/getUserInfo.htm",
		hasLoading : true,
		hasContentType : false,
		success : function(res) {
			// 契約形態変更日項目を削除する
			delete res.startDate;
			// 変更後の契約形態項目を削除する
			delete res.changeContractCd;
			// 変更後の社員番号項目を削除する
			delete res.changeEmployeeNo;
			// 貰ったデータを画面の項目に設定する
			$("#IDMS0341Form").form('load',res);
		}
	};
	postAjax(setting);
}

//対象者の契約形態変更を登録する
function register() {
	// 初期化チェック
	if(!checkInit()) {
		return;
	}
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	removeAllErrorForEasyUI("IDMS0341Form");
	// 画面の検証
	if($('#IDMS0341Form').form('validate') == false){
		$("#p_errorMessage")[0].innerHTML = getMessage("E2088");
		return;
	}
	parent.confirmComponent.callback = function (){
		exceRegister();
	};
	var title = '登録確認';
	var message =  getMessage("W1002");
	parent.confirmShow(title, message);
}

//対象者の契約形態変更のコールバック関数
function exceRegister() {
	var setting = {
		data : $("#IDMS0341Form").serialize(),
		url : "/IDMS0341/register.htm",
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
			}
		}
	};
	postAjax(setting);
}

//「変更後の契約形態	」の選択事件
function selectContractCd(data) {
	// 委託業者の場合
	if(data.contractCd == "06") {
		// 変更後の「社員番号」を空白にする
		$("#changeEmployeeNo").textbox("setValue","");
		// 変更後の「社員番号」を無効にする
		$("#changeEmployeeNo").textbox("disable");
		$("#changeEmployeeNo").textbox({required:false});
	}else { // 以外の場合
		// 変更後の「社員番号」を有効にする
		$("#changeEmployeeNo").textbox("enable");
		$("#changeEmployeeNo").textbox({required:true});
	}
}