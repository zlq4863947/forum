function initDetail() {

	initDisplay();
	
	goAppDetail.editAppDetail = function (){
		editAppDetail();
	};

}

function checkAppDetail(){
	var authorityCd = "";
	
	// 権限(入力)
	if(goForm.authorityInfo != undefined && goForm.authorityInfo != null && goForm.authorityInfo != ''){
		authorityCd = goForm.authorityInfo;
	} else {
		// 権限(選択)
		authorityCd = goForm.authorityGroup;
	}
	
	if(authorityCd == "1"){
		if(goForm.applicationInfoItem.itemText11 == undefined
				||goForm.applicationInfoItem.itemText11 == null
				||goForm.applicationInfoItem.itemText11 == ''){
				$("#p_errorMessage")[0].innerHTML = "承認者を選択して下さい。";
				return false;
		}
	} else if(authorityCd == "2"){

		
		if(goForm.applicationInfoItem.itemText1 == undefined
				||goForm.applicationInfoItem.itemText1 == null
				||goForm.applicationInfoItem.itemText1 == ''){
				$("#p_errorMessage")[0].innerHTML = "代理承認者１を選択して下さい。";
				return false;
			}
			
		if(goForm.applicationInfoItem.itemText6 == undefined
				||goForm.applicationInfoItem.itemText6 == null
				||goForm.applicationInfoItem.itemText6 == ''){
				$("#p_errorMessage")[0].innerHTML = "代理承認者２を選択して下さい。";
				return false;
		}
	}
	
	return true;
}

function editAppDetail(){
	
	goForm.applicationInfoItem.itemText3 = $("#itemText3").val();
	goForm.applicationInfoItem.itemText4 = $("#itemText4").val();
	goForm.applicationInfoItem.itemText5 = $("#itemText5").val();
	
	goForm.applicationInfoItem.itemText8 = $("#itemText8").val();
	goForm.applicationInfoItem.itemText9 = $("#itemText9").val();
	goForm.applicationInfoItem.itemText10 = $("#itemText10").val();
	
	goForm.applicationInfoItem.itemText13 = $("#itemText13").val();
	goForm.applicationInfoItem.itemText14 = $("#itemText14").val();
	goForm.applicationInfoItem.itemText15 = $("#itemText15").val();
}

function initDisplay(){


	if (goForm.applicationDetailFormPattern == '00') {

	} else if (goForm.applicationDetailFormPattern == '01') {
		$('#btnSelectProxyUser1').linkbutton({
			disabled : true
		});
		$('#btnSelectProxyUser2').linkbutton({
			disabled : true
		});
		$('#btnSelectApprover').linkbutton({
			disabled : true
		});
	} else {
		$("#tableDetail8").hide();
	}
	
	var authorityCd = "";
	
	// 権限(入力)
	if(goForm.authorityInfo != undefined && goForm.authorityInfo != null && goForm.authorityInfo != ''){
		authorityCd = goForm.authorityInfo;
	} else {
		// 権限(選択)
		authorityCd = goForm.authorityGroup;
	}
	
	if(authorityCd == "1"){
		$("#trDetail801").hide();
		$("#trDetail802").hide();
		$("#trDetail803").hide();
		$("#trDetail804").hide();
		$("#trDetail805").hide();
		$("#trDetail806").hide();
		$("#trDetail807").hide();
		$("#trDetail808").hide();
		
		goForm.applicationInfoItem.itemText1='';
		goForm.applicationInfoItem.itemText2='';
		goForm.applicationInfoItem.itemText3='';
		goForm.applicationInfoItem.itemText4='';
		goForm.applicationInfoItem.itemText5='';
		goForm.applicationInfoItem.itemText6='';
		goForm.applicationInfoItem.itemText7='';
		goForm.applicationInfoItem.itemText8='';
		goForm.applicationInfoItem.itemText9='';
		goForm.applicationInfoItem.itemText10='';

		
	} else if(authorityCd == "2"){
		$("#trDetail809").hide();
		$("#trDetail810").hide();
		$("#trDetail811").hide();
		$("#trDetail812").hide();
		
		goForm.applicationInfoItem.itemText11='';
		goForm.applicationInfoItem.itemText12='';
		goForm.applicationInfoItem.itemText13='';
		goForm.applicationInfoItem.itemText14='';
		goForm.applicationInfoItem.itemText15='';
	}
	
	
	var disableFlag = true;
	
	// 申請詳細から
	if(detailEnableFlag == DETAIL_ENABLE_FLAG_APPLY){
		disableFlag = false;
	}
	// 承認詳細から
	else if(detailEnableFlag == DETAIL_ENABLE_FLAG_APPROVAL){
		disableFlag = true;
	}
	// 登録詳細から
	else if(detailEnableFlag == DETAIL_ENABLE_FLAG_REGISTER){
		if(goForm.registerDetailInputFlag != undefined && goForm.registerDetailInputFlag == "1"){
			disableFlag = false;
		} else {
			disableFlag = true;
		}
	}
	
	if(disableFlag){
		diableComponent();
	}
	
	
	$("#itemText3").textbox("setValue", goForm.applicationInfoItem.itemText3);
	$("#itemText4").textbox("setValue", goForm.applicationInfoItem.itemText4);
	$("#itemText5").textbox("setValue", goForm.applicationInfoItem.itemText5);
	
	$("#itemText8").textbox("setValue", goForm.applicationInfoItem.itemText8);
	$("#itemText9").textbox("setValue", goForm.applicationInfoItem.itemText9);
	$("#itemText10").textbox("setValue", goForm.applicationInfoItem.itemText10);
	
	$("#itemText13").textbox("setValue", goForm.applicationInfoItem.itemText13);
	$("#itemText14").textbox("setValue", goForm.applicationInfoItem.itemText14);
	$("#itemText15").textbox("setValue", goForm.applicationInfoItem.itemText15);
}

function diableComponent(){
	
	$('#btnSelectProxyUser1').linkbutton({
		disabled : true
	});
	$('#btnSelectProxyUser2').linkbutton({
		disabled : true
	});
	$('#btnSelectApprover').linkbutton({
		disabled : true
	});
}

//ユーザ選択ボタンを押下した、、このメソッドを実行する
//(申請画面IDMS0101と同じの権限限定)
function btnSelectProxyUser1_click() {
	parent.getDialogObject().callback = function(data) {

		proxyUser1(data);

	};
	var title = "対象者選択";
	var endUserId = goForm.applicationInfoItem.itemText1;
	var organizationCode = goForm.applicationInfoItem.itemText2;

	// 0.9.3 アクション一覧に権限制御の記述を追加 START
	var url = "/IDMS0011/IDMS0011.htm" + "?" + "userId=" + endUserId
			+ "&organizationCode=" + organizationCode + "&checkFlag=1";
	// showProspectiveEmployeeInfo: 内定者表示フラグ
	// authorityFlag: 権限表示フラグ
	// screenId:画面ID
	// 権限表示タイプは営業企画担当の場合、契約形態が仲介業者も含めて表示する
	// 権限表示タイプは営業企画担当以外の場合、契約形態が仲介業者以外を表示する

	url = url + "&showProspectiveEmployeeInfo=1&authorityFlag=1"
			+ "&screenId=IDMS0101";
	
	// 0.9.6 他ユーザ参照ボタンの対象ユーザは申請者と同じ組織のユーザのみに修正 START
	// 他のユーザの権限を参照する場合、「referenceFlag」は"1"に設定する

	// 0.9.6 他ユーザ参照ボタンの対象ユーザは申請者と同じ組織のユーザのみに修正 END
	// 0.9.3 アクション一覧に権限制御の記述を追加 END
	var width = 652;
	var height = 610;
	parent.openMainDialog(title, url, width, height);
}

//ユーザ基本情報を取得する
function proxyUser1(data) {
	if (null != data && null != data.endUserId && 0 < data.endUserId.length) {
		var setting = {
			data : {
				"userId" : data.endUserId[0]
			},
			url : "/IDMS0128/userInfo.htm",
			hasLoading : true,
			hasContentType : false,
			success : function(res) {
				if (res.errorResultDto) {
					errors = res.errorResultDto.errorList;
					var messages = "";
					$.each(errors, function(i, err) {
						messages += err.errorMessage + "<br>";
					});
					$("#p_errorMessage")[0].innerHTML = messages;
					
					goForm.applicationInfoItem.itemText1 = "";
					goForm.applicationInfoItem.itemText2 = "";
					$("#itemText3").textbox("setValue", "");
					$("#itemText4").textbox("setValue", "");
					$("#itemText5").textbox("setValue", "");
				} else {
					if (null != res.data) {
						
						goForm.applicationInfoItem.itemText1 = res.data.userId;
						goForm.applicationInfoItem.itemText2 = res.data.organizationCd;
						
						$("#itemText3").textbox("setValue", res.data.userAlias);
						$("#itemText4").textbox("setValue", res.data.employeeNo);
						$("#itemText5").textbox("setValue", res.data.userName);
					}
				}
			}
		};
		postAjax(setting);
	}
}


//ユーザ選択ボタンを押下した、、このメソッドを実行する
function btnSelectProxyUser2_click() {
	parent.getDialogObject().callback = function(data) {
		proxyUser2(data);
	};
	var title = "対象者選択";
	var endUserId = goForm.applicationInfoItem.itemText6;
	var organizationCode = goForm.applicationInfoItem.itemText7;

	// 0.9.3 アクション一覧に権限制御の記述を追加 START
	var url = "/IDMS0011/IDMS0011.htm" + "?" + "userId=" + endUserId
			+ "&organizationCode=" + organizationCode + "&checkFlag=1";
	// showProspectiveEmployeeInfo: 内定者表示フラグ
	// authorityFlag: 権限表示フラグ
	// screenId:画面ID
	// 権限表示タイプは売買審査担当の場合、契約形態が仲介業者も含めて表示する
	// 権限表示タイプは売買審査担当以外の場合、契約形態が仲介業者以外を表示する

		url = url + "&showProspectiveEmployeeInfo=1&authorityFlag=1"
				+ "&screenId=IDMS0101";
		// 0.9.6 他ユーザ参照ボタンの対象ユーザは申請者と同じ組織のユーザのみに修正 START
		// 他のユーザの権限を参照する場合、「referenceFlag」は"1"に設定する

	// 0.9.6 他ユーザ参照ボタンの対象ユーザは申請者と同じ組織のユーザのみに修正 END
	// 0.9.3 アクション一覧に権限制御の記述を追加 END
	var width = 652;
	var height = 610;
	parent.openMainDialog(title, url, width, height);
}

//ユーザ基本情報を取得する
function proxyUser2(data) {
	if (null != data && null != data.endUserId && 0 < data.endUserId.length) {
		var setting = {
			data : {
				"userId" : data.endUserId[0]
			},
			url : "/IDMS0128/userInfo.htm",
			hasLoading : true,
			hasContentType : false,
			success : function(res) {
				if (res.errorResultDto) {
					errors = res.errorResultDto.errorList;
					var messages = "";
					$.each(errors, function(i, err) {
						messages += err.errorMessage + "<br>";
					});
					$("#p_errorMessage")[0].innerHTML = messages;
					
					goForm.applicationInfoItem.itemText6 = "";
					goForm.applicationInfoItem.itemText7 = "";
					$("#itemText8").textbox("setValue", "");
					$("#itemText9").textbox("setValue", "");
					$("#itemText10").textbox("setValue", "");
				} else {
					if (null != res.data) {
						
						goForm.applicationInfoItem.itemText6 = res.data.userId;
						goForm.applicationInfoItem.itemText7 = res.data.organizationCd;
						$("#itemText8").textbox("setValue", res.data.userAlias);
						$("#itemText9").textbox("setValue", res.data.employeeNo);
						$("#itemText10").textbox("setValue", res.data.userName);
					}
				}
			}
		};
		postAjax(setting);
	}
}


//ユーザ選択ボタンを押下した、、このメソッドを実行する
function btnSelectApprover_click() {
	parent.getDialogObject().callback = function(data) {
		approverUser(data);
	};
	var title = "対象者選択";
	var endUserId = goForm.applicationInfoItem.itemText11;
	var organizationCode = goForm.applicationInfoItem.itemText12;

	// 0.9.3 アクション一覧に権限制御の記述を追加 START
	var url = "/IDMS0011/IDMS0011.htm" + "?" + "userId=" + endUserId
			+ "&organizationCode=" + organizationCode + "&checkFlag=1";
	// showProspectiveEmployeeInfo: 内定者表示フラグ
	// authorityFlag: 権限表示フラグ
	// screenId:画面ID
	// 権限表示タイプは売買審査担当の場合、契約形態が仲介業者も含めて表示する
	// 権限表示タイプは売買審査担当以外の場合、契約形態が仲介業者以外を表示する

		url = url + "&showProspectiveEmployeeInfo=1&authorityFlag=1"
				+ "&screenId=IDMS0101";
		// 0.9.6 他ユーザ参照ボタンの対象ユーザは申請者と同じ組織のユーザのみに修正 START
		// 他のユーザの権限を参照する場合、「referenceFlag」は"1"に設定する

	// 0.9.6 他ユーザ参照ボタンの対象ユーザは申請者と同じ組織のユーザのみに修正 END
	// 0.9.3 アクション一覧に権限制御の記述を追加 END
	var width = 652;
	var height = 610;
	parent.openMainDialog(title, url, width, height);
}

//ユーザ基本情報を取得する
function approverUser(data) {
	if (null != data && null != data.endUserId && 0 < data.endUserId.length) {
		var setting = {
			data : {
				"userId" : data.endUserId[0]
			},
			url : "/IDMS0128/userInfo.htm",
			hasLoading : true,
			hasContentType : false,
			success : function(res) {
				if (res.errorResultDto) {
					errors = res.errorResultDto.errorList;
					var messages = "";
					$.each(errors, function(i, err) {
						messages += err.errorMessage + "<br>";
					});
					$("#p_errorMessage")[0].innerHTML = messages;
					
					goForm.applicationInfoItem.itemText11 = "";
					goForm.applicationInfoItem.itemText12 = "";
					$("#itemText13").textbox("setValue", "");
					$("#itemText14").textbox("setValue", "");
					$("#itemText15").textbox("setValue", "");
				} else {
					if (null != res.data) {
						
						goForm.applicationInfoItem.itemText11 = res.data.userId;
						goForm.applicationInfoItem.itemText12 = res.data.organizationCd;
						$("#itemText13").textbox("setValue", res.data.userAlias);
						$("#itemText14").textbox("setValue", res.data.employeeNo);
						$("#itemText15").textbox("setValue", res.data.userName);
					}
				}
			}
		};
		postAjax(setting);
	}
}