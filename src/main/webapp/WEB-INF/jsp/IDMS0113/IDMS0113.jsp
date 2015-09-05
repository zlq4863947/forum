<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>申請情報登録画面</title>
<%@include file="../common/head.jsp"%>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/IDMS/IDMS0113.js?${initParam.version}"></script>
</head>
<body>
	<input type="text" style="display: none" name="operationOrder"
		id="operationOrder" value="${operationOrder}">
	<input type="text" style="display: none" name="operationType"
		id="operationType" value="${operationType}">
	<input type="text" style="display: none" name="endUserId"
		id="endUserId" value="${endUserId}">
	<input type="text" style="display: none" name="operaterId"
		id="operaterId" value="${operaterId}">
	<input type="text" style="display: none" name="taskId" id="taskId"
		value="${taskId}">
	<div style="padding-left: 10px;">
		<p id="p_errorMessage" style="color: red;　width: 919px">&nbsp;&nbsp;</p>
		<div id="application" class="easyui-panel"
			style="width: 919px; height: 515px; border-left: 1;">
			<form id="IDMS0113Form" method="post">
				<div class="easyui-panel" title="利用者情報"
					style="width: 900px; padding: 10px 30px 10px 10px">
					<table cellpadding="3">
						<tr>
							<td><input type="text" style="display: none"
								name="organizationCode" id="organizationCode"></td>
							<td><input type="text" style="display: none"
								name="contractCode" id="contractCode"></td>
						</tr>
						<tr>
							<td style="width: 80px;">組織</td>
							<td style="width: 200px;"><input class="easyui-textbox"
								name="organizationName" disabled id="organizationName"></td>
							<td style="width: 70px;">契約形態</td>
							<td><input class="easyui-textbox" name="contractName"
								id="contractName" disabled></td>
							<td><input type="text" style="display: none"
								name="endUserId" id="endUserId"></td>
						</tr>
						<tr>
							<td>エイリアス</td>
							<td><input class="easyui-textbox" name="userAlias"
								id="userAlias" disabled></td>
							<td>社員番号</td>
							<td style="width: 200px;"><input class="easyui-textbox"
								name="employeeNo" id="employeeNo" disabled></td>
							<td style="width: 40px;">氏名</td>
							<td><input class="easyui-textbox" name="userName"
								id="userName" disabled></td>
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
								id="applicationId" style="width: 260px" value="${applicationId}" disabled></td>
						</tr>
						<tr>
							<td style="width: 155px;">分類</td>
							<td><input class="easyui-textbox" name="classInfoName"
								id="classInfoName" style="width: 260px" disabled></td>
							<td><input type="text" style="display: none"
								name="classInfo" id="classInfo"></td>
						</tr>
						<tr>
							<td>システム</td>
							<td><input class="easyui-textbox" name="systemInfoName"
								id="systemInfoName" style="width: 260px" disabled></td>
							<td><input type="text" style="display: none"
								name="systemInfo" id="systemInfo"></td>
						</tr>
						<tr>
							<td>カテゴリ</td>
							<td><input class="easyui-textbox" name="categoryInfoName"
								id="categoryInfoName" style="width: 260px" disabled></td>
							<td><input type="text" name="categoryInfo"
								style="display: none" id="categoryInfo"></td>
						</tr>
					</table>
				</div>

				<div style="margin: 10px 0;"></div>
				<div class="easyui-panel" title="申請内容"
					style="width: 900px; padding: 10px 30px 10px 10px">
					<table cellpadding="3">
						<tr id="tr01">
							<td style="width: 155px;">適用日</td>
							<td colspan="2"><input class="easyui-datebox"
								name="useStartDate" id="useStartDate"
								data-options="formatter:dateboxFormatter,parser:dateboxParser,validType:'dateVildate'"
								disabled></td>
						</tr>
						<tr id="tr02">
							<td style="width: 155px;">利用期間</td>
							<td colspan="2"><input class="easyui-datebox"
								name="useFromDate" id="useFromDate"
								data-options="formatter:dateboxFormatter,parser:dateboxParser,validType:'dateVildate'"
								disabled> &nbsp;～&nbsp; <input class="easyui-datebox"
								name="useToDate" id="useToDate"
								data-options="formatter:dateboxFormatter,parser:dateboxParser,validType:'dateVildate'"
								disabled></td>
						</tr>

						<tr id="tr03">
							<td>ユーザアカウント</td>
							<td colspan="2"><input class="easyui-textbox"
								name="account1" id="account1" disabled></td>
						</tr>
						<tr id="tr04">
							<td>権限/グループ/メニュー</td>
							<td colspan="2"><input class="easyui-textbox"
								name="authorityGroup" id="authorityGroup"> <a
								onclick="btnRefUser_click()" class="easyui-linkbutton"
								id="authorityGroupButton01" style="width: 90px;">他ユーザ参照</a></td>
						</tr>
						<tr id="tr05">
							<td>権限/グループ/メニュー</td>
							<td colspan="2"><input class="easyui-combobox"
								name="authorityInfo" id="authorityInfo"> <a
								onclick="btnSelectUser_click(2)" class="easyui-linkbutton"
								id="authorityGroupButton02" style="width: 90px;">他ユーザ参照</a></td>
						</tr>
						<tr id="tr06">
							<td valign="top">権限/グループ/メニュー</td>
							<td colspan="2"><select multiple size=5
								name="selectAuthorityList" id="selectAuthorityList" disabled
								style="width: 200px; background-color: rgb(235, 235, 228);">
							</select> 
							<span id ="linkListButton">
							<a class="easyui-linkbutton buttonStyle"
								onclick="btnList_click()" id="btnList">一覧</a>
							</span>
							</td>
						</tr>
						<tr id="tr07">
							<td valign="top">権限/グループ/メニュー <br> <br> <a
								onclick="btnRefUser_click()" class="easyui-linkbutton"
								id="authorityGroupButton03" style="width: 90px;">他ユーザ参照</a>
							</td>
							<td>
								<table border="1px" bordercolor="#a0c6e5" rules=none
									cellpadding="3">
									<tr>
										<td></td>
										<td></td>
										<td></td>
									</tr>
									<tr>
										<td colspan="2">
											<input type="text" class="textbox"  id="searchInfo" name="searchInfo">
											<a onclick="btnSearch_click()" class="easyui-linkbutton"
											style="width: 60px; height: 20px;" id = "btnSearch">検索</a></td>
										<td></td>
									</tr>
									<tr>
										<td>一覧</td>
										<td></td>
										<td>選択</td>
									</tr>
									<tr>
										<td><select multiple size=8 name="authorityList"
											id="authorityList" style="width: 200px; height: 144px">
										</select></td>

										<td style="width: 60px;">
											<a class="easyui-linkbutton" id="moveLeft"
											style="width: 60px; height: 20px;"
											onclick="moveSelectedData(document.getElementById('authorityList'),document.getElementById('selectList'),1)">&gt;</a>
											<br> <br> 
											<a id="moveAllLeft"
											class="easyui-linkbutton" style="width: 60px; height: 20px;"
											onclick="moveAllData(document.getElementById('authorityList'),document.getElementById('selectList'),1)">&gt;&gt;</a>
											<br> <br> 
											<a id="moveRight"
											class="easyui-linkbutton" style="width: 60px; height: 20px;"
											onclick="moveSelectedData(document.getElementById('selectList'),document.getElementById('authorityList'),2)">&lt;</a>
											<br> <br>
											<a id="moveAllRight"
											class="easyui-linkbutton" style="width: 60px; height: 20px;"
											onclick="moveAllData(document.getElementById('selectList'),document.getElementById('authorityList'),2)">&lt;&lt;</a>
										</td>
										<td><select multiple size=8 name="selectList"
											id="selectList" style="width: 200px; height: 144px"></select>
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
						<tr id="tr08">
							<td valign="top">申請理由/備考</td>
							<td colspan="2"><input class="easyui-textbox"
								data-options="multiline:true" style="width: 470px; height: 60px"
								name="applicationReason" id="applicationReason" disabled></td>
						</tr>
					</table>
				</div>
				<div style="margin: 10px 0;"></div>

				<div class="easyui-panel" title="申請内容"
					style="width: 900px; padding: 10px 10px 10px 10px">
					<table cellpadding="2">
						<tr>
							<td style="width: 155px;">申請組織</td>
							<td><input class="easyui-textbox"
								name="endUserOrganizationName" id="endUserOrganizationName"
								style="width: 188px" disabled></td>
							<td><input type="text" style="display: none"
								name="endUserOrganizationCd" id="endUserOrganizationCd">
							</td>
						</tr>
						<tr>
							<td></td>
							<td><a onclick="btnRoute_click()" class="easyui-linkbutton"
								style="width: 90px;">承認ルート</a></td>
							<td></td>
						</tr>
						<tr>
							<td style="width: 155px;">利用者契約形態</td>
							<td><input class="easyui-textbox" name="applyContractName"
								id="applyContractName" style="width: 188px" disabled></td>
							<td></td>
						</tr>
					</table>
					<%
					    if ("1".equals(request.getAttribute("detailType"))) {
					%>
					<%@include file="../IDMS0121/IDMS0121.jsp"%>
					<%
					    }
					%>

					<%
					    if ("2".equals(request.getAttribute("detailType"))) {
					%>
					<%@include file="../IDMS0122/IDMS0122.jsp"%>
					<%
					    }
					%>
					<%
					    if ("3".equals(request.getAttribute("detailType"))) {
					%>
					<%@include file="../IDMS0123/IDMS0123.jsp"%>
					<%
					    }
					%>
					<%
					    if ("4".equals(request.getAttribute("detailType"))) {
					%>
					<%@include file="../IDMS0124/IDMS0124.jsp"%>
					<%
					    }
					%>
					<%
					    if ("5".equals(request.getAttribute("detailType"))) {
					%>
					<%@include file="../IDMS0125/IDMS0125.jsp"%>
					<%
					    }
					%>
					<%
					    if ("6".equals(request.getAttribute("detailType"))) {
					%>
					<%@include file="../IDMS0126/IDMS0126.jsp"%>
					<%
					    }
					%>
					<%
					    if ("7".equals(request.getAttribute("detailType"))) {
					%>
					<%@include file="../IDMS0127/IDMS0127.jsp"%>
					<%
					    }
					%>
					<%
					    if ("8".equals(request.getAttribute("detailType"))) {
					%>
					<%@include file="../IDMS0128/IDMS0128.jsp"%>
					<%
					    }
					%>
				</div>

				<div style="margin: 10px 0;"></div>
				<div class="easyui-panel" title="メッセージ"
					style="width: 900px; padding: 10px 10px 10px 10px">
					<table cellpadding="2">
						<tr>
							<td style="width: 165px;" valign="top">備考/登録完了メッセージ</td>
							<td><input class="easyui-textbox"
								data-options="multiline:true,validType:'maxLength[256]'"
								style="width: 473px; height: 60px" name="reasonMemo"
								id="reasonMemo"></td>
						</tr>
					</table>
				</div>
			</form>
		</div>
		<table style="padding-top: 10px;">
			<tr>
				<td style="width: 110px; "><a onclick="btnRequest_click()" class="easyui-linkbutton" style="width: 100px; height: 30px;"
					id="btnRequest">登録完了</a></td>
				<td style="width: 110px; "><a onclick="btnRemand_click()" class="easyui-linkbutton" style="width: 100px; height: 30px;" id="btnRemand">差戻</a></td>
				<td style="width: 470px; text-align: right;"><a onclick="btnBack_click();" class="easyui-linkbutton"
					style="width: 100px; height: 30px; margin-left: 585px">閉じる</a></td>
			</tr>
		</table>
	</div>
</body>
</html>