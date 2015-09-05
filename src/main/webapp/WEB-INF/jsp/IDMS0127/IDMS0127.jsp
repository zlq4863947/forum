<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/IDMS/IDMS0127.js?${initParam.version}"></script>

<table id="tableDetail7" cellpadding="2">
	<tr id="trItemText5">
		<td style="width: 155px; text-align: left;">ドライブ</td>
		<td><input class="easyui-combobox" id="itemText5" name="itemText5" style="width: 240px" data-options="panelHeight:'auto'"></input></td>
	</tr>
	<tr id="trItemText1">
		<td style="width: 155px; text-align: left;">フォルダ名</td>
		<td><input class="easyui-combobox" id="itemText1" name="itemText1" style="width: 240px" data-options="panelHeight:'auto'"></input></td>
	</tr>
	<tr id="trItemText2">
		<td id="tdItemText2" style="width: 155px; text-align: left;">フォルダ名</td>
		<td><input class="easyui-textbox" type="text" id="itemText2" name="itemText2" style="width: 240px" ></input></td>
	</tr>
	<tr id="trItemText3">
		<td style="width: 155px; text-align: left;">希望容量(MB)</td>
		<td><input class="easyui-textbox" type="text" id="itemText3" name="itemText3" style="width: 240px" ></input></td>
	</tr>
	<tr>
		<td valign="top" style="width: 155px; text-align: left;">説明</td>
		<td colspan="2"><input class="easyui-textbox" data-options="multiline:true" style="width:240px;height:60px" name="itemText4" id="itemText4"></td>
	</tr>
	
</table>
