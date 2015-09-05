// 画面初期化する
$(function() {
	// 検証項目のblurイベント関数を指定する
	$('.validatebox-text').bind('blur', function() {
		$(this).validatebox('enableValidation').validatebox('validate');
	});
});

//初期化チェック
function checkInit() {
	// 対象者の選択チェック
	if($("#userId").val()==""){
		$("#p_errorMessage")[0].innerHTML = '&nbsp;';
		removeAllErrorForEasyUI("IDMS0351Form");
		$("#p_errorMessage")[0].innerHTML = getMessage("E1009",["対象者"]);
		return false;
	}
	// 氏名を分ける
	var userName = $("#userName").val().split(" ");
	var lastName = userName[0];
	var fristName = userName[1];
	// 氏名カナを分ける
	var userNameKana = $("#userNameKana").val().split(" ");
	var lastNameKana = userNameKana[0];
	var fristNameKana = userNameKana[1];
	
	// 氏名重複のチェック(姓と名と姓カナと名カナが一つ変わればok)
	if(!($("#changeLastName").val() !=lastName || $("#changeFirstName").val() !=fristName
			|| $("#changeLastNameKana").val() !=lastNameKana || $("#changeFirstNameKana").val() !=fristNameKana)) {
		$("#p_errorMessage")[0].innerHTML = '&nbsp;';
		removeAllErrorForEasyUI("IDMS0351Form");
		$("#p_errorMessage")[0].innerHTML = getMessage("E2089",["氏名"]);
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
			+ "&organizationCode=" + $('#organizationCd').val() + "&checkFlag=1" + "&authorityFlag=1&screenId=IDMS0351";
	var width = 650;
	var height = 610;
	// 対象者選択画面を呼び出す
	parent.openMainDialog(title, url, width, height);
}

//対象者情報を初期化する
function getUserInfo() {
	var setting = {
		data : {"userId":$("#userId").val()},
		url : "/IDMS0351/getUserInfo.htm",
		hasLoading : true,
		hasContentType : false,
		success : function(res) {
			// 氏名変更日項目を削除する
			delete res.startDate;
			// 変更後の氏名変更項目を削除する
			delete res.changeLastName;
			delete res.changeFirstName;
			delete res.changeLastNameKana;
			delete res.changeFirstNameKana;
			// 貰ったデータを画面の項目に設定する
			$("#IDMS0351Form").form('load',res);
		}
	};
	postAjax(setting);
}

//対象者の氏名変更を登録する
function register() {
	// 初期化チェック
	if(!checkInit()) {
		return;
	}
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	removeAllErrorForEasyUI("IDMS0351Form");
	// 画面の検証
	if($('#IDMS0351Form').form('validate') == false){
		$("#p_errorMessage")[0].innerHTML = getMessage("E2088");
		return;
	}
	parent.confirmComponent.callback = function (){
		exceRegister();
	};
	var title = '登録確認';
	var message = getMessage("W1002");
	parent.confirmShow(title, message);
}

//対象者の氏名変更のコールバック関数
function exceRegister() {
	var setting = {
		data : $("#IDMS0351Form").serialize(),
		url : "/IDMS0351/register.htm",
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