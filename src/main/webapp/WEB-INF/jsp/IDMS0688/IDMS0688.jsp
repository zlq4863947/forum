<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>タブメニュー紐付一覧</title>
<%@include file="../common/head.jsp"%>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/IDMS/IDMS0688.js?${initParam.version}"></script>
<style type="text/css">
.organizationSNametyle {
	width: 332px;
}
</style>
</head>
<body>
	<p id="p_errorMessage" style="color: red; padding-left: 10px">&nbsp;</p>
	<form id="IDMS0688Form" method="post">
		<div style="padding-left: 10px;">
			<div class="easyui-panel" title="検索条件"
				style="width: 1082px; padding: 10px 30px 10px 10px">
				<table cellpadding="3" style="width: 975px;">
					<tr>
						<td>タブ</td>
						<td colspan="3">
							<input class="easyui-combobox" id="tabCd" name="tabCd" style="width:180px" validType="needSelect['#tabCd']"
								data-options="url:CONTEXT_PATH+'/COMMON/getTabList.htm?hasBlank=true',
										  method:'post',
										  panelHeight:'auto',
										  textField:'tabName',
										  valueField:'tabCd',
										  onLoadSuccess:function(data){
										  	if(data) $(this).combobox('setValue',data[0].tabCd);
										  }" />
						</td>
					</tr>
					<tr>
						<td style="width: 110px;" valign="top">メニュー</td>
						<td colspan="3">
							<input class="easyui-combobox" id="menuId" name="menuId" style="width:180px" validType="needSelect['#menuId']"
								data-options="url:CONTEXT_PATH+'/COMMON/getMenuList.htm?hasBlank=true',
										  method:'post',
										  textField:'menuName',
										  valueField:'menuId',
										  onLoadSuccess:function(data){
										  	if(data) $(this).combobox('setValue',data[0].menuId);
										  }" />
						</td>
					</tr>
				</table>
				<div style="height:5px;"></div>
				<a onclick="btnSearch_Click()" class="easyui-linkbutton" style="width: 80px;">検索</a>
				<label style="width: 10px;"></label> 
				<a onclick="btnClear_Click()" class="easyui-linkbutton" style="width: 80px;">条件クリア</a>
			</div>
			<div style="margin: 10px 0;"></div>
			<div id="p" class="easyui-panel" title="タブメニュー紐付一覧"
				style="width: 1082px; height: auto; padding: 10px;">
 				<a href="javascript:void(0)" class="easyui-linkbutton" onclick="btnRegister_Click()" style="width: 100px; margin-bottom:10px;">新規登録</a>
				<table id="tabMenuGrid" class="easyui-datagrid"　data-options="singleSelect:0,checkOnSelect:0,selectOnCheck:0,onSelect:onSelectRow"
					style="height: 280px; width: 1060px;">
					<thead>
						<tr>
							<th data-options="field:'ck',checkbox:true"></th>
							<th data-options="field:'tabCd',hidden:'true'"/>
							<th data-options="field:'tabName',width:150,halign:'center',align:'left'">タブ名</th>
							<th data-options="field:'menuId',hidden:'true'"/>
							<th data-options="field:'menuName',width:150,halign:'center',align:'left'">メニュー名</th>
							<th data-options="field:'createBy',width:110,halign:'center',align:'left'">登録者名</th>
							<th data-options="field:'createOn',formatter:dateFormatter,width:120,halign:'center',align:'left'">登録日時</th>
							<th data-options="field:'updateBy',width:110,halign:'center',align:'left'">更新者名</th>
							<th data-options="field:'updateOn',formatter:dateFormatter,width:120,halign:'center',align:'left'">更新日時</th>
						</tr>
					</thead>
				</table>
				<div style="height:5px;"></div>
				<a href="javascript:void(0)" class="easyui-linkbutton"
					id="btnDelete" onclick="btnDelete_Click()" style="width: 100px; ">削除</a>
			</div>
		</div>
	</form>
</body>
</html>