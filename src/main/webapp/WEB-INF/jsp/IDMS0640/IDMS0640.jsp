<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>システム権限グループメニューメンテナンス画面</title>
<%@include file="../common/head.jsp"%>
<script type="text/javascript">
function getCallInfo(){
	var data = {};
	data.systemCd = "<%=request.getParameter("systemCd")%>";
	data.authorityGroupMenuCd = "<%=request.getParameter("authorityGroupMenuCd")%>";
	return data;
}
</script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/IDMS/IDMS0640.js?${initParam.version}"></script>
</head>
<body>
	<p id="p_errorMessage" style="color: red; padding-left: 10px">&nbsp;</p>
	<form id="IDMS0640Form" method="post">
		<div id="p11" style="padding-left: 10px;width: 700px;">
			<div id="p" class="easyui-panel" title="システム権限グループメニュー情報"
				style="width: 700px; height: auto; padding: 10px;">
				<table cellpadding="2">
					<tr>
						<td style="text-align: left;width:220px">システム名称</td>
						<td>
							<input class="easyui-combobox" id="systemCd" name="systemCd" style="width:220px" validType="needSelect['#systemCd']"
							data-options="url:CONTEXT_PATH+'/COMMON/getSystemList.htm',
										  method:'post',
										  editable:false,
										  textField:'systemName',
										  valueField:'systemCd',
										  onLoadSuccess:function(data){
										  	if(data) $(this).combobox('setValue',data[0].systemCd);
										  }" />
						</td>
					</tr>
					<tr>
						<td style="text-align: left;">権限グループメニューコード</td>
						<td>
							<input class="easyui-textbox" type="text" id="authorityGroupMenuCd" name="authorityGroupMenuCd"
							data-options="required:true,validType:[ 'isAlphabetNum', 'maxLength[100]' ]" style="width:220px" />
						</td>
					</tr>
					<tr>
						<td style="text-align: left;">権限グループメニュー名称</td>
						<td>
							<input class="easyui-textbox" type="text" id="authorityGroupMenuName" name="authorityGroupMenuName"
								data-options="required:true,validType:[ 'maxLength[200]' ]" style="width:220px" />
						</td>
					</tr>
					<tr>
						<td>表示順</td>
						<td><input class="easyui-textbox" type="text" id="displayOrder" name="displayOrder"
							data-options="validType:[ 'isNumber' ]" style="width:220px" /></td>
					</tr>
					<tr>
						<td>登録ユーザ</td>
						<td><input class="easyui-textbox" type="text"
							id="createUserName" name="createUserName" disabled
							style="width:220px" /></td>
					</tr>
					<tr>
						<td>更新ユーザ</td>
						<td><input class="easyui-textbox" type="text"
							id="updateUserName" name="updateUserName" disabled
							style="width:220px" /></td>
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