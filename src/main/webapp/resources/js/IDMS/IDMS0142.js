var goForm;
var goMode = 0;
var goAuthorityList = new Array();
var goRegisterDetailInputFlag = null;
var showArray = [
        		{
        			code : "insert",
        			columns : [ 
        			            [
							{
								field : 'userId',
								title : 'ユーザID',
								hidden: 'true',
								width : 10,
        						align : 'left',
        						halign:'center'
							},
							{
								field : 'userNameKana',
								title : 'ユーザカナ名',
								hidden: 'true',
								width : 10,
        						align : 'left',
        						halign:'center'
							},
        			        {
        						field : 'account',
        						title : 'ユーザアカウント',
        						editor:{type:'validatebox',
        								options:{
        									validType : ['isAlphabetNum','maxLength[100]'],
        									required:true
        								}
        								},
        						width : 130,
        						align : 'left',
        						halign:'center'
        					}, 
        					{
        						field : 'organizationInfo',
        						title : '申請組織',
        						formatter:unitFormatter,
        						editor:{
        							type:'combobox',
        							options:{
        								valueField:'value', 
        								textField:'text',
        								required:true
        							}
                                },
        						width : 160,
        						align : 'left',
        						halign:'center'
        					}
        					, {
        						field : 'contractCd',
        						title : '利用者契約形態コード',
        						hidden: 'true',
        						width : 10,
        						align : 'left',
        						halign:'center'
        					}, {
        						field : 'contractName',
        						title : '利用者契約形態',
        						width : 150,
        						align : 'left',
        						halign:'center'
        					}, {
        						field : 'userAlias',
        						title : 'エイリアス',
        						width : 130,
        						align : 'left',
        						halign:'center'
        					}, {
        						field : 'employeeNo',
        						title : '社員番号',
        						width : 120,
        						align : 'left',
        						halign:'center'
        					}, {
        						field : 'userName',
        						title : '氏名',
        						width : 160,
        						align : 'left',
        						halign:'center'
        					}
        				] 
        			]
        		},
        		{
        			code : "updateOrDelete",
        			columns : [ [
        					{
        						field : 'ck',
        						title : '',
        						checkbox : true
        					},
        					{
								field : 'userId',
								title : 'ユーザID',
								hidden: 'true',
								width : 10,
        						align : 'left',
        						halign:'center'
							},
							{
								field : 'userNameKana',
								title : 'ユーザカナ名',
								hidden: 'true',
								width : 10,
        						align : 'left',
        						halign:'center'
							},
        			        {
        						field : 'account',
        						title : 'ユーザアカウント',
        						width : 130,
        						align : 'left',
        						halign:'center'
        					}, {
        						field : 'organizationInfo',
        						title : '申請組織',
        						formatter:unitFormatter,
        						editor:{type:'combobox',options:{valueField:'value',textField:'text'}},
        						width : 160,
        						align : 'left',
        						halign:'center'
        					}
        					, {
        						field : 'contractCd',
        						title : '利用者契約形態コード',
        						hidden: 'true',
        						width : 10,
        						align : 'left',
        						halign:'center'
        					}, {
        						field : 'contractName',
        						title : '利用者契約形態',
        						width : 150,
        						align : 'left',
        						halign:'center'
        					}, {
        						field : 'userAlias',
        						title : 'エイリアス',
        						width : 130,
        						align : 'left',
        						halign:'center'
        					}, {
        						field : 'employeeNo',
        						title : '社員番号',
        						width : 120,
        						align : 'left',
        						halign:'center'
        					}, {
        						field : 'userName',
        						title : '氏名',
        						width : 130,
        						align : 'left',
        						halign:'center'
        					}
        				] 
        			]
        		} ];

// 画面を初期化
$(document).ready(
				function() {
					initApplicationInfo();
					$("#searchInfo").bind('keydown', function(e) {
						if (e.keyCode == 13) {
							btnSearch_click();
						}
					});
					$('#dg_endUser').datagrid({

						onLoadSuccess:function(data){
							var trs = $(this).parent('div.datagrid-view').find('div.datagrid-body>table tr');
							trs.find("td[field]").each(function(i,o){
								if($(this).attr("field")=="userName"
									|| $(this).attr("field")=="organizationName")
									$(this).attr("title",$(this).text());
							});
						}
					});
					// 画面のサイズを設定
					var height = $(document).height();
					document.getElementById("application").style.height = (height - 120) + "px";
});

// 申請情報と利用者情報を取得する
function initApplicationInfo(){
	var setting = {
		data : null,
		url : "/IDMS0142/reloading.htm",
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
				goMode = $("#mode")[0].value;
				initAppHead(goMode,goForm);
				// 申請共通①画面から遷移
				if (goMode == 1) {
					var pattern = goForm.applciationCommonFormPattern;
					var registerFlag = goForm.registerDetailInputFlag;
					if("1" != registerFlag && ("1" != pattern
							&& "2" != pattern
							&& "3" != pattern
							&& "7" != pattern
							&& "11" != pattern
							&& "12" != pattern
							&& "15" != pattern
							&& "16" != pattern
							&& "17" != pattern
							&& "18" != pattern
							&& "19" != pattern)){
						authorityGroupInfoLoad();
					}else{
						showAppInfo();
						applicationContent(goForm);
					}
					// 申請詳細画面から遷移
				} else if (goMode == 2) {
					showAppInfo();
					applicationContent(goForm);
				}
			}
		}
	};
	postAjax(setting);
}

// 申請組織名称を設定する
function unitFormatter(value,rowData) {
    if (value == 0) {
        return;
    }
    for (var i = 0; i < rowData.organizationList.length; i++) {
        if (rowData.organizationList[i].value == value) {
            return rowData.organizationList[i].text;
        }
    }
}

// 権限情報を取得する
function authorityGroupInfoLoad(){
	var setting = {
			data : null,
			url : "/IDMS0142/authorityGroup.htm",
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
						if (null != res.authorityInfo && 0 < res.authorityInfo.length){
							var pattern = goForm.applciationCommonFormPattern;
							var showType = goForm.applicationShowType;
							if("5" == pattern
									|| "8" == pattern
									|| "9" == pattern
									|| "21" == pattern
									|| "22" == pattern
									|| "23" == pattern){
								var authorityListInfo = new Array();
								authorityListInfo.push({
										"text" : COMBOBOX_BLANK_OPTION_TEXT,
										"value" : ""
								});
								for (var i = 0; i < res.authorityInfo.length; i++) {
									authorityListInfo.push({
										"text" : res.authorityInfo[i].text,
										"value" : res.authorityInfo[i].value
									});
								}
								$("#authorityInfo").combobox('loadData', authorityListInfo);
							}else{
								$("#authorityList")[0].options.length = 0;
								$("#selectList")[0].options.length = 0;
								if("1" == showType || "2" == showType || "3" == showType || "4" == showType){
									for (var i = 0; i < res.authorityInfo.length; i++) {
										var no = new Option();
										no.text = res.authorityInfo[i].text;
										no.value = res.authorityInfo[i].value;
										$("#authorityList")[0].add(no);
									}
									goAuthorityList = res.authorityInfo;
								}
							}
					}
					showAppInfo();
					applicationContent(goForm);
				}
			}
		};
		postAjax(setting);
}

// 画面の項目表示制御
function showAppInfo(){
	var pattern = goForm.applciationCommonFormPattern;
	var showType = goForm.applicationShowType;
	// 登録時詳細入力フラグが「１」の場合、本画面（申請詳細）が非表示、申請登録画面に表示
	if (goForm.registerDetailInputFlag == "1") {
		$("#tbl_autority").hide();
		$("#div_autority").remove();
	} else {
		if ("11" != pattern
				&& "13" != pattern
				&& "16" != pattern
				&& "21" != pattern) {
			$("#authorityGroupButton01").linkbutton({
				disabled : true
			});
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
		if (pattern == "1"
				|| pattern == "2"
				|| pattern == "3"
				|| pattern == "7"
				|| pattern == "11"
				|| pattern == "12"
				|| pattern == "15") {
			$("#tr06").show();
			$("#tr07").hide();
			$("#tr08").hide();
			if(pattern == "3" || pattern == "7" || pattern == "15" ){
				$("#authorityGroup").textbox({
					disabled : true
				});
			}else{
				$("#authorityGroup").textbox({
					required:true
				});
			}
			$("#authorityGroup").textbox("setValue", goForm.authorityGroup);
		} else if (pattern == "5"
				|| pattern == "8"
				|| pattern == "9"
				|| pattern == "21"
				|| pattern == "22"
				|| pattern == "23") {
			$("#tr07").show();
			$("#tr06").hide();
			$("#tr08").hide();
			var authorityListInfo = new Array();
			if (goForm.authorityList != null && goForm.authorityList.length != 0) {
				authorityListInfo.push({
					"text" : COMBOBOX_BLANK_OPTION_TEXT,
					"value" : ""
				});
				for (var i = 0; i < goForm.authorityList.length; i++) {
					authorityListInfo.push({
						"text" : goForm.authorityList[i].text,
						"value" : goForm.authorityList[i].value
					});
				}
			}
			if(pattern == "22"){
				$("#authorityInfo").combobox({
					disabled : true
				});
			}else{
				$("#authorityInfo").combobox({
					required:true
				});
			}
			$("#authorityInfo").combobox('loadData', authorityListInfo);
			$("#authorityInfo").combobox("setValue", goForm.authorityInfo);
		} else if (pattern == "4"
				|| pattern == "6"
				|| pattern == "10"
				|| pattern == "13"
				|| pattern == "14"
				|| pattern == "20") {
			$("#tr08").show();
			$("#tr06").hide();
			$("#tr07").hide();
			if((null != goForm.authorityListInfo
					&& 0 != goForm.authorityListInfo.length) || (null != goForm.selectListInfo && 0 != goForm.selectListInfo.length)){
				$("#authorityList")[0].options.length = 0;
				$("#selectList")[0].options.length = 0;
			}
			if (null != goForm.authorityListInfo
					&& 0 != goForm.authorityListInfo.length) {
				for (var i = 0; i < goForm.authorityListInfo.length; i++) {
					var no = new Option();
					no.value = goForm.authorityListInfo[i].value;
					no.text = goForm.authorityListInfo[i].text;
					$("#authorityList")[0].add(no);
				}
				goAuthorityList = goForm.authorityListInfo;
			}
			if (null != goForm.selectListInfo && 0 != goForm.selectListInfo.length) {
				for (var i = 0; i < goForm.selectListInfo.length; i++) {
					var no = new Option();
					no.value = goForm.selectListInfo[i].value;
					no.text = goForm.selectListInfo[i].text;
					$("#selectList")[0].add(no);
				}
			}else{
				if("1" == showType || "2" == showType || "3" == showType || "4" == showType){
					$("#selectList").addClass("textbox-invalid textbox-prompt validatebox-invalid");
				}
			}
			if (pattern == "20"){
				setDisabled();
			}
		}else {
			$("#tr06").hide();
			$("#tr07").hide();
			$("#tr08").hide();
		}
	}

	if (pattern == "5"
			|| pattern == "11"
			|| pattern == "12"
			|| pattern == "13"
			|| pattern == "14"
			|| pattern == "15"
			|| pattern == "16"
			|| pattern == "17"
			|| pattern == "21") {
		$("#tr02").hide();
		$("#useFromDate").datebox("setValue", goForm.useFromDate);
		$("#useToDate").datebox("setValue", goForm.useToDate);
	} else {
		$("#tr03").hide();
		$("#useStartDate").datebox("setValue", goForm.useFromDate);
	}
}

//権限一覧が非活性設定
function setDisabled() {
	$('#searchInfo')[0].value = "";
	$("#tblAuthority").css({
		"background" : "rgb(235, 235, 228)"
	});
	$("#authorityList").css({
		"background" : "rgb(235, 235, 228)"
	});
	$("#selectList").css({
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
	$("#selectList").attr("disabled", true);
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

//画面の項目の値を設定する
function applicationContent(form) {
	goRegisterDetailInputFlag = form.registerDetailInputFlag;
	var patten = form.applciationCommonFormPattern;
	$("#classInfo").textbox("setValue", form.classInfoName);
	$("#systemInfo").textbox("setValue", form.systemInfoName);
	$("#categoryInfo").textbox("setValue", form.categoryInfoName);
	$('#applicationReason').textbox('setValue',form.applicationReason);
	if (null != form.note) {
		$("#tr01").show();
		$("#comment")[0].innerHTML = form.note;
	}
	// 利用者情報を表示する
	if(parent.window._0141data){
		if(parent.window._0141data.allRowDatas)
				 $('#dg_endUser').datagrid({
					 data:parent.window._0141data.checkedRowDatas
				 });
	}
}

// 申請内容を初期化
function initAppHead(mode,form) {
	$("#dgWarpper").html("<table id='dg_appInfo'class='easyui-datagrid' data-options='singleSelect:true,checkOnSelect:0,selectOnCheck:0'></table>");
	var categoryCd = form.categoryInfo;
	var type = "updateOrDelete";
	if ("1" == categoryCd){
		type = "insert";
	}
	var dgConfig = getArrayByCode(type);

	$('#dg_appInfo').datagrid().datagrid('enableCellEditing');
	// 申請詳細画面から遷移
	if(parent.window._0142data){
		$('#dg_appInfo').datagrid({columns : dgConfig.columns});
		if(parent.window._0142data.allRowDatas)
				 $('#dg_appInfo').datagrid({
					 data:parent.window._0142data.allRowDatas,
					 width:875,
					 height:200
				 });
			if(parent.window._0142data.checkedIndexs){
				for(var i=0;i<parent.window._0142data.checkedIndexs.length;i++){
					$('#dg_appInfo').datagrid("checkRow",parent.window._0142data.checkedIndexs[i]);
				}
			}
	}else{
		// 申請共通①画面から遷移
		var setting = {
				url : "/IDMS0142/getAppData.htm",
				data :null,
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
						onresize({
							data : res.userInfoList,
							columns : dgConfig.columns
						});
					}
				}
			};
			postAjax(setting);
	}
}

// 一覧にユーザアカウントと申請組織編集可に設定する START
$.extend($.fn.datagrid.methods, {
	editCell : function(jq, param) {
		return jq.each(function() {
			var opts = $(this).datagrid('options');
			var fields = $(this).datagrid('getColumnFields', true).concat(
					$(this).datagrid('getColumnFields'));
			for (var i = 0; i < fields.length; i++) {
				var col = $(this).datagrid('getColumnOption', fields[i]);
				col.editor1 = col.editor;
				if (fields[i] != param.field) {
					col.editor = null;
				}
			}
			$(this).datagrid('beginEdit', param.index);
			var ed = $(this).datagrid('getEditor', param);
			if (ed) {
				if ($(ed.target).hasClass('textbox-f')) {
					var organizationList = $('#dg_appInfo').datagrid("getData").rows[param.index].organizationList;
					$(ed.target).combobox('loadData',organizationList);
					if ("" == ed.oldHtml || undefined == ed.oldHtml || null == ed.oldHtml){
						$(ed.target).combobox('setValue',organizationList[0].value);
					}else{
						for(j=0;j<organizationList.length;j++){
							if(ed.oldHtml == organizationList[j].text){
								$(ed.target).combobox('setValue',organizationList[j].value);
							}
						}
					}
					$(ed.target).textbox('textbox').focus();
				} else {
					$(ed.target).focus();
				}
			}
			for (var i = 0; i < fields.length; i++) {
				var col = $(this).datagrid('getColumnOption', fields[i]);
				col.editor = col.editor1;
			}
		});
	},
	enableCellEditing : function(jq) {
		return jq.each(function() {
			var dg = $(this);
			var opts = dg.datagrid('options');
			opts.oldOnClickCell = opts.onClickCell;
			opts.onClickCell = function(index, field) {
				if (opts.editIndex != undefined) {
					if (dg.datagrid('validateRow', opts.editIndex)) {
						dg.datagrid('endEdit', opts.editIndex);
						opts.editIndex = undefined;
					} else {
						return;
					}
				}
				dg.datagrid('selectRow', index).datagrid('editCell', {
					index : index,
					field : field
				});
				opts.editIndex = index;
				opts.oldOnClickCell.call(this, index, field);
			}
		});
	}
});
// 一覧にユーザアカウントと申請組織編集可に設定する END

// テーブルのサイズを設定する
function onresize(dgCfg) {
	if(dgCfg==null || dgCfg==undefined){
		dgCfg = {};
	}
	dgCfg.height = 200;
	dgCfg.width = 875;
	$('#dg_appInfo').datagrid(dgCfg);
}

// テーブルのヘッダーを取得する
function getArrayByCode(code) {
	for (var i = 0; i < showArray.length; i++) {
		if (showArray[i].code == code)
			return showArray[i];
	}
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

//他のユーザ参照ボタンを押下した、、このメソッドを実行する
function btnSelectUser_click() {
	parent.getDialogObject().callback = function(data) {
		setAuthorityInfo(data);
	};
	var title = "対象者選択";
	var endUserId = null;
	var organizationCode = null;
	// 0.9.6 他ユーザ参照ボタンの対象ユーザは申請者と同じ組織のユーザのみに修正 START
	// 他のユーザの権限を参照する場合、「referenceFlag」は"1"に設定する
	var url = "/IDMS0011/IDMS0011.htm" + "?" + "userId=" + endUserId
			+ "&organizationCode=" + organizationCode + "&checkFlag=1&referenceFlag=1";
	// 0.9.6 他ユーザ参照ボタンの対象ユーザは申請者と同じ組織のユーザのみに修正 END
	var width = 652;
	var height = 610;
	parent.openMainDialog(title, url, width, height);
}

//他ユーザの権限を参照する
function setAuthorityInfo(data) {
	if (null == data || null == data.endUserId) {
		return;
	}
	var setting = {
		data : {
			"endUserId" : data.endUserId[0],
			"systemInfo" : goForm.systemInfo,
		},
		url : "/IDMS0142/userAuthorityInfo.htm",
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
				var pattern = goForm.applciationCommonFormPattern;
				$("#authorityList")[0].options.length = 0;
				$("#selectList")[0].options.length = 0;
				$('#authorityGroup').textbox('setValue','');
				$('#authorityInfo').combobox('setValue','');
				if (null != res.authorityInfo && 0 != res.authorityInfo.length) {
					if (APPLCIATION_COMMON_FORM_PATTERN_ONE == pattern
							|| APPLCIATION_COMMON_FORM_PATTERN_ELEVEN == pattern) {
						$('#authorityGroup').textbox('setValue',
								res.authorityInfo[0].value);
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
				if(APPLCIATION_COMMON_FORM_PATTERN_FOUR == pattern
						|| APPLCIATION_COMMON_FORM_PATTERN_THIRTEEN == pattern){
					if (null != res.authorityList && 0 != res.authorityList.length) {
						for (var i = 0; i < res.authorityList.length; i++) {
							var no = new Option();
							no.value = res.authorityList[i].value;
							no.text = res.authorityList[i].text;
							$("#authorityList")[0].add(no);
						}
						goAuthorityList = res.authorityList;
					}else{
						goAuthorityList = [];
					}
				}
			}
		}
	};
	postAjax(setting);
}

//戻るボタンを押下し、申請共通①画面に遷移する
function btnBack_click(){
	var rowDatas = null;
	var allRowDatas = $('#dg_appInfo').datagrid("getData").rows;
	var categoryCd = goForm.categoryInfo;
	if ("1" != categoryCd){
		rowDatas = $('#dg_appInfo').datagrid("getChecked");

		if(rowDatas){
			var checkedIndexs = [];
			for(var i=0;i<rowDatas.length;i++){
				checkedIndexs.push($('#dg_appInfo').datagrid("getRowIndex",rowDatas[i]));
			}
		}

	}
	if(allRowDatas.length != 0){
		parent.window._0142data = {allRowDatas:allRowDatas,checkedRowDatas:rowDatas,checkedIndexs:checkedIndexs};
	}

	// 画面のデータを保存する
	// datagrid save
	$('#dg_appInfo').datagrid('acceptChanges');

	goForm.authorityGroup = $('#authorityGroup').textbox('getValue');
	goForm.authorityInfo = $('#authorityInfo').combobox('getValue');
	goForm.authorityName = $('#authorityInfo').combobox('getText');
	goForm.applicationReason = $('#applicationReason').textbox('getValue');
	goForm.multipleFlag = "1";
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
		url : "/IDMS0142/back.htm",
		hasLoading : true,
		hasContentType : true,
		success : function(res) {
			if (res.errorResultDto) {
				errors = res.errorResultDto.errorList;
				var messages = "";
				$.each(errors, function(i, err) {
					messages += err.errorMessage + "<br>";
				});
				$("#p_errorMessage")[0].innerHTML = messages;
			} else {
					window.location.href = CONTEXT_PATH + "/IDMS0141/IDMS0141.htm?mode=2";
			}
		}
	};
	postAjax(setting);
}

// 次へボタンを押下し、申請詳細画面に遷移する
function btnNext_click(){
	$("#p_errorMessage")[0].innerHTML = "&nbsp;";

	// datagrid save
	$('#dg_appInfo').datagrid('acceptChanges');

	var userListInfo = new Array();
	var rowDatas  = new Array();
	var allRowDatas = $('#dg_appInfo').datagrid("getData").rows;
	var categoryCd = goForm.categoryInfo;
	if ("1" != categoryCd){

		var checkedIndexs = [];

		for(i=0; i< allRowDatas.length; i++){
			var checkBoxLength = $($('#dg_appInfo').parent().find("table.datagrid-btable tr")[i]).find("input[type=checkbox]:checked").length;
			if(checkBoxLength == 1){
				rowDatas.push($('#dg_appInfo').datagrid("getData").rows[i]);
				checkedIndexs.push(i);
			}
		}
		if(rowDatas.length == 0){
			$("#p_errorMessage")[0].innerHTML = getMessage("E1009",["申請対象"]);
			return;
		}
		for(i=0; i< rowDatas.length; i++){
			var userInfo = {};
			var account = rowDatas[i].account;
			var organizationInfo = rowDatas[i].organizationInfo;
			if("" == account || null == account || undefined == account){
				$("#p_errorMessage")[0].innerHTML = getMessage("E1008",["ユーザアカウント"]);
				return;
			}
			if("" == organizationInfo || null == organizationInfo || undefined == organizationInfo){
				$("#p_errorMessage")[0].innerHTML = getMessage("E1009",["申請組織"]);
				return;
			}
			
			for(j=0;j<rowDatas[i].organizationList.length;j++){
				if(rowDatas[i].organizationInfo == rowDatas[i].organizationList[j].value){
					rowDatas[i].organizationCd = rowDatas[i].organizationList[j].text;
				}
			}
			userInfo.userId = rowDatas[i].userId;
			userInfo.account = account;
			userInfo.organizationCd = organizationInfo.substring(0, organizationInfo.length - 2);
			userInfo.officeCd = organizationInfo.substring(organizationInfo.length - 2);
			userInfo.contractCd = rowDatas[i].contractCd;
			userInfo.userAlias = rowDatas[i].userAlias;
			userInfo.userNameKana = rowDatas[i].userNameKana;
			userInfo.userName= rowDatas[i].userName;
			userListInfo.push(userInfo);
		}
	}else{
		if(allRowDatas.length == 0){
			$("#p_errorMessage")[0].innerHTML = getMessage("E1009",["申請対象"]);
			return;
		}
		for(i=0; i< allRowDatas.length; i++){
			var userInfo = {};
			var account = allRowDatas[i].account;
			if("" == account || null == account || undefined == account){
				$("#p_errorMessage")[0].innerHTML = getMessage("E1008",["ユーザアカウント"]);
//				var accountInfo = new Object();
//				accountInfo.field = "account";
//				accountInfo.index = i;
//				$('#dg_appInfo').datagrid('beginEdit', i);
//				var ed = $('#dg_appInfo').datagrid('getEditor', accountInfo);
//				$('#dg_appInfo').datagrid().datagrid('enableCellEditing');
//				$(ed.target).textbox('textbox').focus();
				return;
			}
			var organizationCd = allRowDatas[i].organizationInfo;
			if("" == organizationCd || null == organizationCd || undefined == organizationCd){
				$("#p_errorMessage")[0].innerHTML = getMessage("E1009",["申請組織"]);
//				var orgInfo = new Object();
//				orgInfo.field = "organizationInfo";
//				orgInfo.index = i;
//				$('#dg_appInfo').datagrid('beginEdit', i);
//				var ed = $('#dg_appInfo').datagrid('getEditor', orgInfo);
//				$('#dg_appInfo').datagrid().datagrid('enableCellEditing');
//				$(ed.target).textbox('textbox').focus();
				return;
			}
			for(j=0;j<allRowDatas[i].organizationList.length;j++){
				if(allRowDatas[i].organizationInfo == allRowDatas[i].organizationList[j].value){
					allRowDatas[i].organizationCd = allRowDatas[i].organizationList[j].text;
				}
			}
			userInfo.userId = allRowDatas[i].userId;
			userInfo.account = account;
			userInfo.organizationCd = organizationCd.substring(0, organizationCd.length - 2);
			userInfo.officeCd = organizationCd.substring(organizationCd.length - 2);
			userInfo.contractCd = allRowDatas[i].contractCd;
			userInfo.userAlias = allRowDatas[i].userAlias;
			userInfo.userNameKana = allRowDatas[i].userNameKana;
			userInfo.userName= allRowDatas[i].userName;
			userInfo.employeeNo= allRowDatas[i].employeeNo;
			userListInfo.push(userInfo);
		}
	}
	if ($('#IDMS0142Form').form('validate') == false) {
		$("#p_errorMessage")[0].innerHTML = "画面にエラーがありますので、修正してください。";
		return;
	}
	// 画面のデータを保存する
	goForm.userApplicationList = userListInfo;
	goForm.authorityGroup = $('#authorityGroup').textbox('getValue');
	goForm.authorityInfo = $('#authorityInfo').combobox('getValue');
	goForm.authorityName = $('#authorityInfo').combobox('getText');
	goForm.applicationReason = $('#applicationReason').textbox('getValue');
	goForm.multipleFlag = "1";
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
		url : "/IDMS0142/next.htm",
		hasLoading : true,
		hasContentType : true,
		success : function(res) {
			if (res.errorResultDto) {
				errors = res.errorResultDto.errorList;
				var messages = "";
				$.each(errors, function(i, err) {
					messages += err.errorMessage + "<br>";
				});
				$("#p_errorMessage")[0].innerHTML = messages;
			} else {
					window.location.href = CONTEXT_PATH + "/IDMS0150/IDMS0150.htm?mode=1";
					parent.window._0142data = {allRowDatas:allRowDatas,checkedRowDatas:rowDatas,checkedIndexs:checkedIndexs};
			}
		}
	};
	postAjax(setting);
}