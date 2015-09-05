var goForm = new Object();
var goMode = 0;
var detailFrame = false;
var goAppDetail = new Object();
var detailEnableFlag = DETAIL_ENABLE_FLAG_APPLY;
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
        						field : 'account',
        						title : 'ユーザアカウント',
        						width : 130,
        						align : 'left',
        						halign:'center'
        					}, 
        					{
        						field : 'organizationCd',
        						title : '申請組織',
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
        		}];

// 画面を初期化
$(document).ready(function() {
					$("#trApplicationId").hide();
					initApplicationInfo();
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
		url : "/IDMS0150/reloading.htm",
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
				showAppInfo();
				applicationContent(goForm,res.applyMailListInfo);
			}
		}
	};
	postAjax(setting);
}

// 画面の項目表示制御
function showAppInfo(){
	var pattern = goForm.applciationCommonFormPattern;
	var showType = goForm.applicationShowType;
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
	// 登録時詳細入力フラグが「１」の場合、本画面（申請詳細）が非表示、申請登録画面に表示
	if (goForm.registerDetailInputFlag == "1") {
		$("#tbl_autority").hide();
		$("#div_autority").remove();
	} else {
		if (pattern == "1"
				|| pattern == "2"
				|| pattern == "3"
				|| pattern == "7"
				|| pattern == "11"
				|| pattern == "12"
				|| pattern == "15"
				|| pattern == "5"
				|| pattern == "8"
				|| pattern == "9"
				|| pattern == "21"
				|| pattern == "22"
				|| pattern == "23") {
			$("#tr05").show();
			$("#tr06").hide();
			$("#authorityGroup").textbox("setValue", goForm.authorityGroup);
		} else if (pattern == "4"
				|| pattern == "6"
				|| pattern == "10"
				|| pattern == "13"
				|| pattern == "14"
				|| pattern == "20") {
			$("#tr06").show();
			$("#tr05").hide();
			if (null != goForm.selectListInfo && 0 != goForm.selectListInfo.length) {
				for (var i = 0; i < goForm.selectListInfo.length; i++) {
					var no = new Option();
					no.value = goForm.selectListInfo[i].value;
					no.text = goForm.selectListInfo[i].text;
					$("#selectAuthorityList")[0].add(no);
				}
				if (5 >= goForm.selectListInfo.length) {
					$("#linkListButton").hide();
				}
			}else{
				$("#linkListButton").hide();
			}
		}else {
			$("#tr05").hide();
			$("#tr06").hide();
		}
	}
}

//画面の項目の値を設定する
function applicationContent(form,applyMailListInfo) {
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
		if(parent.window._0141data.checkedRowDatas)
				 $('#dg_endUser').datagrid({
					 data:parent.window._0141data.checkedRowDatas
				 });
	}
	if ("3" != goForm.systemInfo && goForm.registerDetailInputFlag != '1'
		&& goForm.applicationDetailFormType != undefined
			&& goForm.applicationDetailFormType != null
			&& goForm.applicationDetailFormType != "") {
		try {
			var typeInt = parseInt(goForm.applicationDetailFormType);
			if (1 <= typeInt && typeInt <= 8) {
				if (goForm.applicationInfoItem == undefined
						|| goForm.applicationInfoItem == null) {
					goForm.applicationInfoItem = {};
				}
				detailFrame = true;
			}

		} catch (e) {

		}
	}
	
	if (detailFrame) {

		initDetail();
	}
	
	// メールアドレス情報を表示する
	if(parent.window._0150data){
		if(parent.window._0150data.allRowDatas)
				 $('#dg_userMail').datagrid({
					 data:parent.window._0150data.allRowDatas
				 });
	}else{
		$('#dg_userMail').datagrid({
			 data:applyMailListInfo
		 });
	}
	
	$('#dg_userMail').datagrid().datagrid('enableCellEditing');
}

// 一覧にメールアドレス編集可に設定する START
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
					var mailList = $('#dg_userMail').datagrid("getData").rows[param.index].mailList
					$(ed.target).combobox('loadData',mailList);
					if ("" == ed.oldHtml || undefined == ed.oldHtml || null == ed.oldHtml){
						$(ed.target).combobox('setValue',mailList[0].value);
					}else{
						for(j=0;j<mailList.length;j++){
							if(ed.oldHtml == mailList[j].text){
								$(ed.target).combobox('setValue',mailList[j].value);
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
// 一覧にメールアドレス編集可に設定する END

// 申請内容を初期化
function initAppHead(mode,form) {
	$("#dgWarpper").html("<table id='dg_appInfo'　class='easyui-datagrid' data-options='singleSelect:true,checkOnSelect:0,selectOnCheck:0'></table>");
	var categoryCd = form.categoryInfo;
	var dgConfig = getArrayByCode("insert");
	// 申請詳細画面から遷移
	if(parent.window._0142data){
		$('#dg_appInfo').datagrid({columns : dgConfig.columns});
		if("1" == categoryCd){
			if(parent.window._0142data.allRowDatas)
				 $('#dg_appInfo').datagrid({
					 data:parent.window._0142data.allRowDatas,
					 width:875,
					 height:200
				 });
		}else{
			if(parent.window._0142data.checkedRowDatas){
				$('#dg_appInfo').datagrid({
					 data:parent.window._0142data.checkedRowDatas,
					 width:875,
					 height:200
				 });
			}
		}
	}
	
	$('#dg_appInfo').datagrid({
		onLoadSuccess:function(data){
			var trs = $(this).parent('div.datagrid-view').find('div.datagrid-body>table tr');
			trs.find("td[field]").each(function(i,o){
				if($(this).attr("field")=="userName"
					|| $(this).attr("field")=="organizationCd")
					$(this).attr("title",$(this).text());
			});
		}
	});
}

// テーブルのヘッダーを取得する
function getArrayByCode(code) {
	for (var i = 0; i < showArray.length; i++) {
		if (showArray[i].code == code)
			return showArray[i];
	}
}

//戻るボタンを押下し、申請共通①画面に遷移する
function btnBack_click(){
	// 詳細画面のデータを取得する
	if(detailFrame){
		goAppDetail.editAppDetail();
	}
	var setting = {
		data : JSON.stringify(goForm),
		url : "/IDMS0150/back.htm",
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
					window.location.href = CONTEXT_PATH + "/IDMS0142/IDMS0142.htm?mode=2";
			}
		}
	};
	postAjax(setting);
}

// 申請ボタンを押下し、申請処理を実行する
function btnRequest_click(){
	$("#p_errorMessage")[0].innerHTML = "&nbsp;";
	if ($('#IDMS0150Form').form('validate') == false) {
		$("#p_errorMessage")[0].innerHTML = "画面にエラーがありますので、修正してください。";
		return;
	}
	
	// 詳細画面のデータを取得する
	if(detailFrame){
		var detailCheckResult = checkAppDetail();
		if(detailCheckResult == false){
			return;
		}
	}
	
	// 申請処理を実行する
	parent.confirmComponent.callback = function (){
		exceApply();
	};
	
	var title = '申請確認';
	var message = '申請しますか？';
	parent.confirmShow(title, message);
}

// 申請処理を実行する
function exceApply(){
	var detailType = goForm.applicationDetailFormType;
    var detailPattern = goForm.applicationDetailFormPattern;
	// 詳細画面のデータを取得する
	if(detailFrame){
		goAppDetail.editAppDetail();
	}
	// メールアドレス情報を取得する
	if("2" == detailType && ("00" == detailPattern || "01" == detailPattern || "02" == detailPattern)){
		var mailList = new Array();
		var allRowDatas = $('#dg_userMail').datagrid("getData").rows;
		for(i = 0 ; i < allRowDatas.length ; i++){
			var mailAddress = allRowDatas[i].mailAddress;
			if("" == mailAddress || null == mailAddress || undefined == mailAddress){
				$("#p_errorMessage")[0].innerHTML = getMessage("E1009",["メールアドレス"]);
				return;
			}
			mailList.push(mailAddress);
		}
		parent.window._0150data = {allRowDatas:allRowDatas};
		goForm.mailAddressList = mailList;
	}
	var setting = {
			data : JSON.stringify(goForm),
			url : "/IDMS0150/apply.htm",
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
					if(res.applicationId != undefined && res.applicationId != null && res.applicationId != ""){
						$('#btnApply').linkbutton({
							disabled : true
						});
						$('#btnBack').linkbutton({
							disabled : true
						});
						
						$("#trApplicationId").show();
						// 申請ID
						$("#applicationId").textbox("setValue", res.applicationId);
						
						$.messager.show({
							title:'情報',
							msg:'申請フローを起動しました。' + '<br>申請ID：' + res.applicationId,
							showType:'slide',
							style:{
								left:'',
			                    right:0,
			                    top:document.body.scrollTop+document.documentElement.scrollTop,
			                    bottom:''
							}
						});
					}
				}
			}
		};
		postAjax(setting);
}

//権限一覧情報を取得する
function btnList_click(){
	var selectList = $('#selectAuthorityList')[0].options;
	var authority = new Array();
	for (var i = 0; i < selectList.length; i++) {
		var application = new Object();
		application.value = selectList[i].value;
		application.text = selectList[i].text;
		authority.push(application);
	}
	var applicationInfo = {};
	applicationInfo.applicationAuthorityList = authority;
	parent.getDialogObject().closeFlag = "true";
	parent.getDialogObject().closeMethod = function() {
	};

	parent.getDialogObject().callback = function(data) {
	};
	var setting = {
		data : JSON.stringify(applicationInfo),
		url : "/IDMS0014/IDMS0014.htm",
		hasLoading : true,
		hasContentType : true,
		success : function(res) {
			parent.getDialogObject().callback = function(data) {
			};
			var title = "権限一覧";
			var url = "/IDMS0014/reloading.htm";
			var width = 408;
			var height = 450;
			parent.openMainDialog(title, url, width, height);
		}
	};
	postAjax(setting);
}