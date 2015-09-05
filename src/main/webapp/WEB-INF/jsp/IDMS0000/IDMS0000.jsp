<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>ログイン</title>
<%@include file="../common/head.jsp" %>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/IDMS/IDMS0000.js?${initParam.version}"></script>
</head>
<body>
	<div align="center">
		<br/><br/><br/><br/><br/><br/><br/><br/>
		
		<br/><br/><br/>
		<form id="loginForm">
		<table class="login-border" >
			<tr>
				<td style="font-size: 20px;font-weight: bold;" align="right">ログイン</td>
			</tr>
			<tr>
				<td style="width: 80px; height: 30px;" align="right">ログインID:</td>
				<td style="width: 70px; height: 30px;" align="left"><input size="35"  type="text" name="loginId" id="loginId"/></td>
			</tr>
			<tr>
				<td style="width: 80px; height: 30px;" align="right">パスワード:</td>
				<td style="width: 70px; height: 30px;" align="left"><input size="35"  type="password" name="password"/></td>
			</tr>
			<tr>
				
				<td  align="left" style="padding-left: 15px;" colspan="2">
				<a onclick="loginLoad()" class="easyui-linkbutton" style="width: 100px; height: 30px;">ログイン</a>&nbsp;&nbsp;&nbsp;&nbsp;
				<a onclick="clean()" class="easyui-linkbutton" style="width: 100px; height: 30px;">クリア</a>&nbsp;&nbsp;&nbsp;&nbsp;
				<a onclick="shut();" class="easyui-linkbutton" style="width: 100px; height: 30px;">閉じる</a>&nbsp;&nbsp;&nbsp;&nbsp;
				
				</td>
			</tr>
		</table>
		</form>
	</div>
	<%@include file="../common/loading.jsp" %>
</body>

</html>