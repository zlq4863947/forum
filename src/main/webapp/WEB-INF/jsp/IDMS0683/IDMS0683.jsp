<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>契約形態システム紐付設定</title>
<%@include file="../common/head.jsp"%>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/IDMS/IDMS0683.js?${initParam.version}"></script>
</head>
<body>
	<p id="p_errorMessage" style="color: red; padding-left: 10px">&nbsp;</p>
	<form id="contractSystemForm" method="post">
		<div id="contractSystemDiv" style="padding-left: 10px; ">
		<div id="searchDiv" class="easyui-panel" title="検索条件"
		style="width:1055px;height:110px;">
				<table style=" height:60px;width: 1035px; padding: 10px;">
				<tr>
					<td>契約形態名称</td>
					<td>
					<input class="easyui-combobox" style="width: 200px;"
							name="contractInfo" id="contractInfo">
					</td>
					<td>システム名称</td>
					<td>
					<input class="easyui-combobox" style="width: 332px;"
							name="systemInfo" id="systemInfo">
					</td>
				</tr>
				<tr>
				<td colspan="4">
					<a onclick="btnSearch_Click()"
					class="easyui-linkbutton" style="width: 100px;">表示</a>
					</td>
				</tr>
				</table>
			</div>
			<div style="margin: 10px 0;"></div>
			<div id="contractSystemList" class="easyui-panel" title="契約形態システム紐付一覧"
				style="width:1055px; height: auto; padding: 10px;">
				<div>
 					<a href="javascript:void(0)" class="easyui-linkbutton" onclick="btnNew_Click()" style="width: 100px; margin-bottom:10px;">新規登録</a>
				</div>
				<table id="dg" class="easyui-datagrid" data-options="singleSelect:0,checkOnSelect:0,selectOnCheck:0,onSelect:onSelectRow" style=" height:280px;width: 1035px;">
					<thead>
						<tr>
							<th data-options="field:'ck',checkbox:true"></th>
							<th data-options="field:'systemCd',formatter:systemCdFormatter,width:50,align:'center',halign:'center'">編集</th>
							<th data-options="field:'contractCd',width:40,align:'center',hidden:'true'"></th>
							<th data-options="field:'contractName',width:150,align:'left',halign:'center'">契約形態</th>
							<th data-options="field:'systemName',width:150,align:'left',halign:'center'">システム名</th>
							<th data-options="field:'effectiveDate',width:90,align:'left',halign:'center'">適用開始日</th>
							<th data-options="field:'expireDate',width:90,align:'left',halign:'center'">適用終了日</th>
							<th data-options="field:'createBy',width:110,align:'left',halign:'center'">登録者名</th>
							<th data-options="field:'createOn',width:120,align:'left',halign:'center'">登録日時</th>
							<th data-options="field:'updateBy',width:110,align:'left',halign:'center'">更新者名</th>
							<th data-options="field:'updateOn',width:120,align:'left',halign:'center'">更新日時</th>
						</tr>
					</thead>
				</table>
			</div>
			<br />
			<div>
				<span style="float:left;">
					<a href="javascript:void(0)" class="easyui-linkbutton" onclick="btnDelete_Click()" style="width: 100px; ">削除</a>
				</span>
			</div>
		</div>
	</form>
</body>
</html>