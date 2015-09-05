<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8; IE=EmulateIE9">
<link rel="shortcut icon" href="<%=request.getContextPath()%>/resources/images/id.ico" />

<%
String agent = request.getHeader("User-Agent");
if(agent.indexOf("MSIE 8.0") != -1){
	response.setHeader("X-UA-Compatible","IE=EmulateIE8");	
}else{
	response.setHeader("X-UA-Compatible","IE=EmulateIE9");
}
%>

<spring:url var="imagesUrl" value="/resources/images/" />

<base href="<%=request.getContextPath()%>">
<link rel="stylesheet" type="text/css"
	href="<%=request.getContextPath()%>/resources/js/themes/default/easyui.css?${initParam.version}">
<link rel="stylesheet" type="text/css"
	href="<%=request.getContextPath()%>/resources/js/themes/icon.css?${initParam.version}">
<link rel="stylesheet" type="text/css"
	href="<%=request.getContextPath()%>/resources/css/common.css?${initParam.version}">
<script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/jquery.min.js?${initParam.version}"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/jquery.easyui.min.js?${initParam.version}"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/locale/easyui-lang-jp.js?${initParam.version}"></script>
	<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/datagrid-scrollview.js?${initParam.version}"></script>
	
<script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/ajaxfileupload.js?${initParam.version}"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/IDMS/common.js?${initParam.version}"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/IDMS/messages.js?${initParam.version}"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/IDMS/IDMSConstants.js?${initParam.version}"></script>
<script type="text/javascript">
	var CONTEXT_PATH = "${pageContext.request.contextPath}";
</script>