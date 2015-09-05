<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>登録一覧</title>
<%@include file="../common/head.jsp"%>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/IDMS/IDMS0131.js?${initParam.version}"></script>
</head>
<body>
	<p id="p_errorMessage" style="color: red; padding-left: 10px">&nbsp;</p>
	<form id="regiserListForm" method="post">
	<input type="text" style="display: none" name="hideApplicationId" id="hideApplicationId">
	<input type="text" style="display: none" name="hideEndUser" id="hideEndUser">
	<input type="text" style="display: none" name="hideApplicant" id="hideApplicant">
	<input type="text" style="display: none" name="hideSystemCd" id="hideSystemCd">
	<input type="text" style="display: none" name="hideOrganizationCd" id="hideOrganizationCd">
	<input type="text" style="display: none" name="hideUseFromDate" id="hideUseFromDate">
	<input type="text" style="display: none" name="hideUseToDate" id="hideUseToDate">
	<input type="checkbox"  style="display: none" id ="hideProspectiveEmp" name="hideProspectiveEmp" />
	<input type="checkbox"  style="display: none" id ="hideEnrolmentEmp" name="hideEnrolmentEmp" />
	<input type="checkbox"  style="display: none" id ="hideRetirementEmp" name="hideRetirementEmp" />
		<div style="padding-left: 10px;">
			<div class="easyui-panel" title="検索条件"
				style="width: 1270px; padding: 10px 30px 10px 10px">
				<table cellpadding="3" style="width: 1245px;">
					<tr>
						<td style="width: 160px;">申請ID</td>
						<td style="width: 400px;"><input class="easyui-textbox"
							name="applicationId" id="applicationId"></td>
						<td style="width: 110px;">利用者</td>
						<td style="width: 240px;"><input class="easyui-textbox"
							name="endUser" id="endUser"></td>
						<td style="width: 110px;">申請者</td>
						<td style="width: 500px;"><input class="easyui-textbox"
							name="applicant" id="applicant"></td>
					</tr>
					<tr>
						<td>システム</td>
						<td><input class="easyui-combobox" name="systemInfo"
							id="systemInfo"></td>
						<td>申請組織</td>
						<td colspan="3"><a onclick="btnOrganization_Click()"
							class="easyui-linkbutton" style="width: 80px;">組織選択</a> <input
							class="easyui-textbox"
							name="endUserOrganization" id="endUserOrganization" style="width: 370px;" disabled>
							<input type="text" style="display: none;"
							name="endUserOrganizationCd" id="endUserOrganizationCd">
						</td>

					</tr>
					<tr>
						<td>利用期間</td>
						<td colspan="5"><input class="easyui-datebox"
							name="useFromDate" id="useFromDate"
							data-options="formatter:dateboxFormatter,parser:dateboxParser"
							validType="minDate['useToDate', '利用期間']"> &nbsp;～&nbsp; <input
							class="easyui-datebox" name="useToDate" id="useToDate"
							data-options="formatter:dateboxFormatter,parser:dateboxParser"
							validType="maxDate['useFromDate', '利用期間']"></td>
						
					</tr>
					<tr>
						<td style="width: 110px;">利用者在籍状態</td>
						<td colspan="3">
						<div style = "width:260px;border:1px solid #95B8E7">
						<input type="checkbox" id ="prospectiveEmp" />内定者
						&nbsp;&nbsp;<input type="checkbox" id ="enrolmentEmp" />在籍者
						&nbsp;&nbsp;<input type="checkbox" id ="retirementEmp" />退職者
						</div>
						</td>
						<td></td>
						<td align="left"><a onclick="btnSearch_Click()"
							class="easyui-linkbutton" style="width: 80px;">検索</a> <label
							style="width: 10px;"></label> <a onclick="btnClear_Click()"
							class="easyui-linkbutton" style="width: 80px;">条件クリア</a></td>
					</tr>
				</table>
			</div>
			</div>
		</form>
			<div style="margin: 10px 0;"></div>
			<div style="padding-left: 10px;">
			<div id="p" class="easyui-panel" title="検索結果"
				style="width: 1270px; height: auto; padding: 10px;">
				<div>
					<label id="rowCount"></label>
				</div>
				<table id="dg" class="easyui-datagrid"
					data-options="singleSelect:true,collapsible:true"
					style="height: 477px; width: 1245px;">
					<thead>
						<tr>
							<th data-options="field:'applicationId',width:40,align:'center',hidden:'true'">&nbsp;</th>
							<th data-options="field:'completionDate',formatter:dateFormat,width:120,align:'left',halign:'center'">登録日</th>
							<th data-options="field:'systemName',width:120,align:'left',halign:'center'">システム名</th>
							<th data-options="field:'account',width:120,align:'left',halign:'center'">アカウント</th>
							<th data-options="field:'categoryName',width:120,align:'left',halign:'center'">カテゴリ</th>
							<th data-options="field:'authorityGroupMenuName',width:150,align:'left',halign:'center'">権限/グループ/メニュー</th>
							<th data-options="field:'userAlias',width:90,align:'left',halign:'center'">エイリアス</th>
							<th data-options="field:'employeeNo',width:90,align:'left',halign:'center'">社員番号</th>
							<th data-options="field:'endUserName',width:90,align:'left',halign:'center'">利用者</th>
							<th data-options="field:'endUserOrganizationName',width:148,align:'left',halign:'center'">申請組織</th>
							<th data-options="field:'useStartDate',formatter:dateFormatter,width:90,align:'left',halign:'center'">利用開始日</th>
							<th data-options="field:'useEndDate',formatter:dateFormatter,width:90,align:'left',halign:'center'">利用終了日</th>
						</tr>
					</thead>
				</table>
			</div>
			</div>
			<br />
			<div style="padding-left: 10px;">
				<span style="float:left;"> <a
					href="javascript:void(0)" class="easyui-linkbutton"
					onclick="btnCsv_Click()" style="width: 100px;">CSV出力</a>
				</span>
			</div>
</body>
</html>