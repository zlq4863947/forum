<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>組織システム紐付登録</title>
<%@include file="../common/head.jsp"%>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/IDMS/IDMS0681.js?${initParam.version}"></script>
<script type="text/javascript">
var model = "<%=request.getParameter("model")%>";
if('edit' == model){
	var organizationCd ="<%=request.getParameter("organizationCd")%>";
	var useFromDate ="<%=request.getParameter("useFromDate")%>";
	var useToDate ="<%=request.getParameter("useToDate")%>";
	var systemCd ="<%=request.getParameter("systemCd")%>";
	var systemName = "<%=request.getParameter("systemName")%>";
}
</script>
</head>
<body>
<div style="padding-left:10px;">
	<p id="p_errorMessage" style="color: red;">&nbsp;&nbsp;</p>
	<div id="systemDiv" style="width:855px;">
	<form id="IDMS0681Form" method="post">
		<div class="easyui-panel" title="組織情報"
			style="width:850px;padding:10px 30px 10px 10px">
			<table cellpadding="3">
				<tr>
					<td style="width:120px;">
						<input type="hidden" id="organizationCd" name="organizationCd" />
					</td>
					<td style="width:200px;">
					<a onclick="btnSelectOrg_click()" class="easyui-linkbutton" data-options="iconCls:'icon-search'"
						style="width: 80px;" id="btnSelectOrg">組織選択</a>
					</td>
				</tr>
				<tr>
					<td>組織名称</td>
					<td style="width:200px;"><input class="easyui-textbox" name="organizationName" id="organizationName" disabled></td>
				</tr>
				<tr>
					<td>適用開始日</td>
					<td style="width:200px;"><input class="easyui-textbox" name="effectiveDate" id="effectiveDate"  disabled></td>
				</tr>
				<tr>
					<td>適用終了日</td>
					<td style="width:200px;"><input class="easyui-textbox" name="expireDate" id="expireDate"  disabled></td>
				</tr>
				<tr>
					<td>組織ランク</td>
					<td style="width:200px;"><input class="easyui-textbox" name="organizationRank" id="organizationRank"  disabled></td>
				</tr>
				<tr>
					<td>属性情報</td>
					<td style="width:200px;"><input type="checkbox" id = "branchFlag" disabled>支店<input type="checkbox" id = "shopFlag" disabled>営業所</td>
				</tr>
				<tr>
					<td>申請可否フラグ</td>
					<td style="width:200px;"><input type="checkbox" id = "applicableSetFlag" disabled></td>
				</tr>
				<tr>
					<td>部門コード</td>
					<td style="width:200px;"><input class="easyui-textbox" name="unitCd" id="unitCd"  disabled></td>
				</tr>
			</table>
		</div>
		<div style="margin:10px 0;"></div>
		<div class="easyui-panel" title="システム設定"
			style="width:850px;padding:10px 30px 10px 10px;"  id ="systemDiv" >
			<table cellpadding="3" >
				<tr id="tr02">
					<td style="width:120px;">適用開始日</td>
					<td colspan="2">
					<input class="easyui-datebox" name="useFromDate" id="useFromDate" data-options="required:true,formatter:dateboxFormatter,parser:dateboxParser" validType = "minDate['useToDate','適用終了日']">
					</td> 
				</tr>
				<tr id="tr03">
					<td style="width:120px;">適用終了日</td>
					<td colspan="2">
					<input class="easyui-datebox" name="useToDate" id="useToDate" data-options="formatter:dateboxFormatter,parser:dateboxParser" validType = "maxDate['useFromDate', '適用開始日']">
					</td>
				</tr>
				<tr id="tr08">
					<td valign="top"></td>
					<td>
						<table border="1px" bordercolor="#a0c6e5" rules=none cellpadding="3" id="tblSystem">
							<tr>
							<td></td>
							<td></td>
							<td></td>
							</tr>
							<tr>
							<td>利用可能のシステム一覧</td>
							<td></td>
							<td>設定済のシステム一覧</td>
							</tr>
							<tr style="width:200px;height:150px">
								<td>
								<select multiple name="systemList" id="systemList" 
									style="width:220px;height:190px" >
								</select>
								</td>
								<td>
								<a class="easyui-linkbutton" id = "moveLeft" style = "width:60px; height:20px;"
									onclick="moveSelected(document.getElementById('systemList'),document.getElementById('selectList'));setSelectListStatus();">&gt;</a>
								<br>
								<br> 
								<a id = "moveAllLeft" class="easyui-linkbutton" style = "width:60px; height:20px;"
									onclick="moveAll(document.getElementById('systemList'),document.getElementById('selectList'));setSelectListStatus();">&gt;&gt;</a>
								<br>
								<br>
									<a id = "moveRight" class="easyui-linkbutton" style = "width:60px; height:20px;" onclick="moveSelected(document.getElementById('selectList'),document.getElementById('systemList'));setSelectListStatus();">&lt;</a>
								<br>
								<br> 
								<a id = "moveAllRight" class="easyui-linkbutton" style = "width:60px; height:20px;" onclick="moveAll(document.getElementById('selectList'),document.getElementById('systemList'));setSelectListStatus();">&lt;&lt;</a>
								</td>
								<td>
								<select multiple name = "selectList"  id = "selectList"
									style = "width:220px;height:190px"></select>
							    </td>
							</tr>
							<tr>
							<td colspan="3"></td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</div>
	</form>
</div>
	<div style="margin:10px 0;"></div>
	<a onclick="btnRegister_click()" class="easyui-linkbutton" style="width:100px;height:30px;" id="register">新規登録</a>
	<a onclick="btnBack_click()" class="easyui-linkbutton" style="width:100px;height:30px;" id="back">閉じる</a>
	<div style="margin:10px 0;"></div>
	</div>
</body>
</html>