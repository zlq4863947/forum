<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>システムカテゴリメンテナンス画面</title>
<%@include file="../common/head.jsp"%>
<script type="text/javascript">
function getCallInfo(){
	var data = {};
	data.systemCd = "<%=request.getParameter("systemCd")%>";
	data.categoryCd = "<%=request.getParameter("categoryCd")%>";
	return data;
}
</script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/IDMS/IDMS0642.js?${initParam.version}"></script>
</head>
<body>
	<p id="p_errorMessage" style="color: red; padding-left: 10px">&nbsp;</p>
	<form id="IDMS0642Form" method="post">
		<div id="p11" style="padding-left: 10px;width: 700px;">
			<div id="p" class="easyui-panel" title="システムカテゴリ情報"
				style="width: 700px; height: auto; padding: 10px;">
				<table cellpadding="2">
					<tr>
						<td style="text-align: left;width:180px">システム名称</td>
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
						<td style="text-align: left;">カテゴリコード</td>
						<td>
							<input class="easyui-textbox" type="text" id="categoryCd" name="categoryCd"
							data-options="required:true,validType:[ 'isAlphabetNum', 'maxLength[2]' ]" style="width:180px" />
						</td>
					</tr>
					<tr>
						<td style="text-align: left;">カテゴリ名称</td>
						<td>
							<input class="easyui-textbox" type="text" id="categoryName" name="categoryName"
								data-options="required:true,validType:[ 'maxLength[20]' ]" style="width:180px" />
						</td>
					</tr>
					<tr>
						<td style="text-align: left;">申請共通画面パターン</td>
						<td>
							<input class="easyui-textbox" type="text" id="applciationCommonFormPattern" name="applciationCommonFormPattern"
								data-options="validType:[ 'maxLength[2]' ]" style="width:180px" />
						</td>
					</tr>
					<tr>
						<td style="text-align: left;">申請詳細画面種類</td>
						<td>
							<input class="easyui-textbox" type="text" id="applicationDetailFormType" name="applicationDetailFormType"
								data-options="validType:[ 'maxLength[2]' ]" style="width:180px" />
						</td>
					</tr>
					<tr>
						<td style="text-align: left;">申請詳細画面パターン</td>
						<td>
							<input class="easyui-textbox" type="text" id="applicationDetailFormPattern" name="applicationDetailFormPattern"
								data-options="validType:[ 'maxLength[2]' ]" style="width:180px" />
						</td>
					</tr>
					<tr>
						<td style="text-align: left;">申請時表示区分</td>
						<td>
							<input class="easyui-textbox" type="text" id="applicationShowType" name="applicationShowType"
								data-options="validType:[ 'maxLength[1]' ]" style="width:180px" />
						</td>
					</tr>
					<tr>
						<td style="text-align: left;">カテゴリ処理区分</td>
						<td>
							<input class="easyui-textbox" type="text" id="categoryProcessType" name="categoryProcessType"
								data-options="validType:[ 'maxLength[1]' ]" style="width:180px" />
						</td>
					</tr>
					<tr>
						<td style="text-align: left;">権限台帳処理区分</td>
						<td>
							<input class="easyui-textbox" type="text" id="authorityLedgerOperateType" name="authorityLedgerOperateType"
								data-options="validType:[ 'maxLength[1]' ]" style="width:180px" />
						</td>
					</tr>
					<tr>
						<td>表示順</td>
						<td><input class="easyui-textbox" type="text" id="displayOrder" name="displayOrder"
							data-options="validType:[ 'isNumber' ]" style="width:180px" /></td>
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