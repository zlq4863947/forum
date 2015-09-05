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
		removeAllErrorForEasyUI("IDMS0332Form");
		$("#p_errorMessage")[0].innerHTML = getMessage("E1009",["対象者"]);
		return false;
	}
	// 兼任解除の選択チィック
	if($("#unregisterList").has('option').length == 0) {
		$("#p_errorMessage")[0].innerHTML = '&nbsp;';
		removeAllErrorForEasyUI("IDMS0332Form");
		$("#p_errorMessage")[0].innerHTML = getMessage("E1009",["兼任解除組織及び役職"]);
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
			+ "&organizationCode=" + $('#organizationCd').val() + "&checkFlag=1" + "&authorityFlag=1&screenId=IDMS0332";
	var width = 650;
	var height = 610;
	// 対象者選択画面を呼び出す
	parent.openMainDialog(title, url, width, height);
}

//対象者情報を初期化する
function getUserInfo() {
	var setting = {
		data : {"userId":$("#userId").val()},
		url : "/IDMS0332/getUserInfo.htm",
		hasLoading : true,
		hasContentType : false,
		success : function(res) {
			// 貰ったデータを画面の項目に設定する
			$("#IDMS0332Form").form('load',res);
			// 兼任を維持する組織リストを設定する
			setRegisterList(res.minorOrganizationList);
		}
	};
	postAjax(setting);
}

//対象者の兼任情報を解除する
function unregister() {
	// 初期化チェック
	if(!checkInit()) {
		return;
	}
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	removeAllErrorForEasyUI("IDMS0332Form");
	// 画面の検証
	if($('#IDMS0332Form').form('validate') == false){
		$("#p_errorMessage")[0].innerHTML = getMessage("E2088");
		return;
	}
	parent.confirmComponent.callback = function (){
		exceUnregister();
	};
	var title = '解除確認';
	var message = getMessage("W1002");
	parent.confirmShow(title, message);
}

//対象者の兼任情報解除のコールバック関数
function exceUnregister() {
	var idms0332Form = {
		userId: $("#userId").val(),
		startDate: Date.parse($("#startDate").datebox("getValue")),
		unregisterList: getUnregisterList()
	};
	var setting = {
			data : JSON.stringify(idms0332Form),
			url : "/IDMS0332/unregister.htm",
			hasLoading : true,
			hasContentType : true,
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

// 兼任解除リストを取得する
function getUnregisterList() {
	var selectList = new Array();
	$("#unregisterList option").each(function() {
		var texts = $(this).text().split(" ");
		var values = $(this).val().split(",");
		selectList.push({
			"organizationCd" : values[0],
			"organizationName" : texts[0],
			"officeCd" : values[1],
			"officeName" : texts[1]
		});
    });
    return selectList;
}

// 兼任を解除する組織リストをクリーンする
function cleanUnregisterList() {
	$("#unregisterList option").each(function(index, option) {
		$(option).remove();
	});
}

// 兼任リストを取得する
function getRegisterList() {
	var setting = {
		data : $("#IDMS0332Form").serialize(),
		url : "/IDMS0332/getRegisteredList.htm",
		hasLoading : true,
		success : function(data) {
			if(data) { // 実行成功
				// 兼任を維持する組織リストを設定する
				setRegisterList(data);
			}
		}
	};
	postAjax(setting);
}

// 兼任を維持する組織リストを設定する
function setRegisterList(data) {
	// 兼任を維持する組織リストをクリーンする
	cleanRegisterList();
	// 兼任を解除する組織リストをクリーンする
	cleanUnregisterList();
	if(data != null) {
		$.each(data, function(){
			$("#registeredList").append($("<option/>",{
				value: this.organizationCd+","+this.officeCd,
				text: this.organizationName+" "+(this.officeName?this.officeName:'')
			}));
		});
	}
}

// 兼任を維持する組織リストをクリーンする
function cleanRegisterList() {
	$("#registeredList option").each(function(index, option) {
		$(option).remove();
	});
}