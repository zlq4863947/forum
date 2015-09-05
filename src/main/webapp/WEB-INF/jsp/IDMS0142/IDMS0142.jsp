<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>複数利用者申請_申請共通2</title>
<%@include file="../common/head.jsp"%>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/IDMS/IDMS0142.js?${initParam.version}"></script>
</head>
<body>
<input type="text" style="display: none" name="mode" id="mode" value="${mode}">
<div style="padding-left:10px;">
	<p id="p_errorMessage" style="color: red;">&nbsp;&nbsp;</p>
	<div id="application" class="easyui-panel" style="width:920px;height:515px;">
	<form id="IDMS0142Form" method="post">
		<div class="easyui-panel" title="申請情報"
			style="width:900px;padding:10px 30px 10px 10px">
			<table cellpadding="3">
				<tr>
					<td style="width: 100px;">分類</td>
					<td><input class="easyui-textbox" name="classInfo" id="classInfo" style="width: 245px" disabled></td>
				</tr>
				<tr>
					<td>システム</td>
					<td><input class="easyui-textbox" name="systemInfo" id="systemInfo" style="width: 245px" disabled></td>
				</tr>
				<tr>
					<td>カテゴリ</td>
					<td><input class="easyui-textbox" name="categoryInfo" id="categoryInfo" style="width: 245px" disabled></td>
				</tr>
				<tr id="tr01">
					<td></td>
					<td><label id="comment"></label></td>
				</tr>
			</table>
		</div>
		<div style="margin:10px 0;"></div>
		<div class="easyui-panel" title="利用者情報"
			style="width:900px;padding:10px 30px 10px 10px;"  id ="applicaionDiv" >
			<table cellpadding="3" >
				<tr id="tr02">
					<td style="width: 100px;">適用日</td>
					<td colspan="2">
					<input class="easyui-datebox" name="useStartDate" id="useStartDate" data-options="formatter:dateboxFormatter,parser:dateboxParser,validType:'dateVildate'" disabled>
					</td> 
				</tr>
				<tr id="tr03">
					<td style="width: 100px;">利用期間</td>
					<td colspan="2">
					<input class="easyui-datebox" name="useFromDate" id="useFromDate" data-options="formatter:dateboxFormatter,parser:dateboxParser,validType:'dateVildate'" disabled>
					&nbsp;～&nbsp;
					<input class="easyui-datebox" name="useToDate" id="useToDate" data-options="formatter:dateboxFormatter,parser:dateboxParser,validType:'dateVildate'" disabled>
					</td> 
				</tr>
				<tr id="tr04">
					<td><span style="font-size: 14px;font-family: 'Segoe UI', Arial, Meiryo, sans-serif;">利用者</span></td> 
				</tr>
			</table>
			<div style="margin:10px 0;"></div>
			<table id="dg_endUser" class="easyui-datagrid" data-options="singleSelect:true,checkOnSelect:0,selectOnCheck:0" style=" height:200px;width: 875px;">
					<thead>
						<tr>
							<th data-options="field:'userId',width:40,align:'center',hidden:'true'"></th>
							<th data-options="field:'userAlias',width:120,align:'left',halign:'center'">エイリアス</th>
							<th data-options="field:'employeeNo',width:150,align:'left',halign:'center'">社員番号</th>
							<th data-options="field:'userName',width:150,align:'left',halign:'center'">氏名</th>
							<th data-options="field:'organizationName',width:170,align:'left',halign:'center'">組織</th>
							<th data-options="field:'officeName',width:110,align:'left',halign:'center'">役職</th>
							<th data-options="field:'contractName',width:150,align:'left',halign:'center'">契約形態</th>
						</tr>
					</thead>
			</table>
		</div>
		<div style="margin:10px 0;"></div>
		<div class="easyui-panel" title="申請内容"
			style="width:900px;padding:10px 30px 10px 10px">
			<!-- TODO -->
		<div id="dgWarpper"></div>
		<div style="margin:10px 0;" id ="div_autority"></div>
		<table cellpadding="3" id="tbl_autority">
				<tr  id="tr06">
					<td>権限/グループ/メニュー</td>
					<td id="tdAutority">
					<input class="easyui-textbox" name="authorityGroup"  id="authorityGroup">
					<a onclick="btnSelectUser_click(2)" class="easyui-linkbutton" id= "authorityGroupButton01"
						style="width: 90px;">他ユーザ参照</a>
					</td>
				</tr>
				<tr id="tr07">
				    <td>権限/グループ/メニュー</td>
					<td >
					<input class="easyui-combobox" name="authorityInfo"  id="authorityInfo">
					<a onclick="btnSelectUser_click(2)" class="easyui-linkbutton" id= "authorityGroupButton02"
						style="width: 90px;">他ユーザ参照</a>
					</td>
				</tr>
				<tr id="tr08">
					<td valign="top">権限/グループ/メニュー <br><br>
					<a onclick="btnSelectUser_click(2)" class="easyui-linkbutton" id= "authorityGroupButton03"
						style="width: 90px;">他ユーザ参照</a>
					</td>
					<td>
						<table border="1px" bordercolor="#a0c6e5" rules=none cellpadding="3" id="tblAuthority">
							<tr>
							<td></td>
							<td></td>
							<td></td>
							</tr>
							<tr>
							<td colspan="2">
							<input type="text" class="textbox"  id="searchInfo" name="searchInfo">
							<a onclick="btnSearch_click()" class="easyui-linkbutton"
							style="width:60px; height:20px;" id = "btnSearch">検索</a>
						</td>
							<td></td>
							</tr>
							<tr>
							<td>一覧</td>
							<td></td>
							<td>選択</td>
							</tr>
							<tr>
								<td>
								<select multiple name="authorityList" id="authorityList" 
									style="width:200px;height:144px" >
								</select>
								</td>
								<td>
								<a class="easyui-linkbutton" id = "moveLeft" style = "width:60px; height:20px;"
									onclick="moveSelectedData(document.getElementById('authorityList'),document.getElementById('selectList'),1)">&gt;</a>
								<br>
								<br> 
								<a id = "moveAllLeft" class="easyui-linkbutton" style = "width:60px; height:20px;"
									onclick="moveAllData(document.getElementById('authorityList'),document.getElementById('selectList'),1)">&gt;&gt;</a>
								<br>
								<br>
									<a id = "moveRight" class="easyui-linkbutton" style = "width:60px; height:20px;" onclick="moveSelectedData(document.getElementById('selectList'),document.getElementById('authorityList'),2)">&lt;</a>
								<br>
								<br> 
								<a id = "moveAllRight" class="easyui-linkbutton" style = "width:60px; height:20px;" onclick="moveAllData(document.getElementById('selectList'),document.getElementById('authorityList'),2)">&lt;&lt;</a>
								</td>
								<td>
								<select multiple name = "selectList"  id = "selectList"
									style = "width:200px;height:144px"></select>
							    </td>
							</tr>
							<tr>
							<td></td>
							<td></td>
							<td></td>
							</tr>
						</table>
						</td>
				</tr>
				<tr id="tr09">
					<td valign="top">申請理由/備考</td>
					<td ><input class="easyui-textbox" data-options="multiline:true,required:true,validType:'maxLength[256]'" style="width:485px;height:60px" name="applicationReason" id="applicationReason"></td>
				</tr>
			</table>
		</div>	
			
	</form>
</div>
	<br>
	<a id="btnNext" onclick="btnNext_click()" class="easyui-linkbutton" style="width:100px;height:30px;">次へ</a>
	<a id="btnBack" onclick="btnBack_click()" class="easyui-linkbutton" style="width: 100px; height: 30px;">戻る</a>
	</div>
</body>
</html>