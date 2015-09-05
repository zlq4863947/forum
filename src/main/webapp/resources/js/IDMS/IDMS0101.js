var goForm;
var goMode = 0;
var goExcuFlag = false;
var goAuthorityList = new Array();
var goRegisterDetailInputFlag = null;
// 画面を初期化
$(document)
		.ready(
				function() {
					goMode = $("#mode")[0].value;
					$("#tr01").hide();
					// メニュー画面から遷移
					if (goMode == 1) {
						applicationInfoLoad();
						showForm();
						goExcuFlag = true;
						// 申請詳細画面から遷移
					} else if (goMode == 2) {
						var setting = {
							data : null,
							url : "/IDMS0101/reloading.htm",
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
									// 差戻し後、申請詳細画面から遷移
									if (null != goForm.applicationId
											&& "" != goForm.applicationId) {
										initDisabled();
									}
									applicationContent(goForm);
									goExcuFlag = true;
								}
							}
						};
						postAjax(setting);
						// 差戻しから遷移
					} else if (goMode == 3) {
						var applicationId = $("#applicationId")[0].value;
						var endUserId = $("#endUserId")[0].value;
						var application = {};
						application.applicationId = applicationId;
						application.endUserId = endUserId;
						var setting = {
							data : application,
							url : "/IDMS0101/reApply.htm",
							hasLoading : true,
							success : function(res) {
								if (res.errorResultDto) {
									errors = res.errorResultDto.errorList;
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
									initDisabled();
									applicationContent(res.form);
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
							}
						}
					});
					// システムが変更し、対応カテゴリ情報を取得
					$("#systemInfo").combobox({
						onChange : function(n, o) {
							if (goExcuFlag) {
								drpSystem_change();
							}
						}
					});

					// カテゴリが変更し、申請内容表示かどうかを設定
					$("#categoryInfo").combobox({
						onChange : function(n, o) {
							if (goExcuFlag) {
								drpCategory_change();
								if (goMode == 2) {
									goForm.endUserOrganizationCd = '';
									goForm.applicationInfoItem = null;
								}
							}
						}
					});

					// ユーザアカウントが変更し、権限を取得
					$("#account2")
							.combobox(
									{
										onChange : function(n, o) {
											if (goExcuFlag
													&& "1" != goRegisterDetailInputFlag) {
												getAuthorityGroupInfo();
											}
										}
									});

					// ユーザアカウントが変更し、権限を取得
					$("#account1")
							.textbox(
									{
										onChange : function(n, o) {
											var applciationCommonFormPattern = $(
													'#applciationCommonFormPattern')
													.val();
											// 設計書のバージョン0.9.2により、ソースコードを対応する
											// START
											if (goExcuFlag
													&& ((APPLCIATION_COMMON_FORM_PATTERN_FOUR == applciationCommonFormPattern 
															|| APPLCIATION_COMMON_FORM_PATTERN_THIRTEEN == applciationCommonFormPattern)
													&& "1" != goRegisterDetailInputFlag)) {
												getAuthorityGroup();
											}
											// 設計書のバージョン0.9.2により、ソースコードを対応する END
										}
									});
					// 画面のサイズを設定
					var height = $(document).height();
					document.getElementById("application").style.height = (height - 120)
							+ "px";
					$("#searchInfo").bind('keydown', function(e) {
						if (e.keyCode == 13) {
							btnSearch_click();
						}
					});
					// ユーザ基本情報を変更する
					$("#employeeNo").textbox({
						onChange : function(n, o) {
							if (goExcuFlag) {
								drpCategory_change();
							}
						}
					});
				});

// 画面初期化、ボタンを制御する
function initDisabled() {
	$("#classInfo").combobox({
		disabled : true
	});
	$("#systemInfo").combobox({
		disabled : true
	});
	$("#categoryInfo").combobox({
		disabled : true
	});
	$("#btnSelectUser").linkbutton({
		disabled : true
	});
	$("#account1").textbox({
		disabled : true
	});
	$("#account2").combobox({
		disabled : true
	});
}
// 画面項目がデフォルトを設定
function showForm() {
	$("#tr02").show();
	$("#tr03").hide();
	$("#tr04").show();
	$("#tr05").hide();
	$("#tr06").show();
	$("#tr07").hide();
	$("#tr08").hide();
	$('#account1').textbox('enable');
	$('#useStartDate').datebox('enable');
	$('#authorityGroup').textbox('enable');
	$('#authorityGroupButton01').linkbutton({
		disabled : false
	});
	$('#account1').textbox({
		required : false
	});
	$('#useStartDate').datebox({
		required : false
	});
	$('#authorityGroup').textbox({
		required : false
	});
}

// 権限一覧が非活性設定
function setDisabled() {
	$('#searchInfo')[0].value = "";
	$("#tblAuthority").css({
		"background" : "rgb(235, 235, 228)"
	});
	$("#authorityList").css({
		"background" : "rgb(235, 235, 228)"
	});
	$('#searchInfo').attr("disabled", true);

	$("#searchInfo").css({
		"background" : "rgb(235, 235, 228)"
	});
	$('#btnSearch').linkbutton({
		disabled : true
	});
	$("#authorityList").attr("disabled", true);

	$('#moveLeft').linkbutton({
		disabled : true
	});
	$('#moveAllLeft').linkbutton({
		disabled : true
	});
	$('#moveRight').linkbutton({
		disabled : true
	});
	$('#moveAllRight').linkbutton({
		disabled : true
	});
}

// 権限一覧が活性設定
function removeDisabled() {
	$("#tblAuthority").css({
		"background" : ""
	});
	$("#authorityList").css({
		"background" : ""
	});
	$('#searchInfo').attr("disabled", false);
	$("#searchInfo").css({
		"background" : ""
	});
	$('#btnSearch').linkbutton({
		disabled : false
	});
	$("#authorityList").attr("disabled", false);

	$('#moveLeft').linkbutton({
		disabled : false
	});
	$('#moveAllLeft').linkbutton({
		disabled : false
	});
	$('#moveRight').linkbutton({
		disabled : false
	});
	$('#moveAllRight').linkbutton({
		disabled : false
	});
}
// 「ユーザアカウント（入力）」に入力した情報により、権限/グループ/メニュー情報を取得する
function getAuthorityGroup() {
	var account = $("#account1").textbox('getValue');
	var applicationShowType = $('#applicationShowType').val();
	var applciationCommonFormPattern = $('#applciationCommonFormPattern').val();
	var execFlag = false;
	if (('' == account || null == account)
			&& APPLICATION_SHOW_TYPE_ONE != applicationShowType) {
		$("#authorityList")[0].options.length = 0;
		$("#selectList")[0].options.length = 0;
		$("#selectList").addClass(
				"textbox-invalid textbox-prompt validatebox-invalid");
		$("#selectList").attr("disabled", true);
		setDisabled();
		return;
	}
	// 設計書のバージョン0.9.2により、ソースコードを対応する START
	if ((APPLCIATION_COMMON_FORM_PATTERN_FOUR == applciationCommonFormPattern 
			|| APPLCIATION_COMMON_FORM_PATTERN_THIRTEEN == applciationCommonFormPattern)
			&& APPLICATION_SHOW_TYPE_ONE != applicationShowType) {
		execFlag = true;
	}
	if (execFlag){
		var application = {};
		application.applicationShowType = applicationShowType;
		application.applciationCommonFormPattern = applciationCommonFormPattern;
		application.account2 = account;
		application.systemInfo = $("#systemInfo").combobox("getValue");
		application.endUserId = $('#endUserId').val();
		showAuthorityList(application);
	}
	// 設計書のバージョン0.9.2により、ソースコードを対応する END
}

// ユーザアカウント（選択）に選択した情報により、権限/グループ/メニュー情報を取得する
function getAuthorityGroupInfo() {
	var applicationShowType = $('#applicationShowType').val();
	var applciationCommonFormPattern = $('#applciationCommonFormPattern').val();
	var account = $("#account2").combobox('getValue');
	// ユーザアカウントが非空、且つ申請共通画面パターンの値は6、14、且つ、申請時表示区分が表示
	// 設計書のバージョン0.9.2により、ソースコードを対応する START
	var application = {};
	application.applicationShowType = applicationShowType;
	application.applciationCommonFormPattern = applciationCommonFormPattern;
	application.account2 = account;
	application.systemInfo = $("#systemInfo").combobox("getValue");
	application.endUserId = $('#endUserId').val();
	if ('' != account && null != account) {
		if ((APPLCIATION_COMMON_FORM_PATTERN_SIX == applciationCommonFormPattern
				|| APPLCIATION_COMMON_FORM_PATTERN_FOURTEEN == applciationCommonFormPattern 
				|| APPLCIATION_COMMON_FORM_PATTERN_TWENTY == applciationCommonFormPattern)
				&& (APPLICATION_SHOW_TYPE_ONE == applicationShowType
						|| APPLICATION_SHOW_TYPE_TWO == applicationShowType
						|| APPLICATION_SHOW_TYPE_THREE == applicationShowType
						|| APPLICATION_SHOW_TYPE_FOUR == applicationShowType 
						|| APPLICATION_SHOW_TYPE_FIVE == applicationShowType)) {
			// 権限/グループ/メニュー検索条件部、権限/グループ/メニュー一覧情報を取得する
			showAuthorityList(application);
		} else if (APPLCIATION_COMMON_FORM_PATTERN_TWO == applciationCommonFormPattern
				|| APPLCIATION_COMMON_FORM_PATTERN_THREE == applciationCommonFormPattern
				|| APPLCIATION_COMMON_FORM_PATTERN_TWELVE == applciationCommonFormPattern) {
			// 権限/グループ/メニュー（入力）部、権限/グループ/メニュー情報を取得する
			getAuthorityInfo(application);
		}else if(APPLCIATION_COMMON_FORM_PATTERN_NINE == applciationCommonFormPattern
				|| APPLCIATION_COMMON_FORM_PATTERN_TWENTY_SECOND == applciationCommonFormPattern){
			showAuthorityList(application);
		}
	} else {
		$("#authorityGroup").textbox("setValue", "");
		$("#authorityInfo").combobox("setValue", "");
		if (APPLICATION_SHOW_TYPE_ONE != applicationShowType) {
			$("#authorityList")[0].options.length = 0;
			$("#selectList")[0].options.length = 0;
			if ((APPLCIATION_COMMON_FORM_PATTERN_SIX == applciationCommonFormPattern
					|| APPLCIATION_COMMON_FORM_PATTERN_FOURTEEN == applciationCommonFormPattern || APPLCIATION_COMMON_FORM_PATTERN_TWENTY == applciationCommonFormPattern)
					&& (APPLICATION_SHOW_TYPE_ONE == applicationShowType
							|| APPLICATION_SHOW_TYPE_TWO == applicationShowType
							|| APPLICATION_SHOW_TYPE_THREE == applicationShowType
							|| APPLICATION_SHOW_TYPE_FOUR == applicationShowType || APPLICATION_SHOW_TYPE_FIVE == applicationShowType)) {
				$("#selectList").addClass(
						"textbox-invalid textbox-prompt validatebox-invalid");
				setDisabled();
				$("#selectList").attr("disabled", true);
			}
		}
	}
	// 設計書のバージョン0.9.2により、ソースコードを対応する END
}

// ユーザアカウントにより、権限/グループ/メニュー（入力）部、権限/グループ/メニュー情報を取得する
function getAuthorityInfo(application) {
	var setting = {
		data : application,
		url : "/IDMS0101/authorityInfo.htm",
		hasLoading : true,
		success : function(res) {
			if (res.errorResultDto) {
				errors = res.errorResultDto.errorList;
				var messages = "";
				$.each(errors, function(i, err) {
					messages += err.errorMessage + "<br>";
				});
				$("#p_errorMessage")[0].innerHTML = messages;
			} else {
				$("#authorityGroup").textbox("setValue", res.authorityGroup);
			}
		}
	};
	postAjax(setting);
}

// ユーザアカウントにより、権限/グループ/メニュー検索条件部、権限/グループ/メニュー一覧情報を取得する
function showAuthorityList(application) {
	var setting = {
		data : application,
		url : "/IDMS0101/authorityGroup.htm",
		hasLoading : true,
		success : function(res) {
			if (res.errorResultDto) {
				errors = res.errorResultDto.errorList;
				var messages = "";
				$.each(errors, function(i, err) {
					messages += err.errorMessage + "<br>";
				});
				$("#p_errorMessage")[0].innerHTML = messages;
			} else {
				$("#authorityList")[0].options.length = 0;
				$("#selectList")[0].options.length = 0;
				if (null != res.authorityList && 0 != res.authorityList.length) {
					for (var i = 0; i < res.authorityList.length; i++) {
						var no = new Option();
						no.value = res.authorityList[i].value;
						no.text = res.authorityList[i].text;
						$("#authorityList")[0].add(no);
					}
					goAuthorityList = res.authorityList;
					removeDisabled();
					$("#selectList").attr("disabled", false);
				}
				if (null != res.selectList && 0 != res.selectList.length) {
					if(APPLCIATION_COMMON_FORM_PATTERN_NINE == application.applciationCommonFormPattern
							|| APPLCIATION_COMMON_FORM_PATTERN_TWENTY_SECOND == application.applciationCommonFormPattern){
						$("#authorityInfo").combobox("setValue",res.selectList[0].value);
						return ;
					}
					for (var i = 0; i < res.selectList.length; i++) {
						var no = new Option();
						no.value = res.selectList[i].value;
						no.text = res.selectList[i].text;
						$("#selectList")[0].add(no);
					}
					$("#selectList")
							.removeClass(
									"textbox-invalid textbox-prompt validatebox-invalid");
					// パターンが"20"の場合、権限一覧情報が修正不可に設定する
					if (APPLCIATION_COMMON_FORM_PATTERN_TWENTY == application.applciationCommonFormPattern) {
						$("#selectList").css({
							"background" : "rgb(235, 235, 228)"
						});
						$("#selectList").attr("disabled", true);
					} else {
						$("#selectList").css({
							"background" : ""
						});
						$("#selectList").attr("disabled", false);
						removeDisabled();
					}
				} else {
					if(APPLCIATION_COMMON_FORM_PATTERN_NINE != application.applciationCommonFormPattern
							&& APPLCIATION_COMMON_FORM_PATTERN_TWENTY_SECOND != application.applciationCommonFormPattern){
						$("#selectList")
						.addClass(
								"textbox-invalid textbox-prompt validatebox-invalid");
					}
				}
				if ((null == res.authorityList || 0 == res.authorityList.length)
						&& (null == res.selectList || 0 == res.selectList.length)) {
					$("#authorityList")[0].options.length = 0;
					$("#selectList")[0].options.length = 0;
					$("#selectList")
							.addClass(
									"textbox-invalid textbox-prompt validatebox-invalid");
					$("#selectList").attr("disabled", true);
					setDisabled();
				}
			}
		}
	};
	postAjax(setting);
}

// 画面の項目の値を設定する
function applicationContent(form) {
	goRegisterDetailInputFlag = form.registerDetailInputFlag;
	var patten = form.applciationCommonFormPattern;
	document.getElementById('organizationCode').value = form.organizationCode;
	$("#organizationName").textbox("setValue", form.organizationName);
	document.getElementById('contractCode').value = form.contractCode;
	$("#contractName").textbox("setValue", form.contractName);
	document.getElementById('endUserId').value = form.endUserId;
	$("#userAlias").textbox("setValue", form.userAlias);
	$("#employeeNo").textbox("setValue", form.employeeNo);
	$("#userName").textbox("setValue", form.userName);
	$("#classInfo").combobox("setValue", form.classInfo);
	$("#systemInfo").combobox("setValue", form.systemInfo);
	$("#categoryInfo").combobox("setValue", form.categoryInfo);
	// 設計書のバージョン0.9.2により、ソースコードを対応する START
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

	if (APPLCIATION_COMMON_FORM_PATTERN_TWO != patten
			&& APPLCIATION_COMMON_FORM_PATTERN_THREE != patten
			&& APPLCIATION_COMMON_FORM_PATTERN_SIX != patten
			&& APPLCIATION_COMMON_FORM_PATTERN_NINE != patten
			&& APPLCIATION_COMMON_FORM_PATTERN_TWELVE != patten
			&& APPLCIATION_COMMON_FORM_PATTERN_FOURTEEN != patten
			&& APPLCIATION_COMMON_FORM_PATTERN_SEVENTEEN != patten
			&& APPLCIATION_COMMON_FORM_PATTERN_EIGHTEEN != patten
			&& APPLCIATION_COMMON_FORM_PATTERN_TWENTY != patten
			&& APPLCIATION_COMMON_FORM_PATTERN_TWENTY_SECOND != patten) {
		$("#account1").textbox("setValue", form.account1);
	} else {
		var accountList = new Array();
		if (form.account3 != null && form.account3.length != 0) {
			accountList.push({
				"text" : COMBOBOX_BLANK_OPTION_TEXT,
				"value" : ""
			});
			for (var i = 0; i < form.account3.length; i++) {
				accountList.push({
					"text" : form.account3[i].text,
					"value" : form.account3[i].value
				});
			}
		}
		$("#account2").combobox('loadData', accountList);
		$("#account2").combobox("setValue", form.account1);
	}

	if (APPLCIATION_COMMON_FORM_PATTERN_ONE == patten
			|| APPLCIATION_COMMON_FORM_PATTERN_TWO == patten
			|| APPLCIATION_COMMON_FORM_PATTERN_THREE == patten
			|| APPLCIATION_COMMON_FORM_PATTERN_SEVEN == patten
			|| APPLCIATION_COMMON_FORM_PATTERN_ELEVEN == patten
			|| APPLCIATION_COMMON_FORM_PATTERN_TWELVE == patten
			|| APPLCIATION_COMMON_FORM_PATTERN_FIFTEEN == patten) {
		$("#authorityGroup").textbox("setValue", form.authorityGroup);
	} else if (APPLCIATION_COMMON_FORM_PATTERN_FIVE == patten
			|| APPLCIATION_COMMON_FORM_PATTERN_EIGHT == patten
			|| APPLCIATION_COMMON_FORM_PATTERN_NINE == patten
			|| APPLCIATION_COMMON_FORM_PATTERN_TWENTY_FIRST == patten
			|| APPLCIATION_COMMON_FORM_PATTERN_TWENTY_SECOND == patten
			|| APPLCIATION_COMMON_FORM_PATTERN_TWENTY_THREE == patten) {
		var authorityListInfo = new Array();
		if (form.authorityList != null && form.authorityList.length != 0) {
			authorityListInfo.push({
				"text" : COMBOBOX_BLANK_OPTION_TEXT,
				"value" : ""
			});
			for (var i = 0; i < form.authorityList.length; i++) {
				authorityListInfo.push({
					"text" : form.authorityList[i].text,
					"value" : form.authorityList[i].value
				});
			}
		}
		$("#authorityInfo").combobox('loadData', authorityListInfo);
		$("#authorityInfo").combobox("setValue", form.authorityInfo);
	} else {
		if (APPLCIATION_COMMON_FORM_PATTERN_TWENTY != patten
				&& null != form.authorityListInfo
				&& 0 != form.authorityListInfo.length) {
			for (var i = 0; i < form.authorityListInfo.length; i++) {
				var no = new Option();
				no.value = form.authorityListInfo[i].value;
				no.text = form.authorityListInfo[i].text;
				$("#authorityList")[0].add(no);
			}
			goAuthorityList = form.authorityListInfo;
			removeDisabled();
		}
		if (null != form.selectListInfo && 0 != form.selectListInfo.length) {
			for (var i = 0; i < form.selectListInfo.length; i++) {
				var no = new Option();
				no.value = form.selectListInfo[i].value;
				no.text = form.selectListInfo[i].text;
				$("#selectList")[0].add(no);
			}
			$("#selectList").removeClass(
					"textbox-invalid textbox-prompt validatebox-invalid");
			removeDisabled();
		}
		if (APPLCIATION_COMMON_FORM_PATTERN_TWENTY == patten) {
			$("#selectList").attr("disabled", true);
			$("#selectList").css({
				"background" : "rgb(235, 235, 228)"
			});
			setDisabled();
		} else {
			$("#selectList").css({
				"background" : ""
			});
			$("#selectList").attr("disabled", false);
		}
	}
	// 設計書のバージョン0.9.2により、ソースコードを対応する END
	$("#applicationReason").textbox("setValue", form.applicationReason);

	// add start by chengang
	goPattern.applciationCommonFormPattern = form.applciationCommonFormPattern;
	goPattern.applicationDetailFormType = form.applicationDetailFormType;
	goPattern.applicationDetailFormPattern = form.applicationDetailFormPattern;
	goPattern.applicationShowType = form.applicationShowType;
	// add end by chengang

	$('#applciationCommonFormPattern')[0].value = patten;
	$('#applicationDetailFormType')[0].value = form.applicationDetailFormType;
	$('#applicationDetailFormPattern')[0].value = form.applicationDetailFormPattern;
	$('#applicationShowType')[0].value = form.applicationShowType;
	if (null != form.note) {
		$("#tr01").show();
		$("#comment")[0].innerHTML = form.note;
	}
}

// add start by chengang
var goPattern = {};
// add end by chengang

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
		url : "/IDMS0101/classInfo.htm",
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
			url : "/IDMS0101/systemInfo.htm",
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
			url : "/IDMS0101/categoryInfo.htm",
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
	var endUserId = $('#endUserId')[0].value;
	clearData();
	if ("" != categoryInfo && null != categoryInfo) {
		application.systemInfo = systemInfo;
		application.categoryInfo = categoryInfo;
		application.endUserId = endUserId;
		var setting = {
			data : application,
			url : "/IDMS0101/changeCategory.htm",
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
					var pattern = data.applciationCommonFormPattern;
					var showType = data.applicationShowType;

					// add start by chengang
					goPattern.applciationCommonFormPattern = data.applciationCommonFormPattern;
					goPattern.applicationDetailFormType = data.applicationDetailFormType;
					goPattern.applicationDetailFormPattern = data.applicationDetailFormPattern;
					goPattern.applicationShowType = data.applicationShowType;
					// add end by chengang

					document.getElementById('applciationCommonFormPattern').value = pattern;
					document.getElementById('applicationDetailFormType').value = data.applicationDetailFormType;
					document.getElementById('applicationDetailFormPattern').value = data.applicationDetailFormPattern;
					document.getElementById('applicationShowType').value = showType;
					var accountList = new Array();
					if (data.account3 != null && data.account3.length != 0) {
						accountList.push({
							"text" : COMBOBOX_BLANK_OPTION_TEXT,
							"value" : ""
						});
						for (var i = 0; i < data.account3.length; i++) {
							accountList.push({
								"text" : data.account3[i].text,
								"value" : data.account3[i].value
							});
						}
					}
					$("#account2").combobox('loadData', accountList);

					if (APPLCIATION_COMMON_FORM_PATTERN_FIVE == pattern
							|| APPLCIATION_COMMON_FORM_PATTERN_SEVEN == pattern
							|| APPLCIATION_COMMON_FORM_PATTERN_TEN == pattern
							|| APPLCIATION_COMMON_FORM_PATTERN_FIFTEEN == pattern
							|| APPLCIATION_COMMON_FORM_PATTERN_TWENTY_THREE == pattern) {
						$('#account1').textbox('setValue',
								$('#userAlias').textbox('getValue'));
					}

					// 登録時詳細入力フラグが"1"以外場合、権限情報を設定する
					if ("1" != goRegisterDetailInputFlag) {
						// 権限/グループ/メニュー（選択）情報を設定する
						var authorityListInfo = new Array();
						if (data.authorityInfo != null
								&& data.authorityInfo.length != 0) {
							authorityListInfo.push({
								"text" : COMBOBOX_BLANK_OPTION_TEXT,
								"value" : ""
							});
							for (var i = 0; i < data.authorityInfo.length; i++) {
								authorityListInfo.push({
									"text" : data.authorityInfo[i].text,
									"value" : data.authorityInfo[i].value
								});
							}
						}
						$("#authorityInfo").combobox('loadData', authorityListInfo);
						// 設計書のバージョン0.9.2により、ソースコードを対応する START
						// if (APPLCIATION_COMMON_FORM_PATTERN_FOUR == pattern
						// || APPLCIATION_COMMON_FORM_PATTERN_SIX == pattern
						// || APPLCIATION_COMMON_FORM_PATTERN_THIRTEEN ==
						// pattern
						// || APPLCIATION_COMMON_FORM_PATTERN_FOURTEEN ==
						// pattern) {
						// if (APPLICATION_SHOW_TYPE_TWO == showType
						// || APPLICATION_SHOW_TYPE_THREE == showType
						// || APPLICATION_SHOW_TYPE_FOUR == showType
						// || APPLICATION_SHOW_TYPE_FIVE == showType) {
						// setDisabled();
						// }
						// }
						if (APPLCIATION_COMMON_FORM_PATTERN_TEN == pattern
								|| ((APPLCIATION_COMMON_FORM_PATTERN_FOUR == pattern
										|| APPLCIATION_COMMON_FORM_PATTERN_SIX == pattern
										|| APPLCIATION_COMMON_FORM_PATTERN_THIRTEEN == pattern || APPLCIATION_COMMON_FORM_PATTERN_FOURTEEN == pattern) && APPLICATION_SHOW_TYPE_ONE == showType)) {
							if (null != data.authorityList
									&& 0 != data.authorityList.length) {
								for (var i = 0; i < data.authorityList.length; i++) {
									var no = new Option();
									no.value = data.authorityList[i].value;
									no.text = data.authorityList[i].text;
									$("#authorityList")[0].add(no);
								}
								goAuthorityList = data.authorityList;
								removeDisabled();
							}
						}
					}
				}
				// 設計書のバージョン0.9.2により、ソースコードを対応する END
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
	$('#account1').textbox('setValue', '');
	$('#account2').combobox('setValue', '');
	$('#searchInfo')[0].value = "";
	$('#authorityGroup').textbox('setValue', '');
	$('#applicationReason').textbox('setValue', '');
	$('#authorityInfo').combobox('setValue', '');
	$("#authorityList")[0].options.length = 0;
	$("#selectList")[0].options.length = 0;
	if (!$("#tr08").is(":hidden")) {
		$("#selectList").addClass(
				"textbox-invalid textbox-prompt validatebox-invalid");
	}
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
	// 設計書のバージョン0.9.2により、ソースコードを対応する START
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
	if (APPLCIATION_COMMON_FORM_PATTERN_ONE != applciationPatten
			&& APPLCIATION_COMMON_FORM_PATTERN_FOUR != applciationPatten
			&& APPLCIATION_COMMON_FORM_PATTERN_ELEVEN != applciationPatten
			&& APPLCIATION_COMMON_FORM_PATTERN_THIRTEEN != applciationPatten
			&& APPLCIATION_COMMON_FORM_PATTERN_SIXTEEN != applciationPatten
			&& APPLCIATION_COMMON_FORM_PATTERN_TWENTY_FIRST != applciationPatten) {
		$("#authorityGroupButton01").linkbutton({
			disabled : true
		});
		// 設計書のバージョン0.9.2により、ソースコードを対応する END
		$("#authorityGroupButton02").linkbutton({
			disabled : true
		});
		$("#authorityGroupButton03").linkbutton({
			disabled : true
		});
	} else {
		$('#authorityGroupButton01').linkbutton('enable');
		$('#authorityGroupButton02').linkbutton('enable');
		$('#authorityGroupButton03').linkbutton('enable');
	}
	$('#useStartDate').datebox({
		required : false
	});
	$('#useFromDate').datebox({
		required : false
	});
	$('#useToDate').datebox({
		required : false
	});
	$('#account1').textbox({
		required : false
	});
	$('#authorityGroup').textbox({
		required : false
	});

	$("#account2").combobox({
		required : false
	});

	$("#authorityInfo").combobox({
		required : false,
		disabled : false
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
				// 0.9.5 利用期間－終了を期間指定開放の場合のみ必須項目とするように修正 START
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
				// 0.9.5 利用期間－終了を期間指定開放の場合のみ必須項目とするように修正 END
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
		// ユーザアカウント（入力）
		if (i == 2) {
			if (itemControll == '1') {
				$("#tr04").show();
				$('#account1').textbox('enable');

				// IFA-PORTAL
				if($('#systemInfo').combobox('getValue') == '41'){
					$('#account1').textbox({
						required: true,
						validType:['isAlphabetNum','length[6,16]']
					});
				} else {
					$('#account1').textbox({
						required : true,
						validType : [ 'isAlphabetNum', 'maxLength[100]' ]
					});
				}

			} else if (itemControll == '0') {
				$("#tr04").hide();
				$("#account1").textbox({
					required : false
				});
			} else if (itemControll == '2') {
				$("#tr04").show();
				$("#account1").textbox({
					disabled : true
				});
			}

		}
		// ユーザアカウント（選択）
		if (i == 3) {
			if (itemControll == '1') {
				$("#tr05").show();
				$('#account2').combobox('enable');
				$("#account2").combobox({
					required : true,
					validType : "needSelect['#account2']"
				});
			} else if (itemControll == '0') {
				$("#tr05").hide();
				$("#account2").combobox({
					required : false
				});
			} else if (itemControll == '2') {
				$("#tr05").show();
				$("#account2").combobox({
					disabled : true
				});
			}
		}
		// 登録時詳細入力フラグが'1'の場合、権限情報を表示しない
		if ("1" == data.registerDetailInputFlag) {
			$("#tr06").hide();
			$("#tr07").hide();
			$("#tr08").hide();
			$('#authorityGroup').textbox({
				required : false
			});
			$("#authorityInfo").combobox({
				required : false
			});
			$("#selectList").removeClass(
					"textbox-invalid textbox-prompt validatebox-invalid");
		} else {
			// 権限/グループ/メニュー（入力）
			if (i == 4) {
				if (itemControll == '1') {
					$("#tr06").show();
					$('#authorityGroup').textbox('enable');
					$('#authorityGroup').textbox({
						required : true,
						validType : 'maxLength[100]'
					});
				} else if (itemControll == '0') {
					$("#tr06").hide();
					$('#authorityGroup').textbox({
						required : false
					});
				} else if (itemControll == '2') {
					$("#tr06").show();
					$("#authorityGroup").textbox({
						disabled : true
					});
				}
			}
			// 権限/グループ/メニュー（選択）
			if (i == 5) {
				if (itemControll == '1') {
					$("#tr07").show();
					$('#authorityInfo').combobox('enable');
					$("#authorityInfo").combobox({
						required : true,
						validType : "needSelect['#authorityInfo']"
					});
				} else if (itemControll == '0') {
					$("#tr07").hide();
					$("#authorityInfo").combobox({
						required : false
					});
				} else if (itemControll == '2') {
					$("#tr07").show();
					$("#authorityInfo").combobox({
						disabled : true
					});
				}
			}
			// 権限/グループ/メニュー検索条件
			if (i == 6) {
				if (itemControll == '1') {
					var applicationShowType = data.applicationShowType;
					if (APPLICATION_SHOW_TYPE_ONE != applicationShowType
							&& APPLICATION_SHOW_TYPE_TWO != applicationShowType
							&& APPLICATION_SHOW_TYPE_THREE != applicationShowType
							&& APPLICATION_SHOW_TYPE_FOUR != applicationShowType
							&& APPLICATION_SHOW_TYPE_FIVE != applicationShowType) {
						$("#tr08").hide();
						$("#selectList")
								.removeClass(
										"textbox-invalid textbox-prompt validatebox-invalid");
					} else {
						$("#tr08").show();
						$("#selectList")
								.addClass(
										"textbox-invalid textbox-prompt validatebox-invalid");
					}
					setDisabled();
					$("#selectList").attr("disabled", true);
				} else if (itemControll == '0') {
					$("#tr08").hide();
					$("#selectList")
							.removeClass(
									"textbox-invalid textbox-prompt validatebox-invalid");
					$("#selectList").attr("disabled", false);
					removeDisabled();
				} else if (itemControll == '2') {
					$("#tr08").show();
					$("#selectList").css({
						"background" : "rgb(235, 235, 228)"
					});
					$("#selectList").attr("disabled", true);
					setDisabled();
				}
			}
		}
	}
}

// 次へボタンを押下した、このメッソドを実行
function btnNext_click() {
	var selectedFlag = false;
	var endUserId = $('#endUserId')[0].value;
	if (!$("#tr08").is(":hidden") && 0 == $("#selectList")[0].options.length) {
		selectedFlag = true;
	}
	if ($('#IDMS0101Form').form('validate') == false || selectedFlag) {
		$("#p_errorMessage")[0].innerHTML = "画面にエラーがありますので、修正してください。";
		return;
	}
	if (goMode == 1) {
		goForm = {};
	} else {
		if (goForm.endUserId != endUserId) {
			goForm.endUserOrganizationOfficeCd = "";
		}
	}
	goForm.organizationCode = $('#organizationCode').val();
	goForm.organizationName = $('#organizationName').textbox('getValue');
	goForm.contractCode = $('#contractCode').val();
	goForm.contractName = $('#contractName').textbox('getValue');
	goForm.endUserId = endUserId;
	goForm.userAlias = $('#userAlias').textbox('getValue');
	goForm.employeeNo = $('#employeeNo').textbox('getValue');
	goForm.userName = $('#userName').textbox('getValue');
	goForm.classInfo = $('#classInfo').combobox('getValue');
	goForm.classInfoName = $('#classInfo').combobox('getText');
	goForm.systemInfo = $('#systemInfo').combobox('getValue');
	goForm.systemInfoName = $('#systemInfo').combobox('getText');
	goForm.categoryInfo = $('#categoryInfo').combobox('getValue');
	goForm.categoryInfoName = $('#categoryInfo').combobox('getText');
	var pattern = $('#applciationCommonFormPattern')[0].value;
	// 設計書のバージョン0.9.2により、ソースコードを対応する START
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
	if (APPLCIATION_COMMON_FORM_PATTERN_TWO != pattern
			&& APPLCIATION_COMMON_FORM_PATTERN_THREE != pattern
			&& APPLCIATION_COMMON_FORM_PATTERN_SIX != pattern
			&& APPLCIATION_COMMON_FORM_PATTERN_NINE != pattern
			&& APPLCIATION_COMMON_FORM_PATTERN_TWELVE != pattern
			&& APPLCIATION_COMMON_FORM_PATTERN_FOURTEEN != pattern
			&& APPLCIATION_COMMON_FORM_PATTERN_SEVENTEEN != pattern
			&& APPLCIATION_COMMON_FORM_PATTERN_EIGHTEEN != pattern
			&& APPLCIATION_COMMON_FORM_PATTERN_TWENTY != pattern
			&& APPLCIATION_COMMON_FORM_PATTERN_TWENTY_SECOND != pattern) {
		goForm.account1 = $('#account1').textbox('getValue');
	} else {
		goForm.account2 = $('#account2').combobox('getValue');
		goForm.account1 = $('#account2').combobox('getValue');
	}
	// 設計書のバージョン0.9.2により、ソースコードを対応する END
	goForm.authorityGroup = $('#authorityGroup').textbox('getValue');
	goForm.authorityInfo = $('#authorityInfo').combobox('getValue');
	goForm.authorityName = $('#authorityInfo').combobox('getText');
	goForm.applicationReason = $('#applicationReason').textbox('getValue');

	// add start by chengang
	// goForm.applciationCommonFormPattern =
	// $('#applciationCommonFormPattern')[0].value;
	// goForm.applicationDetailFormType =
	// $('#applicationDetailFormType')[0].value;
	// goForm.applicationDetailFormPattern =
	// $('#applicationDetailFormPattern')[0].value;
	// goForm.applicationShowType = $('#applicationShowType')[0].value;

	goForm.applciationCommonFormPattern = goPattern.applciationCommonFormPattern;
	goForm.applicationDetailFormType = goPattern.applicationDetailFormType;
	goForm.applicationDetailFormPattern = goPattern.applicationDetailFormPattern;
	goForm.applicationShowType = goPattern.applicationShowType;
	// add end by chengang

	goForm.note = $("#comment")[0].innerHTML;
	goForm.registerDetailInputFlag = goRegisterDetailInputFlag;
	goForm.taskId = $("#taskId")[0].value;
	var autority = document.getElementById('authorityList').options;
	// 一覧権限
	if (null != autority && autority.length != 0) {
		var authorityList = new Array();
		for (var i = 0; i < autority.length; i++) {
			authorityList.push({
				"text" : autority[i].text,
				"value" : autority[i].value
			});
		}
		goForm.authorityListInfo = authorityList;
	} else {
		goForm.authorityListInfo = null;
	}
	// 選択権限
	var authoritySelected = document.getElementById('selectList').options;
	if (null != authoritySelected && authoritySelected.length != 0) {
		var selectList = new Array();
		for (var i = 0; i < authoritySelected.length; i++) {
			selectList.push({
				"text" : authoritySelected[i].text,
				"value" : authoritySelected[i].value
			});
		}
		goForm.selectListInfo = selectList;
	} else {
		goForm.selectListInfo = null;
	}
	var setting = {
		data : JSON.stringify(goForm),
		url : "/IDMS0101/next.htm",
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
				window.location.href = CONTEXT_PATH
						+ "/IDMS0111/IDMS0111.htm?mode=1";
			}
		}
	};
	postAjax(setting);
}

// ユーザ選択ボタンを押下した、、このメソッドを実行する
function btnSelectUser_click(selectType) {
	parent.getDialogObject().callback = function(data) {
		if (1 == selectType) {
			setUserInfo(data);
		} else {
			setAuthorityInfo(data);
		}
	};
	var title = "対象者選択";
	var endUserId = null;
	var organizationCode = null;
	if (1 == selectType) {
		endUserId = $('#endUserId').val();
		organizationCode = $('#organizationCode').val();
	}
	// 0.9.3 アクション一覧に権限制御の記述を追加 START
	var url = "/IDMS0011/IDMS0011.htm" + "?" + "userId=" + endUserId
			+ "&organizationCode=" + organizationCode + "&checkFlag=1";

	/*
	// showProspectiveEmployeeInfo: 内定者表示フラグ
	// authorityFlag: 権限表示フラグ
	// screenId:画面ID
	// 権限表示タイプは営業企画担当の場合、契約形態が仲介業者も含めて表示する
	// 権限表示タイプは営業企画担当以外の場合、契約形態が仲介業者以外を表示する
	if (1 == selectType) {
		url = url + "&showProspectiveEmployeeInfo=1&authorityFlag=1"
				+ "&screenId=IDMS0101";
		// 0.9.6 他ユーザ参照ボタンの対象ユーザは申請者と同じ組織のユーザのみに修正 START
		// 他のユーザの権限を参照する場合、「referenceFlag」は"1"に設定する
	} else {
		url = url + "&referenceFlag=1";
	}
	*/

	url = url + "&referenceFlag=1";

	// 0.9.6 他ユーザ参照ボタンの対象ユーザは申請者と同じ組織のユーザのみに修正 END
	// 0.9.3 アクション一覧に権限制御の記述を追加 END
	var width = 652;
	var height = 610;
	parent.openMainDialog(title, url, width, height);
}

// ユーザ基本情報を取得する
function setUserInfo(data) {
	if (null != data && null != data.endUserId && 0 < data.endUserId.length) {
		var setting = {
			data : {
				"userId" : data.endUserId[0]
			},
			url : "/IDMS0101/userInfo.htm",
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
					document.getElementById('organizationCode').value = '';
					$("#employeeNo").textbox("setValue", '');
					$("#userName").textbox("setValue", '');
					$("#organizationName").textbox("setValue", '');
					$("#contractName").textbox("setValue", '');
					$("#userAlias").textbox("setValue", '');
					document.getElementById('contractCode').value = '';
					document.getElementById('endUserId').value = '';
				} else {
					if (null != res.data) {
						document.getElementById('contractCode').value = res.data.contractCd;
						document.getElementById('organizationCode').value = res.data.organizationCd;
						document.getElementById('endUserId').value = res.data.userId;
						$("#userAlias").textbox("setValue", res.data.userAlias);
						$("#employeeNo").textbox("setValue",
								res.data.employeeNo);
						$("#userName").textbox("setValue", res.data.userName);
						$("#organizationName").textbox("setValue",
								res.data.organizationName);
						$("#contractName").textbox("setValue",
								res.data.contractName);
					}
				}
			}
		};
		postAjax(setting);
	}
}

// 他ユーザの権限を参照する
function setAuthorityInfo(data) {
	if (null == data || null == data.endUserId) {
		return;
	}
	var setting = {
		data : {
			"endUserId" : data.endUserId[0],
			"systemInfo" : $('#systemInfo').combobox('getValue'),
		},
		url : "/IDMS0101/userAuthorityInfo.htm",
		hasLoading : true,
		success : function(res) {
			if (res.errorResultDto) {
				errors = res.errorResultDto.errorList;
				var messages = "";
				$.each(errors, function(i, err) {
					messages += err.errorMessage + "<br>";
				});
				$("#p_errorMessage")[0].innerHTML = messages;
			} else {
				var pattern = $('#applciationCommonFormPattern')[0].value;
				$("#authorityList")[0].options.length = 0;
				$("#selectList")[0].options.length = 0;
				if (null != res.authorityInfo && 0 != res.authorityInfo.length) {
					if (APPLCIATION_COMMON_FORM_PATTERN_ONE == pattern
							|| APPLCIATION_COMMON_FORM_PATTERN_ELEVEN == pattern) {
						$('#authorityGroup').textbox('setValue',
								res.authorityInfo[0].value);
						// 設計書のバージョン0.9.2により、ソースコードを対応する START
					} else if (APPLCIATION_COMMON_FORM_PATTERN_FOUR == pattern
							|| APPLCIATION_COMMON_FORM_PATTERN_THIRTEEN == pattern) {
						for (var i = 0; i < res.authorityInfo.length; i++) {
							var no = new Option();
							no.value = res.authorityInfo[i].value;
							no.text = res.authorityInfo[i].text;
							$("#selectList")[0].add(no);
						}
						$("#selectList")
								.removeClass(
										"textbox-invalid textbox-prompt validatebox-invalid");
						removeDisabled();
						$("#selectList").attr("disabled", false);
					}else if(APPLCIATION_COMMON_FORM_PATTERN_TWENTY_FIRST == pattern){
						$('#authorityInfo').combobox('setValue',
								res.authorityInfo[0].value);
					}
				} else {
					// 他のユーザの権限情報を取得しない、且つ、パターンが"4"や"13"の場合、選択権限を制御する
					if (APPLCIATION_COMMON_FORM_PATTERN_FOUR == pattern
							|| APPLCIATION_COMMON_FORM_PATTERN_THIRTEEN == pattern) {
						$("#selectList")
								.addClass(
										"textbox-invalid textbox-prompt validatebox-invalid");
					}
				}
				if (null != res.authorityList && 0 != res.authorityList.length) {
					for (var i = 0; i < res.authorityList.length; i++) {
						var no = new Option();
						no.value = res.authorityList[i].value;
						no.text = res.authorityList[i].text;
						$("#authorityList")[0].add(no);
					}
					goAuthorityList = res.authorityList;
					removeDisabled();
					$("#selectList").attr("disabled", false);
				}else{
					goAuthorityList = [];
				}
				if ((null == res.authorityInfo || 0 == res.authorityInfo.length)
						&& (null == res.authorityList || 0 == res.authorityList.length)) {
					setDisabled();
					$("#selectList").attr("disabled", true);
				}
				// 設計書のバージョン0.9.2により、ソースコードを対応する END
			}
		}
	};
	postAjax(setting);
}

// 検索ボタンを押した、権限を検索する
function btnSearch_click() {
	$("#authorityList")[0].length = 0;
	var searchInfo = $('#searchInfo')[0].value;
	if (null != searchInfo && "" != searchInfo) {
		for (i = 0; i < goAuthorityList.length; i++) {
			if (goAuthorityList[i].text.indexOf(searchInfo) > -1) {
				var no = new Option();
				no.value = goAuthorityList[i].value;
				no.text = goAuthorityList[i].text;
				$("#authorityList")[0].add(no);
			}
		}
	} else {
		for (i = 0; i < goAuthorityList.length; i++) {
			var no = new Option();
			no.value = goAuthorityList[i].value;
			no.text = goAuthorityList[i].text;
			$("#authorityList")[0].add(no);
		}
	}
}