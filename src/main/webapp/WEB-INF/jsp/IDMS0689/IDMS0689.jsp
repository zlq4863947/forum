<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>メニューメンテナンス画面</title>
<%@include file="../common/head.jsp"%>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/IDMS/IDMS0689.js?${initParam.version}"></script>
</head>
<body>
	<p id="p_errorMessage" style="color: red; padding-left: 10px">&nbsp;</p>
	<form id="IDMS0689Form" method="post">
		<div id="p11" style="padding-left: 10px;width: 600px;">
			<div id="p" class="easyui-panel" title="メニュー情報"
				style="width: 600px; height: auto; padding: 10px;">
				<table cellpadding="2">
					<tr>
						<td style="text-align: left;width:100px">タブ</td>
						<td>
							<input class="easyui-combobox" id="tabCd" name="tabCd" style="width:270px" validType="needSelect['#tabCd']"
								data-options="url:CONTEXT_PATH+'/COMMON/getTabList.htm',
										  method:'post',
										  required:true,
										  panelHeight:'auto',
										  textField:'tabName',
										  valueField:'tabCd',
										  onLoadSuccess:function(data){
										  	if(data) $(this).combobox('setValue',data[0].tabCd);
										  }" />
						</td>
					</tr>
					<tr>
						<td>メニュー</td>
						<td><input class="easyui-combobox" id="menuId" name="menuId" style="width:270px" validType="needSelect['#menuId']"
								data-options="url:CONTEXT_PATH+'/COMMON/getMenuList.htm',
										  method:'post',
										  required:true,
										  panelHeight:'130',
										  textField:'menuName',
										  valueField:'menuId',
										  onLoadSuccess:function(data){
										  	if(data) $(this).combobox('setValue',data[0].menuId);
										  }" /></td>
					</tr>
					<tr>
						<td>登録ユーザ</td>
						<td><input class="easyui-textbox" type="text"
							id="createUserName" name="createUserName" disabled
							style="width:270px" /></td>
					</tr>
					<tr>
						<td>更新ユーザ</td>
						<td><input class="easyui-textbox" type="text"
							id="updateUserName" name="updateUserName" disabled
							style="width:270px" /></td>
					</tr>
				</table>
				<input type="hidden" id="loginUserName" name="loginUserName" value="${loginUserName}"/>
			</div>
			<br />
			<div>
				<span style="text-align;"> <a href="javascript:void(0)"
					class="easyui-linkbutton" id="btnRegister" onclick="register()"
					style="width: 100px;">新規登録</a> <a href="javascript:void(0)"
					class="easyui-linkbutton" onclick="closeWin()" style="width: 100px;">閉じる</a>
				</span> 
				</span>
			</div>
		</div>
	</form>
</body>
</html>