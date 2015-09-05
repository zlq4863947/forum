$(function() {
	Form_DoInit();
});

function Form_DoInit() {
	initSystemInfo();
}

function initSystemInfo() {
	var setting = {
		data : null,
		url : "/IDMS0131/reloading.htm",
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

// 条件クリアボタンを押下し、入力した情報をクリアする
function btnClear_Click() {
	$("#applicationId").textbox("setValue", '');
	$("#endUserOrganizationCd")[0].value = '';
	$("#endUser").textbox("setValue", '');
	$("#systemInfo").combobox("setValue", '');
	$("#applicant").textbox("setValue", '');
	$("#endUserOrganization").textbox("setValue", '');
	$("#useFromDate").datebox("setValue", '');
	$("#useToDate").datebox("setValue", '');
	$("#prospectiveEmp").attr("checked",false);
	$("#enrolmentEmp").attr("checked",false);
	$("#retirementEmp").attr("checked",false);
}

// 組織選択ボタンを押下し、組織選択画面を表示する
function btnOrganization_Click() {
	parent.getDialogObject().callback = function(data) {
		setOrganizationInfo(data);
	};
	var title = "組織選択";
	var organizationCode = $('#endUserOrganizationCd').val();
	var organizationName = $('#endUserOrganization').val();
	var url = "/IDMS0012/IDMS0012.htm" + "?" + "organizationCode="
			+ organizationCode + "&organizationName=" + organizationName + "&oldOrganizationFlag=1";
	var width = 652;
	var height = 610;
	parent.openMainDialog(title, url, width, height);
}

// 組織情報を設定する
function setOrganizationInfo(data) {
	if (null != data) {
		$("#endUserOrganizationCd")[0].value = data.organizationCode;
		$("#endUserOrganization").textbox("setValue", data.organizationName);
	}
}

// 検索ボタンを押下し、検索情報により、登録一覧情報を取得する
function btnSearch_Click() {
	$("#p_errorMessage")[0].innerHTML = "&nbsp;";
	if ($('#regiserListForm').form('validate') == false) {
		$("#p_errorMessage")[0].innerHTML = "画面にエラーがありますので、修正してください。";
		return;
	}
	$("#hideApplicationId")[0].value = $("#applicationId").textbox("getValue");
	$("#hideEndUser")[0].value = $("#endUser").textbox("getValue");
	$("#hideApplicant")[0].value = $("#applicant").textbox("getValue");
	$("#hideSystemCd")[0].value = $("#systemInfo").combobox("getValue");
	$("#hideOrganizationCd")[0].value = $("#endUserOrganizationCd")[0].value;
	$("#hideUseFromDate")[0].value = $("#useFromDate").datebox("getValue");
	$("#hideUseToDate")[0].value = $("#useToDate").datebox("getValue");
	$("#hideProspectiveEmp")[0].checked = $("#prospectiveEmp")[0].checked;
	$("#hideEnrolmentEmp")[0].checked = $("#enrolmentEmp")[0].checked;
	$("#hideRetirementEmp")[0].checked = $("#retirementEmp")[0].checked;
	
	register = {};
	register.applicationId = $("#applicationId").textbox("getValue");
	register.endUserOrganizationCd = $("#endUserOrganizationCd")[0].value;
	register.endUserName = $("#endUser").textbox("getValue");
	register.applicantName = $("#applicant").textbox("getValue");
	register.systemCd = $("#systemInfo").combobox("getValue");
	register.useStartDate = $("#useFromDate").datebox("getValue");
	register.useEndDate = $("#useToDate").datebox("getValue");
	register.prospectiveEmp = $("#prospectiveEmp")[0].checked;
	register.enrolmentEmp = $("#enrolmentEmp")[0].checked;
	register.retirementEmp = $("#retirementEmp")[0].checked;
	var setting = {
		data : register,
		url : "/IDMS0131/userApplication.htm",
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
				$('#dg').datagrid({
					data : res.registerList,
					onDblClickRow : function(rowIndex, rowData) {
						showDatil(rowData);
					},
					onLoadSuccess:function(data){
						var trs = $(this).parent('div.datagrid-view').find('div.datagrid-body>table tr');
						trs.find("td[field]").each(function(i,o){
							if($(this).attr("field")=="completionDate"
								|| $(this).attr("field")=="endUserOrganizationName" 
								|| $(this).attr("field")=="endUserName"
								|| $(this).attr("field")=="systemName"
								|| $(this).attr("field")=="authorityGroupMenuName"
								|| $(this).attr("field")=="categoryName")
								$(this).attr("title",$(this).text());
						});
					}
				});
				if (null == res.registerList || 0 == res.registerList.length) {
					parent.alertShow('検索結果', '検索結果は0件です。');
				}
				$("#rowCount")[0].innerHTML = "取得件数：" + res.registerList.length
						+ "件";
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

//日付の格式化
function dateFormat(value, row, index) {
	if (value == undefined || value == null || value == "") {
		return null;
	}
	var unixTimestamp = new Date(value);
	return unixTimestamp.format('yyyy/MM/dd hh:mm');
}

// 承認詳細画面に遷移する
function showDatil(rowData) {
	parent.getDialogObject().callback = function(data) {
	};
	var title = "承認詳細";
	var endUserId = rowData.endUserId;
	var applicationId = rowData.applicationId;
	var url = "/IDMS0112/IDMS0112.htm" + "?" + "endUserId=" + endUserId
			+ "&applicationId=" + applicationId + "&mode=1";
	var width = 950;
	var height = 700;
	parent.openMainDialog(title, url, width, height);
}

function btnCsv_Click(){
	$("#p_errorMessage")[0].innerHTML = "&nbsp;";
	var allRowDatas = $('#dg').datagrid("getData").rows;
	if(allRowDatas.length == 0){
		$("#p_errorMessage")[0].innerHTML = getMessage("E1003");
		return;
	}
	register = {};
	register.applicationId = $("#hideApplicationId")[0].value;
	register.endUserName = $("#hideEndUser")[0].value;
	register.applicantName = $("#hideApplicant")[0].value;
	register.systemCd = $("#hideSystemCd")[0].value;
	register.endUserOrganizationCd = $("#hideOrganizationCd")[0].value;
	register.useStartDate = $("#hideUseFromDate")[0].value;
	register.useEndDate = $("#hideUseToDate")[0].value;
	register.prospectiveEmp = $("#hideProspectiveEmp")[0].checked;
	register.enrolmentEmp = $("#hideEnrolmentEmp")[0].checked;
	register.retirementEmp = $("#hideRetirementEmp")[0].checked;
	var setting = {
			data : register,
			url : "/IDMS0131/checkData.htm",
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
					if(res.status == "true"){
						$("#regiserListForm").serialize();
						$("#regiserListForm").attr("action", CONTEXT_PATH + "/IDMS0131/outputCsv.htm");
						$("#regiserListForm").submit();
					}else{
						$("#p_errorMessage")[0].innerHTML = getMessage("E1003");
						return;
					}
				}
			}
		};
		postAjax(setting);
}
