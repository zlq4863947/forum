$.extend($.fn.datagrid.methods, {
    autoMergeCells : function (jq, fields) {
        return jq.each(function () {
            var target = $(this);
            if (!fields) {
                fields = target.datagrid("getColumnFields");
            }
            var rows = target.datagrid("getRows");
            var i = 0,
            j = 0,
            temp = {};
            for (i; i < rows.length; i++) {
                var row = rows[i];
                j = 0;
                for (j; j < fields.length; j++) {
                    var field = fields[j];
                    var tf = temp[field];
                    if (!tf) {
                        tf = temp[field] = {};
                        tf[row[field]] = [i];
                    } else {
                        var tfv = tf[row[field]];
                        if (tfv) {
                            tfv.push(i);
                        } else {
                            tfv = tf[row[field]] = [i];
                        }
                    }
                }
            }
            $.each(temp, function (field, colunm) {
                $.each(colunm, function () {
                    var group = this;

                    if (group.length > 1) {
                        var before,
                        after,
                        megerIndex = group[0];
                        for (var i = 0; i < group.length; i++) {
                            before = group[i];
                            after = group[i + 1];
                            if (after && (after - before) == 1) {
                                continue;
                            }
                            var rowspan = before - megerIndex + 1;
                            if (rowspan > 1) {
                                target.datagrid('mergeCells', {
                                    index : megerIndex,
                                    field : field,
                                    rowspan : rowspan
                                });
                            }
                            if (after && (after - before) != 1) {
                                megerIndex = after;
                            }
                        }
                    }
                });
            });
        });
    }
});

$.extend($.fn.datagrid.methods, {
	editCell : function(jq, param) {
		return jq.each(function() {
			var opts = $(this).datagrid('options');
			var fields = $(this).datagrid('getColumnFields', true).concat(
					$(this).datagrid('getColumnFields'));
			for (var i = 0; i < fields.length; i++) {
				var col = $(this).datagrid('getColumnOption', fields[i]);
				col.editor1 = col.editor;
				if (fields[i] != param.field) {
					col.editor = null;
				}
			}
			$(this).datagrid('beginEdit', param.index);
			for (var i = 0; i < fields.length; i++) {
				var col = $(this).datagrid('getColumnOption', fields[i]);
				col.editor = col.editor1;
			}
		});
	}
});

$.extend($.fn.datagrid.methods, {
    addEditor : function(jq, param) {
        if (param instanceof Array) {
            $.each(param, function(index, item) {
                var e = $(jq).datagrid('getColumnOption', item.field);
                e.editor = item.editor;
                e.styler = item.styler;
                e.formatter = item.formatter;
            });
        } else {
            var e = $(jq).datagrid('getColumnOption', param.field);
            e.editor = param.editor;
            e.styler = param.styler;
            e.formatter = param.formatter;
        }
    },
    removeEditor : function(jq, param) {
        if (param instanceof Array) {
            $.each(param, function(index, item) {
                var e = $(jq).datagrid('getColumnOption', item);
                e.editor = {};
                e.styler = {};
                e.formatter = {};
            });
        } else {
            var e = $(jq).datagrid('getColumnOption', param);
            e.editor = {};
            e.styler = {};
            e.formatter = {};
        }
    }
});

function postAjax(setting) {
	hasLoading = setting.hasLoading == false ? false : true;

	var aJax = {
			data : setting.data,
			cache : true,
			type : "POST",
			async : true,
			dataType : "json",

			url : CONTEXT_PATH + setting.url,
			success : setting.success,
			beforeSend : function(XMLHttpRequest) {
				if (hasLoading) {
					showLoading();
				}
			},
			complete : function(XMLHttpRequest, textStatus) {
				if (hasLoading) {
					hiddenLoading();
				}
			},
			error : function(XMLHttpRequest, textStatus, err) {
				var sessionstatus = XMLHttpRequest
						.getResponseHeader("sessionstatus");
				if (sessionstatus == "timeout") {
					$.messager.alert('セッションタイムアウト',
							'セッションタイムアウトしました。もう一度ログインして下さい。', '', function() {
								window.close();
							});
				} else if(sessionstatus == "accessdeny"){
					$.messager.alert('アクセスが拒否', '権限がないため、アクセスが拒否されました。', '',
							function() {
								window.close();
							});
				} else {
					$.messager.alert('システムエラー', 'システムエラーが発生しました。管理者に連絡して下さい。', '',
							function() {
								window.close();
							});
				}
			}
		};

	if(setting.hasContentType){
		aJax.contentType = "text/html";
	}


	$.ajax(aJax);
}

function ajaxUpload(setting) {
	hasLoading = setting.hasLoading == false ? false : true;
	if (hasLoading) {
		showLoading();
	}
	$.ajaxFileUpload({
		url : CONTEXT_PATH + setting.url,
		secureuri : false,
		fileElementId : setting.fileElementId,
		dataType : "json",
		success : setting.success,
		error : function(data, status, e) {
			if (hasLoading) {
				hiddenLoading();
			}
			if(data.responseText == ""){
				$.messager.alert('セッションタイムアウト',
						'セッションタイムアウトしました。もう一度ログインして下さい。', '', function() {
							window.close();
						});
			}else{
				$.messager.alert(' ','ファイルアップロードできません。');
			}
		}
	});
}

function empty(v) {
	switch (typeof v) {
	case 'undefinded':
		return true;
		break;
	case 'object':
		if (null === v)
			return true;
		break;
	return false;
}
}

var loadingIndex = 0;

/**
 * loading画面を表示
 */
function showLoading() {

// document.getElementById("over").style.width = Math.max($(document.body)
// .innerWidth(), $(window).width(), document.body.scrollWidth + 22);
// document.getElementById("over").style.height = Math.max($(document.body)
// .innerHeight(), $(window).height(), document.body.scrollHeight);
// document.getElementById("over").style.display = "block";

	if(loadingIndex == 0){
		parent.document.getElementById("over").style.width = Math.max($(parent.document.body).innerWidth(), $(window).width(), document.body.scrollWidth + 22);
		parent.document.getElementById("over").style.height = Math.max($(parent.document.body).innerHeight(), $(window).height(), document.body.scrollHeight);
		parent.document.getElementById("over").style.display = "block";
	
		parent.document.getElementById("layout").style.display = "block";
	}
	
	loadingIndex = loadingIndex + 1;
}
/**
 * loading画面を非表示
 */
function hiddenLoading() {
	
	if(loadingIndex == 1){
		parent.document.getElementById("over").style.display = "none";
		parent.document.getElementById("layout").style.display = "none";
	}
	loadingIndex = loadingIndex - 1;
}

function compact(v1,v2){
	if(parseInt(v1) < parseInt(v2)){
		return -1;
	}else if(parseInt(v1) > parseInt(v2)){
		return 1;
	}else{
		return 0;
	}
}

//EasyUIのdateboxのformatter(yyyy/mm/dd)
function dateboxFormatter(date){
	var y = date.getFullYear();
	var m = date.getMonth()+1;
	var d = date.getDate();
	return y+'/'+(m<10?('0'+m):m)+'/'+(d<10?('0'+d):d);
}

//EasyUIのdateboxのparser
//dateまたはstring(yyyy/mm/dd)
function dateboxParser(s){
	if (!s) return new Date();

	if(typeof(s) == 'number'){
		return new Date(s);
	}

	var ss = (s.split('/'));
	var y = parseInt(ss[0],10);
	var m = parseInt(ss[1],10);
	var d = parseInt(ss[2],10);
	if (!isNaN(y) && !isNaN(m) && !isNaN(d)){
		return new Date(y,m-1,d);
	} else {
		return new Date();
	}
}

$.extend($.fn.datebox.defaults.rules, {
    dateVildate: {
        validator: function (value) {

        	var r = value.match(/^(\d{4})(\/)(\d{2})\2(\d{2})$/);

        	if(r==null){
                $.fn.validatebox.defaults.rules.dateVildate.message = '日付の書式はYYYY/MM/DDで入力してください。（例）2015/04/10';
        		return false;
        	}

        	var d = new Date(r[1], r[3]-1, r[4]);

        	if(d.getFullYear()==r[1]&& (d.getMonth()+1)==r[3]&&d.getDate()==r[4]) {
                return true;
        	} else{
                $.fn.validatebox.defaults.rules.dateVildate.message = '日付の書式はYYYY/MM/DDで入力してください。（例）2015/04/10';
                return false;
        	}

        }, message: ''
    },

    minDate:{
	    validator:function(value,param){

        	var r = value.match(/^(\d{4})(\/)(\d{2})\2(\d{2})$/);

        	if(r==null){
                $.fn.validatebox.defaults.rules.minDate.message = '日付の書式はYYYY/MM/DDで入力してください。（例）2015/04/10';
        		return false;
        	}

        	var d = new Date(r[1], r[3]-1, r[4]);

        	if(d.getFullYear()==r[1]&& (d.getMonth()+1)==r[3]&&d.getDate()==r[4]) {

        	} else{
                $.fn.validatebox.defaults.rules.minDate.message = '日付の書式はYYYY/MM/DDで入力してください。（例）2015/04/10';
                return false;
        	}


		    var s = $("input[name="+param[0]+"]").val();

		    if(s == undefined || s == null || s == ""){
		    	return true;
		    }


		    if(value>s){

		    	$.fn.validatebox.defaults.rules.minDate.message = param[1]+ 'の開始と終了の関係が正しく入力されていません。';
		    	return false;
		    } else {
		    	//$("input[name="+param[0]+"]").blur();
		    	$("input[name="+param[0]+"]").prev().removeClass("validatebox-invalid");
		    	$("input[name="+param[0]+"]").prev().prev().parent().removeClass("textbox-invalid");
		    	return true;
		    }

		},
		message:''
	},

	maxDate:{
	    validator:function(value,param){

        	var r = value.match(/^(\d{4})(\/)(\d{2})\2(\d{2})$/);

        	if(r==null){
                $.fn.validatebox.defaults.rules.maxDate.message = '日付の書式はYYYY/MM/DDで入力してください。（例）2015/04/10';
        		return false;
        	}

        	var d = new Date(r[1], r[3]-1, r[4]);

        	if(d.getFullYear()==r[1]&& (d.getMonth()+1)==r[3]&&d.getDate()==r[4]) {

        	} else{
                $.fn.validatebox.defaults.rules.maxDate.message = '日付の書式はYYYY/MM/DDで入力してください。（例）2015/04/10';
                return false;
        	}


		    var s = $("input[name="+param[0]+"]").val();

		    if(s == undefined || s == null || s == ""){
		    	return true;
		    }

		    if(value<s){

		    	$.fn.validatebox.defaults.rules.maxDate.message = param[1]+ 'の開始と終了の関係が正しく入力されていません。';
		    	return false;
		    } else {
		    	//$('#' + formId + ' *[name="' + nodeName + '"]:first').prev().addClass('hasErrorForEasyUI');

		    	$("input[name="+param[0]+"]").prev().removeClass("validatebox-invalid");
		    	$("input[name="+param[0]+"]").prev().prev().parent().removeClass("textbox-invalid");
		    	return true;
		    }

		},
		message:''
	}




});


$.extend($.fn.validatebox.defaults.rules, {
    needSelect: {
        validator: function (value,param) {

        	if(value == undefined || value == null || value == "" || value == " " || value == "　" || value == COMBOBOX_BLANK_OPTION_TEXT) {
                //$.fn.validatebox.defaults.rules.needSelect.message = '';
                return false;
        	} else{
        		var select = $(param[0]).combobox('getValue');
        		if(select == undefined || select == null || select == ""){
        			return false;
        		} else{

        			return true;
        		}
        	}

        }, message: '選択肢から選択してください。'
    }

});

$.extend($.fn.validatebox.defaults.rules, {
    maxLength: {
        validator: function (value, param) {
            if (value.length > param[0]) {
                $.fn.validatebox.defaults.rules.maxLength.message = param[0] + '桁以内で入力してください。';
                return false;
            } else {
                return true;
            }
        }, message: ''
    },
    ipCheck : {// 验证IP地址
        validator : function(value) {

        	if (value == undefined || value == null || value == "") return true;
        	var re=/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g //匹配IP地址的正则表达式
        	if(re.test(value))
        	{
	        	if( RegExp.$1 <256 && RegExp.$2<256 && RegExp.$3<256 && RegExp.$4<256){

	        		return true;
	        	}
        	}
        	return false;

        },
        message : 'IPアドレスは間違い'
    },

    isAlphabetNum: {
        validator: function (value) {

        	if (value == undefined || value == null || value == "") return true;

        	// /^[\w\-\u0100-\u2fff\u3001-\uffff\r\n]+$/.test(str)
        	//return /[a-zA-Z0-9]/.test(value);

        	return /^[a-zA-Z0-9]+$/.test(value);


        }, message: '半角英字または半角数値を入力して下さい。'
    },
    isNumber: {
        validator: function (value) {

        	if (value == undefined || value == null || value == "") return true;

        	return /^[0-9]+$/.test(value);


        }, message: '半角数字を入力して下さい。'
    },
    isInteger: {
        validator: function (value) {

        	if (value == undefined || value == null || value == "") return true;

        	if(value.indexOf("0") == 0){
        		return false;
        	}

            var reg1 = /^\d+$/;
            return reg1.test(value);

        }, message: '数値を入力して下さい。'
    },
    isZenkaku: {
        validator: function (value) {

        	if (value == undefined || value == null || value == "") return true;

            for ( var i = 0; i < value.length; i++) {

        		var c = value.charCodeAt(i);
        		// Shift_JS : 0x0 ~ 0x80 , 0xa0, 0xa1 ~ 0xdf , 0xfd ~ 0xff
        		// Unicode : 0x0 ~ 0x80 , 0xf8f0, 0xff61 ~ 0xff9f , 0xf8f1, 0xf8f3
        		if (( c >= 0x0 && c < 0x81 ) || ( c == 0xf8f0 ) || ( c >= 0xff61 && c < 0xffa0 ) || ( c >= 0xf8f1 && c < 0xf8f4 ) ) {
        			return false;
        		}

            }

        	return true;

        }, message: '全角文字を入力して下さい。'
    },
    ishankaku: {
        validator: function (value) {

        	if (value == undefined || value == null || value == "") return true;

            for ( var i = 0; i < value.length; i++) {

        		var c = value.charCodeAt(i);
        		// Shift_JS : 0x0 ~ 0x80 , 0xa0, 0xa1 ~ 0xdf , 0xfd ~ 0xff
        		// Unicode : 0x0 ~ 0x80 , 0xf8f0, 0xff61 ~ 0xff9f , 0xf8f1, 0xf8f3
        		if (( c >= 0x0 && c < 0x81 ) || ( c == 0xf8f0 ) || ( c >= 0xff61 && c < 0xffa0 ) || ( c >= 0xf8f1 && c < 0xf8f4 ) ) {
        			return true;
        		}

            }

        	return false;

        }, message: '半角文字を入力して下さい。'
    },
    isKatakana: {
        validator: function (value) {

        	if (value == undefined || value == null || value == "") return true;

            var reg1 = /^[ァ-ヶー]*$/;
            return reg1.test(value);

        }, message: '全角カナを入力して下さい。'
    },
    isAlias: {
        validator: function (value) {

        	if (value == undefined || value == null || value == "") return true;

        	// /^[\w\-\u0100-\u2fff\u3001-\uffff\r\n]+$/.test(str)
        	//return /[a-zA-Z0-9]/.test(value);

        	return /^[a-zA-Z0-9\.\-\_]+$/.test(value);


        }, message: '半角英字、半角数値、または記号(.-_)を入力して下さい。'
    },
});

function removeAllErrorForEasyUI(formId) {
	$("#" + formId + " .hasErrorForEasyUI").removeClass("hasErrorForEasyUI");
}

//選択した権限/グループ/メニューを移動する
function moveSelected(fbox, tbox) {
	var arrySelectList = new Array();
	var intCount = 0;
	for (var i = 0; i < fbox.options.length; i++) {
		if (fbox.options[i].selected && fbox.options[i] != "") {
			var no = new Option();
			no.value = fbox.options[i].value;
			no.text = fbox.options[i].text;
			tbox.options[tbox.options.length] = no;
			arrySelectList.push(i);
		}
	}
	for (var i = 0; i < arrySelectList.length; i++) {
		fbox.options.remove(arrySelectList[i] - intCount);
		intCount++;
	}
}

// 全て権限/グループ/メニューを移動する
function moveAll(fbox, tbox) {
	for (var i = 0; i < fbox.options.length; i++) {
		var no = new Option();
		no.value = fbox.options[i].value;
		no.text = fbox.options[i].text;
		tbox.options[tbox.options.length] = no;
	}
	for (var i = fbox.options.length - 1; i >= 0; i--) {
		fbox.options.remove(i);
	}
}

//選択した権限/グループ/メニューを移動する
function moveSelectedData(fbox, tbox, flag) {
	var arrySelectList = new Array();
	var intCount = 0;
	for (var i = 0; i < fbox.options.length; i++) {
		if (fbox.options[i].selected && fbox.options[i] != "") {
			var no = new Option();
			no.value = fbox.options[i].value;
			no.text = fbox.options[i].text;
			tbox.options[tbox.options.length] = no;
			arrySelectList.push(i);
			if ('1' == flag) {
				for (var j = goAuthorityList.length - 1; j >= 0; j--){
					if (no.value == goAuthorityList[j].value){
						goAuthorityList.splice(j,1);
					}
				}
			}else{
				goAuthorityList.push(no);
			}

		}
	}
	for (var i = 0; i < arrySelectList.length; i++) {
		fbox.options.remove(arrySelectList[i] - intCount);
		intCount++;
	}
	if (0 == $("#selectList")[0].options.length) {
		$("#selectList").addClass(
			"textbox-invalid textbox-prompt validatebox-invalid");
	}else{
		$("#selectList").removeClass(
		"textbox-invalid textbox-prompt validatebox-invalid");
		$("#selectList").css({
			"background" : ""
		});
		$("#selectList").attr("disabled", false);
	}
}

// 全て権限/グループ/メニューを移動する
function moveAllData(fbox, tbox, flag) {
	for (var i = 0; i < fbox.options.length; i++) {
		var no = new Option();
		no.value = fbox.options[i].value;
		no.text = fbox.options[i].text;
		tbox.options[tbox.options.length] = no;
		if ('1' == flag) {
			for (var j = goAuthorityList.length - 1; j >= 0; j--){
				if (no.value == goAuthorityList[j].value){
					goAuthorityList.splice(j,1);
				}
			}
		}else{
			goAuthorityList.push(no);
		}
	}
	for (var i = fbox.options.length - 1; i >= 0; i--) {
		fbox.options.remove(i);
	}

	if ('1' == flag && 0 != $("#selectList")[0].options.length) {
		$("#selectList").removeClass(
			"textbox-invalid textbox-prompt validatebox-invalid");
		$("#selectList").css({
			"background" : ""
		});
		$("#selectList").attr("disabled", false);
	} else {
		$("#selectList").addClass(
			"textbox-invalid textbox-prompt validatebox-invalid");
	}
}

//(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
//(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.format = function(fmt) {
	var o = {
	 "M+" : this.getMonth()+1,                 //月
	 "d+" : this.getDate(),                    //日
	 "h+" : this.getHours(),                   //時
	 "m+" : this.getMinutes(),                 //分
	 "s+" : this.getSeconds(),                 //秒
	 "q+" : Math.floor((this.getMonth()+3)/3), //
	 "S"  : this.getMilliseconds()             //
	};
	if(/(y+)/.test(fmt))
	 fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
	for(var k in o)
	 if(new RegExp("("+ k +")").test(fmt))
	fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
	return fmt;
}

// スペースを削除
String.prototype.trim=function()
{
     return this.replace(/(^\s*)|(\s*$)/g,'');
}
// LEFTのスペースを削除
String.prototype.ltrim=function()
{
     return this.replace(/(^\s*)/g,'');
}
//　RIGHTのスペースを削除
String.prototype.rtrim=function()
{
     return this.replace(/(\s*$)/g,'');
}

//スペースを削除
function trim(str)
{
     return str.replace(/(^\s*)|(\s*$)/g, '');
}

//LEFTのスペースを削除
function ltrim(str)
{
     return str.replace(/(^\s*)/g,'');
}

//RIGHTのスペースを削除
function rtrim(str)
{
     return str.replace(/(\s*$)/g,'');
}

//ファイルパスからファイル名を取得する
function getFileName(filePath){
	var fp = filePath.replace(/\\/ig,"/");
	return fp.substring(fp.lastIndexOf("/")+1);
}
//ファイル名から拡張子名を取得
function getFileExtensionName(fileName){
	return fileName.substring(fileName.lastIndexOf(".")+1);
}
// ie,chrome
document.onkeydown = keyDown;
// firefox
//document.onkeypress = keyDown;
function keyDown(e) {
	// eventを取得
        var ev = e || window.event;
	// 「Alt　+ ←」　、 「Alt　+ →」 を禁止
	if (ev.altKey && ((ev.keyCode == 37) || (ev.keyCode == 39))) {
		return false;
	}
	// F5、ctrl+Rを禁止
	else if ((ev.keyCode == 116) || (ev.ctrlKey && ev.keyCode == 82)) {
		return false;
	}
	// backspaceを禁止
	else if(ev.keyCode == 8){
		// eventの対象を取得
	    var obj = ev.target || ev.srcElement;
	    // eventのタイプを取得
		var t = obj.type || obj.getAttribute('type');
		
	    //　eventの対象readonly属性
	    var vReadOnly = obj.getAttribute('readonly');

	    vReadOnly = (vReadOnly == "") ? false : vReadOnly;

		var flag1 = ((t == "password" || t == "text" || t == "textarea") && vReadOnly == "readonly") ? true : false;

		var flag2 = (t != "password" && t != "text" && t != "textarea") ? true : false;

	    if(flag2){
	        return false;
	    }
	    if(flag1){   
	        return false;   
	    }   
	}
}