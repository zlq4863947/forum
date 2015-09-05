var goForm;
var goMode = 0;
var goExcuFlag = false;
var goRegisterDetailInputFlag = null;
var goPattern = {};
// 画面を初期化
$(document).ready(
				function() {
					goMode = $("#mode")[0].value;
					$("#tr01").hide();
					// メニュー画面から遷移
					if (goMode == 1) {
						applicationInfoLoad();
						showForm();
						goExcuFlag = true;
						// 複数利用者申請 申請共通2画面から遷移
					} else if (goMode == 2) {
						var setting = {
							data : null,
							url : "/IDMS0141/reloading.htm",
							hasLoading : true,
							hasContentType : false,
							success : function(res) {
								if (res.errorResultDto) {
									var errors = res.errorResultDto.errorList;
									var messages = "";
									$.each(errors, function(i, err) {
										messages += err.errorMessage + "<br>";
									});
									$("#p_errorMessage")[0].innerHTML = messages;
								} else {
									goForm = res.form;
									applicationInfo(res.classInfo,
											res.systemInfo, res.categoryInfo);
									showInfo(goForm);
									applicationContent(goForm);
									goExcuFlag = true;
								}
							}
						};
						postAjax(setting);
					}
					// 種類が変更し、対応システム情報を取得
					$("#classInfo").combobox({
						onChange : function(n, o) {
							if (goExcuFlag) {
								drpClass_change();
								if (goMode == 2) {
									goForm.authorityGroup = '';
									goForm.authorityInfo = '';
									goForm.authorityName = '';
									goForm.authorityListInfo = null;
									goForm.selectListInfo = null;
									goForm.userApplicationList = null;
									goForm.useAppContentList = null;
									goForm.useInfoList = null;
									goForm.mailAddressList = null;
									parent.window._0142data = undefined;
									parent.window._0150data = undefined;
									goForm.applicationInfoItem = {};
								}
							}
						}
					});
					// システムが変更し、対応カテゴリ情報を取得
					$("#systemInfo").combobox({
						onChange : function(n, o) {
							if (goExcuFlag) {
								drpSystem_change();
								// TODO
								if (goMode == 2) {
									goForm.authorityGroup = '';
									goForm.authorityInfo = '';
									goForm.authorityName = '';
									goForm.applicationReason = '';
									goForm.authorityListInfo = null;
									goForm.selectListInfo = null;
									goForm.userApplicationList = null;
									goForm.useAppContentList = null;
									goForm.useInfoList = null;
									goForm.mailAddressList = null;
									parent.window._0142data = undefined;
									parent.window._0150data = undefined;
									goForm.applicationInfoItem = {};
								}
							}
						}
					});

					// カテゴリが変更し、申請内容表示かどうかを設定
					$("#categoryInfo").combobox({
						onChange : function(n, o) {
							if (goExcuFlag) {
								drpCategory_change();
								// TODO
								if (goMode == 2) {
									goForm.authorityGroup = '';
									goForm.authorityInfo = '';
									goForm.authorityName = '';
									goForm.applicationReason = '';
									goForm.authorityListInfo = null;
									goForm.selectListInfo = null;
									goForm.userApplicationList = null;
									goForm.useAppContentList = null;
									goForm.useInfoList = null;
									goForm.mailAddressList = null;
									parent.window._0142data = undefined;
									parent.window._0150data = undefined;
									goForm.applicationInfoItem = {};
								}
							}
						}
					});
					
					// 画面のサイズを設定
					var height = $(document).height();
					document.getElementById("application").style.height = (height - 120) + "px";
					$('#dg').datagrid({
						onLoadSuccess:function(data){
							var trs = $(this).parent('div.datagrid-view').find('div.datagrid-body>table tr');
							trs.find("td[field]").each(function(i,o){
								if($(this).attr("field")=="userName"
									|| $(this).attr("field")=="organizationName")
									$(this).attr("title",$(this).text());
							});
						}
					});
				});

// 画面項目がデフォルトを設定
function showForm() {
	$("#tr02").show();
	$("#tr03").hide();
	$('#useStartDate').datebox({
		required : false
	});
}

// 画面の項目の値を設定する
function applicationContent(form) {
	goRegisterDetailInputFlag = form.registerDetailInputFlag;
	var patten = form.applciationCommonFormPattern;
	$("#classInfo").combobox("setValue", form.classInfo);
	$("#systemInfo").combobox("setValue", form.systemInfo);
	$("#categoryInfo").combobox("setValue", form.categoryInfo);
	var intPattern = parseInt(patten);
	// 共通パターンにより、画面データを設定
	if (APPLCIATION_COMMON_FORM_PATTERN_FIVE == patten
			|| (intPattern >= 11 && intPattern <= 17)
			||APPLCIATION_COMMON_FORM_PATTERN_TWENTY_FIRST == patten) {
		$("#useFromDate").datebox("setValue", form.useFromDate);
		$("#useToDate").datebox("setValue", form.useToDate);
	} else {
		$("#useStartDate").datebox("setValue", form.useFromDate);
	}
	goPattern.applciationCommonFormPattern = form.applciationCommonFormPattern;
	goPattern.applicationDetailFormType = form.applicationDetailFormType;
	goPattern.applicationDetailFormPattern = form.applicationDetailFormPattern;
	goPattern.applicationShowType = form.applicationShowType;
	if (null != form.note) {
		$("#tr01").show();
		$("#comment")[0].innerHTML = form.note;
	}
	// 利用者情報を表示する
	if(parent.window._0141data){
		if(parent.window._0141data.allRowDatas)
				 $('#dg').datagrid({
					 data:parent.window._0141data.allRowDatas
				 });
			if(parent.window._0141data.checkedRowDatas){
				for(var i=0;i<parent.window._0141data.checkedRowDatas.length;i++){
					$('#dg').datagrid("checkRow",$('#dg').datagrid("getRowIndex",parent.window._0141data.checkedRowDatas[i]));
				}
			}
	}
}

// 分類、システム、カテゴリ情報を設定する
function applicationInfo(classInfo, systemInfo, categoryInfo) {
	var classArrList = new Array();
	var systemArrList = new Array();
	var categoryArrList = new Array();
	classArrList.push({
		"text" : COMBOBOX_BLANK_OPTION_TEXT,
		"value" : ""
	});

	systemArrList.push({
		"text" : COMBOBOX_BLANK_OPTION_TEXT,
		"value" : ""
	});

	categoryArrList.push({
		"text" : COMBOBOX_BLANK_OPTION_TEXT,
		"value" : ""
	});

	if (classInfo != null && classInfo.length != 0) {
		for (var i = 0; i < classInfo.length; i++) {
			classArrList.push({
				"text" : classInfo[i].codeValue,
				"value" : classInfo[i].code
			});
		}
	}
	$("#classInfo").combobox('loadData', classArrList);
	$("#classInfo").combobox('setValue', goForm.classInfo);

	if (systemInfo != null && systemInfo.length != 0) {
		for (var i = 0; i < systemInfo.length; i++) {
			systemArrList.push({
				"text" : systemInfo[i].systemName,
				"value" : systemInfo[i].systemCd
			});
		}
	}
	$("#systemInfo").combobox('loadData', systemArrList);
	$("#systemInfo").combobox('setValue', goForm.systemInfo);
	if (goForm.classInfo != "") {
		$('#systemInfo').combobox('enable');
	}
	if (categoryInfo != null && categoryInfo.length != 0) {
		for (var i = 0; i < categoryInfo.length; i++) {
			categoryArrList.push({
				"text" : categoryInfo[i].categoryName,
				"value" : categoryInfo[i].categoryCd
			});
		}
	}
	$("#categoryInfo").combobox('loadData', categoryArrList);
	$("#categoryInfo").combobox('setValue', goForm.categoryInfo);
	if (goForm.systemInfo != "") {
		$('#categoryInfo').combobox('enable');
	}
}

// 分類情報を初期化
function applicationInfoLoad() {
	var setting = {
		data : null,
		url : "/IDMS0141/classInfo.htm",
		hasLoading : true,
		success : function(data) {
			if (data.errorResultDto) {
				errors = data.errorResultDto.errorList;
				var messages = "";
				$.each(errors, function(i, err) {
					messages += err.errorMessage + "<br>";
				});
				$("#p_errorMessage")[0].innerHTML = messages;
			} else {
				var classList = data.classInfo;
				var arrList = new Array();
				arrList.push({
					"text" : COMBOBOX_BLANK_OPTION_TEXT,
					"value" : ""
				});
				if (classList != null && classList.length != 0) {
					for (var i = 0; i < classList.length; i++) {
						arrList.push({
							"text" : classList[i].codeValue,
							"value" : classList[i].code
						});
					}
				}

				$("#classInfo").combobox('loadData', arrList);
				$("#classInfo").combobox('setValue', "");
			}
		}
	};
	postAjax(setting);
}

// 分類の値が変更し、システム情報を取得
function drpClass_change() {
	var classValue = $('#classInfo').combobox('getValue');
	var application = {};
	application.classInfo = classValue;
	clearData();
	showForm();
	$("#tr01").hide();
	$("#comment")[0].innerHTML = "";
	if ("" == classValue) {
		$("#systemInfo").combobox({
			disabled : true
		});
		$("#categoryInfo").combobox({
			disabled : true
		});
	} else {
		var setting = {
			data : application,
			url : "/IDMS0141/systemInfo.htm",
			hasLoading : true,
			success : function(data) {
				if (data.errorResultDto) {
					errors = data.errorResultDto.errorList;
					var messages = "";
					$.each(errors, function(i, err) {
						messages += err.errorMessage + "<br>";
					});
					$("#p_errorMessage")[0].innerHTML = messages;
				} else {
					var systemList = data.systemInfo;
					var arrList = new Array();
					arrList.push({
						"text" : COMBOBOX_BLANK_OPTION_TEXT,
						"value" : ""
					});
					if (systemList != null && systemList.length != 0) {
						for (var i = 0; i < systemList.length; i++) {
							arrList.push({
								"text" : systemList[i].systemName,
								"value" : systemList[i].systemCd
							});
						}
					}
					
					$("#systemInfo").combobox('loadData', arrList);
					$("#systemInfo").combobox('setValue', "");
					$('#systemInfo').combobox('enable');
				}
			}
		};
		postAjax(setting);
	}
}

// システムの値が変更し、カテゴリ情報を取得
function drpSystem_change() {
	var systemValue = $('#systemInfo').combobox('getValue');
	var application = {};
	application.systemInfo = systemValue;
	clearData();
	showForm();
	if ("" == systemValue) {
		$("#categoryInfo").combobox({
			disabled : true
		});
		$("#tr01").hide();
	} else {
		var setting = {
			data : application,
			url : "/IDMS0141/categoryInfo.htm",
			hasLoading : true,
			success : function(data) {
				if (data.errorResultDto) {
					errors = data.errorResultDto.errorList;
					var messages = "";
					$.each(errors, function(i, err) {
						messages += err.errorMessage + "<br>";
					});
					$("#p_errorMessage")[0].innerHTML = messages;
				} else {
					var categoryList = data.categoryInfo;
					var arrList = new Array();
					arrList.push({
						"text" : COMBOBOX_BLANK_OPTION_TEXT,
						"value" : ""
					});
					if (categoryList != null && categoryList.length != 0) {
						for (var i = 0; i < categoryList.length; i++) {
							arrList.push({
								"text" : categoryList[i].categoryName,
								"value" : categoryList[i].categoryCd
							});
						}
					}

					$("#categoryInfo").combobox('loadData', arrList);
					if (null != data.note) {
						$("#tr01").show();
						$("#comment")[0].innerHTML = data.note;
					} else {
						$("#tr01").hide();
						$("#comment")[0].innerHTML = "";
					}
					goRegisterDetailInputFlag = data.registerDetailInputFlag;
					$("#categoryInfo").combobox('setValue', "");
					$('#categoryInfo').combobox('enable');
				}
			}
		};
		postAjax(setting);
	}
}

// カテゴリ情報を変更し、申請時表示区分などの情報を取得する
function drpCategory_change() {
	var application = {};
	var systemInfo = $('#systemInfo').combobox('getValue');
	var categoryInfo = $('#categoryInfo').combobox('getValue');
	clearData();
	if ("" != categoryInfo && null != categoryInfo) {
		application.systemInfo = systemInfo;
		application.categoryInfo = categoryInfo;
		var setting = {
			data : application,
			url : "/IDMS0141/changeCategory.htm",
			hasLoading : true,
			success : function(data) {
				if (data.errorResultDto) {
					errors = data.errorResultDto.errorList;
					var messages = "";
					$.each(errors, function(i, err) {
						messages += err.errorMessage + "<br>";
					});
					$("#p_errorMessage")[0].innerHTML = messages;
				} else {
					data.registerDetailInputFlag = goRegisterDetailInputFlag;
					data.categoryInfo = categoryInfo;
					showInfo(data);
					goPattern.applciationCommonFormPattern = data.applciationCommonFormPattern;
					goPattern.applicationDetailFormType = data.applicationDetailFormType;
					goPattern.applicationDetailFormPattern = data.applicationDetailFormPattern;
					goPattern.applicationShowType = data.applicationShowType;
				}
			}
		};
		postAjax(setting);
	} else {
		showForm();
	}
}

// 画面の申請内容をクリアする
function clearData() {
	$('#useStartDate').datebox('setValue', '');
	$('#useFromDate').datebox('setValue', '');
	$('#useToDate').datebox('setValue', '');
}

// 画面の表示制御
function showInfo(data) {
	var applciationPatten = data.applciationCommonFormPattern;
	var categoryInfo = data.categoryInfo;
	if (null == applciationPatten) {
		return;
	}
	if (null == categoryInfo) {
		return;
	}
	var patten = {
		'1' : [ '1', '0', '1', '0', '1', '0', '0' ],
		'2' : [ '1', '0', '0', '1', '1', '0', '0' ],
		'3' : [ '1', '0', '0', '1', '2', '0', '0' ],
		'4' : [ '1', '0', '1', '0', '0', '0', '1' ],
		'5' : [ '0', '1', '2', '0', '0', '1', '0' ],
		'6' : [ '1', '0', '0', '1', '0', '0', '1' ],
		'7' : [ '1', '0', '2', '0', '2', '0', '0' ],
		'8' : [ '1', '0', '1', '0', '0', '1', '0' ],
		'9' : [ '1', '0', '0', '1', '0', '1', '0' ],
		'10' : [ '1', '0', '2', '0', '0', '0', '1' ],
		'11' : [ '0', '1', '1', '0', '1', '0', '0' ],
		'12' : [ '0', '1', '0', '1', '1', '0', '0' ],
		'13' : [ '0', '1', '1', '0', '0', '0', '1' ],
		'14' : [ '0', '1', '0', '1', '0', '0', '1' ],
		'15' : [ '0', '1', '2', '0', '2', '0', '0' ],
		'16' : [ '0', '1', '1', '0', '0', '0', '0' ],
		'17' : [ '0', '1', '0', '1', '0', '0', '0' ],
		'18' : [ '1', '0', '0', '1', '0', '0', '0' ],
		'19' : [ '1', '0', '1', '0', '0', '0', '0' ],
		'20' : [ '1', '0', '0', '1', '0', '0', '2' ],
		'21' : [ '0', '1', '1', '0', '0', '1', '0' ],
		'22' : [ '1', '0', '0', '1', '0', '2', '0' ],
		'23' : [ '1', '0', '2', '0', '0', '1', '0' ]
	};
	
	$('#useStartDate').datebox({
		required : false
	});
	$('#useFromDate').datebox({
		required : false
	});
	$('#useToDate').datebox({
		required : false
	});
	for (var i = 0; i < 7; i++) {
		var itemControll = patten[applciationPatten][i];
		// 利用開始
		if (i == 0) {
			if (itemControll == '1') {
				$("#tr02").show();
				$('#useStartDate').datebox('enable');
				$('#useStartDate').datebox({
					required : true,
					validType : 'dateVildate'
				});
			} else if (itemControll == '0') {
				$("#tr02").hide();
				$("#useStartDate").datebox({
					required : false
				});
			} else if (itemControll == '2') {
				$("#tr02").show();
				$("#useStartDate").datebox({
					disabled : true
				});
			}
		}

		// 利用期間－開始、終了
		if (i == 1) {
			if (itemControll == '1') {
				$("#tr03").show();
				$('#useFromDate').datebox('enable');
				$('#useToDate').datebox('enable');
				$('#useFromDate').datebox({
					required : true,
					validType : "minDate['useToDate', '利用期間']"
				});
				if ("16" == categoryInfo) {
					$('#useToDate').datebox({
						required : true,
						validType : "maxDate['useFromDate', '利用期間']"
					});
				} else {
					$('#useToDate').datebox({
						required : false,
						validType : "maxDate['useFromDate', '利用期間']"
					});
				}
			} else if (itemControll == '0') {
				$("#tr03").hide();
				$('#useFromDate').datebox({
					required : false
				});
				$('#useToDate').datebox({
					required : false
				});
			} else if (itemControll == '2') {
				$("#tr03").show();
				$("#useFromDate").datebox({
					disabled : true
				});
				$("#useToDate").datebox({
					disabled : true
				});
			}
		}
	}
}

// 次へボタンを押下した、このメッソドを実行
function btnNext_click() {
	$("#p_errorMessage")[0].innerHTML = "&nbsp;";
	var rowDatas = $('#dg').datagrid("getChecked");
	if ($('#IDMS0141Form').form('validate') == false) {
		$("#p_errorMessage")[0].innerHTML = "画面にエラーがありますので、修正してください。";
		return;
	}
	if(rowDatas.length == 0){
		$("#p_errorMessage")[0].innerHTML = getMessage("E1009",["利用者"]);
		return;
	}
	var pattern = goPattern.applciationCommonFormPattern;
	var intPattern = parseInt(pattern);
	var useFromDate = null;
	var useToDate = $('#useToDate').datebox('getValue');
	if (APPLCIATION_COMMON_FORM_PATTERN_FIVE == pattern
			|| (intPattern >= 11 && intPattern <= 17) 
			|| APPLCIATION_COMMON_FORM_PATTERN_TWENTY_FIRST == pattern) {
		useFromDate = $('#useFromDate').datebox('getValue');
	} else {
		useFromDate = $('#useStartDate').datebox('getValue');
	}
	next();
}

// 複数申請共通②画面を遷移する
function next(){
	var insertFlag = false;
	var rowDatas = $('#dg').datagrid("getChecked");
	var allRowDatas = $('#dg').datagrid("getData");
	var userList = new Array();
	if (goMode == 1) {
		goForm = {};
	}
	for(i = 0; i < rowDatas.length ; i++){
		var userId = rowDatas[i].userId;
		userList.push(userId);
		if(null != goForm.useInfoList && undefined != goForm.useInfoList && 0 < goForm.useInfoList.length){
			if(!isContain(goForm.useInfoList,userId)){
				insertFlag = true;
			}
		}
	}
	if(!insertFlag){
		if(null != goForm.useInfoList && undefined != goForm.useInfoList && 0 < goForm.useInfoList.length){
			for(j = 0; j < goForm.useInfoList.length ; j++){
				if(!isContain(userList,goForm.useInfoList[j])){
					insertFlag = true;
					break;
				}
			}
		}
	}
	if(insertFlag){
		parent.window._0142data = undefined;
		parent.window._0150data = undefined;
		goForm.userApplicationList = null;
		goForm.useAppContentList = null;
		goForm.useInfoList = null;
		goForm.mailAddressList = null;
	}
	goForm.useInfoList = userList;
	goForm.classInfo = $('#classInfo').combobox('getValue');
	goForm.classInfoName = $('#classInfo').combobox('getText');
	goForm.systemInfo = $('#systemInfo').combobox('getValue');
	goForm.systemInfoName = $('#systemInfo').combobox('getText');
	goForm.categoryInfo = $('#categoryInfo').combobox('getValue');
	goForm.categoryInfoName = $('#categoryInfo').combobox('getText');
	var pattern = goPattern.applciationCommonFormPattern;
	var intPattern = parseInt(pattern);
	if (APPLCIATION_COMMON_FORM_PATTERN_FIVE == pattern
			|| (intPattern >= 11 && intPattern <= 17) 
			|| APPLCIATION_COMMON_FORM_PATTERN_TWENTY_FIRST == pattern) {
		goForm.useFromDate = $('#useFromDate').datebox('getValue');
	} else {
		goForm.useFromDate = $('#useStartDate').datebox('getValue');
		goForm.useStartDate = $('#useStartDate').datebox('getValue');
	}
	goForm.useToDate = $('#useToDate').datebox('getValue');
	goForm.applciationCommonFormPattern = goPattern.applciationCommonFormPattern;
	goForm.applicationDetailFormType = goPattern.applicationDetailFormType;
	goForm.applicationDetailFormPattern = goPattern.applicationDetailFormPattern;
	goForm.applicationShowType = goPattern.applicationShowType;
	goForm.note = $("#comment")[0].innerHTML;
	goForm.registerDetailInputFlag = goRegisterDetailInputFlag;
	var setting = {
		data : JSON.stringify(goForm),
		url : "/IDMS0141/next.htm",
		hasLoading : true,
		hasContentType : true,
		success : function(data) {
			if (data.errorResultDto) {
				errors = data.errorResultDto.errorList;
				var messages = "";
				$.each(errors, function(i, err) {
					messages += err.errorMessage + "<br>";
				});
				$("#p_errorMessage")[0].innerHTML = messages;
			} else {
				parent.window._0141data = {allRowDatas:allRowDatas,checkedRowDatas:rowDatas};
				window.location.href = CONTEXT_PATH
						+ "/IDMS0142/IDMS0142.htm?mode=1";
			}
		}
	};
	postAjax(setting);
}

// 判定リストに値が存在かどうか
function isContain(arr,value)
{
  for(var i=0;i<arr.length;i++)
  {
     if(arr[i]==value)
      return true;
  }
  return false;
}

// ユーザ選択ボタンを押下した、、このメソッドを実行する
function btnSelectUser_click() {
	parent.getDialogObject().callback = function(data) {
		insertDataToDataGrid(data);
	};
	var title = "対象者選択";
	// showProspectiveEmployeeInfo: 内定者表示フラグ
	// authorityFlag: 権限表示フラグ
	// screenId:画面ID
	// 権限表示タイプは営業企画担当の場合、契約形態が仲介業者も含めて表示する
	// 権限表示タイプは営業企画担当以外の場合、契約形態が仲介業者以外を表示する
	//var url = "/IDMS0011/IDMS0011.htm?&checkFlag=2&showProspectiveEmployeeInfo=1&authorityFlag=1&screenId=IDMS0101";

	var applcantId = $('#applcantId').val();
	var organizationCd = $('#organizationCd').val();

	var url = "/IDMS0011/IDMS0011.htm" + "?" + "userId=" + applcantId + "&organizationCode=" + organizationCd + "&checkFlag=2&referenceFlag=1";

	var width = 652;
	var height = 610;
	parent.openMainDialog(title, url, width, height);
}

// 利用者の情報を初期化
function insertDataToDataGrid(data){
	if (null != data && null != data.endUserId && 0 < data.endUserId.length) {
		var arr = [], map = {};
		var allRowDatas = $('#dg').datagrid("getData").rows;
		for (var i = 0; i < data.endUserId.length; i++) {
			var notFound = true;
			for (var j = 0; j < allRowDatas.length; j++) {
				if (allRowDatas[j].userId == data.endUserId[i]) {
					notFound = false;
					break;
				}
			}
			if (notFound) {
				map[data.endUserId[i]] = "";
			}
		}
		for (key in map) {
			arr.push({
				userId : key
			});
		}
		if (arr.length == 0)
			return;
		var setting = {
			url : "/IDMS0141/getUserInfoByUserIdAndOrganizationCd.htm",
			hasLoading : true,
			data : JSON.stringify(arr),
			hasLoading : true,
			hasContentType : true,
			success : function(res) {
				if (res instanceof Array && res.length > 0) {
					for (var i = 0; i < res.length; i++)
						$('#dg').datagrid('appendRow', res[i]);
				}
				$('#dg').parent().find("div.datagrid-header-check").children("input[type='checkbox']").eq(0).attr("checked", false);
			}
		};
		postAjax(setting);
	}
}