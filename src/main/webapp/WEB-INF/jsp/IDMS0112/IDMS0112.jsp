<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>申請情報承認画面</title>
<%@include file="../common/head.jsp"%>
<script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/IDMS/IDMS0112.js?${initParam.version}"></script>
</head>
<body>
<input type="text" style="display: none" name="operationOrder" id="operationOrder" value="${operationOrder}">
<input type="text" style="display: none" name="operationType" id="operationType" value="${operationType}">
<input type="text" style="display: none" name="endUserId" id="endUserId" value="${endUserId}">
<input type="text" style="display: none" name="operaterId" id="operaterId" value="${operaterId}">
<input type="text" style="display: none" name="mode" id="mode" value="${mode}">
<input type="text" style="display: none" name="taskId" id="taskId" value="${taskId}">
<form id="IDMS0112Form" method="post">
	<div style="padding-left: 10px;">
		<p id="p_errorMessage" style="color: red;　width: 919px">&nbsp;&nbsp;</p>
		<div id="application" class="easyui-panel" style="width: 919px; height: 515px; border-left: 1;">
				<div class="easyui-panel" title="利用者情報" style="width: 900px; padding: 10px 30px 10px 10px">
					<table cellpadding="3">
						<tr>
							<td><input type="text" style="display: none" name="organizationCode" id="organizationCode"></td>
							<td><input type="text" style="display: none" name="contractCode" id="contractCode"></td>
						</tr>
						<tr>
							<td style="width: 80px;">組織</td>
							<td style="width: 200px;"><input class="easyui-textbox" name="organizationName" disabled
								id="organizationName"></td>
							<td style="width: 70px;">契約形態</td>
							<td><input class="easyui-textbox" name="contractName" id="contractName" disabled></td>
							<td><input type="text" style="display: none" name="userId" id="userId"></td>
						</tr>
						<tr>
							<td>エイリアス</td>
							<td><input class="easyui-textbox" name="userAlias" id="userAlias" disabled></td>
							<td>社員番号</td>
							<td style="width: 200px;"><input class="easyui-textbox" name="employeeNo" id="employeeNo" disabled></td>
							<td style="width: 40px;">氏名</td>
							<td><input class="easyui-textbox" name="userName" id="userName" disabled></td>
						</tr>
					</table>
				</div>
				<div style="margin: 10px 0;"></div>
				<div class="easyui-panel" title="申請情報"
					style="width: 900px; padding: 10px 30px 10px 10px">
					<table cellpadding="3">
						<tr>
							<td style="width: 155px;">申請ID</td>
							<td><input class="easyui-textbox" name="applicationId"
								id="applicationId" style="width: 260px" value="${applicationId}" disabled>
							</td>
						</tr>
						<tr>
							<td style="width: 155px;">分類</td>
							<td><input class="easyui-textbox" name="classInfoName"
								id="classInfoName" style="width: 260px" disabled>
							</td>
							<td><input type="text" style="display:none" name="classInfo"
								id="classInfo">
							</td>
						</tr>
						<tr>
							<td>システム</td>
							<td><input class="easyui-textbox" name="systemInfoName"
								id="systemInfoName" style="width: 260px" disabled></td>
							<td><input type="text" style="display:none" name="systemInfo"
								id="systemInfo">
							</td>
						</tr>
						<tr>
							<td>カテゴリ</td>
							<td><input class="easyui-textbox" name="categoryInfoName"
								id="categoryInfoName" style="width: 260px" disabled></td>
							<td><input type="text" name="categoryInfo" style="display:none"
								id="categoryInfo"></td>
						</tr>
					</table>
				</div>

				<div style="margin: 10px 0;"></div>
				<div class="easyui-panel" title="申請内容" style="width: 900px; padding: 10px 30px 10px 10px">
					<table cellpadding="3">
						<tr id="tr01">
							<td style="width: 155px;">適用日</td>
							<td colspan="2"><input class="easyui-datebox" name="useStartDate" id="useStartDate"
								data-options="formatter:dateboxFormatter,parser:dateboxParser,validType:'dateVildate'" disabled></td>
						</tr>
						<tr id="tr02">
							<td style="width: 155px;">利用期間</td>
							<td colspan="2"><input class="easyui-datebox" name="useFromDate" id="useFromDate"
								data-options="formatter:dateboxFormatter,parser:dateboxParser,validType:'dateVildate'" disabled> &nbsp;～&nbsp; <input class="easyui-datebox"
								name="useToDate" id="useToDate" data-options="formatter:dateboxFormatter,parser:dateboxParser,validType:'dateVildate'" disabled></td>
						</tr>

						<tr id="tr03">
							<td>ユーザアカウント</td>
							<td colspan="2"><input class="easyui-textbox" name="account1" id="account1" disabled></td>
						</tr>
						<tr id="tr04">
							<td>権限/グループ/メニュー</td>
							<td colspan="2"><input class="easyui-textbox"
								name="authorityGroup" id="authorityGroup" disabled></td>
						</tr>
						<tr>
						<tr id="tr05">
							<td valign="top">権限/グループ/メニュー</td>
							<td colspan="2"><select multiple size=5 name="selectAuthorityList" id="selectAuthorityList" disabled="disabled"
								style="width: 200px; background-color: rgb(235, 235, 228);">
							</select><span id ="linkListButton"> <a class="easyui-linkbutton" onclick="btnList_click()" id="btnList" style="height:24px;width:60px;">一覧</a></span></td>
						</tr>
						<tr id="tr06">
							<td valign="top">申請理由/備考</td>
							<td colspan="2"><input class="easyui-textbox" data-options="multiline:true"
								style="width: 473px; height: 60px" name="applicationReason" id="applicationReason" disabled></td>
						</tr>
					</table>
				</div>
				<div style="margin: 10px 0;"></div>
				<div class="easyui-panel" title="申請内容" style="width: 900px; padding: 10px 10px 10px 10px">
					<table cellpadding="2">
						<tr>
							<td style="width: 155px;">申請組織</td>
							<td><input class="easyui-textbox" name="endUserOrganizationName" id="endUserOrganizationName" style="width: 188px" disabled></td>
							<td><input type="text" name="endUserOrganizationCd" id="endUserOrganizationCd" style="display:none;"></td>
						</tr>
						<tr>
							<td></td>
							<td>
								<a onclick="btnRoute_click()" class="easyui-linkbutton" 　style="width: 90px;">承認ルート</a>
							</td>
							<td></td>
						</tr>
						<tr>
							<td style="width: 155px;">利用者契約形態</td>
							<td><input class="easyui-textbox" name="applyContractName" id="applyContractName" style="width: 188px" disabled></td>
							<td></td>
						</tr>
					</table>
				<% if("1".equals(request.getAttribute("detailType"))){ %> 
					<%@include file="../IDMS0121/IDMS0121.jsp"%>
				<% } %>
				
				<% if("2".equals(request.getAttribute("detailType"))){ %> 
					<%@include file="../IDMS0122/IDMS0122.jsp"%>
				<% } %>
				<% if("3".equals(request.getAttribute("detailType"))){ %> 
					<%@include file="../IDMS0123/IDMS0123.jsp"%>
				<% } %>
				<% if("4".equals(request.getAttribute("detailType"))){ %> 
					<%@include file="../IDMS0124/IDMS0124.jsp"%>
				<% } %>
				<% if("5".equals(request.getAttribute("detailType"))){ %> 
					<%@include file="../IDMS0125/IDMS0125.jsp"%>
				<% } %>
				<% if("6".equals(request.getAttribute("detailType"))){ %> 
					<%@include file="../IDMS0126/IDMS0126.jsp"%>
				<% } %>
				<% if("7".equals(request.getAttribute("detailType"))){ %> 
					<%@include file="../IDMS0127/IDMS0127.jsp"%>
				<% } %>
				<% if("8".equals(request.getAttribute("detailType"))){ %> 
					<%@include file="../IDMS0128/IDMS0128.jsp"%>
				<% } %>
				</div>
				<div id="divReason">
				<div style="margin: 10px 0;"></div>
				<div class="easyui-panel" title="メッセージ" style="width: 900px; padding: 10px 10px 10px 10px" >
					<table cellpadding="2">
						<tr>
							<td style="width: 155px;" valign="top">備考/却下理由</td>
							<td>
								<input class="easyui-textbox" data-options="multiline:true,validType:'maxLength[256]'" 
								style="width: 473px; height: 60px" name="reasonMemo" id="reasonMemo">
							</td>
						</tr>
					</table>
				</div>
				</div>
			
		</div>
		<table style="padding-top: 10px;">
			<tr>
				<td style="width: 110px; "><a onclick="btnRequest_click()" class="easyui-linkbutton" style="width: 100px; height: 30px;" id ="btnRequest">承認</a> </td>
				<td style="width: 110px; "><a onclick="btnDenial_click()" class="easyui-linkbutton" style="width: 100px; height: 30px;" id ="btnDenial">却下</a> </td>
				<td style="width: 110px; "><a onclick="btnRemand_click()" class="easyui-linkbutton" style="width: 100px; height: 30px;" id ="btnRemand">差戻</a></td>
				<td style="width: 50px; text-align: right;"><label style="width:40px;" id ="lblBack" >差戻先 </label></td>
				<td style="width: 110px; "><input class="easyui-combobox" name="returnUserInfo" id="returnUserInfo"></td>
				<td style="width: 310px; text-align: right;"><a onclick="btnBack_click();" class="easyui-linkbutton" style="width: 100px; height: 30px;" id = "btnBack">閉じる</a></td>
			</tr>
		</table>
	</div>
	</form>
</body>
</html>