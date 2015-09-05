<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>ユーザ選択</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible"
	content="IE=EmulateIE8; IE=EmulateIE9">
<%
	String agent = request.getHeader("User-Agent");
	if (agent.indexOf("MSIE 8.0") != -1) {
		response.setHeader("X-UA-Compatible", "IE=EmulateIE8");
	} else {
		response.setHeader("X-UA-Compatible", "IE=EmulateIE9");
	}
%>
<base href="<%=request.getContextPath()%>">
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/resources/css/zTreeStyle/zTreeStyle.css?${initParam.version}"
	type="text/css">
<link rel="stylesheet" type="text/css"
	href="<%=request.getContextPath()%>/resources/js/themes/default/easyui.css?${initParam.version}">
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/jquery-1.4.4.min.js?${initParam.version}"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/jquery.ztree.core-3.5.js?${initParam.version}"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/jquery.ztree.excheck-3.5.js?${initParam.version}"></script>
<!--
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/jquery.ztree.exedit-3.5.js?${initParam.version}"></script>
-->
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/jquery.easyui.min.js?${initParam.version}"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/locale/easyui-lang-jp.js?${initParam.version}"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/IDMS/common.js?${initParam.version}"></script>
<script type="text/javascript">
	var CONTEXT_PATH = "${pageContext.request.contextPath}";
</script>
<style scoped="scoped">
.divStyle {
	border: 1px solid #95B8E7;
}
</style>
<script type="text/javascript">
// 0.9.3 アクション一覧に権限制御の記述を追加  START
var endUserId = "<%=request.getParameter("userId")%>";
var organizationCode = "<%=request.getParameter("organizationCode")%>";
var checkFlag = "<%=request.getParameter("checkFlag")%>";
var showProspectiveEmployeeInfo = "<%=request.getParameter("showProspectiveEmployeeInfo")%>";
var authorityFlag = "<%=request.getParameter("authorityFlag")%>";
var screenId = "<%=request.getParameter("screenId")%>";
// 0.9.3 アクション一覧に権限制御の記述を追加  END
// 0.9.6 他ユーザ参照ボタンの対象ユーザは申請者と同じ組織のユーザのみに修正  START
var referenceFlag = "<%=request.getParameter("referenceFlag")%>";
//0.9.6 他ユーザ参照ボタンの対象ユーザは申請者と同じ組織のユーザのみに修正  END
</script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/IDMS/IDMS0011.js?${initParam.version}"></script>
</head>
<body style="text-align:center;padding: 10px;">
	<div class="content_wrap divStyle" style="padding: 10px;width: 580px; height: 510px;">
	<div style="margin:0;margin-left:0px;text-align:left">
		<input class="easyui-textbox" name="userName" id="userName">
	<a onclick="btnSearch()" class="easyui-linkbutton" id="btnSearchUser" style="width: 90px; height: 25px;">検索</a>
	<br><br>
	</div>
	<div class="zTreeDemoBackground left divStyle" style="padding: 10px; width: 560px; height: 400px;overflow-y:scroll;" >
		<ul id="treeDemo" class="ztree"></ul>
	</div>
	<br>
		<a onclick="btnSelected()" class="easyui-linkbutton" id="btnUser" style="width: 90px; height: 25px;">選択</a>
		<a onclick="btnCancel()" class="easyui-linkbutton" id="btnUser" style="width: 90px; height: 25px;">キャンセル</a>
		<input type="checkbox" id="py" class="checkbox first" style="display: none;" checked /> 
		<input type="checkbox" id="sy" class="checkbox first" style="display: none;" checked /> 
		<input type="checkbox" id="pn" class="checkbox first" style="display: none;" checked /> 
		<input type="checkbox" id="sn" class="checkbox first" style="display: none;" checked />
	</div>
</body>
</html>