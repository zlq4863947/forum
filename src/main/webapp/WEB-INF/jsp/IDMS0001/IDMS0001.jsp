<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>SBI証券 ID管理システム</title>
<%@include file="../common/head.jsp"%>
<script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/IDMS/IDMS0001.js?${initParam.version}"></script>
</head>
<body class="easyui-layout">
	<div id="headLayout" region="north" split="false" border="true" style="height: 74px; overflow:hidden; display:block" class="headbg">
		<table id="headerTable" border=0 style="padding: 0px;">
			<tr style="height: 32px">
				<td style="width:50%" >
					<div class="clear"></div> <img class="logo" src="<%=request.getContextPath()%>/resources/images/SBI-LOGO.gif"
					alt="" title="" />
					<div class="clear"></div>
				</td>
				<td style="width:21%;" align="center">
					<label style="color:black;font-size:14px;">お問合せ:</label>
					<a id="mailTo" href="#" style="color:#4874ad; font-size:14px; font-weight: bold;"></a>
				</td>
				<td style="width:11%;" align="center">
					<div style="width:134px">
					<a class="easyui-linkbutton" data-options="plain:true,selected:true,iconCls:'icon-inbox'" style="width: 110px; font-weight: bold;"
						onclick="showInbox()">MyInbox <span id="taskNum" style="color: red;font-weight: bold;">0</span>
					</a><img onClick='refreshTask()' title="リフレッシュ" class="easyui-tooltip" data-options="position:'right'" style="margin-top: 0px;float: right;cursor:pointer;" src="<%=request.getContextPath()%>/resources/images/refreshTask.png"/>
					</div>
				</td>
				<td style="width:18%;" align="center" >
					<label id="userInfo" style="color:#4874ad;font-size:14px;"></label></td>
			</tr>
		</table>
		
		<table style="width:100%">
			<tr style="height: 30px">
				<td ><div style="overflow-y:auto; overflow-x:auto; width:100%; height:30px;" id = "menuTab" ></div></td>
			</tr>
		</table>
	</div>

	<div region="west" title="&lt;a id='headDisplayBtn' href='javascript:void(0)' class='layout-button-up' onClick='displayHead()'/&gt;" icon="icon-forward" style="width: 180px; overflow: auto;" split="true" border="false">
		<div id="app-navigation">
			<ul id="menuList" style="padding-left: 0px;">
			</ul>
		</div>
	</div>

	<div region="center" border="false" >
		
    	<div id="mainTabs" class="easyui-tabs" border="false" fit="true" >
		</div>
    </div>
    
    <div id="mainDialog1"></div>
    <div id="mainDialog2"></div>
    <div id="mainDialog3"></div>
    <div id="mainDialog4"></div>
    <div id="mainDialog5"></div>
     
	<%@include file="../common/loading.jsp"%>
	<div id="rcmenu" class="easyui-menu" style="">
	    <div data-options="iconCls:'icon-cancel'" id="closecur" name="1">
			タブを閉じる
	    </div>
	    <div id="closeall" name="2">
			すべてのタブを閉じる
	    </div>
	    <div id="closeother" name="3">
			他のタブを閉じる
	    </div>
	    <div class="menu-sep"></div>
	    <div id="closeright" name="4">
			右側のタブを閉じる
	    </div>
	    <div id="closeleft" name="5">
			左側のタブを閉じる
	    </div>
	</div>
</body>

</html>