function checkAppDetail(){
	return true;
}

function initDetail() {

	goAppDetail.editAppDetail = function() {
		editAppDetail();
	};

	$("#itemText1").combobox({
		onSelect : function(rec) {

			onSelectMailbox(rec);

		}
	});
	
	if (goForm.applicationDetailFormPattern == '00'){
	
		$("#itemText4").textbox({
			onChange : function(newValue, oldValue) {
				onChangeMailboxAliasName(newValue, oldValue);
	
			}
		});
	}
	

	initDisplay();

	if (goForm.applicationDetailFormPattern == '01' || goForm.applicationDetailFormPattern == '02') {

		var disableFlag = getDisableFlag();
		
		var setting = {
			data : {
				"deletedDataShow" : disableFlag ? 'true' : 'false'
			},
			url : "/IDMS0125/reloading.htm",
			hasLoading : true,
			hasContentType : false,
			success : function(res) {
				if (res.errorResultDto) {
					errors = res.errorResultDto.errorList;
					var messages = "";
					$.each(errors, function(i, err) {
						messages += err.errorMessage + "<br>";
					});
					// $("#p_errorMessage")[0].innerHTML = messages;
					jQuery.messager.alert(' ', messages);

				} else {

					setMailCombo(res.mailboxList);

				}

			}
		};

		postAjax(setting);
	}

}

function onSelectMailbox(rec) {

	$("#itemText4").textbox("setValue", rec.value);

}

function onChangeMailboxAliasName(newValue, oldValue){
	
	if(newValue == null || newValue == ""){
		$("#itemText5").textbox("setValue", "");
	} else{
		if(newValue.length >= 6){
			$("#itemText5").textbox("setValue", newValue);
		} else{
			var password = (newValue + "000000").slice(0,6);
			$("#itemText5").textbox("setValue", password);
		}
	}
	
}

function setMailCombo(dataList) {

	var arrList = new Array();
	arrList.push({
		"text" : COMBOBOX_BLANK_OPTION_TEXT,
		"value" : ""
	});
	if (dataList != null && dataList.length != 0) {
		for (var i = 0; i < dataList.length; i++) {
			arrList.push({
				"text" : dataList[i].text,
				"value" : dataList[i].value
			});
		}
	}
	$('#itemText1').combobox('loadData', arrList);

}

function editAppDetail() {

	goForm.applicationInfoItem.itemText1 = $("#itemText1").combobox('getValue');
	goForm.applicationInfoItem.itemText2 = $("#itemText2").val();
	goForm.applicationInfoItem.itemText3 = $("#itemText3").val();
	goForm.applicationInfoItem.itemText4 = $("#itemText4").val();
	goForm.applicationInfoItem.itemText5 = $("#itemText5").val();
}

function initDisplay() {

	if (goForm.applicationDetailFormPattern == '00') {
		$("#trItemText1").hide();

		$('#itemText2').textbox({
			required : true,
			validType : 'maxLength[30]'
		});

		$('#itemText3').textbox({
			required : true,
			validType : 'maxLength[30]'
		});

		$('#itemText4').textbox({
			required : true,
			validType : [ 'isAlphabetNum', 'maxLength[20]' ]
		});

		$("#itemText5").textbox({
			disabled : true
		});
	} else if (goForm.applicationDetailFormPattern == '01') {
		$("#trItemText5").hide();

		$('#itemText1').combobox({
			required : true,
			validType : "needSelect['#itemText1']"
		});

		$('#itemText2').textbox({
			required : true,
			validType : 'maxLength[30]'
		});

		$('#itemText3').textbox({
			required : true,
			validType : 'maxLength[30]'
		});

		$("#itemText4").textbox({
			disabled : true
		});
	} else if (goForm.applicationDetailFormPattern == '02') {

		$('#itemText1').combobox({
			required : true,
			validType : "needSelect['#itemText1']"
		});

		$("#trItemText2").hide();
		$("#trItemText3").hide();
		$("#trItemText5").hide();

		$("#itemText4").textbox({
			disabled : true
		});
	} else {
		$("#tableDetail5").hide();
	}

	var disableFlag = getDisableFlag();

	if (disableFlag) {
		diableComponent();
	}

	$("#itemText1").combobox("setValue", goForm.applicationInfoItem.itemText1);
	$("#itemText2").textbox("setValue", goForm.applicationInfoItem.itemText2);
	$("#itemText3").textbox("setValue", goForm.applicationInfoItem.itemText3);
	$("#itemText4").textbox("setValue", goForm.applicationInfoItem.itemText4);
	$("#itemText5").textbox("setValue", goForm.applicationInfoItem.itemText5);
}

function diableComponent() {
	$("#itemText1").combobox({
		disabled : true
	});
	$("#itemText2").textbox({
		disabled : true
	});
	$("#itemText3").textbox({
		disabled : true
	});
	$("#itemText4").textbox({
		disabled : true
	});
	$("#itemText5").textbox({
		disabled : true
	});
}

function getDisableFlag(){
	
	var disableFlag = true;

	// 申請詳細から
	if (detailEnableFlag == DETAIL_ENABLE_FLAG_APPLY) {
		disableFlag = false;
	}
	// 承認詳細から
	else if (detailEnableFlag == DETAIL_ENABLE_FLAG_APPROVAL) {
		disableFlag = true;
	}
	// 登録詳細から
	else if (detailEnableFlag == DETAIL_ENABLE_FLAG_REGISTER) {
		if (goForm.registerDetailInputFlag != undefined && goForm.registerDetailInputFlag == "1") {
			disableFlag = false;
		} else {
			disableFlag = true;
		}
	}
	
	return disableFlag;
}