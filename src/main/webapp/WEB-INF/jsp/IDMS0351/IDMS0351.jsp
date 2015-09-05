<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>氏名変更画面</title>
<%@include file="../common/head.jsp"%>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/IDMS/IDMS0351.js?${initParam.version}"></script>
</head>
<body>
	<p id="p_errorMessage" style="color: red; padding-left: 10px">&nbsp;</p>
	<form id="IDMS0351Form" method="post">
		<input type="hidden" id="userId" name="userId" />
		<div id="p11" style="padding-left: 10px;width: 700px;">
			<div id="p" class="easyui-panel" title="対象者情報"
				style="width: 700px; height: auto; padding: 10px;">
				<table cellpadding="2">
					<tr>
						<td><a ref="javascript:void(0)" class="easyui-linkbutton"
							data-options="iconCls:'icon-search'" style="width: 120px"
							onclick="openUserSelect()">対象者選択</a></td>
					</tr>
					<tr>
						<td style="text-align: left;">エイリアス</td>
						<td><input class="easyui-textbox" type="text" id="userAlias" name="userAlias" disabled style="width:180px" /></td>
					</tr>
					<tr>
						<td style="text-align: left;">社員番号</td>
						<td><input class="easyui-textbox" type="text" id="employeeNo" name="employeeNo" disabled style="width:180px" /></td>
					</tr>
					<tr>
						<td style="text-align: left;">氏名</td>
						<td><input class="easyui-textbox" type="text" id="userName" name="userName" disabled style="width:180px" /></td>
					</tr>
					<tr>
						<td style="text-align: left;">組織</td>
						<td><input class="easyui-textbox" type="text"
							id="organizationName" name="organizationName" disabled
							style="width:180px" /> <input type="hidden" id="organizationCd"
							name="organizationCd" /></td>
					</tr>
					<tr>
						<td style="text-align: left;">役職</td>
						<td><input class="easyui-textbox" type="text"
							id="officeName" name="officeName" disabled
							style="width:180px" /> <input type="hidden" id="officeCd"
							name="officeCd" /></td>
					</tr>
					<tr>
						<td style="text-align: left;">契約形態</td>
						<td><input class="easyui-textbox" type="text"
							id="contractName" name="contractName" disabled
							style="width:180px" /> <input type="hidden" id="contractCd"
							name="contractCd" /></td>
					</tr>
				</table>
			</div>
			<br/>
			<div id="p" class="easyui-panel" title="登録内容" style="width: 700px; height: auto; padding: 10px;">
				<table cellpadding="2">
					<tr>
						<td style="text-align: left;width: 130px;">氏名変更日</td>
						<td>
							<input class="easyui-datebox" name="startDate" id="startDate" style="width: 180px" 
								data-options="formatter:dateboxFormatter,parser:dateboxParser,validType:'dateVildate',required:true"/>
						</td>
					</tr><tr>
						<td><div>
								現在の氏名</span>
							</div></td>
						<td width="210px"><input class="easyui-textbox" type="text" id="userName"
							name="userName" disabled style="width:180px" /></td>
						<td width="115px">氏名カナ</td>
						<td><input class="easyui-textbox" type="text" id="userNameKana"
							name="userNameKana" disabled style="width:180px" /></td>
					</tr>
					<tr>
						<td width="80px">変更後の氏名&nbsp;(姓)</td>
						<td><input class="easyui-textbox" type="text" id="changeLastName" name="changeLastName"
							data-options="required:true,validType:'maxLength[50]'" style="width:180px" /></td>
						<td width="80px">氏名カナ&nbsp;(セイ)</td>
						<td><input class="easyui-textbox" type="text" id="changeLastNameKana" name="changeLastNameKana"
							data-options="required:true,validType:[ 'isKatakana', 'maxLength[50]' ]" style="width:180px" /></td>
					</tr>
					<tr>
						<td width="90px" align="right">(名)<span style="width:19px;display:inline-block;"></span></td>
						<td><input class="easyui-textbox" type="text" id="changeFirstName" name="changeFirstName"
							data-options="required:true,validType:'maxLength[50]'" style="width:180px" /></td>
						<td width="90px" align="right">(メイ)<span style="width:18px;display:inline-block;"></span></td>
						<td><input class="easyui-textbox" type="text" id="changeFirstNameKana" name="changeFirstNameKana"
							data-options="required:true,validType:[ 'isKatakana', 'maxLength[50]' ]" style="width:180px" /></td>
					</tr>
				</table>
			</div>
			<br/>
			<div>
				<span style="text-align;"> <a href="javascript:void(0)"
					class="easyui-linkbutton" id="btnRegister" onclick="register()"
					style="width: 100px;">登録</a>
				</span>
			</div>
		</div>
	</form>
</body>

</html>