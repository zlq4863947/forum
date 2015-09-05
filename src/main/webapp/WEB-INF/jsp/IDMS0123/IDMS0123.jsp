<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/IDMS/IDMS0123.js?${initParam.version}"></script>

<table id="tableDetail3" cellpadding="2">
	<tr>
		<td style="width: 155px; text-align: left;">部店コード</td>
		<td style="width: 250px;"><input class="easyui-textbox" type="text" id="itemText1" name="itemText1" style="width: 240px" ></input></td>
	</tr>

	<tr id="tr_itemText2">
		<td style="text-align: left;">ユーザID</td>
		<td><input class="easyui-textbox" type="text" id="itemText2" name="itemText2" style="width: 240px" ></input></td>
	</tr>
	<tr>
		<td style="text-align: left;">取扱コード</td>
		<td><input class="easyui-textbox" type="text" id="itemText3" name="itemText3" style="width: 240px" ></input></td>
	</tr>
	

	<tr>
		<td style="text-align: left;">共有入力区分</td>
		<td><input class="easyui-combobox" type="text" id="itemText4" name="itemText4" style="width: 240px" data-options="panelHeight:'auto'"></input></td>
	</tr>
	
	<tr>
		<td style="text-align: left;">強制送信区分</td>
		<td><input class="easyui-combobox" type="text" id="itemText5" name="itemText5" style="width: 240px" data-options="panelHeight:'auto'"></input></td>
	</tr>
	<tr>
		<td style="text-align: left;">汎用検索サービス</td>
		<td><input class="easyui-combobox" type="text" id="itemText6" name="itemText6" style="width: 240px" data-options="panelHeight:'auto'"></input></td>
	</tr>
	
</table>
