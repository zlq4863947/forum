<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>内定者入力画面</title>
<%@include file="../common/head.jsp"%>
<script type="text/javascript">
function getUserListInfo(){
	var data = {};
	data.userId = "<%=request.getParameter("userId")%>";
	data.model = "<%=request.getParameter("model")%>";
	return data;
}
</script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/IDMS/IDMS0311.js?${initParam.version}"></script>
</head>
<body>
	<p id="p_errorMessage" style="color: red; padding-left: 10px">&nbsp;</p>
	<form id="IDMS0311Form" method="post">
		<div id="p11" style="padding-left: 10px;width: 700px;">
			<div id="p" class="easyui-panel" title="内定者情報"
				style="width: 700px; height: auto; padding: 10px;">
				<table cellpadding="2">
					<tr>
						<td style="text-align: left;">入社予定日</td>
						<td>
							<input class="easyui-datebox" type="text" 
							 name="scheduledEntryCompanyDate" id="scheduledEntryCompanyDate" style="width: 180px" 
							 data-options="formatter:dateboxFormatter,parser:dateboxParser,validType:'dateVildate'"/>
						</td>
					</tr>
					<tr>
						<td>組織</td>
						<td><a ref="javascript:void(0)" class="easyui-linkbutton" id="btnSelectOrganization"
							data-options="iconCls:'icon-search'" style="width: 100px"
							onclick="openDialog()">組織選択</a><br /></td>
					</tr>
					<tr>
						<td />
						<td><input class="easyui-textbox" type="text"
							id="organizationName" name="organizationName" readonly
							style="width:180px" /> <input type="hidden" id="organizationCd"
							name="organizationCd" /></td>
					</tr>
					<tr>
						<td style="text-align: left;">役職</td>
						<td><input class="easyui-combobox" id="officeCd"
							name="officeCd" style="width:180px" validType="needSelect['#officeCd']"
							data-options="url:CONTEXT_PATH+'/COMMON/getOfficeList.htm',
										  method:'post',
										  panelHeight:'auto',
										  required:true,
										  textField:'officeName',
										  valueField:'officeCd',
										  onLoadSuccess:function(data){
										  	if(data) {
										  		$(this).combobox('setValue',data[0].officeCd);
										  	}
										  },
										  formatter:function(row){
											var opts = $(this).combobox('options');
											// 役職値が空白（一般）の場合、特別処理する
											if(!row[opts.textField]) 
												row[opts.textField] = COMBOBOX_BLANK_OPTION_TEXT+COMBOBOX_BLANK_OPTION_TEXT;
											return row[opts.textField];
										  }" /></td>
					</tr>
					<tr>
						<td><div>
								<span style="text-align;">氏名</span><span
									style="float:right;width: 45px;">(姓)</span>
							</div></td>
						<td><input class="easyui-textbox" type="text" id="lastName"
							name="lastName" value="${form.lastName}"
							data-options="required:true,validType:'maxLength[50]'"
							style="width:180px" /></td>
						<td width="45px">(名)</td>
						<td><input class="easyui-textbox" type="text" id="firstName"
							name="firstName" value="${form.firstName}"
							data-options="required:true,validType:'maxLength[50]'"
							style="width:180px" /></td>
					</tr>
					<tr>
						<td><div>
								<span style="text-align;">氏名カナ</span><span
									style="float:right;width: 45px;">(セイ)</span>
							</div></td>
						<td><input class="easyui-textbox" type="text"
							id="lastNameKana" name="lastNameKana"
							value="${form.lastNameKana}"
							data-options="required:true,validType:[ 'isKatakana', 'maxLength[50]' ]"
							style="width:180px" /></td>
						<td width="45px">(メイ)</td>
						<td><input class="easyui-textbox" type="text"
							id="firstNameKana" name="firstNameKana"
							value="${form.firstNameKana}"
							data-options="required:true,validType:[ 'isKatakana', 'maxLength[50]' ]"
							style="width:180px" /></td>
					</tr>
					<tr>
						<td style="text-align: left;">契約形態</td>
						<td><input class="easyui-combobox" id="contractCd"
							name="contractCd" style="width:180px" validType="needSelect['#contractCd']"
							data-options="url:CONTEXT_PATH+'/COMMON/getContractList.htm?checkPrivilege=true&menuId=IDMS0311',
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
						<td style="text-align: left;">委託会社名</td>
						<td><input class="easyui-textbox" type="text"
							id="contractorCompanyName" name="contractorCompanyName"
							value="${form.contractorCompanyName}" style="width:180px" /></td>
					</tr>
					<tr>
						<td />
						<td><input type="checkbox" id="mailboxCreateFlag"
							name="mailboxCreateFlag" value="1" onchange="changeMailboxCreateFlag()"> <span>メールボックスの作成</span>
						</td>
					</tr>
					<tr>
						<td style="text-align: left;">メールボックスの作成先</td>
						<td><input class="easyui-combobox" id="mailboxCreateServer"
							name="mailboxCreateServer" style="width:270px"
							data-options="url:CONTEXT_PATH+'/COMMON/getMailboxCreateServerList.htm',
										  method:'post',
										  panelHeight:'auto',
										  editable:false,
										  textField:'codeValue',
										  valueField:'code',
										  loadFilter:function(data){
										  	var opts = $(this).combobox('options');
									      	var emptyRow = {};
									      	emptyRow[opts.valueField] = '';
									      	emptyRow[opts.textField] = '&nbsp;';
									      	data.unshift(emptyRow);
									      	$(this).combobox('setValue',data[0].code);
									      	return data;
										  }" /></td>
					</tr>
					<tr>
						<td style="text-align: left;">社員番号</td>
						<td><input class="easyui-textbox" type="text" id="employeeNo"
							name="employeeNo" value="${form.employeeNo}"
							data-options="validType:[ 'isAlphabetNum', 'maxLength[20]' ]" style="width:180px" /></td>
					</tr>
					<tr>
						<td style="text-align: left;">エイリアス</td>
						<td><input class="easyui-textbox" type="text" id="userAlias"
							name="userAlias" value="${form.userAlias}"
							data-options="validType:[ 'isAlphabetNum', 'maxLength[20]' ]" style="width:180px" /></td>
					</tr>
					<tr>
						<td />
						<td><input type="checkbox" id="adCreateFlag"
							name="adCreateFlag" value="1" onchange="changeAdCreateFlag()"> <span>ADユーザの作成</span>
						</td>
					</tr>
					<tr>
						<td style="text-align: left;">ADユーザの作成先</td>
						<td><input class="easyui-combobox" id="adCreateServer"
							name="adCreateServer" style="width:270px"
							data-options="url:CONTEXT_PATH+'/COMMON/getAdCreateServerList.htm',
										  method:'post',
										  panelHeight:'auto',
										  editable:false,
										  textField:'codeValue',
										  valueField:'code',
										  loadFilter:function(data){
										  	var opts = $(this).combobox('options');
									      	var emptyRow = {};
									      	emptyRow[opts.valueField] = '';
									      	emptyRow[opts.textField] = '&nbsp;';
									      	data.unshift(emptyRow);
									      	$(this).combobox('setValue',data[0].code);
									      	return data;
										  }" /></td>
					</tr>
					
				</table>
				<input type="hidden" id="userId" name="userId" />
			</div>
			<br />
			<div>
				<span style="text-align;"> <a href="javascript:void(0)"
					class="easyui-linkbutton" id="btnRegister" onclick="register()"
					style="width: 100px;">登録</a> <a href="javascript:void(0)"
					class="easyui-linkbutton" id="btnBack" onclick="back()" style="width: 100px;">戻る</a>
				</span> <span style="float:right"> <a href="javascript:void(0)"
					class="easyui-linkbutton" id="btnRemove" onclick="removeUser()"
					style="width: 100px;">削除</a>
				</span>
			</div>
		</div>
	</form>
</body>

</html>