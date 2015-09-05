<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>組織メンテナンス画面</title>
<%@include file="../common/head.jsp"%>
<script type="text/javascript">
function getCallInfo(){
	var id = "<%=request.getParameter("id")%>";
	return id;
}
</script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/IDMS/IDMS0631.js?${initParam.version}"></script>
</head>
<body>
	<p id="p_errorMessage" style="color: red; padding-left: 10px">&nbsp;</p>
	<form id="IDMS0631Form" method="post">
		<div id="p11" style="padding-left: 10px;width: 700px;">
			<div id="p" class="easyui-panel" title="組織情報"
				style="width: 700px; height: auto; padding: 10px;">
				<table cellpadding="2">
					<tr>
						<td style="text-align: left;width:180px">組織コード</td>
						<td>
							<input class="easyui-textbox" type="text"
							id="organizationCd" name="organizationCd"
							data-options="required:true,validType:[ 'isAlphabetNum', 'maxLength[20]' ]" style="width:180px" />
						</td>
					</tr>
					<tr>
						<td style="text-align: left;">適用開始日</td>
						<td>
							<input class="easyui-datebox" type="text" 
							 name="effectiveDate" id="effectiveDate" style="width: 180px" 
							 data-options="required:true,formatter:dateboxFormatter,parser:dateboxParser,validType:'dateVildate'"/>
						</td>
					</tr>
					<tr>
						<td style="text-align: left;">適用終了日</td>
						<td>
							<input class="easyui-datebox" type="text" 
							 name="expireDate" id="expireDate" style="width: 180px" 
							 data-options="formatter:dateboxFormatter,parser:dateboxParser"
							 validType="maxDate['effectiveDate', '適用期間']"/>
						</td>
					</tr>
					<tr>
						<td style="text-align: left;">部門コード</td>
						<td>
							<input class="easyui-textbox" type="text"
							id="unitCd" name="unitCd"
							data-options="required:true,validType:[ 'isAlphabetNum', 'maxLength[20]' ]" style="width:180px" />
						</td>
					</tr>
					<tr>
						<td>上位組織</td>
						<td><a ref="javascript:void(0)" class="easyui-linkbutton" id="btnSelectOrganization"
							data-options="iconCls:'icon-search'" style="width: 100px"
							onclick="openDialog()">組織選択</a><br /></td>
					</tr>
					<tr>
						<td><div>
								<span style="text-align;"></span><span
									style="float:right;width: 85px;">組織名称</span>
							</div></td>
						<td>
							<input class="easyui-textbox" type="text"
								id="parentOrganizationName" name="parentOrganizationName" disabled
								style="width:180px" />
							<input type="hidden" id="parentOrganizationCd" name="parentOrganizationCd" />
						</td>
					</tr>
					<tr>
						<td><div>
								<span style="text-align;"></span><span
									style="float:right;width: 85px;">組織ランク</span>
							</div></td>
						<td><input class="easyui-textbox" type="text"
							id="parentOrganizationRank" name="parentOrganizationRank" disabled
							style="width:180px" ></input>
						</td>
					</tr>
					<tr>
						<td>組織名称</td>
						<td><input class="easyui-textbox" type="text"
							id="organizationName" name="organizationName"
							data-options="required:true,validType:[ 'maxLength[200]' ],onChange:function(data){changeOrgName(data)}" style="width:180px" /></td>
					</tr>
					<tr>
						<td><div>
								<span style="text-align;"></span><span
									style="float:right;width: 85px;">組織フル名称</span>
							</div></td>
						<td><input class="easyui-textbox" type="text"
							id="organizationFullName" name="organizationFullName" disabled
							style="width:180px" /></td>
					</tr>
					<tr>
						<td><div>
								<span style="text-align;"></span><span
									style="float:right;width: 85px;">組織ランク</span>
							</div></td>
						<td><input class="easyui-textbox" type="text"
							id="organizationRank" name="organizationRank"
							data-options="required:true,validType:[ 'isNumber', 'maxLength[5]' ]" style="width:180px" />
					</tr>
					<tr>
						<td >属性情報</td>
						<td><input type="checkbox" id="branchFlag"
							name="branchFlag" value="1"> <span>支店</span>
						</td>
					</tr>
					<tr>
						<td ></td>
						<td><input type="checkbox" id="shopFlag"
							name="shopFlag" value="1"> <span>営業所</span>
						</td>
					</tr>
					<tr>
						<td >申請可否フラグ</td>
						<td><input type="checkbox" id="applicableSetFlag"
							name="applicableSetFlag" value="1">
						</td>
					</tr>
					<tr>
						<td>登録ユーザ</td>
						<td><input class="easyui-textbox" type="text"
							id="createUserName" name="createUserName" disabled
							style="width:180px" /></td>
					</tr>
					<tr>
						<td>更新ユーザ</td>
						<td><input class="easyui-textbox" type="text"
							id="updateUserName" name="updateUserName" disabled
							style="width:180px" /></td>
					</tr>
				</table>
				<input type="hidden" id="loginUserName" name="loginUserName" value="${loginUserName}"/>
			</div>
			<br />
			<div>
				<span style="text-align;"> <a href="javascript:void(0)"
					class="easyui-linkbutton" id="btnRegister" onclick="register()"
					style="width: 100px;">新規登録</a> <a href="javascript:void(0)"
					class="easyui-linkbutton" id="btnBack" onclick="closeWin()" style="width: 100px;">閉じる</a>
				</span> 
				</span>
			</div>
		</div>
	</form>
</body>

</html>