$(function() {
	Form_DoInit();
});
function Form_DoInit(){
	//アクションの初期化
	initAction();
	$("#selRole").combobox({
		onSelect : function(rec) {
			drpRole_Change(rec);
		}
	});
}

function initAction(){
	rdoInnerApprover_Select();
}
function rdoInnerApprover_Select(){
	showOrg("approver");
}
function rdoInnerRegistrant_Select(){
	showOrg("registrant");
}

function rdoRoleApprover_Select(){
	showRole("approver");
}

function rdoRoleRegistrant_Select(){
	showRole("registrant");
}
function showOrg(type){
	$("#selRole").combobox({
		required : false
	});
	$("#trOrg").show();
	$("#trRole").hide();
	

	var organizationCd = $("#txtOrganizationName").attr("orgcd")
	if(organizationCd==undefined ||organizationCd==null || organizationCd.length==0)
		$('a.userSelectButton').linkbutton('disable');
	else
		$('a.userSelectButton').linkbutton('enable');
	initUserListInfo(type,'organization');
}
function showRole(type){
	$("#selRole").combobox({
		required : true
	});
	$("#trOrg").hide();
	$("#trRole").show();

	$('a.userSelectButton').linkbutton('enable');
	initUserListInfo(type,'role');

}
//対象者一覧の初期化
function initUserListInfo(actionType,positionType) {
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	var organizationCd ="", roleCd="";
	$(".PurviewType").attr("actionType",actionType).attr("positionType",positionType);
	if(positionType=="role"){
		var setting ={
				url : "/IDMS0421/getRoleListByType.htm",
				hasLoading : true,
				data: {type:actionType},
				hasLoading : true,
				hasContentType : false,
				success : function(res, status) {
					if(res){
						var arrList = new Array();
						var firstValue = "";
						if (res != null) {
							for(var key in res){
								arrList.push({
									"text" : res[key],
									"value" : key
								});
								
								if(firstValue == ""){
									firstValue = key;
								}
		
							}
						}

						$("#selRole").combobox('loadData', arrList);
						$("#selRole").combobox('setValue', firstValue);
						getUserListInfo(actionType,positionType,organizationCd,firstValue);
					}
				}
		};
		postAjax(setting);
	}else if(positionType=="organization"){
		organizationCd = $("#txtOrganizationName").attr("orgcd");
		if(organizationCd==undefined || organizationCd==null ||organizationCd.length == 0){
			$('#dg').datagrid({data:[],onLoadSuccess:function(){}});
			return;
		}
		getUserListInfo(actionType,positionType,organizationCd,roleCd);
	}

}
function getUserListInfo(actionType,positionType,organizationCd,roleCd){
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	var setting ={
			url : "/IDMS0421/getUserListInfo.htm",
			hasLoading : true,
			data: JSON.stringify({actionType:actionType,positionType:positionType,organizationCd:organizationCd,roleCd:roleCd}),
			hasLoading : true,
			hasContentType : true,
			success : function(res, status) {
				$('#dg').datagrid({data:[],onLoadSuccess:function(){}});
				if(res instanceof Array){
					$('#dg').datagrid({
						data:res,
						onLoadSuccess:function(data){
							var rows=data.rows;
							for(var i=0;i<rows.length;i++){
								if(rows[i].hasRole){
									$('#dg').datagrid("checkRow",i);
								}
							}
						}
					});
				}
			}
	};
	postAjax(setting);
}
//組織選択画面を呼び出し
function btnSelectDiv_Click(){
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	parent.getDialogObject().callback = function (data){
		if(data != null){
			$("#txtOrganizationName").textbox("setValue", data.organizationName);
			$("#txtOrganizationName").attr("orgCd",data.organizationCode);
			$('a.userSelectButton').linkbutton('enable');
			org_Change();
		}
	}
	var title = "組織選択";
	var url = "/IDMS0012/IDMS0012.htm?organizationCode=&organizationName=";
	var width = 642;
	var height = 605;
	parent.openMainDialog(title, url, width, height);
}
function org_Change(){
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	var roleCd="";
	organizationCd = $("#txtOrganizationName").attr("orgcd");
	var actionType=$(".PurviewType").attr("actionType"), positionType=$(".PurviewType").attr("positionType");
	getUserListInfo(actionType,positionType,organizationCd,roleCd);
}


function drpRole_Change(rec){
	
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	if (rec.value == "") {
		return;
	}

	var roleCd= rec.value;

	organizationCd = $("#txtOrganizationName").attr("orgcd");
	var actionType=$(".PurviewType").attr("actionType"), positionType=$(".PurviewType").attr("positionType");
	getUserListInfo(actionType,positionType,organizationCd,roleCd);
}

//設定対象者の選択画面を呼び出し
function btnSelectUser_click(){
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	parent.getDialogObject().callback = function (data){
		var arr=[];
		var allRowDatas = $('#dg').datagrid("getData").rows;
		for(var i=0;data&& data.endUserId && i<data.endUserId.length;i++){
			var found = false;
			for(var j=0;j<allRowDatas.length;j++){
				if(data.endUserId[i]==allRowDatas[j].userId){
					found = true;
					break;
				}
			}
			if(!found)
				arr.push(data.endUserId[i] );
		}
		var organizationCd =$("#txtOrganizationName").attr("orgcd"),positionType=$(".PurviewType").attr("positionType")
		//選択された組織にかかわっているかをチェック
		//if(positionType=="organization")
		//	checkUserOrgainzationAndGetUserInfo(arr,organizationCd);
		//else
			getUserInfo(arr);
	}
	var title = "対象者選択";
	var url = "/IDMS0011/IDMS0011.htm?showProspectiveEmployeeInfo=0&checkFlag=0&authorityFlag=1&screenId=IDMS0421";//
	var width = 642;
	var height = 605;
	parent.openMainDialog(title, url, width, height);
}
//
function txtApplyDay_blur(){
	$("#p_errorMessage")[0].innerHTML = "&nbsp;";
}
//画面のデータ保存を行う
function btnRegister_Click(url){
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	if($('#mainForm').form('validate') ==false){
		$("#p_errorMessage")[0].innerHTML = "画面にエラーがありますので、修正してください。";
		return;
	}
	
	if(checkData()){
		//ユーザのデータ
		var allRowDatas = $('#dg').datagrid("getData").rows;
		var checkedRowDatas = $('#dg').datagrid("getChecked");
		var newData = allRowDatas.slice(0) ;
		for(var i=0;i<allRowDatas.length;i++){
			var found = false;
			for(var j=0;j<checkedRowDatas.length;j++){
				if(allRowDatas[i].userId ==checkedRowDatas[j].userId ){
					found =true;
					break;
				}
			}
			allRowDatas[i].hasRole = found ;
			allRowDatas[i].hasRoleOld = allRowDatas[i].hasRoleOld == null?false:allRowDatas[i].hasRoleOld ;
		}
		//適用開始日
		var txtApplyDay = $('#txtApplyDay').datebox('getValue');
		var roleCd="";
		try{
			//役割
			roleCd=$("#selRole").combobox("getValue");
		}catch(e){}
		//組織
		organizationCd = $("#txtOrganizationName").attr("orgcd");
		//権限
		var actionType=$(".PurviewType").attr("actionType"), positionType=$(".PurviewType").attr("positionType");
		var data = {userIds:allRowDatas,applyDay:txtApplyDay,
			actionType:actionType,positionType:positionType,organizationCd:organizationCd,roleCd:roleCd
		};

		var setting = {
				url : "/IDMS0421/checkStatus.htm",
				data : JSON.stringify(data),
				hasLoading : true,
				hasContentType : true,
				success : function(res) {
					if(res)
						var message = getMessage("W1002");
						if(res.status==false){
							//数据已经存在，
							if(res.userId!=undefined && res.userId.length>0){
								var allRows = $('#dg').datagrid("getData").rows;
								for(var j=0;j<allRows.length;j++){
									if(allRows[j].userId ==res.userId ){
										$('#dg').datagrid("selectRow",j);
										$("#p_errorMessage")[0].innerHTML = getMessage('I1012', ["権限設定"] );
										break;
									}
								}
							}

							 message = getMessage("W1015");
						}
						parent.confirmComponent.callback = function() {

							//画面のデータを保存
							saveData(data,newData);

						};
						var title = '登録確認';
						parent.confirmShow(title, message);
				}
			};
		postAjax(setting);
	}
}
//画面のデータを保存
function saveData(data,newData){
	var setting = {
			url : "/IDMS0421/createPrivilegeHandle.htm",
			data : JSON.stringify(data),
			hasLoading : true,
			hasContentType : true,
			success : function(res) {
				if(res)
					if(res.status){
						showMessage('情報',  getMessage('I1003'));
						//$('#dg').datagrid('loadData',newData);
						//initUserListInfo(actionType,positionType)
					}else{
						if(res.userId!=undefined && res.userId.length>0){
							var allRows = $('#dg').datagrid("getData").rows;
							for(var j=0;j<allRows.length;j++){
								if(allRows[j].userId ==res.userId ){
									$('#dg').datagrid("selectRow",j);
									$("#p_errorMessage")[0].innerHTML = getMessage('I1012', ["権限設定"] );//E1028
									break;
								}
							}
							/*
							parent.confirmComponent.callback = function() {
								data.confirm = true;
								saveData(data,newData);
							};
							var title = '登録確認';
							var message = getMessage("W1002");
							parent.confirmShow(title, message);
							*/
						}else
							$("#p_errorMessage")[0].innerHTML = getMessage('E2007');

					}
			}
		};
		postAjax(setting);
}
//画面上選択された行の表示方式を制御
var lastSelectedIndex = -1;
function onSelectRow(index,row){
	if(lastSelectedIndex == index){

	}else{
		if(lastSelectedIndex<0){

		}else{
			$('#dg').datagrid('unselectRow',lastSelectedIndex);
		}
	}
	lastSelectedIndex = index;
}
// 登録時、チェックを行う。
function checkData(){
	
	var txtApplyDay = $('#txtApplyDay').datebox('getValue');
	if(txtApplyDay.length==0){
		$("#p_errorMessage")[0].innerHTML =getMessage('E1008', ["適用開始日"] ) ;
		return false;
	}else{
		var d = new Date(txtApplyDay);
		if(d== "Invalid Date"){
			$("#p_errorMessage")[0].innerHTML =getMessage('E1020', ["適用開始日"] )  ;
			return false;
		}
	}

	var rowDatasChecked = $('#dg').datagrid("getChecked");
	
	if (rowDatasChecked.length == 0) {
		$("#p_errorMessage")[0].innerHTML = getMessage("E1009", ["登録対象"]);
		return false;
	}
	return true;
}
//画面にメッセージを表示
function showMessage(title, message) {
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	$.messager.show({
		title : title,
		msg : message,
		showType : 'show',
		style : {
			right : '',
			top : '',
			bottom : -document.body.scrollTop
					- document.documentElement.scrollTop
		}
	});
}
//
function checkUserOrgainzationAndGetUserInfo(uids,oid){
	var setting = {
			url : "/IDMS0421/checkUserOrganizationInfoByUserId.htm",
			hasLoading : true,
			data: JSON.stringify({userIds:uids,orgCd:oid}),
			hasLoading : true,
			hasContentType : true,
			success : function(res) {
				if(res){
					if(res.status)
						getUserInfo(uids);
					else
						$("#p_errorMessage")[0].innerHTML = getMessage("E2048");
				}
			}
		};
		postAjax(setting);
}
function getUserInfo(arr){
	var setting = {
			url : "/IDMS0421/getUserInfoByUserId.htm",
			hasLoading : true,
			data: JSON.stringify({userIds:arr,type:$("div.PurviewType>label>input[type=radio][checked]").attr("id")}) ,
			hasLoading : true,
			hasContentType : true,
			success : function(res) {
				if(res instanceof Array && res.length>0){
					var rows =$('#dg').datagrid("getData");
					rowIndex = rows.length;
					for(var i=0;i<res.length;i++){
						var found = false;
						for(var j=0;j<rows.length;j++){
							if(rows[j].userId == res[i].userId)
								found= true;
						}
						if(!found){
							rowIndex++;
							$('#dg').datagrid('appendRow',res[i]);
						}
					}
				}
			}
		};
		postAjax(setting);
}