<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>申請共通</title>
<%@include file="../common/head.jsp"%>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/IDMS/IDMS0101.js?${initParam.version}"></script>
</head>
<body>
<input type="text" style="display: none" name="applciationCommonFormPattern" id="applciationCommonFormPattern" value="${applciationCommonFormPattern}">
<input type="text" style="display: none" name="applicationDetailFormType" id="applicationDetailFormType" value="${applicationDetailFormType}">
<input type="text" style="display: none" name="applicationDetailFormPattern" id="applicationDetailFormPattern" value="${applicationDetailFormPattern}">
<input type="text" style="display: none" name="applicationShowType" id="applicationShowType" value="${applicationShowType}">
<input type="text" style="display: none" name="mode" id="mode" value="${mode}">
<input type="text" style="display: none" name="applicationId" id="applicationId" value="${applicationId}">
<input type="text" style="display: none" name="taskId" id="taskId" value="${taskId}">
<div style="padding-left:10px;">
	<p id="p_errorMessage" style="color: red;">&nbsp;&nbsp;</p>
	<div id="application" class="easyui-panel" style="width:920px;height:515px;">
	<form id="IDMS0101Form" method="post">
		<div class="easyui-panel" title="利用者情報"
			style="width:900px;padding:10px 30px 10px 10px">
			<a onclick="btnSelectUser_click(1)" class="easyui-linkbutton"
						style="width: 80px;" id="btnSelectUser">利用者選択</a>
			<table cellpadding="3">
				<tr>
					<td><input  type="text"  style="display: none" name="organizationCode" id="organizationCode" <% if("1".equals(request.getParameter("mode"))){ %> value= "${organizationCd}" <% }%>></td>
					<td><input  type="text"  style="display: none" name="contractCode" id="contractCode" <% if("1".equals(request.getParameter("mode"))){ %> value= "${contractCd}" <% }%> ></td>
				</tr>
				<tr>
					<td style="width:80px;">組織</td>
					<td style="width:200px;"><input   class="easyui-textbox" name="organizationName" disabled  id="organizationName" <% if("1".equals(request.getParameter("mode"))){ %> value= "${organizationName}" <% }%>></td>
					<td style="width:70px;">契約形態</td>
					<td><input class="easyui-textbox"  name="contractName" id="contractName" disabled  <% if("1".equals(request.getParameter("mode"))){ %> value= "${contractName}" <% }%> ></td>
					<td><input type="text" style="display: none" name="endUserId" id="endUserId" value= "${endUserId}" ></td>
				</tr>
				<tr>
					<td>エイリアス</td>
					<td><input class="easyui-textbox" name="userAlias" id="userAlias" disabled <% if("1".equals(request.getParameter("mode"))){ %> value= "${userAlias}" <% }%>></td>
					<td>社員番号</td>
					<td style="width:200px;"><input class="easyui-textbox" name="employeeNo" id="employeeNo"  disabled <% if("1".equals(request.getParameter("mode"))){ %> value= "${employeeNo}" <% }%>></td>
					<td style="width:40px;">氏名</td>
					<td><input class="easyui-textbox" name="userName" id="userName" disabled <% if("1".equals(request.getParameter("mode"))){ %> value= "${userName}" <% }%>></td>
				</tr>
			</table>
		</div>
		<div style="margin:10px 0;"></div>
		<div class="easyui-panel" title="申請情報"
			style="width:900px;padding:10px 30px 10px 10px">
			<table cellpadding="3">
				<tr>
					<td style="width: 155px;">分類</td>
					<td><input class="easyui-combobox" name="classInfo" id="classInfo" style="width: 260px" required="true" validType="needSelect['#classInfo']"></td>
				</tr>
				<tr>
					<td>システム</td>
					<td><input class="easyui-combobox" name="systemInfo" id="systemInfo" style="width: 260px" disabled required="true" validType="needSelect['#systemInfo']"></td>
				</tr>
				<tr>
					<td>カテゴリ</td>
					<td><input class="easyui-combobox" name="categoryInfo" id="categoryInfo" style="width: 260px" disabled required="true" validType="needSelect['#categoryInfo']"></td>
				</tr>
			</table>
		</div>
		
		<div style="margin:10px 0;"></div>
		<div class="easyui-panel" title="申請内容"
			style="width:900px;padding:10px 30px 10px 10px;"  id ="applicaionDiv" >
			<table cellpadding="3" >
				<tr id="tr01">
					<td colspan="3" style="width: 155px;"><label id="comment"></label></td>
				</tr>
				<tr id="tr02">
					<td style="width: 155px;">適用日</td>
					<td colspan="2">
					<input class="easyui-datebox" name="useStartDate" id="useStartDate" data-options="formatter:dateboxFormatter,parser:dateboxParser,validType:'dateVildate'">
					</td> 
				</tr>
				<tr id="tr03">
					<td style="width: 155px;">利用期間</td>
					<td colspan="2">
					<input class="easyui-datebox" name="useFromDate" id="useFromDate" data-options="formatter:dateboxFormatter,parser:dateboxParser,validType:'dateVildate'">
					&nbsp;～&nbsp;
					<input class="easyui-datebox" name="useToDate" id="useToDate" data-options="formatter:dateboxFormatter,parser:dateboxParser,validType:'dateVildate'">
					</td> 
				</tr>
				<tr id="tr04">
					<td>ユーザアカウント</td>
					<td colspan="2"><input class="easyui-textbox" name="account1" id="account1" ></td>
				</tr>

				<tr id="tr05">
					<td>ユーザアカウント</td>
					<td colspan="2"><input class="easyui-combobox" name="account2"  id="account2"></td>
				</tr>
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
					<td colspan="2">
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
					<td colspan="2"><input class="easyui-textbox" data-options="multiline:true,required:true,validType:'maxLength[256]'" style="width:485px;height:60px" name="applicationReason" id="applicationReason"></td>
				</tr>
			</table>
		</div>
	</form>
</div>
	<br>
	<a onclick="btnNext_click()" class="easyui-linkbutton" style="width:100px;height:30px;">次へ</a>
	</div>
</body>
</html>