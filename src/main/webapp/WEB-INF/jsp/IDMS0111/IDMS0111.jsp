<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>ログイン</title>
<%@include file="../common/head.jsp"%>
<script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/IDMS/IDMS0111.js?${initParam.version}"></script>
</head>
<body>
	<input type="text" style="display: none" name="mode" id="mode" value="${mode}">
	<input type="text" style="display: none" name="detailType" id="detailType" value="${detailType}">
	<div style="padding-left: 10px;">

		<p id="p_errorMessage" style="color: red; width: 920px;">&nbsp;&nbsp;</p>
		<div id="scrollPanel" class="easyui-panel" style="width: 920px; height: 515px;">
			<div class="easyui-panel" title="利用者情報" style="width: 900px; padding: 10px 30px 10px 10px">
				<table cellpadding="3">
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
			<div class="easyui-panel" title="申請情報" style="width: 900px; padding: 10px 30px 10px 10px">
				<table cellpadding="3">
					<tr id="trApplicationId">
						<td style="width: 155px;">申請ID</td>
						<td><input class="easyui-textbox" name="applicationId" id="applicationId" style="width: 260px" disabled></td>
					</tr>
					<tr>
						<td style="width: 155px;">分類</td>
						<td><input class="easyui-textbox" name="classInfoName" id="classInfoName" style="width: 260px" disabled></td>
					</tr>
					<tr>
						<td>システム</td>
						<td><input class="easyui-textbox" name="systemInfoName" id="systemInfoName" style="width: 260px" disabled></td>
					</tr>
					<tr>
						<td>カテゴリ</td>
						<td><input class="easyui-textbox" name="categoryInfoName" id="categoryInfoName" style="width: 260px" disabled></td>
					</tr>
				</table>
			</div>
			<div style="margin: 10px 0;"></div>
			<div class="easyui-panel" title="申請内容" style="width: 900px; padding: 10px 30px 10px 10px">
				<table cellpadding="3">

					<tr id="trUseStartDate">
						<td style="width: 155px;">適用日</td>
						<td colspan="2"><input class="easyui-textbox" name="useStartDate" id="useStartDate" disabled></td>
					</tr>
					<tr id="trUseFromToDate">
						<td style="width: 155px;">利用期間</td>
						<td colspan="2"><input class="easyui-textbox" name="useFromDate" id="useFromDate" disabled>
							&nbsp;～&nbsp; <input class="easyui-textbox" name="useToDate" id="useToDate" disabled></td>
					</tr>
					<tr>
						<td>ユーザアカウント</td>
						<td colspan="2"><input class="easyui-textbox" name="account1" id="account1" disabled></td>
					</tr>
					<tr id="trAuthoritySingle">
						<td>権限/グループ/メニュー</td>
						<td colspan="2"><input class="easyui-textbox" name="authorityGroup" id="authorityGroup" disabled></td>
					</tr>


					<tr id="trAuthorityMultiple">
						<td valign="top">権限/グループ/メニュー <br> <br>

						</td>
						<td><select multiple size=5 name="selectListUp" id="selectListUp" style="width: 200px; background-color: rgb(235, 235, 228);" disabled="disabled" ></select>
						<span id ="linkListButton"><a id = "btnList" class="easyui-linkbutton" onclick="btnList_click()" style="width: 60px; height: 24px;">一覧</a></span></td>
					</tr>
					<tr>
						<td valign="top">申請理由/備考</td>
						<td colspan="2"><input class="easyui-textbox" data-options="multiline:true"
							style="width: 473px; height: 60px" disabled name="applicationReason" id="applicationReason"></td>
					</tr>
				</table>
			</div>
			<div style="margin: 10px 0;"></div>
			<div class="easyui-panel" title="申請詳細" style="width: 900px; padding: 10px 10px 10px 10px">
				<form id="IDMS0111FormOrg" method="get">
					<table cellpadding="2">
						<tr>
							<td style="width: 155px;">申請組織</td>
							<td style="width: 250px;"><input class="easyui-combobox" name="endUserOrganization" id="endUserOrganization"
								style="width: 240px" required="true" validType="needSelect['#endUserOrganization']"
								data-options="panelHeight:'auto'"></td>
						</tr>
						<tr>
							<td style="width: 155px;">利用者契約形態</td>
							<td><input class="easyui-textbox" name="applyContractName" id="applyContractName" style="width: 240px" disabled></td>
						</tr>
						<tr>
							<td></td>
							<td><a onclick="popupRoute()" class="easyui-linkbutton" style="width: 100px;">承認ルート</a></td>
						</tr>
					</table>
				</form>
				<form id="IDMS0111Form" method="get">

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
				</form>
			</div>
		</div>
		<table style="padding-top: 10px;">
			<tr>
				<td><a id="btnApply" onclick="apply()" class="easyui-linkbutton" style="width: 100px; height: 30px;">申請</a></td>
				<td><a id="btnDismissal" onclick="dismissal()" class="easyui-linkbutton" style="width: 100px; height: 30px;">取消</a></td>
				<td><a id="btnBack" onclick="back()" class="easyui-linkbutton" style="width: 100px; height: 30px;">戻る</a></td>
				<td><a id="btnClose" onclick="btnClose_click();" class="easyui-linkbutton" style="width: 100px; height: 30px; margin-left: 500px">閉じる</a></td>
			</tr>
		</table>
	</div>

</body>
</html>