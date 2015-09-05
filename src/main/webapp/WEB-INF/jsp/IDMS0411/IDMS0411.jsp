<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>メニュー設定画面</title>
<%@include file="../common/head.jsp"%>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resources/css/IDMS0411.css?${initParam.version}">
<script type="text/javascript"	src="<%=request.getContextPath()%>/resources/js/IDMS/IDMS0411.js?${initParam.version}"></script>
</head>
<body>
	<p id="p_errorMessage" style="color: red; padding-left: 10px">&nbsp;</p>

		<div id="p11" style="padding-left: 10px; ">
			<div id="p1" class="easyui-panel" title="対象者情報" style="width:1000px; height: auto; padding: 10px;">
				<div class="userDetail">
					<input type="hidden"  name="iptUserId" id="iptUserId"><input type="hidden"  name="iptOrganizationCd" id="iptOrganizationCd">
					<a href="javascript:void(0)" class="easyui-linkbutton" onclick="btnSelectUser_Click()" style="width: 100px; "
							data-options="iconCls:'icon-search'">対象者選択</a><br />
					<table>
						<tr>
							<td style="width:95px">エイリアス</td><td style="width:200px"><input name="iptUserAlias" id="iptUserAlias" disabled="disabled" class="easyui-textbox"  style="width:180px" ></td>
							<td style="width:95px">社員番号</td><td style="width:200px"><input name="iptEmployeeNo" id="iptEmployeeNo" disabled="disabled" class="easyui-textbox"  style="width:180px" ></td>
							<td style="width:95px">氏名</td><td style="width:200px"><input name="iptUserName" id="iptUserName" disabled="disabled" class="easyui-textbox"  style="width:180px" ></td>
						</tr>
						<tr>
							<td style="width:95px">組織</td><td style="width:200px"><input name="iptOrganicationName" id="iptOrganicationName" disabled="disabled" class="easyui-textbox"  style="width:180px" ></td>
							<td style="width:95px">役職</td><td style="width:200px"><input name="iptOfficeName" id="iptOfficeName" disabled="disabled" class="easyui-textbox"  style="width:180px" ></td>
							<td style="width:95px">契約形態</td><td style="width:200px"><input name="iptContractName" id="iptContractName" disabled="disabled" class="easyui-textbox"  style="width:180px" ></td>
						</tr>
					</table>
				</div>
			</div>
			<br />
			<div id="p2" class="easyui-panel" title="タブ設定"
				style="width:1000px; height: auto; padding: 10px;">
				<table border=0 class='menutable'>
					<tr><td>適用日</td><td><input id='privilegeDate' name='privilegeDate' onblure="txtApplyDay_blur()" required data-options="validType:'dateVildate',formatter:dateboxFormatter,parser:dateboxParser"  class="easyui-datebox" ></td><td>&nbsp;</td><td>&nbsp;</td></tr>
					<tr><td width=90>タブ設定</td><td  width=350>利用できないタブ</td><td  width=60>&nbsp;</td><td  width=350>利用できるタブ</td></tr>
					<tr><td>&nbsp;</td><td>
					<select class=" combobox-f combo-f textbox-f stab"  multiple="multiple" name="selSelectedTab"  id="selSelectedTab">
					</select>
					</td>
					<td valign="top" align="center">
						<input class="easyui-linkbutton"  value="&gt;" type="button" onclick="btnTabRelease_Click()" />
						<input class="easyui-linkbutton"  value="&gt;&gt;" type="button"  onclick="btnTabReleaseAll_Click()" />
						<input class="easyui-linkbutton"  value="&lt;" type="button"  onclick="btnTabSelect_Click()" />
						<input class="easyui-linkbutton"  value="&lt;&lt;" type="button"  onclick="btnTabSelectAll_Click()" />
					</td>
					<td>
					<select class=" combobox-f combo-f textbox-f stab"  multiple="multiple" name="selTab"   id="selTab">
					</select>
					</td></tr>
					<tr><td>メニュー設定</td><td>利用できないメニュー</td><td>&nbsp;</td><td>利用できるメニュー</td></tr>
					<tr><td>&nbsp;</td><td>
					<select class=" combobox-f combo-f textbox-f smenu"  multiple="multiple" name="selSelectedMenu"  id="selSelectedMenu">
						</select>
					</td>
					<td valign="top" align="center">
					<input class="easyui-linkbutton"  value="&gt;" type="button"  onclick="btnMenuRelease_Click()"/>
					<input class="easyui-linkbutton"  value="&lt;" type="button"  onclick="btnMenuSelect_Click()"/>
					</td>
					<td>
						<select class=" combobox-f combo-f textbox-f smenu"  multiple="multiple"  name="selMenu"   id="selMenu">
					</select>
					</td></tr>
				</table>
			</div>
			<br />
			<div>
				<span>
					<a href="javascript:void(0)" class="easyui-linkbutton" onclick="btnRegister_Click()" style="width: 100px; ">登録</a>
				</span>
			</div>
		</div>

</body>
</html>