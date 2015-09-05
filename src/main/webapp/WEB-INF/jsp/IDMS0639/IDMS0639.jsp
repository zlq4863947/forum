<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>システムメンテナンス画面</title>
<%@include file="../common/head.jsp"%>
<script type="text/javascript">
function getCallInfo(){
	var id = "<%=request.getParameter("systemCd")%>";
	return id;
}
</script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/IDMS/IDMS0639.js?${initParam.version}"></script>
</head>
<body>
	<p id="p_errorMessage" style="color: red; padding-left: 10px">&nbsp;</p>
	<form id="IDMS0639Form" method="post">
		<div id="p11" style="padding-left: 10px;width: 700px;">
			<div id="p" class="easyui-panel" title="システム情報"
				style="width: 700px; height: auto; padding: 10px;">
				<table cellpadding="2">
					<tr>
						<td style="text-align: left;width:180px">システムコード</td>
						<td>
							<input class="easyui-textbox" type="text"
							id="systemCd" name="systemCd"
							data-options="required:true,validType:[ 'isAlphabetNum', 'maxLength[3]' ]" style="width:180px" />
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
						<td style="text-align: left;">システム名称</td>
						<td>
							<input class="easyui-textbox" type="text"
							id="systemName" name="systemName"
							data-options="required:true,validType:[ 'maxLength[200]' ]" style="width:180px" />
						</td>
					</tr>
					<tr>
						<td style="text-align: left;">システム分類</td>
						<td><input class="easyui-combobox" id="systemGroup"
							name="systemGroup" style="width:180px" validType="needSelect['#systemGroup']"
							data-options="url:CONTEXT_PATH+'/COMMON/getGroupSystemList.htm',
										  method:'post',
										  panelHeight:'auto',
										  editable:false,
										  textField:'codeValue',
										  valueField:'code',
										  onLoadSuccess:function(data){
										  	if(data) $(this).combobox('setValue',data[0].code);
										  }" /></td>
					</tr>
					<tr>
						<td>注釈</td>
						<td>
							<input class="easyui-textbox" type="text"
							id="note" name="note"
							data-options="validType:[ 'maxLength[200]' ]" style="width:360px" />
						</td>
					</tr>
					<tr>
						<td style="text-align: left;">フローパターン</td>
						<td><input class="easyui-combobox" id="flowPatternCd"
							name="flowPatternCd" style="width:180px" validType="needSelect['#flowPatternCd']"
							data-options="url:CONTEXT_PATH+'/COMMON/getFlowPatternCdList.htm',
										  method:'post',
										  editable:false,
										  textField:'text',
										  valueField:'value',
										  onLoadSuccess:function(data){
										  	if(data) $(this).combobox('setValue',data[0].value);
										  }" />
								<a id="dad" href="javascript:void(0)" class="easyui-tooltip" 
									data-options="hideEvent: 'none',
										position: 'bottom',
										trackMouse: true,
										content: function(){
											return $('#description');
										},
										onShow: function(){
											var t = $(this);
											t.tooltip('tip').focus().unbind().bind('blur',function(){
												t.tooltip('hide');
											});
										}">
									 <img src="<%=request.getContextPath()%>/resources/images/question.gif" 
										style="border: 0px; width: 20px; height: 20px; position: absolute;"/>&nbsp;
								</a>	
								<div style="display:none">
									<div id="description">
										<img src="<%=request.getContextPath()%>/resources/images/FlowPatternDescription.png" 
											style="border: 0px;"/>
									</div>
								</div>
						</td>
					</tr>
					<tr>
						<td>表示順</td>
						<td><input class="easyui-textbox" type="text" id="displayOrder" name="displayOrder"
							data-options="validType:[ 'isNumber' ]" style="width:180px" /></td>
					</tr>
					<tr>
						<td>登録時詳細入力フラグ</td>
						<td><input type="checkbox" id="registerDetailInputFlag"
							name="registerDetailInputFlag" value="1"/><span>支店</span>
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