<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>人事処理CSV取込画面</title>
<%@include file="../common/head.jsp"%>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/IDMS/IDMS0381.js?${initParam.version}"></script>
</head>
<body>
	<p id="p_errorMessage" style="color: red; padding-left: 10px">&nbsp;</p>
	<form id="IDMS0381Form" method="post">
		<div style="padding-left: 10px;">
			<div class="easyui-panel" title="CSV取込"
				style="width:98%; height: auto; padding: 10px;">
				<a href="javascript:void(0)" class="easyui-linkbutton"
					onclick="btnUploadCSV_Click()" style="width: 100px; ">人事CSV取込</a>
				<a href="javascript:void(0)" class="easyui-linkbutton"
					onclick="btnUploadPrivilegeCSV_Click()" style="width: 100px; ">特権CSV取込</a>
				<div class="fileControlWrapHide" style="display:none;"></div>
				<div style="height:5px;"></div>
				<table id="errorMsgGrid" class="easyui-datagrid"
					data-options="singleSelect:true,collapsible:true"
					style="height: auto; width: 1060px;">
					<thead>
						<tr>
							<th data-options="field:'row',width:90,align:'right'">行</th>
							<th data-options="field:'errorItem',width:120,align:'center'">エラー項目</th>
							<th data-options="field:'itemContent',width:120,align:'left'">項目内容</th>
							<th data-options="field:'errorContent',width:698,align:'left'">エラー内容</th>
						</tr>
					</thead>
				</table>
				<div style="height:5px;"></div>
				<a href="javascript:void()" class="easyui-linkbutton" disabled
					onclick="btnCheck_Click()"  id="btnCheck" style="width: 100px; ">チェック</a>
			</div>
			<div style="height:5px;"></div>
			<div class="easyui-panel" title="登録内容"
				style="width:98%; height: auto; padding: 10px;">
				<table id="registerMsgGrid" class="easyui-datagrid"
					data-options="singleSelect:true,collapsible:true"
					style="height: auto; width: 1060px;">
					<thead>
						<tr>
							<th data-options="field:'personnelHandleTypeName',width:100,align:'left'" rowspan="2">人事種別</th>
							<th data-options="field:'employeeNo',width:100,align:'right'" rowspan="2">社員番号</th>
							<th data-options="field:'userName',width:100,align:'left'" rowspan="2">氏名</th>
							<th data-options="field:'userAlias',width:100,align:'left'" rowspan="2">エイリアス</th>
							<th data-options="field:'startDate',formatter:dateFormatter,width:90,align:'left'" rowspan="2">対象日</th>
							<th data-options="align:'left'" colspan="6">人事内容</th>
						</tr>
						<tr>
							<th
								data-options="field:'organizationName',width:90,align:'left'">組織</th>
							<th data-options="field:'officeName',width:90,align:'left'">役職</th>
							<th data-options="field:'contractName',width:90,align:'left'">契約形態</th>
							<th data-options="field:'changeEmployeeNo',width:90,align:'right'">社員番号</th>
							<th data-options="field:'changeUserName',width:90,align:'left'">氏名</th>
							<th data-options="field:'changeUserNameKana',width:120,align:'left'">氏名カナ</th>
						</tr>
					</thead>
				</table>
				<div style="height:5px;"></div>
				<table id="privilegeHandleGrid" class="easyui-datagrid"
					data-options="singleSelect:true,collapsible:true" style="height: auto; width: 1060px;">
					<thead>
						<tr>
							<th data-options="field:'privilegeHandleTypeName',width:100,align:'left'" rowspan="2">特権種別</th>
							<th data-options="field:'employeeNo',width:100,align:'right'" rowspan="2">社員番号</th>
							<th data-options="field:'userName',width:100,align:'left'" rowspan="2">氏名</th>
							<th data-options="field:'userAlias',width:100,align:'left'" rowspan="2">エイリアス</th>
							<th data-options="field:'startDate',formatter:dateFormatter,width:80,align:'left'" rowspan="2">対象日</th>
							<th data-options="align:'center'" colspan="2">承認者・登録者</th>
							<th data-options="align:'center'" colspan="3">メニュー</th>
							<th data-options="align:'center'" colspan="2">画面特権</th>
						</tr>
						<tr>
							<th data-options="field:'organizationName',width:90,align:'left'">組織</th>
							<th data-options="field:'roleName',width:90,align:'left'">役割</th>
							<th data-options="field:'tabName',width:90,align:'left'">タブ</th>
							<th data-options="field:'menuName',width:90,align:'left'">メニュー</th>
							<th data-options="field:'addDeleteName',width:40,align:'left'">増減</th>
							<th data-options="field:'frameName',width:90,align:'left'">画面</th>
							<th data-options="field:'privilegeName',width:90,align:'left'">特権</th>
						</tr>
					</thead>
				</table>
				<div style="height:5px;"></div>
				<table id="regErrorMsgGrid" class="easyui-datagrid"
					data-options="singleSelect:true,collapsible:true"
					style="height: auto; width: 1060px;">
					<thead>
						<tr>
							<th data-options="field:'row',width:90,align:'right'">行</th>
							<th data-options="field:'errorItem',width:120,align:'center'">エラー項目</th>
							<th data-options="field:'itemContent',width:120,align:'left'">項目内容</th>
							<th data-options="field:'errorContent',width:698,align:'left'">エラー内容</th>
						</tr>
					</thead>
				</table>
				<div style="height:5px;"></div>
				<a href="javascript:void(0)" class="easyui-linkbutton" disabled
					id="btnRegister" onclick="btnRegister_Click()" style="width: 100px; ">登録</a>
			</div>
		</div>
	</form>
</body>
</html>