var goAuthorityListIFA = [];

function checkAppDetail(){
	return true;
}

function initDetail() {
	// 所属権限
	$("#itemText5").combobox({
		onSelect : function(rec) {
			selectCombobox5(rec);
		}
	});
	// 本店/支店名
	$("#itemText6").combobox({
		onSelect : function(rec) {
			selectCombobox6(rec);
		}
	});
	// 仲介業者名
	$("#itemText7").combobox({
		onSelect : function(rec) {
			selectCombobox7(rec);
		}
	});
	// 仲介業者支店名
	$("#itemText8").combobox({
		onSelect : function(rec) {
			selectCombobox8(rec);
		}
	});
	// 担当者名
	$("#itemText9").combobox({
		onSelect : function(rec) {
			selectCombobox9(rec);
		}
	});

	goAppDetail.editAppDetail = function (){
		editAppDetail();
	};

	var setting = {
			data : JSON.stringify(goForm),
			url : "/IDMS0124/reloading.htm",
			hasLoading : true,
			hasContentType : true,
			success : function(res) {
				if (res.errorResultDto) {
					errors = res.errorResultDto.errorList;
					var messages = "";
					$.each(errors, function(i, err) {
						messages += err.errorMessage + "<br>";
					});
					$("#p_errorMessage")[0].innerHTML = messages;
				} else {
					
					if(res.infoItem != undefined && res.infoItem != null){
						goForm.applicationInfoItem = res.infoItem;
					}
					
					initDisplay();
					
					// コンボボックス：メールアドレス(4)
					setCombobox("#itemText4", res.idms0124Form.mailAddressList);
					// コンボボックス：所属権限(5)
					setCombobox("#itemText5", res.idms0124Form.organizationAuthorityList);
					// コンボボックス：本店/支店名(6)
					setCombobox("#itemText6", res.idms0124Form.branchList);
					// コンボボックス：仲介業者名(7)
					setCombobox("#itemText7", res.idms0124Form.brokerList);
					// コンボボックス：仲介業者支店名(8)
					setCombobox("#itemText8", res.idms0124Form.subBrokerList);
					// コンボボックス：担当者名(9)
					setCombobox("#itemText9", res.idms0124Form.employeeNameList);
					// コンボボックス：管理者権限(11)
					setCombobox("#itemText11", res.idms0124Form.adminFlagList);
					
					goAuthorityListIFA = res.idms0124Form.menuAllList;
					
					setMenuList(res.idms0124Form.hasMenuList);
				}

			}
		};
		postAjax(setting);
	
}

// 所属権限(5)
function selectCombobox5(rec){
	
	var clearArray = [];
	
	$("#itemText6").combobox('loadData', clearArray);
	$("#itemText6").combobox("setValue", "");
	$("#itemText7").combobox('loadData', clearArray);
	$("#itemText7").combobox("setValue", "");
	$("#itemText8").combobox('loadData', clearArray);
	$("#itemText8").combobox("setValue", "");
	$("#itemText9").combobox('loadData', clearArray);
	$("#itemText9").combobox("setValue", "");

	$("#itemText10").textbox("setValue", "");
	
	displayHandle(rec.value);
	
	if(rec.value == ""){
		return;
	} else if(rec.value == "1"
		|| rec.value == "2"){
		$("#itemText3").textbox({ disabled : false });
	} else {
		$("#itemText3").textbox("setValue", "");
		$("#itemText3").textbox({ disabled : true });
	}

	var setting = {
			data : {
				"select5" : rec.value
			},
			url : "/IDMS0124/onSelectCombo5.htm",
			hasLoading : true,
			hasContentType : false,
			success : function(res) {
				if (res.errorResultDto) {
					errors = res.errorResultDto.errorList;
					var messages = "";
					$.each(errors, function(i, err) {
						messages += err.errorMessage + "<br>";
					});
					//$("#p_errorMessage")[0].innerHTML = messages;
					jQuery.messager.alert(' ', messages);
				} else {

					// コンボボックス：本店/支店名(6)
					setCombobox("#itemText6", res.branchList);

					setMenuList(res.hasMenuList);
				}

			}
		};
	postAjax(setting);

}
// 本店/支店名(6)
function selectCombobox6(rec){
	var clearArray = [];
	
	$("#itemText7").combobox('loadData', clearArray);
	$("#itemText7").combobox("setValue", "");
	$("#itemText8").combobox('loadData', clearArray);
	$("#itemText8").combobox("setValue", "");
	$("#itemText9").combobox('loadData', clearArray);
	$("#itemText9").combobox("setValue", "");
	$("#itemText10").textbox("setValue", "");
	
	if(rec.value == ""){
		return;
	}
	
	var selectedPriv = $("#itemText5").combobox('getValue');

	if (selectedPriv == "3"  || selectedPriv == "4"  || selectedPriv == "5"  
        || selectedPriv == "6"  || selectedPriv == "7"  || selectedPriv == "8"
        || selectedPriv == "9"  || selectedPriv == "10"){

		var setting = {
				data : {
					"select6" : rec.value
				},
				url : "/IDMS0124/onSelectCombo6.htm",
				hasLoading : true,
				hasContentType : false,
				success : function(res) {
					if (res.errorResultDto) {
						errors = res.errorResultDto.errorList;
						var messages = "";
						$.each(errors, function(i, err) {
							messages += err.errorMessage + "<br>";
						});
						//$("#p_errorMessage")[0].innerHTML = messages;
						jQuery.messager.alert(' ', messages);
					} else {
	
						// コンボボックス：仲介業者名(7)
						setCombobox("#itemText7", res.brokerList);

					}
	
				}
			};
		postAjax(setting);
    }
}
// 仲介業者名(7)
function selectCombobox7(rec){
	var clearArray = [];
	
	$("#itemText8").combobox('loadData', clearArray);
	$("#itemText8").combobox("setValue", "");
	$("#itemText9").combobox('loadData', clearArray);
	$("#itemText9").combobox("setValue", "");
	$("#itemText10").textbox("setValue", "");
	
	if(rec.value == ""){
		return;
	}
	
	var selectedPriv = $("#itemText5").combobox('getValue');
	if (selectedPriv == "3"  || selectedPriv == "4"  || selectedPriv == "5"  
        || selectedPriv == "6"  || selectedPriv == "7"  || selectedPriv == "8"
        || selectedPriv == "9"  || selectedPriv == "10"){

		var setting = {
				data : {
					"select5" : selectedPriv,
					"select7" : rec.value
				},
				url : "/IDMS0124/onSelectCombo7.htm",
				hasLoading : true,
				hasContentType : false,
				success : function(res) {
					if (res.errorResultDto) {
						errors = res.errorResultDto.errorList;
						var messages = "";
						$.each(errors, function(i, err) {
							messages += err.errorMessage + "<br>";
						});
						//$("#p_errorMessage")[0].innerHTML = messages;
						jQuery.messager.alert(' ', messages);

					} else {
						
						
						if (selectedPriv == "3"  || selectedPriv == "4"  || selectedPriv == "5"){
							
							// コンボボックス：担当者名(9)
							setCombobox("#itemText9", res.employeeNameList);
							
						} else {
							
							// コンボボックス：仲介業者支店名(8)
							setCombobox("#itemText8", res.subBrokerList);
							
						}

					}
	
				}
			};
		postAjax(setting);
    }
}
// 仲介業者支店名(8)
function selectCombobox8(rec){
	var clearArray = [];

	$("#itemText9").combobox('loadData', clearArray);
	$("#itemText9").combobox("setValue", "");
	$("#itemText10").textbox("setValue", "");
	
	if(rec.value == ""){
		return;
	}
	var selectedPriv = $("#itemText5").combobox('getValue');
	var select7 = $("#itemText7").combobox('getValue');

	if (selectedPriv == "3"  || selectedPriv == "4"  || selectedPriv == "5"  
        || selectedPriv == "6"  || selectedPriv == "7"  || selectedPriv == "8"
        || selectedPriv == "9"  || selectedPriv == "10"){

		var setting = {
				data : {
					"select5" : selectedPriv,
					"select7" : select7,
					"select8" : rec.value
				},
				url : "/IDMS0124/onSelectCombo8.htm",
				hasLoading : true,
				hasContentType : false,
				success : function(res) {
					if (res.errorResultDto) {
						errors = res.errorResultDto.errorList;
						var messages = "";
						$.each(errors, function(i, err) {
							messages += err.errorMessage + "<br>";
						});
						//$("#p_errorMessage")[0].innerHTML = messages;
						jQuery.messager.alert(' ', messages);

					} else {

						// コンボボックス：担当者名(9)
						setCombobox("#itemText9", res.employeeNameList);

					}
	
				}
			};
		postAjax(setting);
    }
	
}

// 担当者名(9)
function selectCombobox9(rec){

	var employeeName = $("#itemText9").combobox('getText');
	$("#itemText3").textbox("setValue", employeeName);
	$("#itemText10").textbox("setValue", employeeName);
}


function setCombobox(combo, dataList){
	
	var arrList = new Array();
	arrList.push({
		"text" : COMBOBOX_BLANK_OPTION_TEXT,
		"value" : ""
	});
	if (dataList != null && dataList.length != 0) {
		for ( var i = 0; i < dataList.length; i++) {
			arrList.push({
				"text" : dataList[i].text,
				"value" : dataList[i].value
			});
		}
	}
	$(combo).combobox('loadData', arrList);

}

function editAppDetail(){
	
	goForm.applicationInfoItem.itemText1 = $("#itemText1").val();
	
	var password = strTrim($("#itemText2").val().trim());
	goForm.applicationInfoItem.itemText2 = crypt(password);
	
	goForm.applicationInfoItem.itemText3 = $("#itemText3").val();
	goForm.applicationInfoItem.itemText4 = $("#itemText4").combobox('getValue');
	goForm.applicationInfoItem.itemText5 = $("#itemText5").combobox('getValue');
	goForm.applicationInfoItem.itemText6 = $("#itemText6").combobox('getValue');
	goForm.applicationInfoItem.itemText7 = $("#itemText7").combobox('getValue');
	goForm.applicationInfoItem.itemText8 = $("#itemText8").combobox('getValue');
	goForm.applicationInfoItem.itemText9 = $("#itemText9").combobox('getValue');
	goForm.applicationInfoItem.itemText10 = $("#itemText10").val();
	goForm.applicationInfoItem.itemText11 = $("#itemText11").combobox('getValue');
	
	// 選択権限
	var selectList = new Array();
	var authoritySelected = document.getElementById('selectListIFA').options;
	if (null != authoritySelected && authoritySelected.length != 0) {
		for (var i = 0; i < authoritySelected.length; i++) {
			selectList.push({
				"text" : authoritySelected[i].text,
				"value" : authoritySelected[i].value
			});
		}
	}
	goForm.selectListInfo = selectList;
}

function initDisplay(){
	


	$("#itemText1").textbox({ disabled : true });
	
	if(goForm.applicationDetailFormPattern == '00'){
		
		if(goForm.applicationInfoItem.itemText5 == null
			|| goForm.applicationInfoItem.itemText5 == ""
			|| goForm.applicationInfoItem.itemText5 == "1"
			|| goForm.applicationInfoItem.itemText5 == "2"){
			$("#itemText3").textbox({ disabled : false });
		} else {
			$("#itemText3").textbox({ disabled : true });
		}

	} else if(goForm.applicationDetailFormPattern == '01'){
		$("#itemText2").textbox({ disabled : true });
		$("#itemText3").textbox({ disabled : true });
		$("#itemText4").combobox({ disabled : true });
		$("#itemText5").combobox({ disabled : true });
		$("#itemText6").combobox({ disabled : true });
		$("#itemText7").combobox({ disabled : true });
		$("#itemText8").combobox({ disabled : true });
		$("#itemText9").combobox({ disabled : true });
		$("#itemText10").textbox({ disabled : true });
		$("#itemText11").combobox({ disabled : true });
	} else{
		
	}
	

	
	var disableFlag = true;
	
	// 申請詳細から
	if(detailEnableFlag == DETAIL_ENABLE_FLAG_APPLY){
		disableFlag = false;
	}
	// 承認詳細から
	else if(detailEnableFlag == DETAIL_ENABLE_FLAG_APPROVAL){
		disableFlag = true;
	}
	// 登録詳細から
	else if(detailEnableFlag == DETAIL_ENABLE_FLAG_REGISTER){
		if(goForm.registerDetailInputFlag != undefined && goForm.registerDetailInputFlag == "1"){
			disableFlag = false;
		} else {
			disableFlag = true;
		}
	}
	
	if(goForm.categoryInfo == "1"){
		$("#resetBtn")[0].style.display = 'none';
	}
	else if(goForm.categoryInfo == "2"){
		if(disableFlag){
			$("#resetBtn")[0].style.display = 'none';
		}
		
		$("#itemText2").textbox({ disabled : true });
		$("#itemText2").textbox("setValue", '**********');
	}
	else if(goForm.categoryInfo == "3"){
		$("#resetBtn")[0].style.display = 'none';
		$("#itemText2").textbox({ disabled : true });
		$("#itemText2").textbox("setValue", '**********');
		
		disableFlag = true;
	}
	
	
	if(disableFlag){
		diableComponent();
	} else{
		if(goForm.categoryInfo == "1"){
			$('#itemText2').textbox({ required: true,
				validType:['isAlphabetNum','length[6,16]']
			});
		}
		
		$('#itemText3').textbox({ required: true
		});
		
		$('#itemText4').combobox({ required: true,
			validType:"needSelect['#itemText4']"
		});
		
		$('#itemText5').combobox({ required: true,
			validType:"needSelect['#itemText5']"
		});
		
		$('#itemText6').combobox({ required: true,
			validType:"needSelect['#itemText6']"
		});
		$('#itemText7').combobox({ required: true,
			validType:"needSelect['#itemText7']"
		});
		
		$('#itemText8').combobox({ required: true,
			validType:"needSelect['#itemText8']"
		});
		
		$('#itemText9').combobox({ required: true,
			validType:"needSelect['#itemText9']"
		});
		$('#itemText11').combobox({ required: true,
			validType:"needSelect['#itemText11']"
		});
		
		$("#selectListIFA").addClass("textbox-invalid textbox-prompt validatebox-invalid");
		
		
		displayHandle(goForm.applicationInfoItem.itemText5);
	}
	

	
	$("#itemText1").textbox("setValue", goForm.applicationInfoItem.itemText1);

	$("#itemText3").textbox("setValue", goForm.applicationInfoItem.itemText3);
	$("#itemText4").combobox("setValue", goForm.applicationInfoItem.itemText4);
	$("#itemText5").combobox("setValue", goForm.applicationInfoItem.itemText5);
	$("#itemText6").combobox("setValue", goForm.applicationInfoItem.itemText6);
	$("#itemText7").combobox("setValue", goForm.applicationInfoItem.itemText7);
	$("#itemText8").combobox("setValue", goForm.applicationInfoItem.itemText8);
	$("#itemText9").combobox("setValue", goForm.applicationInfoItem.itemText9);
	$("#itemText10").textbox("setValue", goForm.applicationInfoItem.itemText10);
	$("#itemText11").combobox("setValue", goForm.applicationInfoItem.itemText11);
}

function diableComponent(){

	$("#itemText2").textbox("setValue", '**********');
	
	var privId = goForm.applicationInfoItem.itemText5;
	
	if(privId == undefined || privId == null || privId == "" || privId == "1" || privId == "2" ){
		$("#trItemText7").hide();
		$("#trItemText8").hide();
		$("#trItemText9").hide();
	}
	
	else if(privId == "3" || privId == "4" || privId == "5" ){
		$("#trItemText7").show();
		$("#trItemText8").hide();
		$("#trItemText9").show();
	}
	else {
		$("#trItemText7").show();
		$("#trItemText8").show();
		$("#trItemText9").show();
	}
	
	$("#itemText1").textbox({ disabled : true });
	$("#itemText2").textbox({ disabled : true });
	$("#itemText3").textbox({ disabled : true });
	$("#itemText4").combobox({ disabled : true });
	$("#itemText5").combobox({ disabled : true });
	$("#itemText6").combobox({ disabled : true });
	$("#itemText7").combobox({ disabled : true });
	$("#itemText8").combobox({ disabled : true });
	$("#itemText9").combobox({ disabled : true });
	$("#itemText10").textbox({ disabled : true });
	$("#itemText11").combobox({ disabled : true });
	
	$("#resetBtn")[0].style.display = 'none';
	
	
	$("#tblAuthority").css({
		"background" : "rgb(235, 235, 228)"
	});
	$("#authorityListIFA").css({
		"background" : "rgb(235, 235, 228)"
	});
	$("#selectListIFA").css({
		"background" : "rgb(235, 235, 228)"
	});
	$('#searchInfoIFA').textbox({
		disabled : true
	});
	$('#btnSearch').linkbutton({
		disabled : true
	});
	$('#moveLeft').linkbutton({
		disabled : true
	});
	$('#moveAllLeft').linkbutton({
		disabled : true
	});
	$('#moveRight').linkbutton({
		disabled : true
	});
	$('#moveAllRight').linkbutton({
		disabled : true
	});
}

function displayHandle(privId){
	
	if(privId == undefined || privId == null || privId == "" || privId == "1" || privId == "2" ){
		$("#itemText7").combobox({ disabled : true });
		$("#itemText8").combobox({ disabled : true });
		$("#itemText9").combobox({ disabled : true });

		$("#trItemText7").hide();
		$("#trItemText8").hide();
		$("#trItemText9").hide();

	}
	
	else if(privId == "3" || privId == "4" || privId == "5" ){
		
		$("#itemText7").combobox({ disabled : false });
		$("#itemText8").combobox({ disabled : true });
		$("#itemText9").combobox({ disabled : false });
		
		$("#trItemText7").show();
		$("#trItemText8").hide();
		$("#trItemText9").show();
		
	}
	else {
		
		$("#itemText7").combobox({ disabled : false });
		$("#itemText8").combobox({ disabled : false });
		$("#itemText9").combobox({ disabled : false });
		
		$("#trItemText7").show();
		$("#trItemText8").show();
		$("#trItemText9").show();
		
	}
}


function strTrim(str){
    str = str.replace(/^\s+|\s+$/g, "");
    return str;
}

function resetPW(){
	
    var array = new Array();
    for (var i = 0; i < 10; i++) {
        array.push(String.fromCharCode('0'.charCodeAt() + i))
    }
    for (var i = 0; i < 26; i++) {
        array.push(String.fromCharCode('a'.charCodeAt() + i))
    }
    for (var i = 0; i < 26; i++) {
        array.push(String.fromCharCode('A'.charCodeAt() + i))
    }
    var str = '';
    for (var i = 0; i < 10; i++) {
        str += array[Math.floor(Math.random() * 62)]
    }

    
    $("#itemText2").textbox("setValue", str.toLowerCase());

	
}

// 暗号化BySHA-1
function crypt(password)
{
    var b64EncodedCryptVal = "";

    b64pad    = "=";
    chrsz   =  16; // imported from sha1.js / md5.js; needed for multi byte passwords
    b64EncodedCryptVal = "{SHA1}" + b64_sha1(password);

    return b64EncodedCryptVal;
}


//検索ボタンを押した、権限を検索する
function btnSearch_click() {
	var searchInfo = $("#searchInfoIFA").textbox("getValue");
	$("#authorityListIFA")[0].length = 0;
	if (null != searchInfo && "" != searchInfo) {
		for (i = 0; i < goAuthorityListIFA.length; i++) {

			if (hasMenuMap[goAuthorityListIFA[i].value] == undefined || hasMenuMap[goAuthorityListIFA[i].value] == null
					|| hasMenuMap[goAuthorityListIFA[i].value] == "") {

				if (goAuthorityListIFA[i].text.indexOf(searchInfo) > -1) {
					var no = new Option();
					no.value = goAuthorityListIFA[i].value;
					no.text = goAuthorityListIFA[i].text;
					$("#authorityListIFA")[0].add(no);
				}

			}

		}
	} else {
		for (i = 0; i < goAuthorityListIFA.length; i++) {

			if (hasMenuMap[goAuthorityListIFA[i].value] == undefined || hasMenuMap[goAuthorityListIFA[i].value] == null
					|| hasMenuMap[goAuthorityListIFA[i].value] == "") {
				var no = new Option();
				no.value = goAuthorityListIFA[i].value;
				no.text = goAuthorityListIFA[i].text;
				$("#authorityListIFA")[0].add(no);
			}
		}
	}
}


// 選択した権限/グループ/メニューを移動する
function moveMenuList(flag) {
	
	var changeFlag = false;
	
	if ('1' == flag){

		var fbox = $("#authorityListIFA")[0];
		for (var i = 0; i < fbox.options.length; i++) {
		
			if (fbox.options[i].selected && fbox.options[i] != "") {
				changeFlag = true;
				hasMenuMap[fbox.options[i].value] = fbox.options[i].value;
			}
		}
		
	}
	
	else if ('2' == flag){
		changeFlag = true;
		var fbox = $("#authorityListIFA")[0];
		for (var i = 0; i < fbox.options.length; i++) {
				hasMenuMap[fbox.options[i].value] = fbox.options[i].value;
		}

	}
	
	else if ('3' == flag){

		var fbox = $("#selectListIFA")[0];
		for (var i = 0; i < fbox.options.length; i++) {
		
			if (fbox.options[i].selected && fbox.options[i] != "") {
				changeFlag = true;
				hasMenuMap[fbox.options[i].value] = "";
			}
		}
		
	}
	
	else if ('4' == flag){
		changeFlag = true;
		var fbox = $("#selectListIFA")[0];
		for (var i = 0; i < fbox.options.length; i++) {
				hasMenuMap[fbox.options[i].value] = "";
		}
		
	}
	
	if(changeFlag){
		resetMenuList();
	}

}



var hasMenuMap = {};

function setMenuList(hasMenuList) {

	hasMenuMap = {};

	if (hasMenuList != undefined && null != hasMenuList && 0 != hasMenuList.length) {
		for (var i = 0; i < hasMenuList.length; i++) {

			hasMenuMap[hasMenuList[i]] = hasMenuList[i];
		}
	}
	
	resetMenuList();

}

function resetMenuList() {

	$("#authorityListIFA")[0].options.length = 0;
	$("#selectListIFA")[0].options.length = 0;
	$("#searchInfoIFA").textbox("setValue", "");

	if (null != goAuthorityListIFA && 0 != goAuthorityListIFA.length) {

		for (var i = 0; i < goAuthorityListIFA.length; i++) {

			var no = new Option();

			no.value = goAuthorityListIFA[i].value;
			no.text = goAuthorityListIFA[i].text;
			if (hasMenuMap[goAuthorityListIFA[i].value] == undefined || hasMenuMap[goAuthorityListIFA[i].value] == null
					|| hasMenuMap[goAuthorityListIFA[i].value] == "") {

				$("#authorityListIFA")[0].add(no);
			} else {
				$("#selectListIFA")[0].add(no);
			}

		}

	}

	if (0 == $("#selectListIFA")[0].options.length) {
		$("#selectListIFA").addClass("textbox-invalid textbox-prompt validatebox-invalid");
	} else {
		$("#selectListIFA").removeClass("textbox-invalid textbox-prompt validatebox-invalid");
	}

}