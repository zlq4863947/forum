// 組織選択画面を呼び出す
function openDialog() {
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	// コールバック関数を実行
	parent.getDialogObject().callback = function (data) {
		if(data != null) {
			$("#parentOrganizationName").textbox("setValue",data.organizationName);
			$("#parentOrganizationCd").val(data.organizationCode);
			$("#parentOrganizationRank").textbox("setValue",data.organizationRank);
			// 組織フル名称の設定
			if(data.organizationName) {
				$("#organizationFullName").textbox("setValue",data.organizationName+"/"+$("#organizationName").textbox("getValue"));
			} else {
				$("#organizationFullName").textbox("setValue",$("#organizationName").textbox("getValue"));
			}
		}
	};
	var title = "組織選択";
	var url = "/IDMS0012/IDMS0012.htm" + "?"
			+ "organizationCode=" + $("#parentOrganizationCd").val()
			+ "&organizationName=" + $("#parentOrganizationName").val();
	var width = 650;
	var height = 610;
	// 組織選択画面を呼び出す
	parent.openMainDialog(title, url, width, height);
}

// 画面初期化する
$(function() {
	// 検証項目のblurイベント関数を指定する
	$('.validatebox-text').bind('blur', function() {
		$(this).validatebox('enableValidation').validatebox('validate');
	});

	// 組織メンテナンス情報を初期化する
	initOrganizationInfo();
});

// 組織名の変更事件
function changeOrgName(data) {
	var parentOrganizationName = $("#parentOrganizationName").textbox("getValue");
	// 組織フル名称の設定
	if(parentOrganizationName) {
		$("#organizationFullName").textbox("setValue",parentOrganizationName+"/"+data);
	} else {
		$("#organizationFullName").textbox("setValue",data);
	}
}

//インバリッドのスタイルを削除する
function removeValidate() {
	$("#organizationCd").nextAll().removeClass("textbox-invalid");
	$("#organizationCd").next().children().removeClass("validatebox-invalid");
	$("#organizationName").nextAll().removeClass("textbox-invalid");
	$("#organizationName").next().children().removeClass("validatebox-invalid");
	$("#organizationRank").nextAll().removeClass("textbox-invalid");
	$("#organizationRank").next().children().removeClass("validatebox-invalid");
}

// 組織メンテナンス情報を初期化する
function initOrganizationInfo() {
	var id = getCallInfo();
	//新規の場合
	if(!id || id=="null") {
		$("#btnRegister").linkbutton("enable");
		$("#createUserName").textbox("setValue",$("#loginUserName").val());
		$("#updateUserName").textbox("setValue",$("#loginUserName").val());
		// 新規登録ボタンの表示名に「新規登録」を設定する
		$("#btnRegister .l-btn-text").text("新規登録");
		$("#btnRegister").attr("onClick","register()");
	} else {//編集の場合数値
		$("#organizationCd").textbox("setValue",id)
		// 新規登録ボタンの表示名に「変更」を変更する
		$("#btnRegister .l-btn-text").text("変更");
		$("#btnRegister").attr("onClick","update()");
		// 親画面から渡された組織コードが存在しない場合、エラーとする
		if(!$("#organizationCd").textbox("getValue") || $("#organizationCd").textbox("getValue")=="null") {
			$("#p_errorMessage")[0].innerHTML = getMessage("E2090");
			$("#btnRegister").linkbutton("disable");
			return;
		} else {
			$("#btnRegister").linkbutton("disable");
			// 組織メンテナンス情報を取得する
			var setting = {
				data : {"organizationCd":$("#organizationCd").val()},
				url : "/IDMS0631/getOrganizationInfo.htm",
				hasLoading : true,
				hasContentType : false,
				success : function(res) {
					if(res.organizationCd != null) {
						$("#btnRegister").linkbutton("enable");
						// 貰ったデータを画面の項目に設定する
						$("#IDMS0631Form").form('load',res);
						// 下記の項目が編集不可にする
						// 組織コード
			  			$('#organizationCd').textbox('disable');
						// 適用開始日
			  			$('#effectiveDate').datebox('disable');
						//上位組織の組織選択ボタン
			  			$('#btnSelectOrganization').linkbutton('disable');
					}
				}
			};
			postAjax(setting);
		}
	}
}

function isEmpty(v) {
	return typeof v == 'undefined' || v == null || v.length == 0;
}

//初期化チェック
function checkInit() {
	removeValidate();
	// 組織の入力チェック
	if($("#parentOrganizationCd").val()==""){
		$("#p_errorMessage")[0].innerHTML = '&nbsp;';
		removeAllErrorForEasyUI("IDMS0631Form");
		$("#p_errorMessage")[0].innerHTML = getMessage("E1009",["上位組織"]);
		return false;
	}
	
	// 組織ランクチェック
	// 登録組織の組織ランクが、親組織の組織ランクよりも小さい場合エラーとする
	var orgRank = $("#organizationRank").textbox("getValue");
	var parentOrgRank = $("#parentOrganizationRank").textbox("getValue");
	
	try {
		if(!isEmpty(orgRank) && !isEmpty(parentOrgRank) && parseInt(orgRank) < parseInt(parentOrgRank)) {
			$("#p_errorMessage")[0].innerHTML = '&nbsp;';
			removeAllErrorForEasyUI("IDMS0631Form");
			// 背景色に赤色を設定する
			$("#organizationRank").nextAll().addClass("textbox-invalid");
			$("#organizationRank").next().children().addClass("validatebox-invalid");
			$("#p_errorMessage")[0].innerHTML = getMessage("E2091",["登録組織の組織ランク","親組織の組織ランク"]);
			return false;
		}
	} catch (e) {
		jQuery.messager.alert(' ', e);
		return false;
	}

	return true;
}

//組織メンテナンス情報を新規登録する
function register() {
	// 初期化チェック
	if(!checkInit()) {
		return;
	}
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	removeAllErrorForEasyUI("IDMS0631Form");
	// 画面の検証
	if($('#IDMS0631Form').form('validate') ==false){
		$("#p_errorMessage")[0].innerHTML = getMessage("E2088");
		return;
	}
	parent.confirmComponent.callback = function (){
		exceRegister();
	};
	var title = '組織登録確認';
	var message = getMessage("W1002");
	parent.confirmShow(title, message);
}

// 組織メンテナンス情報新規登録のコールバック関数
function exceRegister() {
	var setting = {
		data : $("#IDMS0631Form").serialize(),
		url : "/IDMS0631/register.htm",
		hasLoading : true,
		success : function(res) {
			if(!res.result) { // 実行失敗の場合
				$("#p_errorMessage")[0].innerHTML = res.errorMessage;
				// 組織コードの重複エラー
				if(res.errorCode == "E2081") {
					// 背景色に赤色を設定する
					$("#organizationCd").nextAll().addClass("textbox-invalid");
					$("#organizationCd").next().children().addClass("validatebox-invalid");
				} else if(res.errorCode == "E2082") { // 親組織の直下に組織名の重複エラー
					// 背景色に赤色を設定する
					$("#organizationName").nextAll().addClass("textbox-invalid");
					$("#organizationName").next().children().addClass("validatebox-invalid");
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

//組織メンテナンス情報を更新する
function update() {
	// 初期化チェック
	if(!checkInit()) {
		return;
	}
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	removeAllErrorForEasyUI("IDMS0631Form");
	// 画面の検証
	if($('#IDMS0631Form').form('validate') ==false){
		$("#p_errorMessage")[0].innerHTML = getMessage("E2088");
		return;
	}
	parent.confirmComponent.callback = function (){
		exceUpdate();
	};
	var title = '組織変更確認';
	var message = getMessage("W1016");
	parent.confirmShow(title, message);
}

//組織メンテナンス情報変更のコールバック関数
function exceUpdate() {
	// 「適用開始日」を活性化にする
	$('#effectiveDate').datebox('enable');
	// 「組織コード」を活性化にする
	$("#organizationCd").textbox('enable');
	var setting = {
		data : $("#IDMS0631Form").serialize(),
		url : "/IDMS0631/update.htm",
		hasLoading : true,
		success : function(res) {
			if(!res.result) { // 実行失敗の場合
				$("#p_errorMessage")[0].innerHTML = res.errorMessage;
				// 組織コードの重複エラー
				if(res.errorCode == "E2082") { // 親組織の直下に組織名の重複エラー
					// 背景色に赤色を設定する
					$("#organizationName").nextAll().addClass("textbox-invalid");
					$("#organizationName").next().children().addClass("validatebox-invalid");
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
	// 「適用開始日」を非活性にする
	$('#effectiveDate').datebox('disable');
	// 「組織コード」を非活性にする
	$("#organizationCd").textbox('disable');
	postAjax(setting);
}

// 閉じる関数
function closeWin() {
	parent.closeMainDialog(null);
}