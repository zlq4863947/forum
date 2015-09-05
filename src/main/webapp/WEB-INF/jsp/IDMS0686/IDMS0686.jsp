<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>マスタメンテナンス	画面</title>
<%@include file="../common/head.jsp"%>
<script type="text/javascript">
</script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/IDMS/IDMS0686.js?${initParam.version}"></script>
</head>
<body>
	<p id="p_errorMessage" style="color: red; padding-left: 10px">&nbsp;</p>
	<form id="IDMS0686Form" method="post">
		<div id="p11" style="padding-left: 10px; ">
			<div class="easyui-panel" title="メニュー選択"  style="width:98%; height: auto; padding: 10px;">
				<label for="drpMenuList" style="width: 100px;display: inline-block; ">対象メニュー</label>
				<input class="easyui-combobox" id="drpMenuList" name="drpMenuList" style="width: 300px" required="true" validType="needSelect['#drpMenuList']"></input>
			</div>
			<div style="height:8px;"></div>
			<div class="easyui-panel" title="対象者選択" style="width:98%; height: auto; padding: 10px;">
			<div>
				<label for="applyDate" style="width: 100px;display: inline-block; ">適用開始日</label>
				<input id="applyDate" class="easyui-datebox" required="required" data-options="validType:'dateVildate',formatter:dateboxFormatter,parser:dateboxParser"  width="100" />
				<br />
				<span>
					<a id='btnUserSelect' name='btnUserSelect' href="javascript:void(0)" class="easyui-linkbutton" onclick="btnUserSelect_Click()" style="width: 100px;" data-options="iconCls:'icon-search'" disabled>対象者選択</a>
				</span>
			</div>
			<div id="dgWarpper"  style="margin:5px 0 5px 0;">
			<table id='dg'></table>
			</div>
			<div style="margin-buttom:5px;">
				<span>
					<a href="javascript:void(0)" class="easyui-linkbutton" onclick="btnUpdate_Click()"  id='btnUpdate' name='btnUpdate'  style="width: 100px;" disabled>登録</a>
				</span>
			</div>
			</div>
		</div>
	</form>
</body>
</html>