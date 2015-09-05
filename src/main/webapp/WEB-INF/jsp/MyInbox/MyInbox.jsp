<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>MyInbox</title>
<%@include file="../common/head.jsp"%>
<script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/IDMS/MyInbox.js?${initParam.version}"></script>
</head>
<body>
	<center>
		<div id='tt' class="easyui-tabs" style="width: auto; padding-top: 10px;padding-right: 10px;  padding-left: 10px;  padding-bottom:10px">
			<div title="MyInbox" style="width: auto; height: 400px; padding: 10px 10px 10px 10px">
				<label id="taskListCount"></label>
				<table id="dgTaskList" class="easyui-datagrid" data-options="singleSelect:true,collapsible:true"
					style="width: auto; height: 220px;">
					<thead>
						<tr>
							<th data-options="field:'applicationId',align:'center',hidden:'true'">申請ID</th>
							<th data-options="field:'endUserId',align:'center',hidden:'true'">利用者ID</th>
							<th data-options="field:'operationType',align:'center',hidden:'true'">処理区分</th>
							<th data-options="field:'operationOrder',align:'center',hidden:'true'">処理順</th>
							<th data-options="field:'operaterId',align:'center',hidden:'true'">処理者ID</th>
							<th data-options="field:'url',align:'center',hidden:'true'">URL</th>
							<th data-options="field:'detail',align:'center',styler:detailLink">詳細</th>
							<th data-options="field:'receiveDate',align:'center',width:120">受信日</th>
							<th data-options="field:'applicationDate',align:'center',width:120">申請日</th>
							<th data-options="field:'applicationContent',align:'center',width:200">申請内容</th>
							<th data-options="field:'endUserName',align:'center',width:90">利用者</th>
							<th data-options="field:'applicantName',align:'center',width:90">申請者</th>
							<th data-options="field:'approverNameList',align:'center',width:250">承認者/登録者</th>
							<th data-options="field:'applicationStatusName',align:'center',width:120">ステータス</th>
						</tr>
					</thead>
				</table>
			</div>


			<div title="照会" style="width: auto; height: 300px; padding: 10px 10px 10px 10px;">
				<div class="easyui-panel" title="検索条件" style="width: auto; height: auto">
					<table cellpadding="3" style="width: auto;">
						<tr>
							<td style="width: 80px;">申請ID</td>
							<td style="width: 200px;"><input class="easyui-textbox" name="applicationId"
								id="applicationId"></td>
							<td style="width: 80px;">利用者</td>
							<td style="width: 200px;"><input class="easyui-textbox" name="endUserName"
								id="endUserName"></td>
							<td style="width: 80px;">申請者</td>
							<td style="width: 200px;"><input class="easyui-textbox" name="applicantName"
								id="applicantName"></td>
						</tr>
						<tr>
							<td>組織</td>
							<td style="width: 200px;"><input class="easyui-textbox" name="organizationName"
								id="organizationName"></td>
							<td>申請内容</td>
							<td style="width: 200px;"><input class="easyui-textbox" name="applicationContent"
								id="applicationContent"></td>
							<td>ステータス</td>
							<td style="width: 200px;"><input class="easyui-combobox" id="applicationStatus"
								name="applicationStatus"
								data-options="valueField:'value',textField:'text',multiple:true,panelHeight:'auto'">
							</td>
						</tr>
						<tr>
							<td>申請日</td>
							<td colspan="3"><input class="easyui-datebox" name="applicationFromDate"
								id="applicationFromDate" data-options="formatter:dateboxFormatter,parser:dateboxParser"
								validType="minDate['applicationToDate', '申請日']"> &nbsp;～&nbsp; <input
								class="easyui-datebox" name="applicationToDate" id="applicationToDate"
								data-options="formatter:dateboxFormatter,parser:dateboxParser"
								validType="maxDate['applicationFromDate', '申請日']"></td>
						</tr>
						<tr>
							<td>完了日</td>
							<td colspan="3"><input class="easyui-datebox" name=completionFromDate
								id="completionFromDate" data-options="formatter:dateboxFormatter,parser:dateboxParser"
								validType="minDate['completionToDate', '完了日']"> &nbsp;～&nbsp; <input
								class="easyui-datebox" name="completionToDate" id="completionToDate"
								data-options="formatter:dateboxFormatter,parser:dateboxParser"
								validType="maxDate['completionFromDate', '完了日']"></td>
							<td align="right" colspan="6"><a onclick="btnSearch_Click()" class="easyui-linkbutton"
								style="width: 80px;">検索</a> <label style="width: 10px;"></label> <a
								onclick="btnClear_Click()" class="easyui-linkbutton" style="width: 100px;">条件クリア</a></td>
						</tr>
					</table>
				</div>
				<div id="divReference" style="width: auto; height: auto;">
					<label id="referenceListCount"></label>
					<table id="dgReferenceList" class="easyui-datagrid"
						data-options="singleSelect:true,collapsible:true,nowrap:false"
						style="width: auto; height: 200px;">
						<thead>
							<tr>
								<th data-options="field:'endUserId',align:'center',width:90,hidden:'true'">利用者ID</th>
								<th data-options="field:'applicationId',align:'center',width:150">申請ID</th>
								<th data-options="field:'applicationDate',align:'center',width:120">申請日</th>
								<th data-options="field:'applicationContent',align:'center',width:200">申請内容</th>
								<th data-options="field:'endUserName',align:'center',width:90">利用者</th>
								<th data-options="field:'organizationName',align:'center',width:200">組織</th>
								<th data-options="field:'applicantName',align:'center',width:90">申請者</th>
								<th data-options="field:'applicationStatusName',align:'center',width:120">ステータス</th>
								<th data-options="field:'completionDate',align:'center',width:120">完了日</th>
							</tr>
						</thead>
					</table>
				</div>
			</div>


		</div>


		<div id="mainDialog1"></div>
		<div id="mainDialog2"></div>
		<div id="mainDialog3"></div>
		<div id="mainDialog4"></div>
		<div id="mainDialog5"></div>

		<%@include file="../common/loading.jsp"%>
	</center>

</body>
</html>