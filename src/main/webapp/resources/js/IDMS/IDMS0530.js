$(function() {
	Form_DoInit();
});

function Form_DoInit() {
	//アクションの初期化
	initSystemInfo();
}

// システム一覧の初期化
function initSystemInfo() {
	var setting = {
		data : null,
		url : "/IDMS0530/getSystemInfo.htm",
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
			} else {
				if (null != res.systemListInfo
						&& 0 != res.systemListInfo.length) {
					var systemInfoArrList = new Array();
					systemInfoArrList.push({
						"text" : COMBOBOX_BLANK_OPTION_TEXT,
						"value" : ""
					});
					for (var i = 0; i < res.systemListInfo.length; i++) {
						systemInfoArrList.push({
							"text" : res.systemListInfo[i].text,
							"value" : res.systemListInfo[i].value
						});
					}
					$("#systemInfo").combobox("loadData",systemInfoArrList);
				}
			}
		}
	};
	postAjax(setting);
}

// CSVファイルを出力する
function btnCsv_Click(){
//	register = {};
//	register.dtFromDate = $("#dtFromDate").textbox("getValue");
//	register.dtToDate = $("#dtToDate").textbox("getValue");
//	register.systemInfo = $("#cbSystemInfo").combobox("getValue");
//	register.txAccount = $("#txAccount").textbox("getValue");
//	register.cbChange = $("#cbChange").textbox("getValue");
//	register.cbDelete = $("#cbDelete").textbox("getValue");
//	register.cbOther = $("#cbOther").textbox("getValue");
	$("#change")[0].checked;

	$("#IDMS0530Form").serialize();
	$("#IDMS0530Form").attr("action", CONTEXT_PATH + "/IDMS0530/outputCsv.htm");
	$("#IDMS0530Form").submit();
}
