<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>契約形態システム紐付登録</title>
<%@include file="../common/head.jsp"%>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/IDMS/IDMS0684.js?${initParam.version}"></script>
<script type="text/javascript">
var model = "<%=request.getParameter("model")%>";
if('edit' == model){
	var contractCd ="<%=request.getParameter("contractCd")%>";
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
	<form id="IDMS0684Form" method="post">
		<div class="easyui-panel" title="契約形態情報"
			style="width:850px;padding:10px 30px 10px 10px">
			<table cellpadding="3">
				<tr>
					<td>契約形態名称</td>
					<td style="width:200px;"><input class="easyui-combobox" name="contractInfo" id="contractInfo" required="true"></td>
				</tr>
				<tr>
					<td>個人フォルダフラグ</td>
					<td style="width:200px;"><input type="checkbox" id = "personalFolderFlag" disabled></td>
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
							<tr style="width:200px;height:270px">
								<td>
								<select multiple name="systemList" id="systemList" 
									style="width:220px;height:260px" >
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
									style = "width:220px;height:260px"></select>
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