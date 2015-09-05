<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>複数申請共通</title>
<%@include file="../common/head.jsp"%>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/IDMS/IDMS0150.js?${initParam.version}"></script>
</head>
<body>
<input type="text" style="display: none" name="mode" id="mode" value="${mode}">
<div style="padding-left:10px;">
	<p id="p_errorMessage" style="color: red;">&nbsp;&nbsp;</p>
	<div id="application" class="easyui-panel" style="width:920px;height:515px;">
	<form id="IDMS0150Form_HEAD" method="post">
		<div class="easyui-panel" title="申請情報"
			style="width:900px;padding:10px 30px 10px 10px">
			<table cellpadding="3">
				<tr id="trApplicationId">
					<td style="width: 100px;">申請ID</td>
					<td><input class="easyui-textbox" name="applicationId" id="applicationId" style="width: 245px" disabled></td>
				</tr>
				<tr>
					<td>分類</td>
					<td><input class="easyui-textbox" name="classInfo" id="classInfo" style="width: 245px" disabled></td>
				</tr>
				<tr>
					<td>システム</td>
					<td><input class="easyui-textbox" name="systemInfo" id="systemInfo" style="width: 245px" disabled></td>
				</tr>
				<tr>
					<td>カテゴリ</td>
					<td><input class="easyui-textbox" name="categoryInfo" id="categoryInfo" style="width: 245px" disabled></td>
				</tr>
				<tr id="tr01">
					<td></td>
					<td><label id="comment"></label></td>
				</tr>
			</table>
		</div>
		<div style="margin:10px 0;"></div>
		<div class="easyui-panel" title="利用者情報"
			style="width:900px;padding:10px 30px 10px 10px;"  id ="applicaionDiv" >
			<table cellpadding="3" >
				<tr id="tr02">
					<td style="width: 100px;">適用日</td>
					<td colspan="2">
					<input class="easyui-datebox" name="useStartDate" id="useStartDate" data-options="formatter:dateboxFormatter,parser:dateboxParser,validType:'dateVildate'" disabled>
					</td> 
				</tr>
				<tr id="tr03">
					<td style="width: 100px;">利用期間</td>
					<td colspan="2">
					<input class="easyui-datebox" name="useFromDate" id="useFromDate" data-options="formatter:dateboxFormatter,parser:dateboxParser,validType:'dateVildate'" disabled>
					&nbsp;～&nbsp;
					<input class="easyui-datebox" name="useToDate" id="useToDate" data-options="formatter:dateboxFormatter,parser:dateboxParser,validType:'dateVildate'" disabled>
					</td> 
				</tr>
				<tr id="tr04">
					<td><span style="font-size: 14px;font-family: 'Segoe UI', Arial, Meiryo, sans-serif;">利用者</span></td> 
				</tr>
			</table>
			<div style="margin:10px 0;"></div>
			<table id="dg_endUser" class="easyui-datagrid" data-options="singleSelect:true,checkOnSelect:0,selectOnCheck:0" style=" height:200px;width: 875px;">
					<thead>
						<tr>
							<th data-options="field:'userId',width:40,align:'center',hidden:'true'"></th>
							<th data-options="field:'userAlias',width:120,align:'left',halign:'center'">エイリアス</th>
							<th data-options="field:'employeeNo',width:150,align:'left',halign:'center'">社員番号</th>
							<th data-options="field:'userName',width:150,align:'left',halign:'center'">氏名</th>
							<th data-options="field:'organizationName',width:170,align:'left',halign:'center'">組織</th>
							<th data-options="field:'officeName',width:110,align:'left',halign:'center'">役職</th>
							<th data-options="field:'contractName',width:150,align:'left',halign:'center'">契約形態</th>
						</tr>
					</thead>
			</table>
		</div>
		<div style="margin:10px 0;"></div>
		<div class="easyui-panel" title="申請内容"
			style="width:900px;padding:10px 30px 10px 10px">
		<div id="dgWarpper"></div>
		<div style="margin:10px 0;" id ="div_autority"></div>
		<table cellpadding="3" id="tbl_autority">
				<tr id="tr05">
					<td>権限/グループ/メニュー</td>
					<td id="tdAutority">
					<input class="easyui-textbox" name="authorityGroup"  id="authorityGroup" disabled>
				</tr>
				<tr id="tr06">
					<td valign="top">権限/グループ/メニュー </td>
					<td>
						<select multiple size=5 name="selectAuthorityList" id="selectAuthorityList" disabled="disabled"
								style="width: 200px; background-color: rgb(235, 235, 228);">
						</select>
						<span id ="linkListButton"> <a class="easyui-linkbutton" onclick="btnList_click()" id="btnList" style="height:24px;width:60px;">一覧</a></span>
				    </td>
				</tr>
				<tr id="tr07">
					<td valign="top">申請理由/備考</td>
					<td >
					<input class="easyui-textbox" data-options="multiline:true"
							style="width: 485px; height: 60px" name="applicationReason" id="applicationReason" disabled>
					</td>
				</tr>
			</table>
			</div>	
		</form>
		<%
		String systemCode = (String)request.getAttribute("systemCd");
		if("2".equals(systemCode) || "21".equals(systemCode) || "22".equals(systemCode) || "23".equals(systemCode) || "47".equals(systemCode)){%>
		<div style="margin: 10px 0;"></div>
		<div class="easyui-panel" title="登録内容" style="width: 900px; padding: 10px 10px 10px 10px">
			<form id="IDMS0150Form" method="get">
				<% 
				String  detailType = (String) request.getAttribute("detailType");
				String  detailPattern = (String) request.getAttribute("detailPattern");
				if("2".equals(detailType) && ("00".equals(detailPattern) || "01".equals(detailPattern) || "02".equals(detailPattern))){ 
				%> 
					<table id="dg_userMail" class="easyui-datagrid" data-options="singleSelect:true,checkOnSelect:0,selectOnCheck:0" style=" height:200px;width: 875px;">
						<thead>
							<tr>
							<th data-options="field:'userId',width:40,align:'center',hidden:'true'"></th>
							<th data-options="field:'mailAddress',width:120,align:'left',halign:'center',editor:{type:'combobox',options:{valueField:'value', textField:'text',required: true}}">メールアドレス</th>
							<th data-options="field:'account',width:150,align:'left',halign:'center'">ユーザアカウント</th>
							<th data-options="field:'userAlias',width:120,align:'left',halign:'center'">エイリアス</th>
							<th data-options="field:'employeeNo',width:150,align:'left',halign:'center'">社員番号</th>
							<th data-options="field:'userName',width:150,align:'left',halign:'center'">氏名</th>
							</tr>
						</thead>
					</table>
					<div style="margin:10px 0;"></div>
				<% } %>
				<% if("1".equals(request.getAttribute("detailType"))){ %> 
					<%@include file="../IDMS0121/IDMS0121.jsp"%>
				<% } %>
				<% if("2".equals(request.getAttribute("detailType"))){ %> 
					<%@include file="../IDMS0122/IDMS0122.jsp"%>
				<% } %>
				<% if("3".equals(request.getAttribute("detailType"))){ %> 
					<%@include file="../IDMS0123/IDMS0123.jsp"%>
				<% } %>
				<% if("4".equals(request.getAttribute("detailType"))){ %> 
					<%@include file="../IDMS0124/IDMS0124.jsp"%>
				<% } %>
				<% if("5".equals(request.getAttribute("detailType"))){ %> 
					<%@include file="../IDMS0125/IDMS0125.jsp"%>
				<% } %>
				<% if("6".equals(request.getAttribute("detailType"))){ %> 
					<%@include file="../IDMS0126/IDMS0126.jsp"%>
				<% } %>
				<% if("7".equals(request.getAttribute("detailType"))){ %> 
					<%@include file="../IDMS0127/IDMS0127.jsp"%>
				<% } %>
				<% if("8".equals(request.getAttribute("detailType"))){ %> 
					<%@include file="../IDMS0128/IDMS0128.jsp"%>
				<% } %>
			</form>
		</div>
		<%}%>
	</div>
	<br>
	<a id="btnApply" onclick="btnRequest_click()" class="easyui-linkbutton" style="width:100px;height:30px;">申請</a>
	<a id="btnBack" onclick="btnBack_click()" class="easyui-linkbutton" style="width: 100px; height: 30px;">戻る</a>
	</div>
</body>
</html>