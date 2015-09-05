// 画面初期化する
$(function() {
	// 検証項目のblurイベント関数を指定する
	$('.validatebox-text').bind('blur', function() {
		$(this).validatebox('enableValidation').validatebox('validate');
	});

	// STAR業務ランクメンテナンス情報を初期化する
	initDivisionInfo();
});

//インバリッドのスタイルを削除する
function removeValidate(){
	$("#divisionName").nextAll().removeClass("textbox-invalid");
	$("#divisionName").next().children().removeClass("validatebox-invalid");
}

// STAR業務ランクメンテナンス情報を初期化する
function initDivisionInfo() {
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
		$("#divisionName").textbox("setValue",id)
		// 新規登録ボタンの表示名に「変更」を変更する
		$("#btnRegister .l-btn-text").text("変更");
		$("#btnRegister").attr("onClick","update()");
		// 親画面から渡された部店コードが存在しない場合、エラーとする
		if(!$("#divisionName").textbox("getValue") || $("#divisionName").textbox("getValue")=="null") {
			$("#p_errorMessage")[0].innerHTML = getMessage("E2090");
			$("#btnRegister").linkbutton('disable');
			return;
		} else {
			// STAR業務ランクメンテナンス情報を取得する
			var setting = {
				data : {"divisionName":$("#divisionName").val()},
				url : "/IDMS0644/getDivisionInfo.htm",
				hasLoading : true,
				hasContentType : false,
				success : function(res) {
					// 貰ったデータを画面の項目に設定する
					$("#IDMS0644Form").form('load',res);
					// 下記の項目が編集不可にする
					// 部店コード
		  			$('#divisionName').textbox('disable');
				}
			};
			postAjax(setting);
		}
	}
}

//STAR業務ランクメンテナンス情報を新規登録する
function register() {
	removeValidate();
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	removeAllErrorForEasyUI("IDMS0644Form");
	// 画面の検証
	if($('#IDMS0644Form').form('validate') ==false){
		$("#p_errorMessage")[0].innerHTML = getMessage("E2088");
		return;
	}
	parent.confirmComponent.callback = function (){
		exceRegister();
	};
	var title = '部署登録確認';
	var message = getMessage("W1002");
	parent.confirmShow(title, message);
}

// STAR業務ランクメンテナンス情報新規登録のコールバック関数
function exceRegister() {
	var setting = {
		data : $("#IDMS0644Form").serialize(),
		url : "/IDMS0644/register.htm",
		hasLoading : true,
		success : function(res) {
			if(!res.result) { // 実行失敗の場合
				$("#p_errorMessage")[0].innerHTML = res.errorMessage;
				if(res.errorCode == "E2085") { // 部署名の重複エラー
					// 背景色に赤色を設定する
					$("#divisionName").nextAll().addClass("textbox-invalid");
					$("#divisionName").next().children().addClass("validatebox-invalid");
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

//STAR業務ランクメンテナンス情報を更新する
function update() {
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	removeValidate();
	removeAllErrorForEasyUI("IDMS0644Form");
	// 画面の検証
	if($('#IDMS0644Form').form('validate') ==false){
		$("#p_errorMessage")[0].innerHTML = getMessage("E2088");
		return;
	}
	parent.confirmComponent.callback = function (){
		exceUpdate();
	};
	var title = '部署変更確認';
	var message = getMessage("W1016");
	parent.confirmShow(title, message);
}

//STAR業務ランクメンテナンス情報変更のコールバック関数
function exceUpdate() {
	// 「部署名」を活性化にする
	$("#divisionName").textbox("enable");
	var setting = {
		data : $("#IDMS0644Form").serialize(),
		url : "/IDMS0644/update.htm",
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
	// 「部署名」を非活性にする
	$("#divisionName").textbox("disable");
	postAjax(setting);
}

// 閉じる関数
function closeWin() {
	parent.closeMainDialog(null);
}