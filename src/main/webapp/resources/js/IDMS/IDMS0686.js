var winWidth = 0;
var winHeight = 0;
var privilegeArr = {};
var privilegeTableColumns = [];

$(function() {
	Form_DoInit();
});
function Form_DoInit() {
	initDisplay();
	top.window.onresize = onresize;
	initMenu();
	onresize();

}
function initDisplay(){
	//$("#applyDate").next("span.datebox").css("width","100px");
}
function initMenu() {
	var setting = {
		url : "/IDMS0686/getMenuData.htm",
		hasLoading : true,
		hasContentType : false,
		success : function(res, status) {
			if (res) {
				$('#drpMenuList').combobox({
					data : res.data,
					valueField : 'menuId',
					textField : 'menuName',
					onSelect : function(item) {
						initPrivilegeHandleList(item.menuId);
					}
				});
			}
		}
	};
	postAjax(setting);
}

function initPrivilegeHandleList(menuId) {
	if(menuId == ''){
		return;
	}

	$("#p_errorMessage")[0].innerHTML = '&nbsp;';

	$("#dgWarpper").html("<table id='dg'></table>");
	var setting = {
		url : "/IDMS0686/getPrivilegeHolderList.htm",
		hasLoading : true,
		data : {
			menuId : menuId
		},
		hasLoading : true,
		hasContentType : false,
		success : function(res, status) {
			if (res) {
				
				privilegeArr = res.columns;

				var tArr = [ {
					field : 'userId',
					hidden : true
				}, {
					field : 'userName',
					title : 'ユーザ名',
					width : 100
				} ];
				for ( var item in privilegeArr) {
					tArr.push({
						field : item,
						title : privilegeArr[item],
						width : 100,
						align : 'center',
						formatter : checkBoxFormatter
					});
				}
				privilegeTableColumns = [ tArr ];
				
				var data = [];
				for (var i = 0; i < res.data.length; i++) {
					var item = res.data[i];
					var existObject = undefined;
					for (var j = 0; j < data.length; j++) {
						if (data[j].userId == item.userId)
							existObject = data[j];
					}
					if (existObject == undefined) {
						existObject = {
							userId : item.userId,
							userName : item.userName
						}
						data.push(existObject);
					}
					if (privilegeArr[item.privilegeCd] != undefined)
						existObject[item.privilegeCd] = true;
				}
				
				onresize({
					data : data,
					columns : privilegeTableColumns,
					checkOnSelect : false,
					selectOnCheck : false
				});
				
				$('#btnUserSelect').linkbutton({
					disabled : false
				});
				
				$('#btnUpdate').linkbutton({
					disabled : false
				});
			}
		}
	};
	postAjax(setting);
}

function btnUserSelect_Click() {
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';

	parent.getDialogObject().callback = function(data) {
		var arr = [];
		var allRowDatas = $('#dg').datagrid("getData").rows;
		for (var i = 0; data && data.endUserId && i < data.endUserId.length; i++) {
			var found = false;
			for (var j = 0; j < allRowDatas.length; j++) {
				if (data.endUserId[i] == allRowDatas[j].userId) {
					found = true;
					break;
				}
			}
			if (!found)
				arr.push(data.endUserId[i]);
		}
		if (arr.length > 0) {
			var setting = {
				data : JSON.stringify({
					userIds : arr
				}),
				url : "/IDMS0686/getUserInfoList.htm",
				hasLoading : true,
				hasContentType : true,
				success : function(res) {
					if (res && res.data) {
						for (var i = 0; i < res.data.length; i++)
							$('#dg').datagrid(
									'appendRow',
									{
										userId : res.data[i].userId,
										userName : res.data[i].lastName + " "
												+ res.data[i].firstName
									});
					}
				}
			};
			postAjax(setting);
		}
	}
	var title = "対象者選択";
	var url = "/IDMS0011/IDMS0011.htm?showProspectiveEmployeeInfo=0&checkFlag=0";//
	var width = 642;
	var height = 605;
	parent.openMainDialog(title, url, width, height);
}

function checkBoxFormatter(value, row, index) {
	var s = "<input rowIndex='" + index + "' field='" + this.field
			+ "' type='checkbox' ";
	if (value != null && value != undefined && value != 0 && value != "0"
			&& value != "false" && value != false) {
		s += " checked='checked' ";
	}
	s += " />";
	return s;
}
function btnUpdate_Click() {
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	
	if($('#IDMS0686Form').form('validate') ==false){
		$("#p_errorMessage")[0].innerHTML = "画面にエラーがありますので、修正してください。";
		return;
	}
	
	var applyDate = $("#applyDate").datebox('getValue');
	var menuId = $('#drpMenuList').combobox('getValue');

	// 更新時、チェックを行う。
	var allRows = $('#dg').datagrid("getRows");
	var data = [];
	var allData = [];
	if (allRows.length > 0) {
		//var tableTrs = $("#dg").parent().find("table.datagrid-btable>tbody>tr");
		var tableTrs = $("#dg").parent().find("div.datagrid-body>table>tbody>tr");
		for (var i = 0; i < allRows.length; i++) {
			var row = allRows[i];
			var checkBoxs = $(tableTrs[i]).find("input[type=checkbox]:checked");
			var userObj = {
					userId : row.userId,
					privilege : []
			};
			if (checkBoxs.length > 0) {

				for (var j = 0; j < checkBoxs.length; j++) {
					var checkBox = $(checkBoxs[j]);
					userObj.privilege.push(checkBox.attr("field"));
				}
				data.push(userObj);
			}
			allData.push(userObj);
		}
	}
	//if (data.length > 0) {
		var setting = {
			url : "/IDMS0686/checkStatus.htm",
			data : JSON.stringify({
				data : data,
				applyDate : applyDate,
				menuId : menuId
			}),
			hasLoading : true,
			hasContentType : true,
			success : function(res) {
				parent.confirmComponent.callback = function() {
					var setting = {
						url : "/IDMS0686/update.htm",
						data : JSON.stringify({
							data : allData,
							applyDate : applyDate,
							menuId : menuId
						}),
						hasLoading : true,
						hasContentType : true,
						success : function(res) {
							showMessage('情報', getMessage('I1003'));
						}
					};
					postAjax(setting);
				};
				var title = '確認';
				var message = getMessage("W1003");
				if (res && res.userId != undefined) {
					message =  getMessage("W1014");
					for(var i=0;i<allData.length;i++){
						if(allData[i].userId==res.userId){
							$('#dg').datagrid("selectRow",i);
							break;
						}
					}
				}
				parent.confirmShow(title, message);
			}
		};
		postAjax(setting);
	//}

}
// 画面にメッセージを表示
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

// サイズを取得する
function onresize(dgCfg) {

	if (window.innerWidth) {
		winWidth = window.innerWidth;
	} else if ((document.body) && (document.body.clientWidth)) {
		winWidth = document.body.clientWidth;
	}

	if (window.innerHeight) {
		winHeight = window.innerHeight;
	} else if ((document.body) && (document.body.clientHeight)) {
		winHeight = document.body.clientHeight;
	}

	if (document.documentElement && document.documentElement.clientHeight
			&& document.documentElement.clientWidth) {
		winHeight = document.documentElement.clientHeight;
		winWidth = document.documentElement.clientWidth;
	}
	if (dgCfg == null || dgCfg == undefined) {
		dgCfg = {};
	}
	dgCfg.height = winHeight - 280;
	dgCfg.width = '100%';
	$('#dg').datagrid(dgCfg);
}