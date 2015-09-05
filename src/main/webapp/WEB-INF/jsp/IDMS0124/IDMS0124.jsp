<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/sha1.js?${initParam.version}"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/IDMS/IDMS0124.js?${initParam.version}"></script>

<table cellpadding="2">
	<tr>
		<td style="width: 155px; text-align: left;">ログインID</td>
		<td><input class="easyui-textbox" type="text" style="width: 240px" id="itemText1" name="itemText1"></input></td>
		<td></td>
	</tr>

	<tr>
		<td style="text-align: left;">パスワード</td>
		<td><input class="easyui-textbox" type="text" style="width: 240px" id="itemText2" name="itemText2"></input></td>
		<td><a onclick="resetPW()" class="easyui-linkbutton" style="width: 80px;" id="resetBtn">再設定</a></td>
	</tr>
	<tr>
		<td style="text-align: left;">ユーザ氏名</td>
		<td><input class="easyui-textbox" type="text" style="width: 240px" id="itemText3" name="itemText3"></input></td>
		<td></td>
	</tr>
	<tr>
		<td style="text-align: left;">メールアドレス</td>
		<td><input class="easyui-combobox" type="text" style="width: 240px" id="itemText4" name="itemText4" data-options="panelHeight:'auto'"></input></td>
		<td></td>
	</tr>

	<tr>
		<td style="text-align: left;">所属権限</td>
		<td><input class="easyui-combobox" type="text" style="width: 240px" id="itemText5" name="itemText5" data-options="panelHeight:'auto'"></input></td>
		<td></td>
	</tr>

	<tr>
		<td style="text-align: left;">本店/支店名</td>
		<td><input class="easyui-combobox" type="text" style="width: 240px" id="itemText6" name="itemText6" data-options="panelHeight:'auto'"></input></td>
		<td></td>
	</tr>
	<tr id="trItemText7">
		<td style="text-align: left;">仲介業者名</td>
		<td><input class="easyui-combobox" type="text" style="width: 240px" id="itemText7" name="itemText7" data-options="panelHeight:'auto'"></input></td>
		<td></td>
	</tr>

	<tr id="trItemText8">
		<td style="text-align: left;">仲介業者支店名</td>
		<td><input class="easyui-combobox" type="text" style="width: 240px" id="itemText8" name="itemText8" data-options="panelHeight:'auto'"></input></td>
		<td></td>
	</tr>

	<tr id="trItemText9">
		<td style="text-align: left;">担当者名</td>
		<td><input class="easyui-combobox" type="text" style="width: 240px" id="itemText9" name="itemText9" data-options="panelHeight:'auto'"></input></td>
		<td style="display: none" ><input class="easyui-textbox" type="text" id="itemText10" name="itemText10"></input></td>
	</tr>
	<tr>
		<td style="text-align: left;">管理者権限</td>
		<td><input class="easyui-combobox" type="text" style="width: 240px" id="itemText11" name="itemText11"
			data-options="panelHeight:'auto'"></input></td>
		<td></td>
	</tr>
</table>
<table cellpadding="2">
	<tr>
		<td style="width: 155px; text-align: left;" valign="top">メニュー </td>
		<td>
			<table border="1px" bordercolor="#a0c6e5" rules=none cellpadding="3" id="tblAuthority">
				<tr>
					<td colspan="2"><input class="easyui-textbox" id="searchInfoIFA" name="searchInfoIFA" style="width: 235px;"> <a
						onclick="btnSearch_click()" class="easyui-linkbutton" style="width: 60px; height: 20px;" id="btnSearch">検索</a></td>
					<td></td>
				</tr>
				<tr>
					<td>一覧</td>
					<td></td>
					<td>選択</td>
				</tr>
				<tr>
					<td><select multiple name="authorityListIFA" id="authorityListIFA" style="width: 300px; height: 144px">
					</select></td>
					<td><a class="easyui-linkbutton" id="moveLeft"
						onclick="moveMenuList(1)" style="width: 60px; height: 24px;">&gt;</a> <br> <br> <a id="moveAllLeft" class="easyui-linkbutton"
						onclick="moveMenuList(2)" style="width: 60px; height: 24px;">&gt;&gt;</a><br> <br> <a id="moveRight" class="easyui-linkbutton"
						onclick="moveMenuList(3)" style="width: 60px; height: 24px;">&lt;</a> <br> <br> <a id="moveAllRight" class="easyui-linkbutton"
						onclick="moveMenuList(4)" style="width: 60px; height: 24px;">&lt;&lt;</a></td>
					<td><select multiple name="selectListIFA" id="selectListIFA" style="width: 300px; height: 144px"></select></td>
				</tr>

			</table>
		</td>
		<td></td>
	</tr>
</table>
