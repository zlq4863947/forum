<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>証跡ログ管理</title>
<%@include file="../common/head.jsp"%>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/resources/css/IDMS0520.css?${initParam.version}">
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/IDMS/IDMS0520.js?${initParam.version}"></script>
</head>
<body>
	<p id="p_errorMessage" style="color: red; padding-left: 10px">&nbsp;</p>

	<form id="prospectiveEmployeeSelect" method="post">
		<div id="p11" style="padding-left: 10px;">
			<div id="p" class="easyui-panel" title="検索条件"
				style="width: 1055px; height: auto; padding: 5px;">
				<div style="padding: 5px;" id="divType">
					<span style="width: 130px; display: inline-block;">証跡ログ区分</span>
					<div style="display: inline-block;">
					<label style="padding-right:15px;"><input type="checkbox" name="ckboxType" value="00" checked="checked">画面オペレーション</label>
					<label style="padding-right:15px;"><input type="checkbox" name="ckboxType" value="01" checked="checked">人事情報同期バッチ</label>
					<label style="padding-right:15px;"><input type="checkbox" name="ckboxType" value="02" checked="checked">フォルダ属性取得バッチ</label>
					<label style="padding-right:15px;"><input type="checkbox" name="ckboxType" value="03" checked="checked">IDMS特権反映バッチ</label>
					</div>
				</div>
				<div style="padding: 5px;">
					<span style="width: 130px; display: inline-block;">操作日</span> <input
						name="dateStart" id="dateStart" class="easyui-datebox" required
						data-options="formatter:dateboxFormatter,parser:dateboxParser"
							validType="minDate['dateEnd', '操作日']">
					<span style="width: 30px; display: inline-block; text-align:center;">〜</span> <input
						name="dateEnd" id="dateEnd" class="easyui-datebox" required
						data-options="formatter:dateboxFormatter,parser:dateboxParser"
							validType="maxDate['dateStart', '操作日']">
				</div>
				<div style="padding: 5px;">
					<a href="javascript:void(0)" class="easyui-linkbutton "
						onclick="btnShow_Click()" required style="width: 100px;">表示</a>
						<input type="hidden"  id="iptType"/>
						<input type="hidden"  id="iptStartDate"/>
						<input type="hidden"  id="iptEndDate"/>
				</div>
			</div>
			<div style="height: 5px;"></div>
			<div class="easyui-panel" title="証跡ログ一覧"
				style="width: 1055px; height: auto; padding: 5px;">
				<table style="width: 100%">
					<tr>
						<td style="width: 50% text-align: left;">
							<div>
								<a href="javascript:void(0)" class="easyui-linkbutton "
									data-options="iconCls:'icon-save'"
									onclick="btnCsv_Click('<%=request.getContextPath()%>/IDMS0520/download.htm')"
									required style="width: 100px;">CSV出力</a>
							</div>
						</td>
						<td style="width: 50% text-align: right;">
							<div style="text-align: right; display: none;"
								id="divPager">
								<span id="spanPagerCurrent">1</span>/<span id="spanPagerCount"></span>
								<a href="javascript:void(0)" class="easyui-linkbutton "
									onclick="btnShow_first()" required style="width: 40px;">先頭</a>
								<a href="javascript:void(0)" class="easyui-linkbutton "
									onclick="btnShow_prev()" required style="width: 40px;">前</a> <a
									href="javascript:void(0)" class="easyui-linkbutton "
									onclick="btnShow_next()" required style="width: 40px;">次</a> <a
									href="javascript:void(0)" class="easyui-linkbutton "
									onclick="btnShow_last()" required style="width: 40px;">最後</a>
							</div>
						</td>
					</tr>
				</table>
				<div style="" id="tblWarpper"></div>

			</div>
			<div id="divdownload"></div>
		</div>
	</form>
</body>
</html>