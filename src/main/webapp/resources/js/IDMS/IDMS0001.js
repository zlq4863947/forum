
var goMenuArray;

$(function(){
	displayMenuInfo();
	displayTaskCount();
	getTabMenuList();
	initTabClose();
	$("#headerTable").css({ "width": document.body.offsetWidth + "px" })
});


function initTabClose(){
	 //监听右键事件，创建右键菜单
    $('#mainTabs').tabs({
        onContextMenu:function(e, title,index){
            e.preventDefault();
            if(index>=0){
                $('#rcmenu').menu('show', {
                    left: e.pageX,
                    top: e.pageY
                }).data("tabTitle", title);
            }
        }
    });
    //右键菜单click
    $("#rcmenu").menu({
        onClick : function (item) {
            closeTab(this, item.name);
        }
    });
}


//删除Tabs
function closeTab(menu, type) {
    var allTabs = $("#mainTabs").tabs('tabs');
    var allTabtitle = [];
    $.each(allTabs, function (i, n) {
        var opt = $(n).panel('options');
        if (opt.closable)
            allTabtitle.push(opt.title);
    });
    var curTabTitle = $(menu).data("tabTitle");
    var curTabIndex = $("#mainTabs").tabs("getTabIndex", $("#mainTabs").tabs("getTab", curTabTitle));
    switch (type) {
        case "1"://关闭当前
            //$("#mainTabs").tabs("close", curTabTitle);
            $('#mainTabs').tabs('close', curTabIndex);
            return false;
            break;
        case "2"://全部关闭
//            for (var i = 0; i < allTabtitle.length; i++) {
//                $('#mainTabs').tabs('close', allTabtitle[i]);
//            }
            
            var tablist = $('#mainTabs').tabs('tabs');
            for(var i=tablist.length-1;i>=0;i--){
                $('#mainTabs').tabs('close',i);
            }
            break;
        case "3"://除此之外全部关闭
//            for (var i = 0; i < allTabtitle.length; i++) {
//                if (curTabTitle != allTabtitle[i])
//                    $('#mainTabs').tabs('close', allTabtitle[i]);
//            }
//            $('#mainTabs').tabs('select', curTabTitle);
        	
        	
            var tablist = $('#mainTabs').tabs('tabs');
            //var tab = $('#mainTabs').tabs('getSelected');
            //var index = $('#mainTabs').tabs('getTabIndex',tab);
            for(var i=tablist.length-1;i>curTabIndex;i--){
                $('#mainTabs').tabs('close',i);
            }
            var num = curTabIndex-1;
            for(var i=num;i>=0;i--){
                $('#mainTabs').tabs('close',0);
            }
            break;
        case "4"://当前侧面右边
//            for (var i = curTabIndex; i < allTabtitle.length; i++) {
//                $('#mainTabs').tabs('close', allTabtitle[i]);
//            }
//            $('#mainTabs').tabs('select', curTabTitle);


            var tablist = $('#mainTabs').tabs('tabs');
            //var tab = $('#mainTabs').tabs('getSelected');
            //var index = $('#mainTabs').tabs('getTabIndex',tab);
            for(var i=tablist.length-1;i>curTabIndex;i--){
                $('#mainTabs').tabs('close',i);
            }
            
            
            $('#mainTabs').tabs('select', curTabTitle);
            
            break;
        case "5": //当前侧面左边
//            for (var i = 0; i < curTabIndex - 1; i++) {
//                $('#mainTabs').tabs('close', allTabtitle[i]);
//            }
//            $('#mainTabs').tabs('select', curTabTitle);
        	
            //var tab = $('#mainTabs').tabs('getSelected');
            //var index = $('#mainTabs').tabs('getTabIndex',tab);
            var num = curTabIndex-1;
            for(var i=0;i<=num;i++){
                $('#mainTabs').tabs('close',0);
            }
            
            $('#mainTabs').tabs('select', curTabTitle);
            break;
    }

}

function refreshTask(){
	$("#taskNum").html('0');
	var setting = {
			data : null,
			url : "/IDMS0001/displayTaskCount.htm",
			hasLoading : true,
			success : function(res) {
				if (res.errorResultDto) {
					errors = res.errorResultDto.errorList;
					var messages = "";
					$.each(errors, function(i, err) {
						messages += err.errorMessage + "<br>";
					});

					jQuery.messager.alert(' ', messages);
				} else {
					$("#taskNum").html(res.taskCount);

				}

			}
		};
		postAjax(setting);
	
}

function displayMenuInfo(){

	var setting = {
			data : null,
			url : "/IDMS0001/displayMenuInfo.htm",
			hasLoading : false,
			success : function(res) {
				if (res.errorResultDto) {
					errors = res.errorResultDto.errorList;
					var messages = "";
					$.each(errors, function(i, err) {
						messages += err.errorMessage + "<br>";
					});

					jQuery.messager.alert(' ', messages);
				} else {

					$("#userInfo").html(res.userAlias + "：" + res.userName);
					
					// お問合せのメールアドレス
					$("#mailTo").attr("href","mailto:" + res.contactToAddress);
					// お問合せの名前
					$("#mailTo").html(res.contactToName);
				}

			}
		};
		postAjax(setting);

}

function displayTaskCount(){

	var setting = {
			data : null,
			url : "/IDMS0001/displayTaskCount.htm",
			hasLoading : false,
			success : function(res) {
				if (res.errorResultDto) {
					errors = res.errorResultDto.errorList;
					var messages = "";
					$.each(errors, function(i, err) {
						messages += err.errorMessage + "<br>";
					});

					jQuery.messager.alert(' ', messages);
				} else {
					$("#taskNum").html(res.taskCount);
				}

			}
		};
		postAjax(setting);

}

function getTabMenuList(){

	var setting = {
			data : null,
			url : "/IDMS0001/initMenu.htm",
			hasLoading : false,
			success : function(res) {
				if (res.errorResultDto) {
					errors = res.errorResultDto.errorList;
					var messages = "";
					$.each(errors, function(i, err) {
						messages += err.errorMessage + "<br>";
					});

					jQuery.messager.alert('エラーメッセージ', messages,'error');
				} else {
					
					setTabMenu(res);

				}

			}
		};
		postAjax(setting);

}

var goTabMenuList;

function setTabMenu(res){
	goTabMenuList = res.initTabMenuList;

	goMenuArray = new Array();

	$.each(res.initTabMenuList, function(i, tabMenu) {

	    var labelHTMLNode = document.createElement("label");
	    labelHTMLNode.id = tabMenu.tabCd;

	    labelHTMLNode.className = "main01";

	    labelHTMLNode.innerHTML = tabMenu.tabName;

	    $('#menuTab')[0].appendChild(labelHTMLNode);

	    goMenuArray.push(labelHTMLNode);

	    labelHTMLNode.onclick = function(){

	    	if(this.className.indexOf("active") == -1){

		    	$(this).addClass("active");
		        for (var i = 0; i < goMenuArray.length; i++) {
		            if (goMenuArray[i].id != this.id) {
		                $("#"+ goMenuArray[i].id).removeClass("active");
		            }
		        }

		        $("#menuList").html("");
		        var menuListStr = "";
		        for(var i = 0; i < goTabMenuList.length; i++ ){

		        	if(goTabMenuList[i].tabCd ==this.id){
		        		
		        		indexTab = i;

		        		for(var j = 0; j < goTabMenuList[i].menuList.length; j++){
		        			if(goTabMenuList[i].menuList[j].menuUrl == undefined || goTabMenuList[i].menuList[j].menuUrl == null || goTabMenuList[i].menuList[j].menuUrl == ""){
		        				continue;
		        			}
			        		menuListStr += "<li >";

			        		menuListStr += "<a href=\"javascript:void(0)\" name=\""
			        			+ goTabMenuList[i].menuList[j].menuId + "\" onclick=\"openMainTab(this.name)\">"
			        			+ goTabMenuList[i].menuList[j].menuName + "</a>";

			        		menuListStr += "</li>";

		        		}

		        	}
		        }

		        $("#menuList").html(menuListStr);

	    	}

	    };

	});

	if(goMenuArray != null && goMenuArray.length > 0){
		goMenuArray[0].click();
	}

}

function getMenuByMenuId(menuId){

	for (var i = 0; i < goTabMenuList.length; i++) {

		for (var j = 0; j < goTabMenuList[i].menuList.length; j++) {

			if (menuId == goTabMenuList[i].menuList[j].menuId) {
				return goTabMenuList[i].menuList[j];

			}

		}

	}
}


var indexTab = 0;

function openMainTab(menuId){

	// 複数申請画面の保存データを削除する
	if(menuId == "IDMS0141"){
		if(parent.window._0141data){
			parent.window._0141data = undefined;
		}
		if(parent.window._0142data){
			parent.window._0142data = undefined;
		}
		if(parent.window._0150data){
			parent.window._0150data = undefined;
		}
	}

	var activeli = $("[name='"+ menuId +"']").parent();

	for(var j = 0; j < goTabMenuList[indexTab].menuList.length; j++){

		if(goTabMenuList[indexTab].menuList[j].menuId != menuId){
			$("[name='"+ goTabMenuList[indexTab].menuList[j].menuId +"']").parent().removeClass("active");
		}

	}
	
	activeli.addClass("active");

	var selectedMenu = getMenuByMenuId(menuId);

	var text = selectedMenu.menuName;

	if(selectedMenu.menuUrl == undefined || selectedMenu.menuUrl == null || selectedMenu.menuUrl == ""){
		return;
	}

	var elTab = parent.$('#mainTabs');
	if (elTab.tabs('exists', text)) {
		elTab.tabs('select', text);
	} else {
		
		if(selectedMenu.menuUrl.indexOf("http") == -1){
			var url = CONTEXT_PATH + selectedMenu.menuUrl;
			
		} else {
			var url = selectedMenu.menuUrl;
		}
		
		var content = '<div style="width:100%;height:100%;overflow:hidden;">'+
				'<iframe src="' + url + '" scrolling="auto" style="width:100%;height:100%;border:0;" ></iframe></div>';

		elTab.tabs('add', {
			title : text,
			content : content,
			// href: url,
			closable : true
		});
	}

}

function mainMenu_Click(mainMenu){

    mainMenu.className = mainMenu.className + " active";
    for (var i = 0; i < goMenuArray.length; i++) {
        if (goMenuArray[i] != this) {
            goMenuArray[i].className = goMenuArray[i].className.replace(" active", "");
        }
    }
}

//--- Dialog Open について-----------------------------------------------------------------------------

var dialogIndex = 1;

var mainDialogShow1 = new Object();
var mainDialogShow2 = new Object();
var mainDialogShow3 = new Object();
var mainDialogShow4 = new Object();
var mainDialogShow5 = new Object();

function openMainDialog(title, url, width, height){

	$("#mainDialog" + dialogIndex).html("<iframe id=\"iframeInMainDialog" + dialogIndex + "\" name=\"iframeInMainDialog" + dialogIndex + "\" style=\"border: 0px;height: 100%; width: 100%\" src=\""
			+ CONTEXT_PATH +url +"\"></iframe>");

	$('#mainDialog' + dialogIndex).dialog(
			{
				title : title,
				width : width,
				height : height,
				closed : true,
				cache : false,
				modal : true,
				onBeforeClose : function() {

					if (getDialogObjectByIndex(dialogIndex - 1).closeFlag != undefined
							&& getDialogObjectByIndex(dialogIndex - 1).closeFlag == "true") {
						
						getDialogObjectByIndex(dialogIndex - 1).closeMethod();
					}
					clearDialogObject(dialogIndex - 1);
					$("#mainDialog" + (dialogIndex - 1)).html("");

					dialogIndex = dialogIndex - 1;
				},
				onResize : function() {
					$(this).dialog('center');
				}
			});

	$('#mainDialog' + dialogIndex).dialog('open');

	dialogIndex = dialogIndex + 1;
}

function closeMainDialog(data) {
	getDialogObjectByIndex(dialogIndex - 1).callback(data);

	$('#mainDialog' + (dialogIndex - 1)).dialog('close');

}

function getDialogObjectByIndex(tempIndex){

	if(tempIndex == 1){
		return mainDialogShow1;
	}
	else if(tempIndex == 2){
		return mainDialogShow2;
	}
	else if(tempIndex == 3){
		return mainDialogShow3;
	}
	else if(tempIndex == 4){
		return mainDialogShow4;
	}
	else if(tempIndex == 5){
		return mainDialogShow5;
	}

}

function getDialogObject(){

	if(dialogIndex == 1){
		return mainDialogShow1;
	}
	else if(dialogIndex == 2){
		return mainDialogShow2;
	}
	else if(dialogIndex == 3){
		return mainDialogShow3;
	}
	else if(dialogIndex == 4){
		return mainDialogShow4;
	}
	else if(dialogIndex == 5){
		return mainDialogShow5;
	}

}

function clearDialogObject(clearIndex){

	if(clearIndex == 1){
		mainDialogShow1 = new Object();
	}
	else if(clearIndex == 2){
		mainDialogShow2 = new Object();
	}
	else if(clearIndex == 3){
		mainDialogShow3 = new Object();
	}
	else if(clearIndex == 4){
		mainDialogShow4 = new Object();
	}
	else if(clearIndex == 5){
		mainDialogShow5 = new Object();
	}

}

//--- Dialog Open について-----------------------------------------------------------------------------

var confirmComponent = new Object();

function confirmShow(title, message){
	$.messager.confirm(title, message, function(r) {
		if (r) {
			confirmComponent.callback();
		}
	});
}

function showInbox(){
	var setting = {
			data : null,
			url : "/IDMS0001/displayTaskCount.htm",
			hasLoading : true,
			success : function(res) {
				if (res.errorResultDto) {
					errors = res.errorResultDto.errorList;
					var messages = "";
					$.each(errors, function(i, err) {
						messages += err.errorMessage + "<br>";
					});

					jQuery.messager.alert(' ', messages);
				} else {
					$("#taskNum").html(res.taskCount);
					window.open(CONTEXT_PATH + "/MyInbox.htm");
				}

			}
		};
	postAjax(setting);

}

function alertShow(title, message){
	jQuery.messager.alert(title, message);
}

var displayheadFlag = true;
function displayHead(){
	if(displayheadFlag){
		document.getElementById("headLayout").style.display = "none";
		displayheadFlag = false;
		$("#headDisplayBtn").removeClass("layout-button-up");
		$("#headDisplayBtn").addClass("layout-button-down");
	} else{
		document.getElementById("headLayout").style.display = "block";
		displayheadFlag = true;
		$("#headDisplayBtn").removeClass("layout-button-down");
		$("#headDisplayBtn").addClass("layout-button-up");
	}
	$(window).resize();
}

function toLogin(){
	window.location.href = CONTEXT_PATH + "/IDMS0000/IDMS0000.htm";
}

//Heightを取得する
function getMainFrameHeight() {
	
	var winHeight = 0;

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

	return winHeight;
}