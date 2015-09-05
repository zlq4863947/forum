$.extend(
	$.fn.datebox.defaults.rules,
	{
		dateVildate : {
			validator : function(value) {
				var r = value.match(/^(\d{4})(\/)(\d{2})$/);
				if (r == null) {
					$.fn.validatebox.defaults.rules.dateVildate.message = '日付の書式はYYYY/MMで入力してください。（例）2015/04';
					return false;
				}
				var d = new Date(r[1], r[3] - 1, 1);
				if (d.getFullYear() == r[1]
						&& (d.getMonth() + 1) == r[3]) {
					return true;
				} else {
					$.fn.validatebox.defaults.rules.dateVildate.message = '日付の書式はYYYY/MMで入力してください。（例）2015/04';
					return false;
				}
			},
			message : ''
		}
	});

$(function() {
	Form_DoInit();
});

function Form_DoInit() {
	// 画面表示の初期化
	// initUserInfo();
	// 画面表示一覧の初期化
	$("div.divdownload").html("");
}
// 新規で内定者入力画面を呼び出し
function dateFormatter(date) {
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	var d = date.getDate();
	return y + "/" + (m < 10 ? ("0" + m) : m);
}
function dateboxParser(s) {
	if (!s)
		return new Date();

	if (typeof (s) == 'number') {
		return new Date(s);
	}

	var ss = (s.split('/'));
	var y = parseInt(ss[0], 10);
	var m = parseInt(ss[1], 10);
	if (!isNaN(y) && !isNaN(m)) {
		return new Date(y, m - 1, 1);
	} else {
		return new Date();
	}
}

function btnCsv_Click(u) {
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';

	if($('#IDMS0510Form').form('validate') ==false){
		$("#p_errorMessage")[0].innerHTML = "画面にエラーがありますので、修正してください。";
		return;
	}
	
	$("div.divdownload").html("");

	var yearMonth = $('#yearMonth').datebox('getValue');
	
	var u = CONTEXT_PATH + '/IDMS0510/download.htm';
	
	doDownload(u + "?yearMonth=" + yearMonth+ "&");

}

function doDownload(u) {

	var url = u + new Date().getTime();
	$("#p_errorMessage")[0].innerHTML = '&nbsp;';

	url += Math.random() + new Date().getTime();
	$("<iframe style='display:none;'>").appendTo($("div#divdownload")).attr(
			"src", url); 

}