function checkAppDetail(){
	return true;
}

function initDetail() {
	$("#itemText1").combobox({
		onSelect : function(rec) {
	
			onSelectMailingList(rec);
	
		}
	});
	

	goAppDetail.editAppDetail = function (){
		editAppDetail();
	};

	initDisplay();
	
	if(goForm.applicationDetailFormPattern == '01'){

		var disableFlag = getDisableFlag();
		
		var setting = {
				data : {
					"deletedDataShow" : disableFlag ? 'true' : 'false'
				},
				url : "/IDMS0126/reloading.htm",
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

						setMailingListCombo(res.mailingList);

					}
	
				}
			};
		
		postAjax(setting);
		
	}
	
}


function onSelectMailingList(rec){
	$("#itemText3").textbox("setValue", rec.value);
}


function setMailingListCombo(dataList){
	
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
	$('#itemText1').combobox('loadData', arrList);

	$('#itemText1').combobox('setValue', goForm.applicationInfoItem.itemText1);

}

function editAppDetail(){
	
	goForm.applicationInfoItem.itemText1 = $("#itemText1").combobox('getValue');
	goForm.applicationInfoItem.itemText2 = $("#itemText2").val();
	goForm.applicationInfoItem.itemText3 = $("#itemText3").val();
}

function initDisplay(){
	$("#tableDetail6").show();
	
	if(goForm.applicationDetailFormPattern == '00'){
		$("#trItemText1").hide();
		$('#itemText2').textbox({ required: true,
			validType:'maxLength[100]'
		});
		$('#itemText3').textbox({ required: true,
			validType:['isAlias','maxLength[30]']
		});

	} else if(goForm.applicationDetailFormPattern == '01'){
		$('#itemText1').combobox({ required: true,
			validType:"needSelect['#itemText1']"
		});
		
		$("#trItemText2").hide();
		$("#itemText3").textbox({ disabled : true });
		
	} else{
		$("#tableDetail6").hide();
		
	}
	
	var disableFlag = getDisableFlag();
	
	if(disableFlag){
		diableComponent();
	}
	
	$("#itemText1").combobox("setValue", goForm.applicationInfoItem.itemText1);
	$("#itemText2").textbox("setValue", goForm.applicationInfoItem.itemText2);
	$("#itemText3").textbox("setValue", goForm.applicationInfoItem.itemText3);
}

function diableComponent(){
	
	$("#itemText1").combobox({ disabled : true });
	$("#itemText2").textbox({ disabled : true });
	$("#itemText3").textbox({ disabled : true });
}

function getDisableFlag(){
	
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
	
	return disableFlag;
}