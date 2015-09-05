<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>承認役割メンテナンス画面</title>
<%@include file="../common/head.jsp"%>
<script type="text/javascript">
function getCallInfo(){
	var id = "<%=request.getParameter("id")%>";
	return id;
}
</script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/IDMS/IDMS0634.js?${initParam.version}"></script>
</head>
<body>
	<p id="p_errorMessage" style="color: red; padding-left: 10px">&nbsp;</p>
	<form id="IDMS0634Form" method="post">
		<div id="p11" style="padding-left: 10px;width: 700px;">
			<div id="p" class="easyui-panel" title="承認役割情報"
				style="width: 700px; height: auto; padding: 10px;">
				<table cellpadding="2">
					<tr>
						<td style="text-align: left;width:180px">承認役割コード</td>
						<td>
							<input class="easyui-textbox" type="text"
							id="approvalRoleCd" name="approvalRoleCd"
							data-options="required:true,validType:[ 'isAlphabetNum', 'maxLength[3]' ]" style="width:180px" />
						</td>
					</tr>
					<tr>
						<td>承認役割名称</td>
						<td><input class="easyui-textbox" type="text"
							id="approvalRoleName" name="approvalRoleName"
							data-options="required:true,validType:[ 'maxLength[20]' ]" style="width:180px" /></td>
					</tr>
					<tr>
						<td>登録ユーザ</td>
						<td><input class="easyui-textbox" type="text"
							id="createUserName" name="createUserName" disabled
							style="width:180px" /></td>
					</tr>
					<tr>
						<td>更新ユーザ</td>
						<td><input class="easyui-textbox" type="text"
							id="updateUserName" name="updateUserName" disabled
							style="width:180px" /></td>
					</tr>
				</table>
				<input type="hidden" id="loginUserName" name="loginUserName" value="${loginUserName}"/>
			</div>
			<br />
			<div>
				<span style="text-align;"> <a href="javascript:void(0)"
					class="easyui-linkbutton" id="btnRegister" onclick="register()"
					style="width: 100px;">新規登録</a> <a href="javascript:void(0)"
					class="easyui-linkbutton" id="btnBack" onclick="closeWin()" style="width: 100px;">閉じる</a>
				</span> 
				</span>
			</div>
		</div>
	</form>
</body>
</html>