<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>承認者・登録者設定画面</title>
<%@include file="../common/head.jsp"%>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resources/css/IDMS0421.css?${initParam.version}">
<script type="text/javascript">
var pageFrom = "<%=request.getParameter("from")==null?"":request.getParameter("from")%>";
</script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/IDMS/IDMS0421.js?${initParam.version}"></script>
</head>
<body>
	<p id="p_errorMessage" style="color: red; padding-left: 10px">&nbsp;</p>
	<form id="mainForm" method="post">
		<div id="p11" style="padding-left: 10px; ">
			<div id="p" class="easyui-panel" title="権限選択"  style="width:820px; height: auto; padding: 10px;">
				<div class="PurviewType">
					<label for="rdoInnerApprover"><input type="radio" name="rdoType"  id="rdoInnerApprover" onclick="rdoInnerApprover_Select()" checked="checked">組織内承認者
					</label>
					<label for="rdoRoleApprover"><input type="radio" name="rdoType"  id="rdoRoleApprover" onclick="rdoRoleApprover_Select()">役割承認者
					</label>
					<label for="rdoRoleRegistrant">
					<input type="radio" name="rdoType"  id="rdoRoleRegistrant" onclick="rdoRoleRegistrant_Select()">役割登録者
					</label>
				</div>
				<table style="padding-top: 10px; ">
					<tr id="trOrg">
						<td style="width: 70px;">組織</td>
						<td style="width: 108px;">
						<a href="javascript:void(0)" class="easyui-linkbutton" onclick="btnSelectDiv_Click()" style="width:100px;"
							data-options="iconCls:'icon-search'">組織選択</a>
						</td>
						<td >
						<input class="easyui-textbox"  id="txtOrganizationName" readonly style="width: 300px;">
						</td>
					</tr>
					<tr id="trRole">
						<td style="width: 70px;">役割</td>
						<td colspan="2"><input class="easyui-combobox" name="selRole" id="selRole" style="width: 160px" validType="needSelect['#selRole']" ></td>
					</tr>
				</table>
			</div>
			<br />
			<div id="p" class="easyui-panel" title="対象者選択"
				style="width:820px; height: auto; padding: 10px;">
				<div>
					<label for="iptRetirementDate" style="margin-right:50px;">適用開始日</label><input class="easyui-datebox" name="txtApplyDay" id="txtApplyDay"  onblur="txtApplyDay_blur" required data-options="validType:'dateVildate',formatter:dateboxFormatter,parser:dateboxParser,onSelect:txtApplyDay_blur"  ><br />
 					<a href="javascript:void(0)" class="easyui-linkbutton userSelectButton" onclick="btnSelectUser_click()" style="width: 100px; margin:10px 0 10px 0;" data-options="disabled:true,iconCls:'icon-search'">対象者選択</a>
				</div>
				<table id="dg" class="easyui-datagrid" data-options="singleSelect:0,checkOnSelect:0,selectOnCheck:0,onSelect:onSelectRow" style=" height:280px;width: 792px;">
					<thead>
						<tr>
							<th data-options="field:'ck',checkbox:true,halign:'center'">付与ユーザ</th>
							<th data-options="field:'userAlias',width:100,align:'left',halign:'center'">エイリアス</th>
							<th data-options="field:'employeeNo',width:90,align:'right',halign:'center'">社員番号</th>
							<th data-options="field:'userName',width:120,align:'left',halign:'center'">氏名</th>
							<th data-options="field:'organizationName',width:214,align:'left',halign:'center'">組織</th>
							<th data-options="field:'officeName',width:80,align:'left',halign:'center'">役職</th>
							<th data-options="field:'contractName',width:140,align:'left',halign:'center'">契約形態</th>
						</tr>
					</thead>
				</table>
			</div>
			<br />
			<div>
				<span>
					<a href="javascript:void(0)" class="easyui-linkbutton" onclick="btnRegister_Click()" style="width: 100px; ">登録</a>
				</span>
			</div>
		</div>
	</form>
</body>
</html>