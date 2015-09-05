<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.util.List"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>権限一覧</title>
<%@include file="../common/head.jsp"%>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/IDMS/IDMS0014.js?${initParam.version}"></script>
</head>
<body>
	<div style="padding-left: 10px; padding-top: 10px;">
		<div id="authorityInfo" class="easyui-panel"
			style="width: 372px; height: 350px; padding-left: 10px;">
			<div style="margin: 10px 0"></div>
			<label>権限/グループ/メニュー</label> <br> 
			<select multiple name="authorityList"
				id="authorityList" style="width: 350px; height: 300px">
			</select>
		</div>
		<br> <a onclick="closed()" class="easyui-linkbutton"
			style="width: 100px; height: 30px;">閉じる </a>
	</div>
</body>
</html>