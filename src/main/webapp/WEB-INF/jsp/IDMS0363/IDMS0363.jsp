<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>退職承認詳細画面</title>
<%@include file="../common/head.jsp"%>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resources/css/IDMS0363.css?${initParam.version}">
<script type="text/javascript">
var parameterMap = {
		applicationId:'<%=request.getParameter("applicationId")==null?"":request.getParameter("applicationId")%>',
		endUserId:'<%=request.getParameter("endUserId")==null?"":request.getParameter("endUserId")%>',
		operationType:'<%=request.getParameter("operationType")==null?"":request.getParameter("operationType")%>',
		operationOrder:'<%=request.getParameter("operationOrder")==null?"":request.getParameter("operationOrder")%>',
		taskId:'<%=request.getParameter("taskId")==null?"":request.getParameter("taskId")%>',
		mode:'<%=request.getParameter("mode")==null?"":request.getParameter("mode")%>'
} ;
</script>
<script type="text/javascript"	src="<%=request.getContextPath()%>/resources/js/IDMS/IDMS0363.js?${initParam.version}"></script>
</head>
<body>
	<p id="p_errorMessage" style="color: red; padding-left: 10px">&nbsp;</p>

	<form id="prospectiveEmployeeSelect" method="post">
		<div id="p11" style="padding-left: 10px; ">
			<div id="p1" class="easyui-panel" title="退職者情報"
				style="width:800px; height: auto; padding: 10px;">
				<div>
					<label for="iptRetirementDate" style="margin-right:50px;">退職日</label>
					<input name="iptRetirementDate" id="iptRetirementDate" disabled="disabled" class="easyui-datebox" data-options="validType:'dateVildate',formatter:dateboxFormatter,parser:dateboxParser">
					<input name="iptRetirementAfterAdjustDate" id="iptRetirementAfterAdjustDate" type="hidden" >
					<br /><br />
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
			<div id="p2" class="easyui-panel" title="権限情報"
				style="width:800px; height: auto; padding: 10px;">
				<table width='100%'><tr><td valign=top>備考/却下理由</td><td  valign=top align=right >

				<input id='iptComment' class="easyui-textbox" data-options="multiline:true,validType:[ 'maxLength[256]' ]"
				 style="width:650px;height:100px">
				</td></tr></table>
			</div>
			<br />
			<div style="width:800px; ">
				<span style="float:left;">
					<%if(!"1".equals(request.getParameter("mode"))){%>
					<a href="javascript:void(0)" class="easyui-linkbutton" onclick="btnRequest_Click()" style="width: 100px; " id='lbtnApply'>承認</a>
					<a href="javascript:void(0)" class="easyui-linkbutton" onclick="btnDenial_click()" style="width: 100px; " id='lbtnDrop'>却下</a>
					<%}%>
					<a href="javascript:void(0)" class="easyui-linkbutton" onclick="btnRemand_click()" style="width: 100px; display:none;  ">差戻</a>
					<span style="display:none;">差戻先</span><select style="display:none;"><option>申請者</option><option></option></select>

				</span>
				<span style="float:right;">
					<a href="javascript:void(0)" class="easyui-linkbutton" onclick="btnOutput_Click()" style="width: 100px; display:none;">CSV出力</a>
					<a href="javascript:void(0)" class="easyui-linkbutton" onclick="btnBack_Click()" style="width: 100px; ">閉じる</a>
				</span>
			</div>
		</div>
	</form>
</body>
</html>