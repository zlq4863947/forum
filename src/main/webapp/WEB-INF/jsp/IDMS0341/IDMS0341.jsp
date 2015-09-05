<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>契約形態変更画面</title>
<%@include file="../common/head.jsp"%>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/IDMS/IDMS0341.js?${initParam.version}"></script>
</head>
<body>
	<p id="p_errorMessage" style="color: red; padding-left: 10px">&nbsp;</p>
	<form id="IDMS0341Form" method="post">
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
				<div> 契約形態の変更を行うと、 <B>現在の社員番号が破棄</B>され、
				<br/>入力された <B>新しい社員番号が付番</B>されます。</div>
				<table cellpadding="2">
					<tr>
						<td style="text-align: left;width: 120px;">契約形態変更日</td>
						<td>
							<input class="easyui-datebox" name="startDate" id="startDate" style="width: 180px" 
								data-options="formatter:dateboxFormatter,parser:dateboxParser,validType:'dateVildate',required:true"/>
						</td>
					</tr>
					<tr>
						<td style="text-align: left;">現在の契約形態</td>
						<td><input class="easyui-textbox" type="text"
							id="oldContractName" name="contractName" disabled
							style="width:180px" /> </td>
					</tr>
					<tr>
						<td style="text-align: left;">変更後の契約形態</td>
						<td><input class="easyui-combobox" id="changeContractCd"
							name="changeContractCd" style="width:180px" validType="needSelect['#changeContractCd']"
							data-options="url:CONTEXT_PATH+'/COMMON/getContractList.htm?checkPrivilege=false&menuId=IDMS0341',
										  method:'post',
										  panelHeight:'auto',
										  required:true,
										  textField:'contractName',
										  valueField:'contractCd',
										  onSelect:function(data){selectContractCd(data)},
										  onLoadSuccess:function(data){
										  	if(data) $(this).combobox('setValue',data[0].contractCd);
										  }" /></td>
					</tr>
					<tr>
						<td style="text-align: left;">社員番号</td>
						<td><input class="easyui-textbox" type="text" id="changeEmployeeNo"
							name="changeEmployeeNo" style="width:180px" required="true"
							data-options="validType:[ 'isAlphabetNum', 'maxLength[20]' ]"/></td>
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