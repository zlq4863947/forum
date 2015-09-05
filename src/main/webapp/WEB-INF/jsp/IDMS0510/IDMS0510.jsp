<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>業務作業状況レポート</title>
<%@include file="../common/head.jsp"%>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/IDMS/IDMS0510.js?${initParam.version}"></script>
</head>
<body>
	<p id="p_errorMessage" style="color: red; padding-left: 10px">&nbsp;</p>

	<form id="IDMS0510Form" method="post">
		<div id="p11" style="padding-left: 10px; ">
			<div id="p" class="easyui-panel" title="業務作業状況レポート"
				style="width:1055px; height: auto; padding: 10px;">
				<div style="padding: 5px;">
					<span style="width: 150px;display: inline-block;">対象年月(YYYY/MM)</span>
 					<input id="yearMonth" class="easyui-datebox"  required  data-options="validType:'dateVildate',formatter:dateFormatter,parser:dateboxParser" >
				</div>
				<div id="divdownload"></div>
				<div style="padding: 5px;">
 					<a class="easyui-linkbutton "  data-options="iconCls:'icon-save'" onclick="btnCsv_Click()" required style="width: 100px; margin-bottom:10px;">CSV出力</a>
				</div>
			</div>
			<br />
			<div>
				<span style="float: right; display:none;  ">

				</span>
			</div>
		</div>
	</form>
</body>
</html>