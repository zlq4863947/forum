<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>内定者一覧画面</title>
<%@include file="../common/head.jsp"%>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/IDMS/IDMS0312.js?${initParam.version}"></script>
</head>
<body>
	<p id="p_errorMessage" style="color: red; padding-left: 10px">&nbsp;</p>

	<form id="prospectiveEmployeeSelect" method="post">
		<div id="divMain" style="padding-left: 10px;">
			<div id="p" class="easyui-panel" title="内定者情報"
				style="width: 1055px; height: auto; padding: 10px;">
				<div>
					<a href="javascript:void(0)" class="easyui-linkbutton"
						onclick="btnNew_Click()"
						style="width: 100px; margin-bottom: 10px;">新規登録</a> <a
						href="javascript:void(0)" class="easyui-linkbutton"
						onclick="btnUploadCSV_Click()"
						style="width: 100px; margin-bottom: 10px;">CSV取込</a>
					<div class='fileControlWrapHide' style='display: none;'></div>
				</div>
				<table id="dg" class="easyui-datagrid"
					data-options="singleSelect:0,checkOnSelect:0,selectOnCheck:0,onSelect:onSelectRow"
					style="height: 280px; width: 1035px;">
					<thead>
						<tr>
							<th data-options="field:'ck',checkbox:true"></th>
							<th
								data-options="field:'userId',formatter:userIdFormatter,width:40,align:'center',halign:'center'">&nbsp;</th>
							<th
								data-options="field:'personnelHandleId',formatter:personnelHandleIdFormatter,width:70,align:'center',halign:'center'">入社登録</th>
							<th
								data-options="field:'scheduledEntryCompanyDate',width:70,align:'left',halign:'center'">入社予定日</th>
							<th
								data-options="field:'userAlias',width:70,align:'left',halign:'center'">エイリアス</th>
							<th
								data-options="field:'employeeNo',width:60,align:'right',halign:'center'">社員番号</th>
							<th
								data-options="field:'userName',width:80,align:'left',halign:'center'">氏名</th>
							<th
								data-options="field:'userNameKana',width:90,align:'left',halign:'center'">氏名カナ</th>
							<th
								data-options="field:'organizationName',width:170,align:'left',halign:'center'">組織</th>
							<th
								data-options="field:'contractName',width:60,align:'left',halign:'center'">契約形態</th>
							<th
								data-options="field:'contractCompanyName',width:90,align:'left',halign:'center'">委託会社名</th>
							<th
								data-options="field:'mailboxCreateResult',width:190,align:'left',halign:'center'">メールボックス</th>
						</tr>
					</thead>
				</table>
			</div>
			<br />
			<div style="width: 1055px; height: auto;">
				<span style="float: left;"> <a href="javascript:void(0)"
					class="easyui-linkbutton" onclick="btnEnter_Click()"
					style="width: 100px;">入社登録</a> <a href="javascript:void(0)"
					class="easyui-linkbutton" onclick="btnCancel_Click()"
					style="width: 100px;">入社予定取消</a>
				</span> <span style="float: right;"> <a href="javascript:void(0)"
					class="easyui-linkbutton"
					onclick="btnCsv_Click('<%=request.getContextPath()%>/IDMS0312/download.htm')"
					style="width: 100px;">ＣＳＶ出力</a>
				</span>
				<div style="display: none;" id="divdownload"></div>
			</div>
		</div>
		<div id="divErrorReport" style="display: none; padding-left: 10px;">
			<div class="easyui-panel" title="エラー詳細情報" style="width: 1055px; height: auto; padding: 10px;">
				<div id='divErrDetail'></div></div><br />
			<div>
					<a href="javascript:void(0)" class="easyui-linkbutton"
						onclick="btnBack_Click()" style="width: 100px;">差戻し</a>
				</div>
		</div>
	</form>
</body>
</html>