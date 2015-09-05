var operationContent = {
	'01' : '申請',
	'02' : '削除',
	'03' : '承認',
	'04' : '却下',
	'05' : '登録',
	'06' : '差戻',
	'07' : '取消',
	'08' : '中止',
};

$(function() {
	dataLoad();
});

function closeWindow() {

	parent.closeMainDialog(null);
}

function dataLoad() {

	var routeInfo = {};
	routeInfo.systemCd = $("#systemCd")[0].value;
	routeInfo.categoryCd = $("#categoryCd")[0].value;
	routeInfo.endUserId = $("#endUserId")[0].value;

	var organizationOfficeCd = $("#organizationOfficeCd")[0].value;

	// 組織コード
	routeInfo.endUserOrganizationCd = organizationOfficeCd.substring(0, organizationOfficeCd.length - 2);
	// 役職コード
	routeInfo.officeCd = organizationOfficeCd.substring(organizationOfficeCd.length - 2);
	// 申請契約形態
	routeInfo.applyContractCode = $("#applyContractCode")[0].value;
	routeInfo.applicationId = $("#applicationId")[0].value;
	routeInfo.screenId = $("#screenId")[0].value;

	$('#routeTable').datagrid({

		method : 'post',
		iconCls : 'icon-edit',
		singleSelect : true,

		fitColumns : true,
		striped : false,

		url : null,
		nowrap : false,

		columns : [ [ {
			title : '承認フロー',
			colspan : 2
		}, {
			field : 'proxyFlag',
			title : '代理',
			rowspan : 2,
			width : 40,
			align : 'center',
			halign : 'center',
			formatter : function(value, row, index) {
				if (value == '1') {
					return '○'
				} else {
					return '';
				}
			}
		}, {
			field : 'mainOrganizationName',
			title : '組織',
			rowspan : 2,
			width : 160,
			align : 'left',
			halign : 'center'
		}, {
			field : 'officeName',
			title : '役職',
			rowspan : 2,
			width : 50,
			align : 'left',
			halign : 'center',
			formatter : function(value, row, index) {
				if (value == undefined || value == null || value == "一般") {
					return null;
				}
				return value;
			}
		}, {
			field : 'operaterName',
			title : '氏名',
			rowspan : 2,
			width : 100,
			align : 'left',
			halign : 'center'
		}, {
			field : 'operateTime',
			title : '処理日',
			rowspan : 2,
			width : 115,
			align : 'left',
			halign : 'center',
			formatter : function(value, row, index) {
				if (value == undefined || value == null || value == "") {
					return null;
				}
				var unixTimestamp = new Date(value);
				return unixTimestamp.format('yyyy/MM/dd hh:mm');
			}
		}, {
			field : 'operationContent',
			title : '内容',
			rowspan : 2,
			width : 80,
			align : 'center',
			halign : 'center',
			formatter : function(value, row, index) {
				if (value == undefined || value == null || value == "") {
					return null;
				}
				return operationContent[value];
			}
		}, {
			field : 'reasonMemo',
			title : '備考',
			rowspan : 2,
			width : 195,
			align : 'left',
			halign : 'center'
		}

		], [ {
			field : 'stratum',
			title : '順番',
			width : 80,
			align : 'left',
			halign : 'center'
		}, {
			field : 'classification',
			title : '担当',
			width : 90,
			align : 'left',
			halign : 'center'
		},

		] ],

		onLoadSuccess : function(data) {

			var trs = $(this).parent('div.datagrid-view').find('div.datagrid-body>table tr');
			trs.find("td[field]").each(function(i,o){
				if($(this).attr("field")=="proxyFlag"
					|| $(this).attr("field")=="mainOrganizationName" 
					|| $(this).attr("field")=="officeName"
					|| $(this).attr("field")=="operaterName"
					|| $(this).attr("field")=="operateTime"
					|| $(this).attr("field")=="operationContent"
					|| $(this).attr("field")=="reasonMemo"
					|| $(this).attr("field")=="stratum"
					|| $(this).attr("field")=="classification")
					$(this).attr("title",$(this).text());
			});

			$(this).datagrid("autoMergeCells", [ 'stratum', 'classification' ]);

			if ($('#divRouteTable').height() > 300) {
				$("#routeTable").datagrid({
					height : 300
				});
			}

		}
	});

	var setting = {
		data : routeInfo,
		url : "/IDMS0013/dataLoad.htm",
		hasLoading : true,
		hasContentType : false,
		success : function(res) {
			if (res.errorResultDto) {
				errors = res.errorResultDto.errorList;
				var messages = "";
				$.each(errors, function(i, err) {
					messages += err.errorMessage + "<br>";

				});
				jQuery.messager.alert('エラーメッセージ', messages,'error');

			} else {

				$("#routeTable").datagrid('loadData', pageData(res.total, res.rows));

			}

		}
	};
	postAjax(setting);

}

function pageData(total, list) {
	var obj = new Object();
	obj.total = total;
	obj.rows = list;
	return obj;
}