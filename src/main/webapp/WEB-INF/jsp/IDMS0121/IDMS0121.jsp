<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/IDMS/IDMS0121.js?${initParam.version}"></script>

<table cellpadding="2">
	<tr id="trPcName">
		<td style="width: 155px; text-align: left;">PC名</td>
		<td><input class="easyui-textbox" type="text" id="itemText1" name="itemText1" style="width: 240px"></input></td>
	</tr>
	<tr id="trIpAddress">
		<td style="text-align: left;">IPアドレス</td>
		<td><input class="easyui-textbox" type="text" id="itemText2" name="itemText2" style="width: 240px"></input></td>
	</tr>
	<tr id="trBranchCd">
		<td style="width: 155px; text-align: left;">部店</td>
		<td><input class="easyui-textbox" type="text" id="itemText3" name="itemText3" style="width: 240px"></input></td>
	</tr>
	<tr id="trBranchAccountNo">
		<td style="text-align: left;">口座番号</td>
		<td><input class="easyui-textbox" type="text" id="itemText4" name="itemText4" style="width: 240px"></input></td>
	</tr>
</table>
