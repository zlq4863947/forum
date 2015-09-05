<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>ログイン</title>
<%@include file="../common/head.jsp"%>
<script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/IDMS/IDMS0013.js?${initParam.version}"></script>
</head>
<body>
<input type="text" style="display: none" name="systemCd" id="systemCd" value="${systemCd}">
<input type="text" style="display: none" name="categoryCd" id="categoryCd" value="${categoryCd}">
<input type="text" style="display: none" name="endUserId" id="endUserId" value="${endUserId}">
<input type="text" style="display: none" name="organizationOfficeCd" id="organizationOfficeCd" value="${organizationOfficeCd}">
<input type="text" style="display: none" name="applyContractCode" id="applyContractCode" value="${applyContractCode}">
<input type="text" style="display: none" name="applicationId" id="applicationId" value="${applicationId}">
<input type="text" style="display: none" name="screenId" id="screenId" value="${screenId}">
	<div id="divRouteTable" style="padding: 10px;" >  
        <table id="routeTable"></table>  
    </div>
    <div style="padding:0px 10px 10px 10px">  
        <a href="javascript:void(0)" class="easyui-linkbutton" style="width: 100px" onclick="closeWindow()">閉じる</a>
    </div>
</body>
</html>