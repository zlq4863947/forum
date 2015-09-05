<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>台帳マッチング</title>
<%@include file="../common/head.jsp"%>
<script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/IDMS/IDMS0201.js?${initParam.version}"></script>
</head>
<body>
	<p id="p_errorMessage" style="color: red; padding-left: 10px">&nbsp;</p>
	<form id="IDMS0201Form" method="post">
		<div id="organizationSystemDiv" style="padding-left: 10px; ">
			<div id="searchDiv" class="easyui-panel" title="CSV読込" style="width:1055px;">
				<table style=" height:100px;width: 1035px; padding: 10px;">
					<tr>
						<td style="width: 130px;">システム</td>
						<td colspan="2"><input class="easyui-combobox" id="selSystem" name="selSystem"
									style="width: 240px" required="true" validType="needSelect['#selSystem']"
									data-options="url:CONTEXT_PATH+'/IDMS0201/getMatchingSystemList.htm',
										  method:'post',
										  editable:false,
										  required:true,
										  textField:'systemName',
										  valueField:'systemCd',
										  onLoadSuccess:function(data){
										  	if(data) {
										  		$(this).combobox('setValue',data[0].systemCd);
										  	}
										  }">
						</td>
					</tr>
					<tr>
						<td>マッチングファイル</td>
						<td style="width: 60px;"><a id="btnReference" onclick="btnReferenceClick()" class="easyui-linkbutton" style="width: 80px;">参照</a></td>
						<td><input class="easyui-textbox" name="csvFileName" id="csvFileName" style="width: 340px" readonly></td>
					</tr>
					<tr>
						<td><a id="btnReadFile" onclick="btnReadFileClick()" class="easyui-linkbutton" style="width: 120px;" disabled>読込</a></td>
						<td colspan="2"></td>
					</tr>
				</table>
			</div>
			<div class="fileControlWrapHide" style="display:none;"></div>
			<div style="margin: 10px 0;"></div>
			<div id="divCheckResult" class="easyui-panel" title="ファイルチェック"
				style="width:1055px; padding: 10px;">
				<table id="tblCheckResult" class="easyui-datagrid" data-options="singleSelect:1,checkOnSelect:0,selectOnCheck:0" style="height: auto; width: 1035px;">
					<thead>
						<tr>
							<th data-options="field:'line',width:50,align:'left',halign:'center'">行</th>
							<th data-options="field:'account',width:100,align:'left',halign:'center'">アカウント</th>
							<th data-options="field:'authority',width:250,align:'left',halign:'center'">権限</th>
							<th data-options="field:'errorMsg',width:616,align:'left',halign:'center'">エラー内容</th>
						</tr>
					</thead>
				</table>
				<table style="width: 1035px;padding-top:10px">
					<tr>
						<td><a id="btnMatch" class="easyui-linkbutton" onclick="btnMatch_Click()" style="width: 120px;" disabled>マッチング</a></td>
						<td><a id="btnErrorOutput" class="easyui-linkbutton" onclick="btnErrorOutput_Click()" style="width: 150px;" disabled>エラーCSV出力</a></td>
					</tr>
				</table>
	 				
			</div>
			<div style="margin: 10px 0;"></div>
			<div id="matchResultList" class="easyui-panel" title="マッチング" style="width:1055px; height: auto; padding: 10px;">

				<table id="tblMatchResult" class="easyui-datagrid" data-options="singleSelect:1,checkOnSelect:0,selectOnCheck:0" style="height: auto; width: 1035px;">
					<thead>
						<tr>
							<th data-options="field:'systemCd',hidden:'true'" rowspan="2"/>
							<th data-options="field:'operationType',formatter:operationTypeFormatter,width:50,align:'center',halign:'center'" rowspan="2">結果</th>
							<th data-options="align:'center'" colspan="2">CSVファイル</th>
							<th data-options="align:'center'" colspan="9">ID管理</th>
						</tr>
						<tr>
							<th data-options="field:'accountCsv',width:90,align:'left',halign:'center'">アカウント</th>
							<th data-options="field:'authorityCdCsv',hidden:'true'" />
							<th data-options="field:'authorityNameCsv',width:207,align:'left',halign:'center'">権限</th>
							<th data-options="field:'accountId',width:90,align:'left',halign:'center'">アカウント</th>
							<th data-options="field:'authorityCdId',hidden:'true'" />
							<th data-options="field:'authorityNameId',width:207,align:'left',halign:'center'">権限</th>
							<th data-options="field:'choice',formatter:choiceFormatter,width:70,align:'center',halign:'center'">選択</th>
							<th data-options="field:'userId',hidden:'true'" />
							<th data-options="field:'userAlias',width:100,align:'left',halign:'center'">エイリアス</th>
							<th data-options="field:'employeeNo',width:100,align:'left',halign:'center'">社員番号</th>
							<th data-options="field:'userName',width:100,align:'left',halign:'center'">氏名</th>
						</tr>
					</thead>
				</table>
				<table style="width: 1035px;padding-top:10px">
					<tr>
						<td><a id="btnUpdate" class="easyui-linkbutton" onclick="btnUpdate_Click()" style="width: 120px;" disabled>更新</a></td>
						<td><a id="btnMatchOutPut" class="easyui-linkbutton" onclick="btnMatchOutPut_Click()" style="width: 150px;" disabled>マッチングCSV出力</a></td>
					</tr>
				</table>
			</div>
			<div style="display: none;" id="divdownload"></div>
		</div>
	</form>
</body>
</html>