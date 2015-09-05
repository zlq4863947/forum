<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>マスタ管理一覧画面</title>
<%@include file="../common/head.jsp"%>
<script type="text/javascript">
</script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/IDMS/IDMS0630.js?${initParam.version}"></script>
</head>
<body>
	<p id="p_errorMessage" style="color: red; padding-left: 10px">&nbsp;</p>
	<form id="mainForm" method="post">
		<div id="p11" style="padding-left: 10px; ">
			<div class="easyui-panel" title="検索条件"  style="width:98%; height: auto; padding: 10px;">
				<label for="drpMstList" style="width: 100px;display: inline-block; ">対象マスタ</label>
				<input id="drpMstList" name="drpMstList" style="width:300px;" />
				<div style="height:5px;"></div>
				<a class="easyui-linkbutton" onclick="btnSelectMst_Click()" style="width: 100px; ">表示</a>
				<input type="hidden" id="iptCurrentMst"/>
			</div>
			<div style="height:5px;"></div>
			<div class="easyui-panel" title="マスタ情報一覧" style="width:98%; height: auto; padding: 10px;">
			<div>
				<span>
					<a class="easyui-linkbutton" onclick="btnRegister_Click()" style="width: 100px; ">新規登録</a>
				</span>
			</div>
			<div id="dgWarpper"  style="margin:5px 0 5px 0;">
			</div>
			<div style="margin-buttom:5px;">
				<span>
					<a class="easyui-linkbutton" onclick="btnDelete_Click()" style="width: 100px; ">削除	</a>

				</span>
				<span url="<%=request.getContextPath()%>/IDMS0630/download.htm" id="spanExportCsv">
				</span>
				<div id="divdownload" style="display:none;"></div>
			</div>
			</div>
		</div>
	</form>
</body>
</html>