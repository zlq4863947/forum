function checkAppDetail(){
	return true;
}

function initDetail() {

	goAppDetail.editAppDetail = function (){
		editAppDetail();
	};

	var setting = {
			data : {
				"endUserId" : goForm.endUserId
			},
			url : "/IDMS0123/reloading.htm",
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

					setComboByMstCode('#itemText4',res.commonInputList);
					setComboByMstCode('#itemText5',res.forceSendList);
					setComboByMstCode('#itemText6',res.genericSrchList);

					initDisplay(res);

				}

			}
		};
	postAjax(setting);
	
	
}


function setComboByMstCode(combo, dataList){
	
	var arrList = new Array();
	arrList.push({
		"text" : COMBOBOX_BLANK_OPTION_TEXT,
		"value" : ""
	});
	if (dataList != null && dataList.length != 0) {
		for ( var i = 0; i < dataList.length; i++) {
			arrList.push({
				"text" : dataList[i].codeValue,
				"value" : dataList[i].code
			});
		}
	}
	$(combo).combobox('loadData', arrList);

	$(combo).combobox('setValue', "");
	//$(combo).combobox('enable');
	
}

function editAppDetail(){
	
	//ユーザＩＤ
	//扱者コード
	goForm.applicationInfoItem.itemText1 = $("#itemText1").val();
	
	goForm.applicationInfoItem.itemText2 = $("#itemText2").val();
	goForm.applicationInfoItem.itemText3 = $("#itemText3").val();
	goForm.applicationInfoItem.itemText4 = $("#itemText4").combobox('getValue');
	goForm.applicationInfoItem.itemText5 = $("#itemText5").combobox('getValue');
	goForm.applicationInfoItem.itemText6 = $("#itemText6").combobox('getValue');
	
}

function initDisplay(result){
	
	if(goForm.applicationDetailFormPattern == '00'){
		
		$('#itemText1').textbox({ required: true,
			validType:['isAlphabetNum','maxLength[3]']
		});
		$('#itemText3').textbox({ required: true,
			validType:['isAlphabetNum','maxLength[3]']
		});
		
		
		$('#itemText4').combobox({
			editable : false
		});
		
		$('#itemText5').combobox({
			editable : false
		});
		
		$('#itemText6').combobox({
			editable : false
		});
//		$('#itemText4').combobox({ required: true,
//			validType:"needSelect['#itemText4']"
//		});
//		
//		$('#itemText5').combobox({ required: true,
//			validType:"needSelect['#itemText5']"
//		});
//		
//		$('#itemText6').combobox({ required: true,
//			validType:"needSelect['#itemText6']"
//		});
		
		//ユーザＩＤ
		$("#itemText2").textbox({ disabled : true });
	} else if(goForm.applicationDetailFormPattern == '01'){
		
		$("#itemText1").textbox({ disabled : true });
		//ユーザＩＤ
		$("#itemText2").textbox({ disabled : true });
		
		$("#itemText3").textbox({ disabled : true });
		
		$("#itemText4").combobox({ disabled : true });
		$("#itemText5").combobox({ disabled : true });
		$("#itemText6").combobox({ disabled : true });
		
		
	} else if(goForm.applicationDetailFormPattern == '02'){
		
		
		
		$("#itemText1").textbox({ disabled : true });
		//ユーザＩＤ
		$("#itemText2").textbox({ disabled : true });
		
		
		$('#itemText3').textbox({ required: true,
			validType:['isAlphabetNum','maxLength[3]']
		});
		
		$('#itemText4').combobox({
			editable : false
		});
		
		$('#itemText5').combobox({
			editable : false
		});
		
		$('#itemText6').combobox({
			editable : false
		});
		
//		$('#itemText4').combobox({ required: true,
//			validType:"needSelect['#itemText4']"
//		});
//		
//		$('#itemText5').combobox({ required: true,
//			validType:"needSelect['#itemText5']"
//		});
//		
//		$('#itemText6').combobox({ required: true,
//			validType:"needSelect['#itemText6']"
//		});
		
	} else if(goForm.applicationDetailFormPattern == '03'){
		
		$('#itemText1').textbox({ required: true,
			validType:['isAlphabetNum','maxLength[3]']
		});
		
		//ユーザＩＤ
		$("#itemText2").textbox({ disabled : true });
		
		$("#itemText3").textbox({ disabled : true });
		
		$("#itemText4").combobox({ disabled : true });
		$("#itemText5").combobox({ disabled : true });
		$("#itemText6").combobox({ disabled : true });
	} else {
		$("#tableDetail3").hide();
	}
	
	// 複数申請に対応する　START
	if("1" == goForm.multipleFlag){
		$("#tr_itemText2").hide();
	}
	// 複数申請に対応する　END
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
	
	if(disableFlag){
		diableComponent();
	}
	
	// 部店コード
	if(goForm.applicationInfoItem.itemText1 == undefined
			|| goForm.applicationInfoItem.itemText1 == null
			|| goForm.applicationInfoItem.itemText1 == ""){
		if("1" != goForm.multipleFlag){
			$("#itemText1").textbox("setValue", result.branchCd);
		}
	} else{
		$("#itemText1").textbox("setValue", goForm.applicationInfoItem.itemText1);
	}
	
	//ユーザID
	if(goForm.applicationInfoItem.itemText2 == undefined
		|| goForm.applicationInfoItem.itemText2 == null
		|| goForm.applicationInfoItem.itemText2 == ""){
		
		if(goForm.account1 != undefined && goForm.account1 != null && goForm.account1 != ""){
			$("#itemText2").textbox("setValue", goForm.account1);
		} else {
			$("#itemText2").textbox("setValue", goForm.account2);
		}
	} else{
		$("#itemText2").textbox("setValue", goForm.applicationInfoItem.itemText2);
	}
	
	//扱者コード
	if(goForm.applicationInfoItem.itemText3 == undefined
			|| goForm.applicationInfoItem.itemText3 == null
			|| goForm.applicationInfoItem.itemText3 == ""){
		if("1" != goForm.multipleFlag){
			$("#itemText3").textbox("setValue", result.handlingCd);
		}
	} else{
		
		$("#itemText3").textbox("setValue", goForm.applicationInfoItem.itemText3);
	}
	// 共有入力区分
	if(goForm.applicationInfoItem.itemText4 == undefined
			|| goForm.applicationInfoItem.itemText4 == null
			|| goForm.applicationInfoItem.itemText4 == ""){
		if("1" != goForm.multipleFlag){
			$("#itemText4").combobox("setValue", result.commonInputCd);
		}
		
	} else{
		$("#itemText4").combobox("setValue", goForm.applicationInfoItem.itemText4);
		
	}
	
	$("#itemText5").combobox("setValue", goForm.applicationInfoItem.itemText5);
	$("#itemText6").combobox("setValue", goForm.applicationInfoItem.itemText6);
	
}

function diableComponent(){
	$("#itemText1").textbox({ disabled : true });
	//ユーザＩＤ
	$("#itemText2").textbox({ disabled : true });
	$("#itemText3").textbox({ disabled : true });
	
	$("#itemText4").combobox({ disabled : true });
	$("#itemText5").combobox({ disabled : true });
	$("#itemText6").combobox({ disabled : true });
}