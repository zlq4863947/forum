// 総務担当特権
var managementHold=false;
// 人事担当特権
var personnelHold=false;
// 営業企画担当
var marketSurveillanceHold=false;
// 非委托業者の元社員番号
var nonCommissionedEmployeeNo="";
// 画面初期化する
$(function() {
	// 検証項目のblurイベント関数を指定する
	$('.validatebox-text').bind('blur', function() {
		$(this).validatebox('enableValidation').validatebox('validate');
	});
	// 内定者情報を初期化する
	initUserInfo();
});

// インバリッドのスタイルを削除する
function removeValidate(){
	$("#userAlias").nextAll().removeClass("textbox-invalid");
	$("#userAlias").next().children().removeClass("validatebox-invalid");
	$("#employeeNo").nextAll().removeClass("textbox-invalid");
	$("#employeeNo").next().children().removeClass("validatebox-invalid");
}

// 初期化チェック
function checkInit() {
	removeValidate();
	// 入社予定日が空白の場合
	if($("#scheduledEntryCompanyDate").datebox("getText")=="") {
		// 入社予定日に空白を修正する
		$("#scheduledEntryCompanyDate").datebox("setValue","");
	}
	// 組織の入力チェック
	if($("#organizationCd").val()==""){
		$("#p_errorMessage")[0].innerHTML = '&nbsp;';
		removeAllErrorForEasyUI("IDMS0311Form");
		$("#p_errorMessage")[0].innerHTML = getMessage("E1009",["組織"]);
		return false;
	}
	return true;
}

// 「メールボックスの作成」の変更事件
function changeMailboxCreateFlag() {
	// 「メールボックスの作成」を選択する場合
	if($("#mailboxCreateFlag").prop('checked')) {
		// 総務担当或いは営業企画担当の場合
		if(managementHold || marketSurveillanceHold) {
			// 「メールボックスの作成先」リストを有効にする
			$("#mailboxCreateServer").combobox("enable");
		}
		//「ADユーザの作成」を選択する
		$("#adCreateFlag").prop("checked", true);
	} else {
		// 総務担当或いは営業企画担当の場合
		if(managementHold || marketSurveillanceHold) {
			// 「メールボックスの作成先」リストを空白にする
			$("#mailboxCreateServer").combobox("setValue","");
			// 「メールボックスの作成先」リストを無効にする
			$("#mailboxCreateServer").combobox("disable");
		}
		//「ADユーザの作成」を選択しない
		$("#adCreateFlag").prop("checked", false);
	}
	changeAdCreateFlag();
}

//「ADユーザの作成」の変更事件
function changeAdCreateFlag() {	
	// 「ADユーザの作成」を選択する場合
	if($("#adCreateFlag").prop('checked')) {
		// 総務担当或いは営業企画担当の場合
		if(managementHold || marketSurveillanceHold) {
			// 「ADユーザの作成先」リストを有効にする
			$("#adCreateServer").combobox("enable");
		}
	} else {
		// 総務担当或いは営業企画担当の場合
		if(managementHold || marketSurveillanceHold) {
			// 「ADユーザの作成先」リストを空白にする
			$("#adCreateServer").combobox("setValue","");
			// 「ADユーザの作成先」リストを無効にする
			$("#adCreateServer").combobox("disable");
		}
	}
}

//「契約形態」の選択事件
function selectContractCd(data) {
	// 委託業者の場合
	if(data.contractCd == "06") {
		// 元社員番号を保存する
		nonCommissionedEmployeeNo = $("#employeeNo").textbox("getValue");
		// 「社員番号」を空白にする
		$("#employeeNo").textbox("setValue","");
		// 「社員番号」を無効にする
		$("#employeeNo").textbox("disable");
	}else { // 以外の場合
		// 元社員番号を復する
		$("#employeeNo").textbox("setValue",nonCommissionedEmployeeNo);
		// 総務担当特権或いは人事担当特権を持つ場合
		if(managementHold || personnelHold) {
			// 「社員番号」を有効にする
			$("#employeeNo").textbox("enable");
		}
	}
}

// 組織選択画面を呼び出す
function openDialog() {
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	// コールバック関数を実行
	parent.getDialogObject().callback = function (data){
		if(data != null) {
			// 内定者組織を設定する
			$("#organizationName").textbox("setValue",data.organizationName);
			$("#organizationCd").val(data.organizationCode);
		}
	};
	var title = "組織選択";
	var url = "/IDMS0012/IDMS0012.htm" + "?"
			+ "organizationCode=" + $("#organizationCd").val()
			+ "&organizationName=" + $("#organizationName").val();
	var width = 650;
	var height = 610;
	// 組織選択画面を呼び出す
	parent.openMainDialog(title, url, width, height);

}

// 内定者情報を初期化する
function initUserInfo() {
	// 一覧画面からのユーザＩＤを設定する
	var idms0312Data = getUserListInfo();
	// 一覧選択したユーザIDを保存する
	$("#userId").val(idms0312Data.userId);
	// 選択者情報と登録者情報を取得する
	var setting = {
		data : {"userId":$("#userId").val()},
		url : "/IDMS0311/initUserInfo.htm",
		hasLoading : true,
		hasContentType : false,
		success : function(res) {
			// 画面の項目を初期化する
			initPageItems(res,idms0312Data.model);
		}
	};
	postAjax(setting);
}

// 画面の項目を初期化する
function initPageItems(data,idms0312Model) {
	// 内定者新規の場合
	if(!$("#userId").val() || $("#userId").val()=="null") {
		// 組織を設定する
		$("#organizationCd").val(data.organizationCd);
		$("#organizationName").textbox("setValue",data.organizationName);
		// 削除ボタンを非表示にする
		$("#btnRemove").hide();
		// 登録ボタンの表示名に「登録」を設定する
		$("#btnRegister .l-btn-text").text("登録");
		$("#btnRegister").attr("onClick","register()");
		// 「メールボックスの作成先」リストを無効にする
		$("#mailboxCreateServer").combobox("disable");
		// 「ADユーザの作成先」リストを無効にする
		$("#adCreateServer").combobox("disable");
		
		// 共通メニューから表示された場合、戻るボタンを非表示する
		if(idms0312Model != "new") {
			$("#btnBack").hide();
		}
	} else {
		// 貰ったデータを画面の項目に設定する
		$("#IDMS0311Form").form('load',data);
		if(idms0312Model == "edit") { // 編集の場合
			// 削除ボタンを表示にする
			$("#btnRemove").show();
			// 登録ボタンの表示名に「修正」を変更する
			$("#btnRegister .l-btn-text").text("修正");
			$("#btnRegister").attr("onClick","update()");
			// 「メールボックスの作成」が選択されない場合
			if(data.mailboxCreateFlag != "1") {
				// 「メールボックスの作成先」リストを無効にする
				$("#mailboxCreateServer").combobox("disable");
			}
			// 「ADユーザの作成」が選択されない場合
			if(data.adCreateFlag != "1") {
				// 「ADユーザの作成先」リストを無効にする
				$("#adCreateServer").combobox("disable");
			}
			// 委託業者の場合
	  		if(data.contractCd=='06') {
	  			// 「社員番号」を空白にする
	  			$("#employeeNo").textbox("setValue","");
	  			// 「社員番号」を無効にする
	  			$('#employeeNo').textbox('disable');
	  		}
		}else if(idms0312Model == "view") { // 見るだけの場合
			// 画面項目を読み出し専用にする
			$("#IDMS0311Form :input").attr("disabled", "disabled");
			$("#IDMS0311Form .easyui-combobox").combobox("disable");
			$("#btnSelectOrganization").linkbutton("disable");
			$("#scheduledEntryCompanyDate").datebox("disable");
			// 登録ボタンを非表示にする
			$("#btnRegister").hide();
			// 削除ボタンを非表示にする
			$("#btnRemove").hide();
		}
	}
	// 総務担当
	managementHold = data.managementHold;
	// 人事担当
	personnelHold = data.personnelHold;
	// 営業企画担当
	marketSurveillanceHold = data.marketSurveillanceHold;
	// 総務担当ではない且つ営業企画担当ではない場合
	if(!managementHold && !marketSurveillanceHold) {
		// 人事担当ではない場合
		if(!personnelHold) {
			// 社員番号を非活性にする
			$("#employeeNo").textbox('disable');
		}
		// エイリアスを非活性にする
		$("#userAlias").textbox('disable');
		// ＡＤユーザの作成を非活性にする
		$("#adCreateFlag").attr("disabled", "disabled");
		// ＡＤユーザの作成先を非活性にする
		$("#adCreateServer").textbox('disable');
		// メールボックスの作成を非活性にする
		//$("#mailboxCreateFlag").attr("disabled", "disabled");
		// メールボックスの作成先を非活性にする
		$("#mailboxCreateServer").textbox('disable');
	}

	// 「ADユーザの作成」を非活性にする
	$("#adCreateFlag").attr("disabled", "disabled");
}

// 内定者情報を登録する
function register() {
	// 初期化チェック
	if(!checkInit()) {
		return;
	}
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	removeAllErrorForEasyUI("IDMS0311Form");
	// 画面の検証
	if($('#IDMS0311Form').form('validate') ==false){
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

// 内定者情報登録のコールバック関数
function exceRegister() {
	// 「ADユーザの作成」を活性にする
	$("#adCreateFlag").removeAttr("disabled");
	var setting = {
		data : $("#IDMS0311Form").serialize(),
		url : "/IDMS0311/register.htm",
		hasLoading : true,
		success : function(res) {
			if(!res.result) { // 実行失敗の場合
				$("#p_errorMessage")[0].innerHTML = res.errorMessage;
				// エイリアスの重複エラー
				if(res.errorCode == "E2037") {
					// 背景色に赤色を設定する
					$("#userAlias").nextAll().addClass("textbox-invalid");
					$("#userAlias").next().children().addClass("validatebox-invalid");
				} else if(res.errorCode == "E2038") { // 社員番号の重複エラー
					// 背景色に赤色を設定する
					$("#employeeNo").nextAll().addClass("textbox-invalid");
					$("#employeeNo").next().children().addClass("validatebox-invalid");
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
			}
		}
	};
	// 「ADユーザの作成」を非活性にする
	$("#adCreateFlag").attr("disabled", "disabled");
	postAjax(setting);
}

//内定者情報を更新する
function update() {
	// 初期化チェック
	if(!checkInit()) {
		return;
	}
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	removeAllErrorForEasyUI("IDMS0311Form");
	// 画面の検証
	if($('#IDMS0311Form').form('validate') ==false){
		$("#p_errorMessage")[0].innerHTML = getMessage("E2088");
		return;
	}
	parent.confirmComponent.callback = function (){
		exceUpdate();
	};
	var title = '登録確認';
	var message = getMessage("W1003");
	parent.confirmShow(title, message);
}

//内定者情報更新のコールバック関数
function exceUpdate() {
	// 「ADユーザの作成」を活性にする
	$("#adCreateFlag").removeAttr("disabled")
	var setting = {
		data : $("#IDMS0311Form").serialize(),
		url : "/IDMS0311/update.htm",
		hasLoading : true,
		success : function(res) {
			if(!res.result) {// 実行失敗の場合
				$("#p_errorMessage")[0].innerHTML = res.errorMessage;
				// エイリアスの重複エラー
				if(res.errorCode == "E2037") {
					// 背景色に赤色を設定する
					$("#userAlias").nextAll().addClass("textbox-invalid");
					$("#userAlias").next().children().addClass("validatebox-invalid");
				} else if(res.errorCode == "E2038") { // 社員番号の重複エラー
					// 背景色に赤色を設定する
					$("#employeeNo").nextAll().addClass("textbox-invalid");
					$("#employeeNo").next().children().addClass("validatebox-invalid");
				}
			} else {// 実行成功の場合
				$.messager.show({
					title:'情報',
					msg:getMessage("I1003"),
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
	// 「ADユーザの作成」を非活性にする
	$("#adCreateFlag").attr("disabled", "disabled");;
	postAjax(setting);
}

// 内定者一覧に戻る関数
function back() {
	parent.closeMainDialog(null);
}

// 内定者情報を削除する
function removeUser() {
	parent.confirmComponent.callback = function (){
		exceRemove();
	};
	var title = '登録確認';
	var message = getMessage("W1004");
	parent.confirmShow(title, message);
}

// 内定者情報削除のコールバック関数
function exceRemove() {
	var setting = {
		data : $("#IDMS0311Form").serialize(),
		url : "/IDMS0311/remove.htm",
		hasLoading : true,
		success : function(res) {
			if(!res.result) {// 実行失敗の場合
				$("#p_errorMessage")[0].innerHTML = res.errorMessage;
			} else {// 実行成功の場合
				$.messager.show({
					title:'情報',
					msg:getMessage("I1004"),
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
