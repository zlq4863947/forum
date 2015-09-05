$(function() {
	Form_DoInit();
});
function Form_DoInit(){
	//退職者一覧の初期化
	initUserListInfo();
}

//退職者一覧の初期化
function initUserListInfo() {
	if(pageFrom=='362'){
		if(parent.window._0361data){
			if(parent.window._0361data.allRowDatas)
					 $('#dg').datagrid({
						 data:parent.window._0361data.allRowDatas
					 });
				if(parent.window._0361data.checkedRowDatas){
					for(var i=0;i<parent.window._0361data.checkedRowDatas.length;i++){ //checkRow
						$('#dg').datagrid("checkRow",$('#dg').datagrid("getRowIndex",parent.window._0361data.checkedRowDatas[i]));
					}
				}
				if(parent.window._0361data.retirementDate){
					$('#iptRetirementDate').datebox('setValue',parent.window._0361data.retirementDate);
				}
		};
	}else{
		parent.window._0361data=undefined;
	}
}

//新規で内定者入力画面を呼び出し
function btnSelectUse_Click(){
	//openDialog({model:'new'});
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	openSelectUserDialog();
}
//退職対象者のcsvファイル選択画面を呼び出し
function btnUploadCSV_Click(){
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	var inputObjectId = Math.random()+"";
	inputObjectId ='file_'+inputObjectId.substring(inputObjectId.indexOf('.')+1);
	$("div.fileControlWrapHide").html("<input id='"+inputObjectId+"' name='"+inputObjectId+"' type='file'  />").find('input[type]').bind('change',function(e){
		var fileExtName = getFileExtensionName(getFileName($(this).val()));
		if(fileExtName.toLowerCase()=="csv"){
			var setting ={
					url : "/IDMS0361/updateByCsvFile.htm",
					hasLoading : true,
					fileElementId : inputObjectId,
					success : function(res, status) {
						if(setting.hasLoading==true)
							hiddenLoading();
						if(!res.status=="0"){
							if(res.data && res.data.length>0){
								insertDataToDataGrid(res.data,'import');
							}
							if(res.status=="2")
								$("#p_errorMessage")[0].innerHTML = getMessage("I1013");
							if(res.status=="3")
								$("#p_errorMessage")[0].innerHTML = getMessage("I1015");
						}else
							$.messager.alert('情報 ',getMessage("E9002"));
					}
			};
			ajaxUpload(setting);
		}else{

			$.messager.alert('情報 ',getMessage("I1014"));
		}
	}).click();
}
//内定者予定登録を行う
function btnNext_Click(url){
	if(checkData()){
		var allRowDatas = $('#dg').datagrid("getData");
		var checkedRowDatas = $('#dg').datagrid("getChecked");
		parent.window._0361data = {allRowDatas:allRowDatas,checkedRowDatas:checkedRowDatas,retirementDate:$('#iptRetirementDate').datebox('getValue')};
		location.href=url;
	}
}

//退職対象者選択画面を呼び出し
function openSelectUserDialog(paramObj) {
	parent.getDialogObject().callback = function (data){
		insertDataToDataGrid(data,'select');
	}
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	var title = "退職対象者選択";
	var url = "/IDMS0011/IDMS0011.htm?showProspectiveEmployeeInfo=0&authorityFlag=1&screenId=IDMS0361";
	var width = 642;
	var height = 605;
	parent.openMainDialog(title, url, width, height);
}

//退職対象者の情報を初期化
function insertDataToDataGrid(data,action){
	if(data){
		var arr = [], map = {};
		var allRowDatas = $('#dg').datagrid("getData").rows;
		if(action=='select' && data.endUserId){
			for(var i=0;i<data.endUserId.length;i++){
				var notFound = true;
				for(var j=0;j<allRowDatas.length;j++){
					if(allRowDatas[j].userId==data.endUserId[i]){
						notFound = false;
						break;
					}
				}
				if(notFound){
					map[data.endUserId[i]] = "";
				}
			}
		}
		if(action=='import'){
			for(var i=0;i<data.length;i++){
				var notFound = true;
				for(var j=0;j<allRowDatas.length;j++){
					if(allRowDatas[j].userId==data[i].userId){
						notFound = false;
						break;
					}
				}
				if(notFound){
					map[data[i].userId] = "";
				}
			}
		}
		for(key in map){
			arr.push({
				userId:key
			});
		}
		if(arr.length==0)
			return ;
		var setting = {
				url : "/IDMS0361/getUserInfoByUserIdAndOrganizationCd.htm",
				hasLoading : true,
				data: JSON.stringify(arr) ,
				hasLoading : true,
				hasContentType : true,
				success : function(res) {
					if(res instanceof Array && res.length>0){
						for(var i=0;i<res.length;i++)
							$('#dg').datagrid('appendRow',res[i]);
					}
				}
			};
			postAjax(setting);
	}
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
//内定者を登録時、チェックを行う。
function checkData(){
	var retirementDate = $('#iptRetirementDate').datebox('getValue');
	var rowDatas = $('#dg').datagrid("getChecked");
	if(retirementDate.length==0){
		$("#p_errorMessage")[0].innerHTML = getMessage("E1008",["退職日"]);
		return false;
	}else{
		var d = new Date(retirementDate);
		if(d== "Invalid Date"){
			$("#p_errorMessage")[0].innerHTML = getMessage("E1020",["退職日"]);
			return false;
		}

	}
	if(rowDatas.length==0){
		$("#p_errorMessage")[0].innerHTML = getMessage("E1009",["退職対象者"]);
		return false;
	}
	return true;
}