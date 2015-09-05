<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>退職権限確認画面</title>
<%@include file="../common/head.jsp"%>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resources/css/IDMS0362.css?${initParam.version}">
<script type="text/javascript"	src="<%=request.getContextPath()%>/resources/js/IDMS/IDMS0362.js?${initParam.version}"></script>
</head>
<body>
	<p id="p_errorMessage" style="color: red; padding-left: 10px">&nbsp;</p>

	<form id="prospectiveEmployeeSelect" method="post">
		<div id="p11" style="padding-left: 10px; ">
			<div id="p1" class="easyui-panel" title="退職者情報"
				style="width:800px; height: auto; padding: 10px;">
				<div>
					<label for="iptRetirementDate" style="margin-right:50px;">退職日</label>
					<input name="iptRetirementDate" id="iptRetirementDate"  disabled="disabled" class="easyui-datebox" data-options="validType:'dateVildate',formatter:dateboxFormatter,parser:dateboxParser"><br /><br />
				</div>
				<table id="dg" class="easyui-datagrid" data-options="singleSelect:0,checkOnSelect:0,selectOnCheck:0,onSelect:onSelectRow,onUnselect:onUnselectRow" style=" height:auto;width: 780px;">
					<thead>
						<tr>
							<th data-options="field:'userId',width:34,formatter:userIdFormatter,halign:'center'">選択</th>
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
			<div id="p2" class="easyui-panel" title="権限情報"
				style="width:800px; height: auto; padding: 10px;">
				<div id='userPurviewTypeaccordion' class="" style="height:auto;">&nbsp;</div>
			</div>
			<br />
			<div>
				<span>
					<a href="javascript:void(0)" class="easyui-linkbutton" onclick="btnRequest_Click()" style="width: 100px; " id='lbtnApply'>申請</a>
					<a href="javascript:void(0)" class="easyui-linkbutton" onclick="btnBack_Click('<%=request.getContextPath()%>/IDMS0361/IDMS0361.htm?from=362')" style="width: 100px; ">戻る</a>
				</span>
			</div>
		</div>
	</form>
</body>
</html>