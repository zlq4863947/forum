var code;
var organizationCodeInfo;
var organizationNameInfo;
var organizationRankInfo;
var settings = {
	view : {
		showIcon : false
	},
	check : {
		enable : true,
		chkStyle : "radio",
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

function onCheck(e, treeId, treeNode) {
	var zTree = $.fn.zTree.getZTreeObj("treeDemo");
	var nodes = zTree.getCheckedNodes(true);
	var nameLength = nodes.length;
	for (var i = 0; i < nameLength; i++) {
		var org = nodes[i].namerank.split(":");
		organizationCodeInfo = nodes[i].id;
		organizationNameInfo = org[0];
		organizationRankInfo = org[1];
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
	organizationCodeInfo = null;
	organizationNameInfo = null;
	organizationRankInfo = null;
	if (null != organizationCode && undefined != organizationCode && "" != organizationCode){
		organizationCodeInfo = organizationCode;
		organizationNameInfo = organizationName;
		organizationRankInfo = organizationRank;
	}
	initUserTree();
	$("#orgName").textbox('textbox').bind('keydown', function(e){
		if (e.keyCode == 13){
			$("#orgName").textbox('setValue', $(this).val());
			btnSearch();
		}
	});
});

function initUserTree() {
	userInfo();
	var application = {};
	application.organizationCode = organizationCode;
	application.organizationName = organizationName;
	application.oldOrganizationFlag = oldOrganizationFlag;
	var setting = {
		data : application,
		url : "/IDMS0012/reloading.htm",
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
				var organizationInfo = eval('(' + res.organizationInfo + ')');
				$.fn.zTree.init($("#treeDemo"), settings, organizationInfo);
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
function showIconForTree(treeId, treeNode) {
	return !treeNode.isParent;
};

function btnCancel() {
	data = null;
	parent.closeMainDialog(data);
}

function btnSelected() {
	var data = null;
	if (null != organizationCodeInfo){
		data = {};
		data.organizationCode = organizationCodeInfo;
		data.organizationName = organizationNameInfo;
		data.organizationRank = organizationRankInfo;
	}
	parent.closeMainDialog(data);
}

function btnSearch() {
	var searchOrganizationName = $("#orgName").textbox("getValue");
	var application = {};
	application.organizationCode = organizationCode;
	application.organizationName = organizationName;
	application.oldOrganizationFlag = oldOrganizationFlag;
	application.searchOrganizationName = searchOrganizationName;
	var setting = {
		data : application,
		url : "/IDMS0012/reloading.htm",
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
				var organizationInfo = eval('(' + res.organizationInfo + ')');
				$.fn.zTree.init($("#treeDemo"), settings, organizationInfo);
			}
		}
	};
	postAjax(setting);
}