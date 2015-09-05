// 画面初期化する
$(function() {
	// 検証項目のblurイベント関数を指定する
	$('.validatebox-text').bind('blur', function() {
		$(this).validatebox('enableValidation').validatebox('validate');
	});
	// gridの中央揃え
	setGridHeader("personnelHandleGrid");
	setGridHeader("privilegeHandleGrid");
	// Gridのタイトル
	setGridTitle("personnelHandleGrid");
	setGridTitle("privilegeHandleGrid");
});

// 人事処理ラジオボタンのクッリク事件
function clickPerHandle() {
	// 特権種別チェックボックスを非表示状態にする
	$("#privilegeHandleTr").hide();
	// 人事種別チェックボックスを表示状態にする
	$("#personnelHandleTr").show();
}

// 特権処理ラジオボタンのクッリク事件
function clickPriHandle() {
	// 人事種別チェックボックスを非表示状態にする
	$("#personnelHandleTr").hide();
	// 特権種別チェックボックスを表示状態にする
	$("#privilegeHandleTr").show();
}

// 人事処理予定一覧のチィック事件
function checkPerHandleGrid() {
	// チィックしている且つ人事取消ボタンが非活性になっている場合
	if ($("#personnelHandleGrid").datagrid("getChecked").length != 0
			&& $("#btnPersonnelCancel").linkbutton("options").disabled) {
		// 人事取消ボタンを活性化する
		$("#btnPersonnelCancel").linkbutton("enable");
	}
}

//人事処理予定一覧のチィックを外し事件
function uncheckPerHandleGrid() {
	// チィックしていなかった場合
	if ($("#personnelHandleGrid").datagrid("getChecked").length == 0) {
		// 人事取消ボタンを非活性する
		$("#btnPersonnelCancel").linkbutton("disable");
	}
}

// 特権種別の特定のチィック事件
function clickPriHandleType() {
	if($("#priHandleType02").prop("checked")) {
		$("#priHandleType03").prop("checked",true);
	} else {
		$("#priHandleType03").prop("checked",false);
	}
	if($("#priHandleType04").prop("checked")) {
		$("#priHandleType05").prop("checked",true);
	} else {
		$("#priHandleType05").prop("checked",false);
	}
}

//特権処理予定一覧のチィック事件
function checkPriHandleGrid() {
	// チィックしている且つ特権取消ボタンが非活性になっている場合
	if ($("#privilegeHandleGrid").datagrid("getChecked").length != 0
			&& $("#btnPrivilegeCancel").linkbutton("options").disabled) {
		// 特権取消ボタンを活性化する
		$("#btnPrivilegeCancel").linkbutton("enable");
	}
}

//特権処理予定一覧のチィックを外し事件
function uncheckPriHandleGrid() {
	// チィックしていなかった場合
	if ($("#privilegeHandleGrid").datagrid("getChecked").length == 0) {
		// 人事特権ボタンを非活性する
		$("#btnPrivilegeCancel").linkbutton("disable");
	}
}

//人事処理予定取消
function btnPersonnelCancel_Click() {
	parent.confirmComponent.callback = function (){
		//人事処理予定取消チィック
		checkPersonnel();
	};
	var title = '取消確認';
	var message = getMessage("W1018",["人事処理"]);
	parent.confirmShow(title, message);
}

//人事処理予定取消のチィック
function checkPersonnel() {
	var entranceUserIds = [];
	$($("#personnelHandleGrid").datagrid("getChecked")).each(function() {
		// 入社の場合
		if(this.personnelHandleType=="01") {
			entranceUserIds.push(this.userId);
		}
	});
	// 入社人事処理取消がある場合
	if(entranceUserIds.length != 0) {
		// 申請の有無確認
		var setting = {
			data : JSON.stringify(entranceUserIds),
			url : "/IDMS0371/hasApplication.htm",
			hasLoading : true,
			hasContentType : true,
			success : function(res) {
				if(res == 1) {
					parent.confirmComponent.callback = function (){
						//人事処理予定を取消する
						cancelPersonnel();
					};
					var title = '取消確認';
					var message = getMessage("W1013");
					parent.confirmShow(title, message);
				} else {
					//人事処理予定を取消する
					cancelPersonnel();
				}
			}
		};
		postAjax(setting);
	} else {
		//人事処理予定を取消する
		cancelPersonnel();
	}
}

//人事処理予定取消
function cancelPersonnel() {
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	var setting = {
		data : JSON.stringify($("#personnelHandleGrid").datagrid("getChecked")),
		url : "/IDMS0371/cancelPersonnel.htm",
		hasLoading : true,
		hasContentType : true,
		success : function(res) {
			if(!res.result) { // 実行失敗の場合
				$("#p_errorMessage")[0].innerHTML = res.errorMessage;
			} else { // 実行成功の場合
				// 予定一覧情報を取得する
				btnSearch_Click();
				// 人事取消ボタンを非活性する
				$("#btnPersonnelCancel").linkbutton("disable");
				$.messager.show({
					title:'情報',
					msg:getMessage("I1011"),
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

//特権処理予定取消のクッリク事件
function btnPrivilegeCancel_Click() {
	parent.confirmComponent.callback = function (){
		cancelPrivilege();
	};
	var title = '取消確認';
	var message = getMessage("W1018",["特権処理"]);
	parent.confirmShow(title, message);
}

//特権処理予定取消
function cancelPrivilege() {
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	var setting = {
		data : JSON.stringify($("#privilegeHandleGrid").datagrid("getChecked")),
		url : "/IDMS0371/cancelPrivilege.htm",
		hasLoading : true,
		hasContentType : true,
		success : function(res) {
			if(!res.result) { // 実行失敗の場合
				$("#p_errorMessage")[0].innerHTML = res.errorMessage;
			} else { // 実行成功の場合
				// 予定一覧情報を取得する
				btnSearch_Click();
				// 特権取消ボタンを非活性する
				$("#btnPrivilegeCancel").linkbutton("disable");
				$.messager.show({
					title:'情報',
					msg:getMessage("I1011"),
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

//反映バッチ起動
function btnPersonnelExecBatchAll_Click() {
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	parent.confirmComponent.callback = function (){
		var setting = {
			url : "/IDMS0371/executeBatch.htm",
			hasLoading : true,
			success : function(res) {
				if(!res.result) { // 実行失敗の場合
					$("#p_errorMessage")[0].innerHTML = res.errorMessage;
				} else { // 実行成功の場合
					// 人事処理予定一覧情報を取得する
					btnSearch_Click();
					$.messager.show({
						title:'情報',
						msg:getMessage("I1021"),
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
	};
	var title = '反映バッチ起動確認';
	var message = getMessage("W1017",["特権処理"]);
	parent.confirmShow(title, message);
}

//特権の反映バッチ起動
function btnPrivilegeExecBatchAll_Click() {
	btnPersonnelExecBatchAll_Click();
}

// gridの中央揃え
function setGridHeader(gridId) {
	$("#" + gridId).datagrid({
		onBeforeLoad : function(data) {
			var trTitle = $(this).parent("div.datagrid-view").find(
					"div.datagrid-header>div table tr");
			trTitle.find("td[field]").each(function(i, o) {
				$(this).children("div").css("text-align", "center");
			});
		}
	});
}

// Gridのタイトル
function setGridTitle(gridId) {
	$("#" + gridId).datagrid({
		onLoadSuccess : function(data) {

			var trs = $(this).parent('div.datagrid-view').find('div.datagrid-body>table tr');
			trs.find("td[field]").each(function(i,o){
					$(this).attr("title",$(this).text());
			});
			
			
		}
	});
}

/*
// 組織選択ボタンを押下し、組織選択画面を表示する
function btnOrganization_Click() {
	parent.getDialogObject().callback = function(data) {
		setOrganizationInfo(data);
	};
	var title = "組織選択";
	var organizationCode = $("#organizationCd").val();
	var organizationName = $("#organizationName").val();
	var url = "/IDMS0012/IDMS0012.htm" + "?" + "organizationCode="
			+ organizationCode + "&organizationName=" + organizationName
			+ "&oldOrganizationFlag=1";
	var width = 652;
	var height = 610;
	parent.openMainDialog(title, url, width, height);
}

// 組織情報を設定する
function setOrganizationInfo(data) {
	if (null != data) {
		$("#organizationCd")[0].value = data.organizationCode;
		$("#organizationName").textbox("setValue", data.organizationName);
	}
}
*/

// 検索ボタンを押下し、検索情報により、人事処理予定一覧情報を取得する
function btnSearch_Click() {
	// 対象データが人事処理の場合
	if($("#personnelHandle").prop("checked")) {
		// 人事処理予定を検索する
		searchPerHandle();
	} else {
		// 特権処理予定を検索する
		searchPriHandle();
	}
}

// 人事処理予定を検索する
function searchPerHandle() {
	var setting = {
		data : $("#IDMS0371Form").serialize(),
		url : "/IDMS0371/getPersonnelHandleInfo.htm",
		hasLoading : true,
		success : function(res) {
			// 人事取消ボタンを非活性する
			$("#btnPersonnelCancel").linkbutton("disable");
			if (res.errorResultDto) {
				errors = res.errorResultDto.errorList;
				var messages = "";
				$.each(errors, function(i, err) {
					messages += err.errorMessage + "<br>";
				});
				$("#p_errorMessage")[0].innerHTML = messages;
			} else {
				// 人事処理予定一覧情報を表示する
				$("#personnelHandleGrid").datagrid("loadData", {
					"rows" : res
				});
				$("#rowCount").text("取得件数：" + res.length + "件");
			}
		}
	};
	postAjax(setting);
}

// 特権処理予定を検索する
function searchPriHandle() {
	var setting = {
		data : $("#IDMS0371Form").serialize(),
		url : "/IDMS0371/getPrivilegeHandleInfo.htm",
		hasLoading : true,
		success : function(res) {
			// 特権取消ボタンを非活性する
			$("#btnPrivilegeCancel").linkbutton("disable");
			if (res.errorResultDto) {
				errors = res.errorResultDto.errorList;
				var messages = "";
				$.each(errors, function(i, err) {
					messages += err.errorMessage + "<br>";
				});
				$("#p_errorMessage")[0].innerHTML = messages;
			} else {
				// 特権処理予定一覧情報を表示する
				$("#privilegeHandleGrid").datagrid("loadData", {
					"rows" : res
				});
				$("#privilegeRowCount").text("取得件数：" + res.length + "件");
			}
		}
	};
	postAjax(setting);
}

// 日付の格式化
function dateFormatter(value, row, index) {
	if (value == undefined || value == null || value == "") {
		return null;
	}
	var unixTimestamp = new Date(value);
	return unixTimestamp.format('yyyy/MM/dd');
}

// 条件クリアする
function btnClear_Click() {
	// 対象データが人事処理の判定
	var personnelHandleType = false; 
	// 対象データが人事処理の場合
	if($("#personnelHandle").prop("checked")) {
		personnelHandleType = true;
	}
	$("#IDMS0371Form").form("clear");
	if(personnelHandleType) {
		// 人事処理ラジオボタンを設定する
		$("#personnelHandle").prop("checked", true);
	}else {
		// 特権種別ラジオボタンを設定する
		$("#privilegeHandle").prop("checked", true);
	}
}