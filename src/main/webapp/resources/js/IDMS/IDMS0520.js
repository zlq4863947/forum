var pageSize = 15;

$(function() {
	Form_DoInit();
});

function Form_DoInit() {
	// 画面表示の初期化
	// 画面表示一覧の初期化
	$("div.divdownload").html("");
	$('#dateStart').datebox('setValue', dateboxFormatter(new Date()));
	$('#dateEnd').datebox('setValue', dateboxFormatter(new Date()));
	top.window.onresize = onresize;
}
function btnShow_Click() {
	$("#p_errorMessage")[0].innerHTML = "&nbsp;";
	if($('#prospectiveEmployeeSelect').form('validate') ==false){
		$("#p_errorMessage")[0].innerHTML = "画面にエラーがありますので、修正してください。";
		return;
	}
	
	var dateStart = $('#dateStart').datebox('getValue');
	var dateEnd = $('#dateEnd').datebox('getValue');
	var type = [], typeStr = "";
	$('#divType>div>label>input[type=checkbox]:checked').each(function(i) {
		type[i] = $(this).val();
		typeStr += "," + $(this).val();
	});
	$("#iptType").val(typeStr);
	$("#iptStartDate").val(dateStart);
	$("#iptEndDate").val(dateEnd);
	if (type.length == 0) {
		$("#p_errorMessage")[0].innerHTML = getMessage("E1009", [ "証跡ログ区分" ]);
	} else {
		// ログデータを取得
		var setting = {
			url : "/IDMS0520/show.htm",
			data : {
				dateStart : dateStart,
				dateEnd : dateEnd,
				type : type,
				pageSize : pageSize,
				pageIndex : 0
			},
			hasLoading : false,
			hasContentType : false,
			success : function(res) {
				if (res) {
					if (res.status == true) {
						$("#tblWarpper").html("<table id='dg'></table>");
						var headers = [[ {
							field : "logType",
							title : "証跡ログ区分",
							width : 140,
							halign : 'center',
							formatter : typeFormatter
						}, {
							field : "logDate",
							title : "操作日時",
							width : 118,
							halign : 'center',
							formatter : function(value, row, index) {
								if (value == undefined || value == null || value == "") {
									return null;
								}
								return value.substring(0, 19);
							}
						}, {
							field : "userAlias",
							title : "エイリアス",
							width : 80,
							halign : 'center'
						}, {
							field : "employeeNo",
							title : "社員番号",
							width : 70,
							halign : 'center'
						}, {
							field : "userName",
							title : "氏名",
							width : 80,
							halign : 'center'
						}, {
							field : "menuId",
							title : "画面名称",
							width : 130,
							halign : 'center'
						}, {
							field : "content",
							title : "処理内容",
							width : 422,
							halign : 'center'
						} ]];

						if (res.data.length > 0){
							$("#divPager").css("display","");
							setPager(1,res.rowCount);
							onresize({
								rowCount : res.rowCount,
								data : res.data,
								columns : headers,
								onLoadSuccess : function(data) {

									var trs = $(this).parent('div.datagrid-view').find('div.datagrid-body>table tr');
									trs.find("td[field]").each(function(i,o){
										if($(this).attr("field")=="logType"
											|| $(this).attr("field")=="logDate" 
											|| $(this).attr("field")=="userAlias"
											|| $(this).attr("field")=="employeeNo"
											|| $(this).attr("field")=="userName"
											|| $(this).attr("field")=="menuId"
											|| $(this).attr("field")=="content")
											$(this).attr("title",$(this).text());
									});

								}
								
							});
						}else
							$("#p_errorMessage")[0].innerHTML = getMessage("I1010");
					} else {
						$("#p_errorMessage")[0].innerHTML = getMessage("I1010");
					}
				}
			}
		};
		postAjax(setting);
	}
}

function typeFormatter(type) {
	switch (type) {
	case "00":
		return "画面オペレーション";
		break;
	case "01":
		return "人事情報同期バッチ";
		break;
	case "02":
		return "フォルダ属性取得バッチ";
		break;
	case "03":
		return "IDMS特権反映バッチ";
		break;
	}
	return "";
}

function btnCsv_Click(u) {
	
	$("#p_errorMessage")[0].innerHTML = "&nbsp;";
	if($('#prospectiveEmployeeSelect').form('validate') ==false){
		$("#p_errorMessage")[0].innerHTML = "画面にエラーがありますので、修正してください。";
		return;
	}
	
	var dateStart = $('#dateStart').datebox('getValue');
	var dateEnd = $('#dateEnd').datebox('getValue');
	var type = [], typeStr = "";
	$('#divType>div>label>input[type=checkbox]:checked').each(function(i) {
		type[i] = $(this).val();
		typeStr += "," + $(this).val();
	});
	$("#iptType").val(typeStr);
	$("#iptStartDate").val(dateStart);
	$("#iptEndDate").val(dateEnd);
	if (type.length == 0) {
		$("#p_errorMessage")[0].innerHTML = getMessage("E1009", [ "証跡ログ区分" ]);
		return;
	}
	
	$("div.divdownload").html("");
	var dateStart = $("#iptStartDate").val();
	var dateEnd = $("#iptEndDate").val();
	var typeStr = $("#iptType").val();
	var types = typeStr.split(",");
	var type = [];
	for (var i = 1; i < types.length; i++)
		type[i - 1] = types[i];

	dodownload(u + "?dateStart=" + dateStart + "&dateEnd=" + dateEnd + "&type="
			+ escape(type) + "&");
}

function dodownload(u) {
	var url = u + new Date().getTime();
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';
	url += Math.random() + new Date().getTime();
	$("<iframe style='display:none;'>").appendTo($("div#divdownload")).attr(
			"src", url);
}

// サイズを取得する
function onresize(dgCfg) {

	if (window.innerWidth) {
		winWidth = window.innerWidth;
	} else if ((document.body) && (document.body.clientWidth)) {
		winWidth = document.body.clientWidth;
	}

	if (window.innerHeight) {
		winHeight = window.innerHeight;
	} else if ((document.body) && (document.body.clientHeight)) {
		winHeight = document.body.clientHeight;
	}

	if (document.documentElement && document.documentElement.clientHeight
			&& document.documentElement.clientWidth) {
		winHeight = document.documentElement.clientHeight;
		winWidth = document.documentElement.clientWidth;
	}
	if (dgCfg == null || dgCfg == undefined) {
		dgCfg = {};
	}
	dgCfg.height = winHeight - 295;
	dgCfg.width = '100%';
	dgCfg.singleSelect = true;
	//dgCfg.pagination = true;
	var parentId = $('#dg').parent().attr("id");
	$('#dg').datagrid(dgCfg);
	/*
	if (parentId != undefined) {
		var pager = $('#dg').datagrid('getPager');
		var pagination = {
			pageSize : 10,
			pageList : [ 5, 10, 15 ],
			onSelectPage : function(pn, ps) {
				var dateStart = $('#dateStart').datebox('getValue');
				var dateEnd = $('#dateEnd').datebox('getValue');
				var type = [];
				$('#divType>div>label>input[type=checkbox]:checked').each(
						function(i) {
							type[i] = $(this).val();
						});
				var setting = {
					url : "/IDMS0520/show.htm",
					data : {
						dateStart : dateStart,
						dateEnd : dateEnd,
						type : type,
						pageSize : ps,
						pageIndex : pn
					},
					hasLoading : false,
					hasContentType : false,
					success : function(res) {
						if (res) {
							$('#dg').datagrid('loadData', res.data);
							pagination.total = res.rowCount;
							pagination.pageNumber = pn;
							pager.pagination('refresh', pagination);
							$('#dg').parent().find(
									"div>table.datagrid-btable td").each(
									function(i) {
										$(this).attr("title", $(this).text());
									});
						}
					}
				};
				postAjax(setting);
			}
		};
		if (dgCfg.rowCount != undefined)
			pagination.total = dgCfg.rowCount;
		pager.pagination('refresh', pagination);
		$('#dg').parent().find("div>table.datagrid-btable td").each(
				function(i) {
					$(this).attr("title", $(this).text());
				});
	}*/
}
function btnShow_first(){
	var pageCurrentShow =1;
	 pageCurrent =0;
	 initPager(pageCurrentShow,pageCurrent);
}
function btnShow_prev(){
	var pageCurrentShow = $("#spanPagerCurrent").html();
	pageCurrentShow = parseInt(pageCurrentShow)-1;

	if(pageCurrentShow > 0){
		pageCurrent = pageCurrentShow-1;
		initPager(pageCurrentShow,pageCurrent);
	}
}
function btnShow_next(){
	var pageCurrent = $("#spanPagerCurrent").html();
	var totalPage = $("#spanPagerCount").html();

	if(parseInt(pageCurrent)+1 <= parseInt(totalPage)){
		pageCurrentShow = parseInt(pageCurrent)+1;
		initPager(pageCurrentShow,pageCurrent);
	}
}
function btnShow_last(){
	 initPager(-1,-1);
}
function initPager(pageCurrentShow,pageCurrent){
	$("#p_errorMessage")[0].innerHTML = "&nbsp;";
	var dateStart = $("#iptStartDate").val();
	var dateEnd = $("#iptEndDate").val();
	var typeStr = $("#iptType").val();
	var types = typeStr.split(",");
	var type = [];
	for (var i = 1; i < types.length; i++)
		type[i - 1] = types[i];
	var setting = {
			url : "/IDMS0520/show.htm",
			data : {
				dateStart : dateStart,
				dateEnd : dateEnd,
				type : type,
				pageSize : pageSize,
				pageIndex : pageCurrent
			},
			hasLoading : false,
			hasContentType : false,
			success : function(res) {
				if (res) {
					if (res.status == true) {
						if (res.data.length > 0){
							setPager(pageCurrentShow,res.rowCount);
							onresize({
								rowCount : res.rowCount,
								data : res.data,
							});
						}else
							$("#p_errorMessage")[0].innerHTML = getMessage("I1010");
					} else {
						$("#p_errorMessage")[0].innerHTML = getMessage("I1010");
					}
				}
			}
		};
		postAjax(setting);
}

function setPager(pageCurrent,rowCount){
	var pageCount = parseInt(rowCount / pageSize) + (rowCount % pageSize == 0 ?0:1)
	if(pageCurrent<0)
		pageCurrent=pageCount;
	$("#spanPagerCurrent").html(pageCurrent);
	$("#spanPagerCount").html(pageCount);
}