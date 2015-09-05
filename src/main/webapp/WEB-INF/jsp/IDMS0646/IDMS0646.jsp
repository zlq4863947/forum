<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>業務フローパターンメンテナンス画面</title>
<%@include file="../common/head.jsp"%>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/IDMS/IDMS0646.js?${initParam.version}"></script>
<script type="text/javascript">
function getCallInfo(){
	var id = "<%=request.getParameter("flowPatternCd")==null?null:new String(request.getParameter("flowPatternCd").getBytes("ISO-8859-1"),"UTF-8")%>";
	return id;
}
</script>
</head>
<body>
	<p id="p_errorMessage" style="color: red; padding-left: 10px">&nbsp;</p>
	<form id="IDMS0646Form" method="post">
		<div id="p11" style="padding-left: 10px;width: 700px;">
			<div id="p" class="easyui-panel" title="業務フローパターン"
				style="width: 700px; height: auto; padding: 10px;">
				<table cellpadding="2">
					<tr>
						<td>パターンコード</td>
						<td>
							<input class="easyui-textbox" type="text" id="flowPatternCd" name="flowPatternCd" data-options="required:true,validType:[ 'maxLength[3]' ]" style="width:100px" />
						</td>
					</tr>
					<tr>
						<td style="text-align: left;width:100px">完了メール種類</td>
						<td style="text-align: left;width:100px">
							<select class="easyui-combobox" name="completionMailType" id="completionMailType">
								<option value="01">申請者</option>
							 	<option value="02">利用者</option>
							 	<option value="03">利用者&申請者</option>
							</select>
						</td>
					</tr>
					<tr>
						<td style="text-align: left;width:120px">承認者区分１</td>
						<td style="text-align: left;width:100px"><select class="easyui-combobox" name="approverType1" id="approverType1" style="width:100px" data-options="panelHeight:'auto'"><option value="">&nbsp;</option><option value="1">組織内承認</option><option value="2">役割承認</option></select></td>
						<td style="text-align: left;width:120px">承認役割コード1</td>
						<td style="text-align: left;width:100px"><input class="easyui-textbox" type="text" id="approvalRoleCd1" name="approvalRoleCd1" style="width:100px" /></td>
						<td style="text-align: left;width:120px">全員承認フラグ１</td>
						<td style="text-align: left;width:40px"><input type="checkbox" id="allApprovalFlag1" name="allApprovalFlag1" value="1"></td>
					</tr>
					<tr>
						<td>承認者区分2</td>
						<td><select class="easyui-combobox" name="approverType2" id="approverType2" style="width:100px" data-options="panelHeight:'auto'"><option value="">&nbsp;</option><option value="1">組織内承認</option><option value="2">役割承認</option></select></td>
						<td>承認役割コード2</td>
						<td><input class="easyui-textbox" type="text" id="approvalRoleCd2" name="approvalRoleCd2" style="width:100px" /></td>
						<td>全員承認フラグ2</td>
						<td><input type="checkbox" id="allApprovalFlag2" name="allApprovalFlag2" value="1"></td>
					</tr>
					<tr>
						<td>承認者区分3</td>
						<td><select class="easyui-combobox" name="approverType3" id="approverType3" style="width:100px" data-options="panelHeight:'auto'"><option value="">&nbsp;</option><option value="1">組織内承認</option><option value="2">役割承認</option></select></td>
						<td>承認役割コード3</td>
						<td><input class="easyui-textbox" type="text" id="approvalRoleCd3" name="approvalRoleCd3" style="width:100px" /></td>
						<td>全員承認フラグ3</td>
						<td><input type="checkbox" id="allApprovalFlag3" name="allApprovalFlag3" value="1"></td>
					</tr>
					<tr>
						<td>承認者区分4</td>
						<td><select class="easyui-combobox" name="approverType4" id="approverType4" style="width:100px" data-options="panelHeight:'auto'"><option value="">&nbsp;</option><option value="1">組織内承認</option><option value="2">役割承認</option></select></td>
						<td>承認役割コード4</td>
						<td><input class="easyui-textbox" type="text" id="approvalRoleCd4" name="approvalRoleCd4" style="width:100px" /></td>
						<td>全員承認フラグ4</td>
						<td><input type="checkbox" id="allApprovalFlag4" name="allApprovalFlag4" value="1"></td>
					</tr>
					<tr>
						<td>承認者区分5</td>
						<td><select class="easyui-combobox" name="approverType5" id="approverType5" style="width:100px" data-options="panelHeight:'auto'"><option value="">&nbsp;</option><option value="1">組織内承認</option><option value="2">役割承認</option></select></td>
						<td>承認役割コード5</td>
						<td><input class="easyui-textbox" type="text" id="approvalRoleCd5" name="approvalRoleCd5" style="width:100px" /></td>
						<td>全員承認フラグ5</td>
						<td><input type="checkbox" id="allApprovalFlag5" name="allApprovalFlag5" value="1"></td>
					</tr>
					<tr>
						<td>承認者区分6</td>
						<td><select class="easyui-combobox" name="approverType6" id="approverType6" style="width:100px" data-options="panelHeight:'auto'"><option value="">&nbsp;</option><option value="1">組織内承認</option><option value="2">役割承認</option></select></td>
						<td>承認役割コード6</td>
						<td><input class="easyui-textbox" type="text" id="approvalRoleCd6" name="approvalRoleCd6" style="width:100px" /></td>
						<td>全員承認フラグ6</td>
						<td><input type="checkbox" id="allApprovalFlag6" name="allApprovalFlag6" value="1"></td>
					</tr>
					<tr>
						<td>承認者区分7</td>
						<td><select class="easyui-combobox" name="approverType7" id="approverType7" style="width:100px" data-options="panelHeight:'auto'"><option value="">&nbsp;</option><option value="1">組織内承認</option><option value="2">役割承認</option></select></td>
						<td>承認役割コード7</td>
						<td><input class="easyui-textbox" type="text" id="approvalRoleCd7" name="approvalRoleCd7" style="width:100px" /></td>
						<td>全員承認フラグ7</td>
						<td><input type="checkbox" id="allApprovalFlag7" name="allApprovalFlag7" value="1"></td>
					</tr>
					<tr>
						<td>承認者区分8</td>
						<td><select class="easyui-combobox" name="approverType8" id="approverType8" style="width:100px" data-options="panelHeight:'auto'"><option value="">&nbsp;</option><option value="1">組織内承認</option><option value="2">役割承認</option></select></td>
						<td>承認役割コード8</td>
						<td><input class="easyui-textbox" type="text" id="approvalRoleCd8" name="approvalRoleCd8" style="width:100px" /></td>
						<td>全員承認フラグ8</td>
						<td><input type="checkbox" id="allApprovalFlag8" name="allApprovalFlag8" value="1"></td>
					</tr>
					<tr>
						<td>承認者区分9</td>
						<td><select class="easyui-combobox" name="approverType9" id="approverType9" style="width:100px" data-options="panelHeight:'auto'"><option value="">&nbsp;</option><option value="1">組織内承認</option><option value="2">役割承認</option></select></td>
						<td>承認役割コード9</td>
						<td><input class="easyui-textbox" type="text" id="approvalRoleCd9" name="approvalRoleCd9" style="width:100px" /></td>
						<td>全員承認フラグ9</td>
						<td><input type="checkbox" id="allApprovalFlag9" name="allApprovalFlag9" value="1"></td>
					</tr>
					<tr>
						<td>承認者区分10</td>
						<td><select class="easyui-combobox" name="approverType10" id="approverType10" style="width:100px" data-options="panelHeight:'auto'"><option value="">&nbsp;</option><option value="1">組織内承認</option><option value="2">役割承認</option></select></td>
						<td>承認役割コード10</td>
						<td><input class="easyui-textbox" type="text" id="approvalRoleCd10" name="approvalRoleCd10" style="width:100px" /></td>
						<td>全員承認フラグ10</td>
						<td><input type="checkbox" id="allApprovalFlag10" name="allApprovalFlag10" value="1"></td>
					</tr>
					<tr>
						<td>登録者区分1</td>
						<td><select class="easyui-combobox" name="registrantType1" id="registrantType1" style="width:100px" data-options="panelHeight:'auto'"><option value="">&nbsp;</option><option value="2">役割登録</option><option value="3">自動連携</option></select></td>
						<td>登録役割コード1</td>
						<td><input class="easyui-textbox" type="text" id="registerRoleCd1" name="registerRoleCd1" style="width:100px" /></td>
					</tr>
					<tr>
						<td>登録者区分2</td>
						<td><select class="easyui-combobox" name="registrantType2" id="registrantType2" style="width:100px" data-options="panelHeight:'auto'"><option value="">&nbsp;</option><option value="2">役割登録</option><option value="3">自動連携</option></select></td>
						<td>登録役割コード2</td>
						<td><input class="easyui-textbox" type="text" id="registerRoleCd2" name="registerRoleCd2" style="width:100px" /></td>
					</tr>
					<tr>
						<td>登録者区分3</td>
						<td><select class="easyui-combobox" name="registrantType3" id="registrantType3" style="width:100px" data-options="panelHeight:'auto'"><option value="">&nbsp;</option><option value="2">役割登録</option><option value="3">自動連携</option></select></td>
						<td>登録役割コード3</td>
						<td><input class="easyui-textbox" type="text" id="registerRoleCd3" name="registerRoleCd3" style="width:100px" /></td>
					</tr>
					<tr>
						<td>登録ユーザ</td>
						<td><input class="easyui-textbox" type="text" id="createUserName" name="createUserName" disabled style="width:100px" /></td>
						<td>更新ユーザ</td>
						<td><input class="easyui-textbox" type="text" id="updateUserName" name="updateUserName" disabled style="width:100px" /></td>
						<td><input type="hidden" id="loginUserName" name="loginUserName" value="${loginUserName}"/></td>
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
			</div>
		</div>
	</form>
</body>
</html>