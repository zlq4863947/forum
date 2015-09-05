<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>登録完了通知メンテナンス画面</title>
<%@include file="../common/head.jsp"%>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/IDMS/IDMS0641.js?${initParam.version}"></script>
<script type="text/javascript">
function getCallInfo(){
	var data = {};
	data.systemCd = "<%=request.getParameter("systemCd")%>";
	data.mailaddressId = "<%=request.getParameter("mailaddressId")%>";
	return data;
}
</script>
</head>
<body>
	<p id="p_errorMessage" style="color: red; padding-left: 10px">&nbsp;</p>
	<form id="IDMS0641Form" method="post">
		<div id="p11" style="padding-left: 10px;width: 700px;">
			<div id="p" class="easyui-panel" title="登録完了通知情報"
				style="width: 700px; height: auto; padding: 10px;">
				<table cellpadding="2">
					<tr>
						<td style="text-align: left;width:180px">システム名</td>
						<td>
							<input class="easyui-combobox" id="systemCd" name="systemCd" style="width:180px" validType="needSelect['#systemCd']"
							data-options="url:CONTEXT_PATH+'/COMMON/getSystemList.htm',
										  method:'post',
										  panelHeight:'auto',
										  editable:false,
										  textField:'systemName',
										  valueField:'systemCd',
										  onLoadSuccess:function(data){
										  	if(data) $(this).combobox('setValue',data[0].systemCd);
										  }" />
						</td>
					</tr>
					<tr>
						<td>ユーザ</td>
						<td><a ref="javascript:void(0)" class="easyui-linkbutton"  id="btnUserSelect"
							data-options="iconCls:'icon-search'" style="width: 100px"
							onclick="openUserSelect()">ユーザ選択</a></td>
					</tr>
					<tr>
						<td/>
						<td>
							<input class="easyui-textbox" type="text" id="userName" name="userName" disabled style="width:180px" />
							<input type="hidden" id="userId" name="userId"/>
							<input type="hidden" id="organizationCd" name="organizationCd"/>
						</td>
					</tr>
					<tr>
						<td>メールアドレス</td>
						<td>
							<input class="easyui-combobox" id="mailAddressId" name="mailAddressId" style="width:180px"
							 validType="needSelect['#mailAddressId']" disabled
							 data-options="
										  method:'post',
										  panelHeight:'auto',
										  editable:false,
										  textField:'mailAddress',
										  valueField:'mailaddressId',
										  onLoadSuccess:function(data){
										  	if(data.length && !$(this).combobox('getValue')) $(this).combobox('setValue',data[0].mailaddressId);
										  }"/>
							<input type="hidden" id="oldMailAddressId" name="oldMailAddressId" value="0"/>
						</td>
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