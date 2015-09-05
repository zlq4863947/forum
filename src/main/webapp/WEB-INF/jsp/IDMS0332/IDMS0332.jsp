<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>兼任解除画面</title>
<%@include file="../common/head.jsp"%>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/IDMS/IDMS0332.js?${initParam.version}"></script>

<style scoped="scoped">
.buttonStyle {
	height: 20px;
	width: 40px;
	margin: 0;
	padding: 0 2px;
	box-sizing: content-box;
}
</style>
</head>
<body>
	<p id="p_errorMessage" style="color: red; padding-left: 10px">&nbsp;</p>
	<form id="IDMS0332Form" method="post">
		<input type="hidden" id="userId" name="userId" />
		<div id="p11" style="padding-left: 10px;width: 700px;">
			<div id="p" class="easyui-panel" title="対象者情報"
				style="width: 700px; height: auto; padding: 10px;">
				<table cellpadding="2">
					<tr>
						<td><a ref="javascript:void(0)" class="easyui-linkbutton"
							data-options="iconCls:'icon-search'" style="width: 100px"
							onclick="openUserSelect()">対象者選択</a></td>
					</tr>
					<tr>
						<td style="text-align: left;">エイリアス</td>
						<td><input class="easyui-textbox" type="text" id="userAlias"
							name="userAlias" disabled style="width:180px" /></td>
					</tr>
					<tr>
						<td style="text-align: left;">社員番号</td>
						<td><input class="easyui-textbox" type="text" id="employeeNo"
							name="employeeNo" disabled style="width:180px" /></td>
					</tr>
					<tr>
						<td style="text-align: left;">氏名</td>
						<td><input class="easyui-textbox" type="text" id="userName"
							name="userName" disabled style="width:180px" /></td>
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
						<td><input class="easyui-textbox" type="text" id="officeName"
							name="officeName" disabled style="width:180px" /> <input
							type="hidden" id="officeCd" name="officeCd" /></td>
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
			<br />
			<div id="p" class="easyui-panel" title="解除内容"
				style="width: 700px; height: auto; padding: 10px;">
				<table cellpadding="2">
					<tr>
						<td style="text-align: left;width: 100px;">兼任解除日</td>
						<td><input class="easyui-datebox" name="startDate"
							id="startDate" style="width: 180px"
							data-options="formatter:dateboxFormatter,
												 parser:dateboxParser,
												 validType:'dateVildate',
												 required:true,onSelect:function(data){getRegisterList()}" />
						</td>
					</tr>
				</table>
				<table cellpadding="3">
					<tr>
						<td>兼任を維持する組織</td>
						<td></td>
						<td>兼任を解除する組織</td>
					</tr>
					<tr>
						<td>
							<select multiple size=8 name="registeredList" id="registeredList" style="width:300px;height:144px">
							</select>
						</td>
						<td><input type="button" value=">"
							class="easyui-linkbutton buttonStyle"
							onclick="moveSelected(this.form.registeredList,this.form.unregisterList)" />
							<br> <br> <input type="button" value=">>"
							class="easyui-linkbutton buttonStyle"
							onclick="moveAll(this.form.registeredList,this.form.unregisterList)" /><br>
							<br> <input type="button" value="<" class="
							easyui-linkbutton
							buttonStyle" 
								onclick="moveSelected(this.form.unregisterList,this.form.registeredList)" />
							<br> <br> <input type="button" value="<<" class="
							easyui-linkbutton
							buttonStyle" onclick="moveAll(this.form.unregisterList,this.form.registeredList)" />
						</td>
						<td><select multiple size=8 name="unregisterList" id="unregisterList"
							style="width:300px;height:144px"></select></td>
					</tr>
				</table>
			</div>
			<br />
			<div>
				<span style="text-align;"> <a href="javascript:void(0)"
					class="easyui-linkbutton" id="btnUnregister" onclick="unregister()"
					style="width: 100px;">解除</a>
				</span>
			</div>
		</div>
	</form>
</body>

</html>