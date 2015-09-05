// 画面初期化する
$(function() {
	// 検証項目のblurイベント関数を指定する
	$('.validatebox-text').bind('blur', function() {
		$(this).validatebox('enableValidation').validatebox('validate');
	});
});

//インバリッドのスタイルを削除する
function removeValidate(){
	$("#changeOfficeCd").nextAll().removeClass("textbox-invalid");
	$("#changeOfficeCd").next().children().removeClass("validatebox-invalid");
}

//初期化チェック
function checkInit() {
	removeValidate();
	// 対象者の選択チェック
	if($("#userId").val()==""){
		$("#p_errorMessage")[0].innerHTML = '&nbsp;';
		removeAllErrorForEasyUI("IDMS0321Form");
		$("#p_errorMessage")[0].innerHTML = getMessage("E1009",["対象者"]);
		return false;
	}
	// 入社予定日の空白チェック
	if($("#startDate").datebox("getValue")==""){
		$("#p_errorMessage")[0].innerHTML = '&nbsp;';
		removeAllErrorForEasyUI("IDMS0321Form");
		$("#p_errorMessage")[0].innerHTML = getMessage("E1009",["入社予定日"]);
		return false;
	}
	// 異動先組織の選択チェック
	if($("#changeOrganizationCd").val()==""){
		$("#p_errorMessage")[0].innerHTML = '&nbsp;';
		removeAllErrorForEasyUI("IDMS0321Form");
		$("#p_errorMessage")[0].innerHTML = getMessage("E1009",["異動先組織"]);
		return false;
	}
	// 異動先組織／役職が主務組織／役職と重複チィック
	if($("#changeOrganizationCd").val() == $("#organizationCd").val()
			&& $("#changeOfficeCd").combobox("getValue") == $("#officeCd").val()) {
		$("#p_errorMessage")[0].innerHTML = '&nbsp;';
		removeAllErrorForEasyUI("IDMS0321Form");
		// 異動先役職の背景色に赤色を設定する
		$("#changeOfficeCd").nextAll().addClass("textbox-invalid");
		$("#changeOfficeCd").next().children().addClass("validatebox-invalid");
		$("#p_errorMessage")[0].innerHTML = getMessage("E2047",["異動先"]);
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
	var url = "/IDMS0011/IDMS0011.htm?showProspectiveEmployeeInfo=0&userId=" + $('#userId').val()
			+ "&organizationCode=" + $('#organizationCd').val() + "&checkFlag=1" + "&authorityFlag=1&screenId=IDMS0321";
	var width = 650;
	var height = 610;
	// 対象者選択画面を呼び出す
	parent.openMainDialog(title, url, width, height);
}

//組織選択画面を呼び出す
function openOrganizationSelect() {
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	// コールバック関数を実行
	parent.getDialogObject().callback = function (data){ 
		if(data != null) {
			// 内定者組織を設定する
			$("#changeOrganizationName").textbox("setValue",data.organizationName);
			$("#changeOrganizationCd").val(data.organizationCode);
		}
	};
	var title = "組織選択";
	var url = "/IDMS0012/IDMS0012.htm?"
	+ "organizationCode=" + $("#changeOrganizationCd").val()
	+ "&organizationName=" + $("#changeOrganizationName").val();
	var width = 650;
	var height = 610;
	// 組織選択画面を呼び出す
	parent.openMainDialog(title, url, width, height);

}

//対象者情報を初期化する
function getUserInfo() {
	var setting = {
		data : {"userId":$("#userId").val()},
		url : "/IDMS0321/getUserInfo.htm",
		hasLoading : true,
		hasContentType : false,
		success : function(res) {
			// 異動役職項目を削除する
			delete res.changeOfficeCd;
			// 貰ったデータを画面の項目に設定する
			$("#IDMS0321Form").form('load',res);
		}
	};
	postAjax(setting);
}

//対象者の組織異動情報を登録する
function register() {
	// 初期化チェック
	if(!checkInit()) {
		return;
	}
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	removeAllErrorForEasyUI("IDMS0321Form");
	// 画面の検証
	if($('#IDMS0321Form').form('validate') == false){
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

//対象者の組織異動情報登録のコールバック関数
function exceRegister() {
	var setting = {
		data : $("#IDMS0321Form").serialize(),
		url : "/IDMS0321/register.htm",
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