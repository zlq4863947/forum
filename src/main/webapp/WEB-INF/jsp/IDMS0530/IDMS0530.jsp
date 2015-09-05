<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>権限履歴CSV出力</title>
<%@include file="../common/head.jsp"%>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resources/css/IDMS0530.css?${initParam.version}">
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/IDMS/IDMS0530.js?${initParam.version}"></script>
</head>
<body>
	<p id="p_errorMessage" style="color: red; padding-left: 10px">&nbsp;</p>
	<form id="IDMS0530Form" method="post">
		<div id="p11" style="padding-left: 10px; ">
			<div class="easyui-panel" title="権限履歴CSV出力"  style="width:800px; height: auto; padding: 10px;">
			<div class="userDetail">
				<label>対象期間</label><input class="easyui-datebox" name="fromDate" id="fromDate" 
									data-options="formatter:dateboxFormatter,parser:dateboxParser"
									validType="minDate['toDate', '対象期間']"/>&nbsp;～&nbsp;<input 
									class="easyui-datebox" name="toDate" id="toDate"
									data-options="formatter:dateboxFormatter,parser:dateboxParser"
									validType="maxDate['fromDate', '対象期間']"/><br />
				<label>システム</label><input class="easyui-combobox" name="systemInfo" id="systemInfo"/><br />
				<label>アカウント</label><input class="easyui-textbox" name="account" id="account"/><br />
				<label>移行理由</label><div style = "width:250px;border:1px solid #95B8E7;display: inline">
										<label style="padding-right:15px;"><input type="checkbox" name="change" id ="change" value="変更" checked/>変更</label>
										<label style="padding-right:15px;"><input type="checkbox" name="delete" id ="delete" value="削除" checked/>削除</label>
										<label style="padding-right:15px;"><input type="checkbox" name="other" id ="other" value="その他" checked/>その他</label>
									</div>
				</div>
			</div>
			<br/>
			<span>
				<a href="javascript:void(0)" class="easyui-linkbutton" onclick="btnCsv_Click()" style="width: 100px; ">ＣＳＶ出力</a>
			</span>
		</div>
	</form>
</body>
</html>