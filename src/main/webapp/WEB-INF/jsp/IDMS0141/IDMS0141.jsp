<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>複数利用者申請_申請共通</title>
<%@include file="../common/head.jsp"%>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/IDMS/IDMS0141.js?${initParam.version}"></script>
</head>
<body>
<input type="text" style="display: none" name="mode" id="mode" value="${mode}">
<input type="text" style="display: none" name="applcantId" id="applcantId" value= "${applcantId}">
<input type="text" style="display: none" name="organizationCd" id="organizationCd" value= "${organizationCd}" >
<div style="padding-left:10px;">
	<p id="p_errorMessage" style="color: red;">&nbsp;&nbsp;</p>
	<div id="application" class="easyui-panel" style="width:920px;height:515px;">
	<form id="IDMS0141Form" method="post">
		<div class="easyui-panel" title="申請情報"
			style="width:900px;padding:10px 30px 10px 10px">
			<table cellpadding="3">
				<tr>
					<td style="width: 100px;">分類</td>
					<td><input class="easyui-combobox" name="classInfo" id="classInfo" style="width: 245px" required="true" validType="needSelect['#classInfo']"></td>
				</tr>
				<tr>
					<td>システム</td>
					<td><input class="easyui-combobox" name="systemInfo" id="systemInfo" style="width: 245px" disabled required="true" validType="needSelect['#systemInfo']"></td>
				</tr>
				<tr>
					<td>カテゴリ</td>
					<td><input class="easyui-combobox" name="categoryInfo" id="categoryInfo" style="width: 245px" disabled required="true" validType="needSelect['#categoryInfo']"></td>
				</tr>
				<tr id="tr01">
					<td></td>
					<td colspan="3"><label id="comment"></label></td>
				</tr>
			</table>
		</div>
		<div style="margin:10px 0;"></div>
		<div class="easyui-panel" title="利用者情報"
			style="width:900px;padding:10px 30px 10px 10px">
			<a onclick="btnSelectUser_click()" class="easyui-linkbutton"
						style="width: 100px;" id="btnSelectUser" data-options="iconCls:'icon-search'" >利用者選択</a>
			<div style="margin:10px 0;"></div>
			<span style="font-size: 14px;font-family: 'Segoe UI', Arial, Meiryo, sans-serif;">利用者</span>
			<div style="margin:10px 0;"></div>
			<table id="dg" class="easyui-datagrid" data-options="singleSelect:true,checkOnSelect:0,selectOnCheck:0" style=" height:300px;width: 875px;">
					<thead>
						<tr>
							<th data-options="field:'ck',checkbox:true"></th>
							<th data-options="field:'userId',width:40,align:'center',hidden:'true'"></th>
							<th data-options="field:'userAlias',width:120,align:'left',halign:'center'">エイリアス</th>
							<th data-options="field:'employeeNo',width:150,align:'left',halign:'center'">社員番号</th>
							<th data-options="field:'userName',width:150,align:'left',halign:'center'">氏名</th>
							<th data-options="field:'organizationName',width:150,align:'left',halign:'center'">組織</th>
							<th data-options="field:'officeName',width:110,align:'left',halign:'center'">役職</th>
							<th data-options="field:'contractName',width:150,align:'left',halign:'center'">契約形態</th>
						</tr>
					</thead>
			</table>
		</div>
		<div style="margin:10px 0;"></div>
		<div class="easyui-panel" title="申請内容"
			style="width:900px;padding:10px 30px 10px 10px;"  id ="applicaionDiv" >
			<table cellpadding="3" >
				<tr id="tr02">
					<td style="width: 100px;">適用日</td>
					<td colspan="2">
					<input class="easyui-datebox" name="useStartDate" id="useStartDate" data-options="formatter:dateboxFormatter,parser:dateboxParser,validType:'dateVildate'">
					</td> 
				</tr>
				<tr id="tr03">
					<td style="width: 100px;">利用期間</td>
					<td colspan="2">
					<input class="easyui-datebox" name="useFromDate" id="useFromDate" data-options="formatter:dateboxFormatter,parser:dateboxParser,validType:'dateVildate'">
					&nbsp;～&nbsp;
					<input class="easyui-datebox" name="useToDate" id="useToDate" data-options="formatter:dateboxFormatter,parser:dateboxParser,validType:'dateVildate'">
					</td> 
				</tr>
			</table>
		</div>
	</form>
</div>
	<br>
	<a onclick="btnNext_click('<%=request.getContextPath()%>/IDMS0142/IDMS0142.htm?'+Math.random())" class="easyui-linkbutton" style="width:100px;height:30px;">次へ</a>
	</div>
</body>
</html>