<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>組織異動画面</title>
<%@include file="../common/head.jsp"%>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/IDMS/IDMS0321.js?${initParam.version}"></script>
</head>
<body>
	<p id="p_errorMessage" style="color: red; padding-left: 10px">&nbsp;</p>
	<form id="IDMS0321Form" method="post">
		<input type="hidden" id="userId" name="userId" />
		<div id="p11" style="padding-left: 10px;width: 700px;">
			<div id="p" class="easyui-panel" title="対象者情報"
				style="width: 700px; height: auto; padding: 10px;">
				<table cellpadding="2">
					<tr>
						<td><a ref="javascript:void(0)" class="easyui-linkbutton"
							data-options="iconCls:'icon-search'" style="width: 100px"
							onclick="openUserSelect()">対象者選択</a><br /></td>
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
							id="organizationName" name="organizationName" disabled style="width:180px" /></td>
					</tr>
					<tr>
						<td style="text-align: left;">役職</td>
						<td><input class="easyui-textbox" type="text"
							id="officeName" name="officeName" disabled
							style="width:180px" /></td>
					</tr>
					<tr>
						<td style="text-align: left;">契約形態</td>
						<td><input class="easyui-textbox" type="text"
							id="contractName" name="contractName" disabled
							style="width:180px" /></td>
					</tr>
				</table>
			</div>
			<br/>
			<div id="p" class="easyui-panel" title="登録内容" style="width: 700px; height: auto; padding: 10px;">
				<table cellpadding="2">
					<tr>
						<td style="text-align: left;width: 100px;">異動日</td>
						<td>
							<input class="easyui-datebox" name="startDate" id="startDate" style="width: 180px" 
									data-options="formatter:dateboxFormatter,parser:dateboxParser,validType:'dateVildate',required:true"/>
						</td>
					</tr>
					<tr>
						<td>異動元組織</td>
						<td>組織&nbsp;<input class="easyui-textbox" type="text"
							id="oldOrganizationName" name="organizationName" disabled
							style="width:180px" /> <input type="hidden" id="organizationCd"
							name="organizationCd" /></td>
					</tr>
					<tr>
						<td/>
						<td>役職&nbsp;<input class="easyui-textbox" type="text"
							id="oldOfficeName" name="officeName" disabled
							style="width:180px" /> <input type="hidden" id="officeCd"
							name="officeCd" /></td>
					</tr>
					<tr>
						<td>異動先組織</td>
						<td><a ref="javascript:void(0)" class="easyui-linkbutton"
							data-options="iconCls:'icon-search'" style="width: 100px"
							onclick="openOrganizationSelect()">組織選択</a><br /></td>
					</tr>
					<tr>
						<td/>
						<td>組織&nbsp;<input class="easyui-textbox" type="text"
							id="changeOrganizationName" name="changeOrganizationName" disabled
							style="width:180px" /> <input type="hidden" id="changeOrganizationCd"
							name="changeOrganizationCd" /></td>
					</tr>
					<tr>
						<td/>
						<td>役職&nbsp;<input class="easyui-combobox" id="changeOfficeCd"
							name="changeOfficeCd" style="width:180px"
							data-options="url:CONTEXT_PATH+'/COMMON/getOfficeList.htm',
										  method:'post',
										  panelHeight:'auto',
										  required:true,
										  textField:'officeName',
										  valueField:'officeCd',
										  onLoadSuccess:function(data){
										  	if(data) $(this).combobox('setValue',data[0].officeCd);
										  },
										  formatter:function(row){
											var opts = $(this).combobox('options');
											// 役職値が空白（一般）の場合、特別処理する
											if(!row[opts.textField]) 
												row[opts.textField] = COMBOBOX_BLANK_OPTION_TEXT+COMBOBOX_BLANK_OPTION_TEXT;
											return row[opts.textField];
										  }"" /></td>
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