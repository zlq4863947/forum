<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>退職対象者選択画面</title>
<%@include file="../common/head.jsp"%>
<script type="text/javascript">
var pageFrom = "<%=request.getParameter("from")==null?"":request.getParameter("from")%>";
</script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/IDMS/IDMS0361.js?${initParam.version}"></script>
</head>
<body>
	<p id="p_errorMessage" style="color: red; padding-left: 10px">&nbsp;</p>
	<form id="prospectiveEmployeeSelect" method="post">
		<div id="p11" style="padding-left: 10px; ">
			<div id="p" class="easyui-panel" title="退職者情報"
				style="width:820px; height: auto; padding: 10px;">
				<div>
					<label for="iptRetirementDate" style="margin-right:50px;">退職日</label><input class="easyui-datebox" name="iptRetirementDate" id="iptRetirementDate" required data-options="validType:'dateVildate',formatter:dateboxFormatter,parser:dateboxParser" ><br />
 					<a href="javascript:void(0)" class="easyui-linkbutton" onclick="btnSelectUse_Click()" style="width: 100px; margin:10px 0 10px 0;"
							data-options="iconCls:'icon-search'">対象者選択</a>
 					<a href="javascript:void(0)" class="easyui-linkbutton" onclick="btnUploadCSV_Click()" style="width: 100px; margin:10px 0 10px 0;">CSV取込</a><div class='fileControlWrapHide' style='display:none;'></div><br />
 					対象者<br /><br />
				</div>
				<table id="dg" class="easyui-datagrid" data-options="singleSelect:0,checkOnSelect:0,selectOnCheck:0,onSelect:onSelectRow" style=" height:280px;width: 792px;">
					<thead>
						<tr>
							<th data-options="field:'ck',checkbox:true"></th>
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
					<a href="javascript:void(0)" class="easyui-linkbutton" onclick="btnNext_Click('<%=request.getContextPath()%>/IDMS0362/IDMS0362.htm?'+Math.random())" style="width: 100px; ">次へ</a>
				</span>
			</div>
		</div>
	</form>
</body>
</html>