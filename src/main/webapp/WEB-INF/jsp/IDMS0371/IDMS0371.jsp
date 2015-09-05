<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>人事処理予定一覧</title>
<%@include file="../common/head.jsp"%>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/IDMS/IDMS0371.js?${initParam.version}"></script>
<style type="text/css">
.organizationSNametyle {
	width: 332px;
}
</style>
</head>
<body>
	<p id="p_errorMessage" style="color: red; padding-left: 10px">&nbsp;</p>
	<form id="IDMS0371Form" method="post">
		<div style="padding-left: 10px;">
			<div class="easyui-panel" title="検索条件"
				style="width: 1138px; padding: 10px 30px 10px 10px">
				<table cellpadding="3" style="width: 975px;">
					<tr>
						<td style="width: 110px;" >対象データ</td>
						<td colspan="2">
							<div style="border:1px solid #95B8E7;width:270px;">
								<label style="padding-right:20px;"><input type="radio" name="dataType" id="personnelHandle" value="1" checked onClick="clickPerHandle()">人事処理</label>
								<label style="padding-right:20px;"><input type="radio" name="dataType" id="privilegeHandle" value="2" onClick="clickPriHandle()">特権処理</label>
							</div>
						</td>
					</tr>
					<tr>
						<td style="width: 110px;" >反映予定日</td>
						<td colspan="2">
							<input class="easyui-datebox" name="startDate" id="startDate" data-options="formatter:dateboxFormatter,parser:dateboxParser" style="width:120px;"
								validType="minDate['endDate', '反映予定日']"> &nbsp;～&nbsp; 
							<input class="easyui-datebox" name="endDate" id="endDate" data-options="formatter:dateboxFormatter,parser:dateboxParser" style="width:120px;"
								validType="maxDate['startDate', '反映予定日']">
						</td>
					</tr>
					<tr id="personnelHandleTr">
						<td style="width: 110px;" valign="top">人事種別</td>
						<td colspan="3">
							<div style="border:1px solid #95B8E7;width:720px;">
								<label style="padding-right:20px;"><input type="checkbox" id ="entrance" name="personnelHandleType" value="01" checked="checked"/>入社</label>
								<label style="padding-right:20px;"><input type="checkbox" id ="resign" name="personnelHandleType" value="07"  checked="checked"/>退職</label>
								<label style="padding-right:20px;"><input type="checkbox" id ="changeOrganization" name="personnelHandleType" value="02"  checked="checked"/>組織異動</label>
								<label style="padding-right:20px;"><input type="checkbox" id ="changeContract" name="personnelHandleType" value="05"  checked="checked"/>契約形態変更</label>
								<label style="padding-right:20px;"><input type="checkbox" id ="register" name="personnelHandleType" value="03" checked="checked"/>兼任登録</label>
								<label style="padding-right:20px;"><input type="checkbox" id ="unregister" name="personnelHandleType" value="04" checked="checked"/>兼任解除</label>
								<label style="padding-right:20px;"><input type="checkbox" id ="changeUserName" name="personnelHandleType" value="06" checked="checked"/>氏名変更</label>
							</div>
						</td>
					</tr>
					<tr id="privilegeHandleTr" hidden>
						<td style="width: 110px;" valign="top">特権種別</td>
						<td colspan="3">
							<div style="border:1px solid #95B8E7;width:720px;">
								<label style="padding-right:20px;"><input type="checkbox" id ="priHandleType01" name="privilegeHandleType" value="01" checked="checked"/>メニュー</label>
								<label style="padding-right:20px;"><input type="checkbox" id ="priHandleType02" name="privilegeHandleType" value="02" onClick="clickPriHandleType()"checked="checked"/>承認者</label>
								<input type="checkbox" id ="priHandleType03" name="privilegeHandleType" value="03" checked="checked" hidden />
								<label style="padding-right:20px;"><input type="checkbox" id ="priHandleType04" name="privilegeHandleType" value="04" onClick="clickPriHandleType()" checked="checked"/>登録者</label>
								<input type="checkbox" id ="priHandleType05" name="privilegeHandleType" value="05" checked="checked" hidden />
								<label style="padding-right:20px;"><input type="checkbox" id ="priHandleType06" name="privilegeHandleType" value="06"  checked="checked"/>画面特権</label>
							</div>
						</td>
					</tr>
					<tr>
						<td style="width: 110px;">社員番号</td>
						<td style="width: 160px;"><input class="easyui-textbox" name="employeeNo" id="employeeNo"/></td>
						<td style="width: 110px;">氏名</td>
						<td><input class="easyui-textbox" name="userName" id="userName"/></td>
					</tr>
				</table>
				<div style="height:5px;"></div>
				<a onclick="btnSearch_Click()" class="easyui-linkbutton" style="width: 80px;">検索</a>
				<label style="width: 10px;"></label> 
				<a onclick="btnClear_Click()" class="easyui-linkbutton" style="width: 80px;">条件クリア</a>
			</div>
			<div style="margin: 10px 0;"></div>
			<div id="p" class="easyui-panel" title="人事処理予定の検索結果"
				style="width: 1138px; height: auto; padding: 10px;">
				<div>
					<label id="rowCount"></label>
				</div>
				<table id="personnelHandleGrid" class="easyui-datagrid"
					data-options="collapsible:true,onCheck:checkPerHandleGrid,onUncheck:uncheckPerHandleGrid,onCheckAll:checkPerHandleGrid,onUncheckAll:uncheckPerHandleGrid"
					style="height: auto; width: 1108px;">
					<thead>
						<tr>
							<th data-options="field:'ck',checkbox:true" rowspan="2"></th>
							<th data-options="field:'personnelHandleId',hidden:'true'" rowspan="2"/>
							<th data-options="field:'userId',hidden:'true'" rowspan="2"/>
							<th data-options="field:'userAlias',width:100,align:'left'" rowspan="2">エイリアス</th>
							<th data-options="field:'employeeNo',width:100,align:'left'" rowspan="2">社員番号</th>
							<th data-options="field:'userName',width:100,align:'left'" rowspan="2">氏名</th>
							<th data-options="field:'personnelHandleTypeName',width:100,align:'left'" rowspan="2">人事種別</th>
							<th data-options="field:'startDate',formatter:dateFormatter,width:90,align:'left'" rowspan="2">反映予定日</th>
							<th data-options="align:'center'" colspan="6">人事内容</th>
						</tr>
						<tr>
							<th data-options="field:'organizationName',width:90,align:'left'">組織</th>
							<th data-options="field:'officeName',width:90,align:'left'">役職</th>
							<th data-options="field:'contractName',width:90,align:'left'">契約形態</th>
							<th data-options="field:'changeEmployeeNo',width:90,align:'left'">社員番号</th>
							<th data-options="field:'changeUserName',width:90,align:'left'">氏名</th>
							<th data-options="field:'changeUserNameKana',width:120,align:'left'">氏名カナ</th>
						</tr>
					</thead>
				</table>
				<div style="height:5px;"></div>
				<div>
					<span style="text-align;"> 
						<a href="javascript:void(0)" class="easyui-linkbutton" disabled
							id="btnPersonnelCancel" onclick="btnPersonnelCancel_Click()" style="width: 100px; ">人事取消</a>
					</span>
					<span style="float:right;padding-right: 8px">
						<a href="javascript:void(0)" class="easyui-linkbutton" 
							id="btnPersonnelExecBatch" onclick="btnPersonnelExecBatchAll_Click()" style="width: 100px; ">反映バッチ起動</a>
					</span>
				</div>
			</div>
			<div style="margin: 10px 0;"></div>
			<div id="p" class="easyui-panel" title="特権処理予定の検索結果"
				style="width: 1138px; height: auto; padding: 10px;">
				<div>
					<label id="privilegeRowCount"></label>
				</div>
				<table id="privilegeHandleGrid" class="easyui-datagrid"
					data-options="collapsible:true,onCheck:checkPriHandleGrid,onUncheck:uncheckPriHandleGrid,onCheckAll:checkPriHandleGrid,onUncheckAll:uncheckPriHandleGrid"
					style="height: auto; width: 1108px;">
					<thead>
						<tr>
							<th data-options="field:'ck',checkbox:true" rowspan="2"></th>
							<th data-options="field:'privilegeHandleId',hidden:'true'" rowspan="2"/>
							<th data-options="field:'userId',hidden:'true'" rowspan="2"/>
							<th data-options="field:'startDate',formatter:dateFormatter,width:80,align:'left'" rowspan="2">反映予定日</th>
							<th data-options="field:'userAlias',width:100,align:'left'" rowspan="2">エイリアス</th>
							<th data-options="field:'employeeNo',width:100,align:'left'" rowspan="2">社員番号</th>
							<th data-options="field:'userName',width:100,align:'left'" rowspan="2">氏名</th>
							<th data-options="field:'privilegeHandleTypeName',width:100,align:'left'" rowspan="2">特権種別</th>
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
				<div>
					<span style="text-align;"> 
						<a href="javascript:void(0)" class="easyui-linkbutton" disabled
							id="btnPrivilegeCancel" onclick="btnPrivilegeCancel_Click()" style="width: 100px; ">特権取消</a>
					</span>
					<span style="float:right;padding-right: 8px">
						<a href="javascript:void(0)" class="easyui-linkbutton" 
							id="btnPrivilegeExecBatch" onclick="btnPrivilegeExecBatchAll_Click()" style="width: 100px">反映バッチ起動</a>
					</span>
				</div>
			</div>
		</div>
	</form>
</body>
</html>