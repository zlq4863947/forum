$(function() {
	// 画面表示の初期化
	Form_DoInit();
});

function Form_DoInit() {

}

// 対象者選択画面を呼び出し
function btnSelectUser_Click() {
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	parent.getDialogObject().callback = function(data) {
		if (data && data.endUserId && data.endUserId.length > 0)
			initUserInfo(data.endUserId[0], data.organizationCode[0]);
	}
	var title = "対象者選択";
	var url = "/IDMS0011/IDMS0011.htm?checkFlag=1&authorityFlag=1&screenId=IDMS0411&userId=&organizationCode=";
	var width = 642;
	var height = 605;
	parent.openMainDialog(title, url, width, height);
}
// 対象者により、それぞれのタブとメニューを取得
function initUserInfo(userid, organizationCd) {
	var setting = {
		data : JSON.stringify({
			userId : userid
		}),
		url : "/IDMS0411/getUserMenuInfoListByUserId.htm",
		hasLoading : true,
		hasContentType : true,
		success : function(res) {
			if (res) {
				$("#iptUserId").val(userid);
				$("#iptOrganizationCd").val(organizationCd);
				var tabs = res.tab, tabMenus = res.tabMenu, userTabs = res.userTab, userMenus = res.userMenu, userInfo = res.userInfo;
				var arrTabs = {}, arrMenus = {}, arrTabMenus = {};
				//対象者の情報を表示
				if (userInfo) {
					$("#iptUserAlias").textbox('setValue',userInfo.userAlias);
					$("#iptEmployeeNo").textbox('setValue',userInfo.employeeNo);
					$("#iptUserName").textbox('setValue',userInfo.userName);
					$("#iptOrganicationName").textbox('setValue',userInfo.organizationName);
					$("#iptOfficeName").textbox('setValue',userInfo.officeName);
					$("#iptContractName").textbox('setValue',userInfo.contractName);
				}
				//タブを初期化
				if (tabs) {
					var selString = "";
					for (var i = 0; i < tabs.length; i++) {
						selString += "<option value='" + tabs[i].tabCd + "'>"
								+ tabs[i].tabName + "</option>";
						arrTabs[tabs[i].tabCd] = tabs[i].tabName;
						arrTabMenus[tabs[i].tabCd] = [];
					}
					$("#selSelectedTab").html(selString);
				}
				//メーニュを初期化
				if (tabMenus) {
					var selString = "";
					var lastMenuTabName = "";
					for (var i = 0; i < tabMenus.length; i++) {
						if (lastMenuTabName != tabMenus[i].tabName) {
							lastMenuTabName = tabMenus[i].tabName;
							if (lastMenuTabName == null) {
								tabMenus[i].tabName = "その他";// その他
								tabMenus[i].tabCd = "";
							}
							selString += "<option value='" + tabMenus[i].tabCd
									+ "' type='t'>" + tabMenus[i].tabName
									+ "</option>";
						}
						if (!arrTabMenus[tabMenus[i].tabCd])
							arrTabMenus[tabMenus[i].tabCd] = [];
						if (!arrMenus[tabMenus[i].menuId])
							arrMenus[tabMenus[i].menuId] = [];
						arrTabMenus[tabMenus[i].tabCd].push({
							menuId : tabMenus[i].menuId,
							menuName : tabMenus[i].menuName
						});
						arrMenus[tabMenus[i].menuId] = tabMenus[i].menuName;
						selString += "<option value='"
								+ tabMenus[i].menuId
								+ "' tabvalue='"
								+ (tabMenus[i].tabCd ? tabMenus[i].tabCd : "")
								+ "' tabcode='"
								+ (tabMenus[i].tabName ? tabMenus[i].tabName
										: "") + "''>&nbsp;&nbsp;-&nbsp;"
								+ tabMenus[i].menuName + "</option>";
					}
					$("#selSelectedMenu").html(selString);
				}
				$("#selTab").html("");
				$("#selMenu").html("");
				//初期化データを保存
				window.data = {
					arrTab : arrTabs,
					arrMenu : arrMenus,
					arrTabMenu : arrTabMenus
				};
				//ユーザーのタブを初期化
				if (userTabs) {
					var selString = "";
					for (var i = 0; i < tabs.length; i++) {
						var found = false;
						for (var j = 0; j < userTabs.length; j++) {
							if (tabs[i].tabCd == userTabs[j].tabCd) {
								found = true;
								break;
							}
						}
						if (found) {
							var tab = $("#selSelectedTab option[value='"
									+ tabs[i].tabCd + "']");
							moveTab(tab, $("#selTab"), $("#selSelectedMenu"),$("#selMenu")
									);
						}
					}
				}
				//ユーザーのメニューを初期化
				if (userMenus) {
					var selString = "";
					for (var i = 0; i < userMenus.length; i++) {
						if (userMenus[i].addDeleteFlag == "1" && (userMenus[i].menuId!=null && userMenus[i].menuId!=undefined)) {
							$(
									"#selSelectedMenu option[value='"
											+ userMenus[i].menuId + "']").attr(
									"selected", true);
							btnMenuRelease_Click();
							$(
									"#selMenu option[value='"
											+ userMenus[i].menuId + "']").attr(
									"selected", false);
						} else {
							$(
									"#selMenu option[value='"
											+ userMenus[i].menuId + "']").attr(
									"selected", true);
							btnMenuSelect_Click();
							$(
									"#selSelectedMenu option[value='"
											+ userMenus[i].menuId + "']").attr(
									"selected", false);
						}
					}
				}

			}
		}
	};
	postAjax(setting);
}
// タブを移動 - メニューを移動
function moveTab(optSelected, selTabTo, selMenuFrom, selMenuTo) {
	var selectedItems = $(optSelected);
	if(selectedItems.length==0)
		return;
	for (var i = 0; i < selectedItems.length; i++) {
		$(selTabTo).append($(selectedItems[i]).prop("outerHTML"));
		moveMenuByTab($(selectedItems[i]).attr("value"), selMenuFrom, selMenuTo);
		$(selectedItems[i]).remove();
	}
	adjustMenuTab();
}
// メニューを移動
function moveMenuByTab(tabCd, selFrom, selTo) {
	var fromItems = $(selFrom).find("option");
	for (var i = 0; i < fromItems.length; i++) {
		if ($(fromItems[i]).attr("tabValue") == tabCd
				|| $(fromItems[i]).attr("Value") == tabCd) {
			$(selTo).append($(fromItems[i]).prop("outerHTML"));
			$(fromItems[i]).remove();
		}
	}
}
//メニューを調整
function adjustMenuTab(){
	//
	var selMenuTabs = $('#selMenu option[type=t]'),selMenus = $('#selMenu option:not([type=t])');
	var selSelectedMenuTabs = $('#selSelectedMenu option[type=t]'),selSelectedMenus = $('#selSelectedMenu option:not([type=t])');
	selMenus.remove();
	selSelectedMenus.remove();
	var lMenu = [],rMenu = [];
	//利用できるメニュー	を調整
	for(var i=0;i<selMenus.length;i++){
		var selMenu = selMenus[i];
		var parent = selMenuTabs.filter("[value='"+$(selMenu).attr("tabvalue")+"']");
		if(parent.length>0)
			parent.after($(selMenu).prop("outerHTML"));
		else
			lMenu.push(selMenu);
	}
	for(var i=0;i<lMenu.length;i++){
		var selMenu = lMenu[i];
		var parent = selMenuTabs.filter("[value='']");
		if(parent.length>0)
			parent.after($(selMenu).prop("outerHTML"));
	}
	//利用できないメニューを調整
	for(var i=0;i<selSelectedMenus.length;i++){
		var selMenu = selSelectedMenus[i];
		var parent = selSelectedMenuTabs.filter("[value='"+$(selMenu).attr("tabvalue")+"']");
		if(parent.length>0)
			parent.after($(selMenu).prop("outerHTML"));
		else
			rMenu.push(selMenu);
	}
	for(var i=0;i<rMenu.length;i++){
		var selMenu = rMenu[i];
		var parent = selSelectedMenuTabs.filter("[value='']");
		if(parent.length>0)
			parent.after($(selMenu).prop("outerHTML"));
	}

}
// タブ設定－＞
function btnTabRelease_Click() {
	var selectedItem = $("#selSelectedTab option:selected");
	moveTab(selectedItem, $("#selTab"), $("#selSelectedMenu"), $("#selMenu"));
}
// タブ設定－＞＞
function btnTabReleaseAll_Click() {
	var selectedItem = $("#selSelectedTab option ");
	moveTab(selectedItem, $("#selTab"), $("#selSelectedMenu"), $("#selMenu"));

}
// タブ設定－＜
function btnTabSelect_Click() {
	var selectedItem = $("#selTab option:selected");
	moveTab(selectedItem, $("#selSelectedTab"), $("#selMenu"),
			$("#selSelectedMenu"));
}
// タブ設定－＜＜
function btnTabSelectAll_Click() {
	var selectedItem = $("#selTab option");
	moveTab(selectedItem, $("#selSelectedTab"), $("#selMenu"),
			$("#selSelectedMenu"));
}
// メニュー設定－＞
function btnMenuRelease_Click() {
	//利用できないメニューに選択されたメニューを保存する
	var selectedItem = $("#selSelectedMenu option:selected");
	if(selectedItem.length==0)
		return;

	//利用できるメニューの所属タブ（「その他」も含め）を保存する
	var selSelectedMenuTabOption = $("#selMenu option[type=t]");
	//利用できるタブを保存する
	var selSelectedTabOption = $("#selTab option");
	//利用でないメニューの所属タブ（「その他」も含め）を保存する
	var prevOption;
	var addObj;
	if (selectedItem.attr("type") != "t") {
		var foundInTab = false;
		for (var i = 0; i < selSelectedTabOption.length; i++) {
			if ($(selSelectedTabOption[i]).attr("value") == selectedItem
					.attr("tabvalue")) {
				foundInTab = true;
				break;
			}
		}
		//利用できるメニューに選択されたメニューの所属タブが利用できないタブに存在する場合は
		if (foundInTab) {
			var prevOptions = selectedItem.prevUntil('option[type=t]');
			prevOption = prevOptions.length > 0 ? prevOptions[prevOptions.length - 1]
					: selectedItem;
			if (prevOption && $(prevOption).length > 0) {
				prevOption = $(prevOption).prev();
				var tabValue = selectedItem.attr("tabvalue");
				var nextOptions = prevOption.nextUntil('option[type=t]');
				var foundInRightSide = false;
				for (var i = 0; i < selSelectedMenuTabOption.length; i++) {
					if (tabValue == $(selSelectedMenuTabOption[i])
							.attr("value")) {
						foundInRightSide = true;
						addObj = $(selSelectedMenuTabOption[i]);
						break;
					}
				}
			}
		} else {
			for (var i = 0; i < selSelectedMenuTabOption.length; i++) {
				if ('' == $(selSelectedMenuTabOption[i]).attr("value")) {
					foundInRightSide = true;
					addObj = $(selSelectedMenuTabOption[i]);
					break;
				}
			}
		}
		if (!foundInRightSide) {
			$("#selMenu").append("<option value=''  type='t'>その他</option>");
			$("#selMenu").append(selectedItem.prop("outerHTML"));
		}
		else if (addObj)
			addObj.after(selectedItem.prop("outerHTML"));
		else
			$("#selMenu").append(selectedItem.prop("outerHTML"));
		selectedItem.remove();
	}

}
// メニュー設定＜－
function btnMenuSelect_Click() {
	//利用できるメニューに選択されたメニューを保存する
	var selectedItem = $("#selMenu option:selected");
	if(selectedItem.length==0)
		return;

	//利用できないメニューの所属タブ（「その他」も含め）を保存する
	var selSelectedMenuTabOption = $("#selSelectedMenu option[type=t]");
	//利用できないタブを保存する
	var selSelectedTabOption = $("#selSelectedTab option");
	//利用できるメニューの所属タブ（「その他」も含め）を保存する
	var prevOption;
	var addObj;
	if (selectedItem.attr("type") != "t") {
		var foundInTab = false;
		for (var i = 0; i < selSelectedTabOption.length; i++) {
			if ($(selSelectedTabOption[i]).attr("value") == selectedItem
					.attr("tabvalue")) {
				foundInTab = true;
				break;
			}
		}

		//利用できるメニューに選択されたメニューの所属タブが利用できないタブに存在する場合は
		if (foundInTab) { // if in the tab,find if in the right side
			var prevOptions = selectedItem.prevUntil('option[type=t]');
			prevOption = prevOptions.length > 0 ? prevOptions[prevOptions.length - 1]
					: selectedItem;
			if (prevOption && $(prevOption).length > 0) {
				prevOption = $(prevOption).prev();
				var tabValue = selectedItem.attr("tabvalue");
				var nextOptions = prevOption.nextUntil('option[type=t]'); //selected item's tab 's sub page in left side
				var foundInRightSide = false;
				for (var i = 0; i < selSelectedMenuTabOption.length; i++) {
					if (tabValue == $(selSelectedMenuTabOption[i])
							.attr("value")) {
						foundInRightSide = true;
						addObj = $(selSelectedMenuTabOption[i]);
						break;
					}
				}
			}

		} else {

			for (var i = 0; i < selSelectedMenuTabOption.length; i++) {
				if ('' == $(selSelectedMenuTabOption[i]).attr("value")) {
					foundInRightSide = true;
					addObj = $(selSelectedMenuTabOption[i]);
					break;
				}
			}
		}
		if (!foundInRightSide) {
			$("#selSelectedMenu").append(
					"<option value=''  type='t'>その他</option>");
			$("#selSelectedMenu").append(selectedItem.prop("outerHTML"));
		} else if (addObj)
			addObj.after(selectedItem.prop("outerHTML"));
		else
			$("#selSelectedMenu").append(selectedItem.prop("outerHTML"));
		selectedItem.remove();
	}
}
// 登録処理
function btnRegister_Click() {

	var privilegeDate = $('#privilegeDate').datebox('getValue');
	var d = new Date(privilegeDate);
	if (d == "Invalid Date" || privilegeDate.length != 10) {
		$("#p_errorMessage")[0].innerHTML = getMessage("E1020", ["適用日"]);
		return;
	}

	var setting = {
		url : "/IDMS0411/checkStatus.htm",
		data : JSON.stringify({
			userId : $("#iptUserId").val(),
			applyDay: $("#privilegeDate").datebox('getValue')
		}),
		hasLoading : false,
		hasContentType : true,
		success : function(res) {
			//if (res && res.status != undefined && res.status == "1") {
				var userId = $(
						"#iptUserId").val(), organizationCd = $(
						"#iptOrganizationCd").val();
				var tabs = $('#selTab option');
				var plusMenus = $("#selMenu option[type=t][value='']")
						.nextUntil('option[type=t]');
				var lessMenus = $("#selSelectedMenu option[type=t][value='']")
						.nextUntil('option[type=t]');
				var allLessMenus = $("#selSelectedMenu option:not([type=t])");
				var data = [];
				//selected tabs
				for (var i = 0; i < tabs.length; i++) {
					var item = $(tabs[i]);
					data.push({
						userId : userId,
						tabCd : item.attr('value'),
						tabName : item.text(),
						type : 'tab',
						date : privilegeDate,
						organizationCd : organizationCd
					});
				}
				//選択されたタブを保存
				for (var i = 0; i < plusMenus.length; i++) {
					var item = $(plusMenus[i]);
					data.push({
						userId : userId,
						tabCd : item.attr('tabvalue'),
						tabName : item.attr('tabcode'),
						menuId : item.attr('value'),
						menuName : item.text().substring(4),
						addDeleteFlag : '1',
						type : 'menu',
						date : privilegeDate,
						organizationCd : organizationCd
					});
				}
				//タブが選択されないのにメニューが選択された場合は
				if(data.length>0){
					if(!window.data)window.data={arrTab:[]};
					if(!window.data.arrTab)window.data.arrTab=[];
					for (var i = 0; i < lessMenus.length; i++) {
						var item = $(lessMenus[i]);
						var tabCd = item.attr('tabvalue');
						var found = false;
						for(var tabcdArr in window.data.arrTab){
							if(tabCd == tabcdArr){
								found = true;
							}
						}
						if(found)
							data.push({
								userId : userId,
								tabCd : item.attr('tabvalue'),
								tabName : item.attr('tabcode'),
								menuId : item.attr('value'),
								menuName : item.text().substring(4),
								addDeleteFlag : '0',
								type : 'menu',
								date : privilegeDate,
								organizationCd : organizationCd
							});
					}
				}


				if (userId.length == 0) {
					$("#p_errorMessage")[0].innerHTML = getMessage("E1002");
					return;
				}
				//タブとメニューがすべて選択されない場合は、
				if(data.length==0)
					for(var i=0;i<allLessMenus.length;i++){
						var item = $(allLessMenus[i]);
						data.push({
							userId : userId,
							tabCd : item.attr('tabvalue'),
							tabName : item.attr('tabcode'),
							menuId : item.attr('value'),
							menuName : item.text().substring(4),
							addDeleteFlag : '0',
							type : 'menu',
							date : privilegeDate,
							organizationCd : organizationCd
						});
					}
				$("#p_errorMessage")[0].innerHTML = '&nbsp;';
				parent.confirmComponent.callback = function() {
					var setting = {
						url : "/IDMS0411/saveUserMenuInfoList.htm",
						data : JSON.stringify(data),
						hasLoading : false,
						hasContentType : true,
						success : function(res) {
							if (res && res.status == "1")
								showMessage("情報", getMessage("I1002"));
							else
								showMessage("情報", getMessage("E2007"));
						}
					};
					postAjax(setting);
				};

				//処理キューに存在しない
				var message = getMessage("W1002");
				//処理キューに存在する      「入力した適用開始日にメニューの設定がすでに登録されています。変更しますか？」
				if(res && res.status != undefined && res.status == "0"){
					message = getMessage("W1014");
				}
				parent.confirmShow("登録確認",message );
			//}else{
			//	$("#p_errorMessage")[0].innerHTML = getMessage("E1028",["メニュー設定"]);
			//}
		}
	};
	postAjax(setting);

}

// 変数値の空チェック
function isEmpty(v) {
	return typeof v == 'undefined' || v == null || v.length == 0;
}
// 画面にメッセージを表示
function showMessage(title, message) {
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
