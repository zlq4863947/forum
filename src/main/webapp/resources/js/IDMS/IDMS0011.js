var code;
var userIdList;
var organizationCodeList;
var settings = {
	view : {
		showIcon : false
	},
	check : {
		enable : true,
		chkStyle : checkFlag == '1' ? "radio" : "checkbox",
		radioType : "all"
	},
	data : {
		simpleData : {
			enable : true
		}
	},
	callback : {
		onCheck : onCheck
	}
};

function showIconForTree(treeId, treeNode) {
	return !treeNode.isParent;
};

function onCheck(e, treeId, treeNode) {
	var zTree = $.fn.zTree.getZTreeObj("treeDemo");
	var nodes = zTree.getCheckedNodes(true);
	var nameLength = nodes.length;
	userIdList = [];
	organizationCodeList = [];
	for (var i = 0, l = nameLength; i < l; i++) {
		if (!nodes[i].isParent) {
			organizationCodeList.push(nodes[i].pId);
			userIdList.push(nodes[i].id.substr(1));
		}
	}
}

function setCheck() {
	var zTree = $.fn.zTree.getZTreeObj("treeDemo"), py = $("#py").attr(
			"checked") ? "p" : "", sy = $("#sy").attr("checked") ? "s" : "", pn = $(
			"#pn").attr("checked") ? "p" : "", sn = $("#sn").attr("checked") ? "s"
			: "", type = {
		"Y" : py + sy,
		"N" : pn + sn
	};
	zTree.setting.check.chkboxType = type;
	showCode('setting.check.chkboxType = { "Y" : "' + type.Y + '", "N" : "'
			+ type.N + '" };');
}
function showCode(str) {
	if (!code) {
		code = $("#code");
	}
	code.empty();
	code.append("<li>" + str + "</li>");
}

$(document).ready(function() {
	userIdList = [];
	organizationCodeList = [];
	if (null != endUserId && undefined != endUserId && "" != endUserId){
		userIdList[0] = endUserId;
	}
	if (null != organizationCode && undefined != organizationCode && "" != organizationCode){
		organizationCodeList[0] = organizationCode;
	}
	initUserTree();
	$("#userName").textbox('textbox').bind('keydown', function(e) {
		if (e.keyCode == 13) {
			$("#userName").textbox('setValue', $(this).val());
			btnSearch();
		}
	});
});

function initUserTree() {
	// 0.9.3 アクション一覧に権限制御の記述を追加 START
	var application = {};
	application.endUserId = endUserId;
	application.organizationCode = organizationCode;
	// 単選、複選フラグ
	application.checkedFlag = checkFlag;
	application.showProspectiveEmployeeInfo = showProspectiveEmployeeInfo;
	application.authorityFlag = authorityFlag;
	application.screenId = screenId;
	// 0.9.6 他ユーザ参照ボタンの対象ユーザは申請者と同じ組織のユーザのみに修正 START
	application.referenceFlag = referenceFlag;
	// 0.9.6 他ユーザ参照ボタンの対象ユーザは申請者と同じ組織のユーザのみに修正 END
	// 0.9.3 アクション一覧に権限制御の記述を追加 END
	var setting = {
		data : application,
		url : "/IDMS0011/reloading.htm",
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
				var userInfo = eval('(' + res.userInfo + ')');
				$.fn.zTree.init($("#treeDemo"), settings, userInfo);
				setCheck();
				$("#py").bind("change", setCheck);
				$("#sy").bind("change", setCheck);
				$("#pn").bind("change", setCheck);
				$("#sn").bind("change", setCheck);
			}
		}
	};
	postAjax(setting);
}

function btnCancel() {
	userIdList = [];
	organizationCodeList = [];
	data = null;
	parent.closeMainDialog(data);
}

function btnSelected() {
	var data = null;
	if (null != userIdList && 0 < userIdList.length ){
		data = [];
		data.endUserId = userIdList;
		data.organizationCode = organizationCodeList;
	}
	parent.closeMainDialog(data);
}

function btnSearch() {
	var userName = $("#userName").textbox("getValue");
	var application = {};
	application.userName = userName;
	application.endUserId = endUserId;
	application.organizationCode = organizationCode;
	// 単選、複選フラグ
	application.checkedFlag = checkFlag;
	application.showProspectiveEmployeeInfo = showProspectiveEmployeeInfo;
	application.authorityFlag = authorityFlag;
	application.screenId = screenId;
	// 0.9.6 他ユーザ参照ボタンの対象ユーザは申請者と同じ組織のユーザのみに修正 START
	application.referenceFlag = referenceFlag;
	// 0.9.6 他ユーザ参照ボタンの対象ユーザは申請者と同じ組織のユーザのみに修正 END
	var setting = {
		data : application,
		url : "/IDMS0011/reloading.htm",
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
				var userInfo = eval('(' + res.userInfo + ')');
				$.fn.zTree.init($("#treeDemo"), settings, userInfo);
			}
		}
	};
	postAjax(setting);
}