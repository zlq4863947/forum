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
			url : "/IDMS0122/reloading.htm",
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
					initDisplay(res);
					setComboByUserMail('#itemText6',res.mailAddressList);
					setComboByMstCode('#itemText7',res.opeGroupList);

					setComboByMstCode('#itemText11',res.brokerList);
				}

			}
		};

	postAjax(setting);
	
}

function setComboByUserMail(combo, dataList){
	
	var arrList = new Array();
	arrList.push({
		"text" : COMBOBOX_BLANK_OPTION_TEXT,
		"value" : ""
	});
	if (dataList != null && dataList.length != 0) {
		for ( var i = 0; i < dataList.length; i++) {
			arrList.push({
				"text" : dataList[i].mailAddress,
				"value" : dataList[i].mailAddress
			});
		}
	}
	$(combo).combobox('loadData', arrList);

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
	
}

function editAppDetail(){
	
	goForm.applicationInfoItem.itemText1 = $("#itemText1").val();
	//扱者コード
	goForm.applicationInfoItem.itemText2 = $("#itemText2").val();
	//ユーザＩＤ
	goForm.applicationInfoItem.itemText3 = $("#itemText3").val();
	//取扱者名
	goForm.applicationInfoItem.itemText4 = $("#itemText4").val();
	//取扱者（カナ）
	goForm.applicationInfoItem.itemText5 = $("#itemText5").val();
	goForm.applicationInfoItem.itemText6 = $("#itemText6").combobox('getValue');
	
	goForm.applicationInfoItem.itemText7 = $("#itemText7").combobox('getValue');
	// 閲覧権限コード
	goForm.applicationInfoItem.itemText8 = $("#itemText8").val();
	goForm.applicationInfoItem.itemText9 = $("#itemText9").val();
	goForm.applicationInfoItem.itemText10 = $("#itemText10").val();

	// 仲介業者名
	goForm.applicationInfoItem.itemText11 = $("#itemText11").combobox('getValue');
	// 仲介業者コード
	goForm.applicationInfoItem.itemText12 = $("#itemText12").val();
	goForm.applicationInfoItem.itemText13 = $("#itemText13").val();
	goForm.applicationInfoItem.itemText14 = $("#itemText14").val();
}

function initDisplay(res){
	
	if(goForm.applicationDetailFormPattern == '00'){
		$('#itemText1').textbox({ required: true,
			validType:['isAlphabetNum','maxLength[3]']
		});
		$('#itemText2').textbox({ required: true,
			validType:['isAlphabetNum','maxLength[3]']
		});
		
		//ユーザＩＤ
		$("#itemText3").textbox({ disabled : true });
		//取扱者名
		$("#itemText4").textbox({ disabled : true });
		//取扱者（カナ）
		$("#itemText5").textbox({ disabled : true });
		
		// 複数申請に対応する　START
		if("1" != goForm.multipleFlag){
			// メールアドレス
			$('#itemText6').combobox({ required: true,
				validType:"needSelect['#itemText6']"
			});
			
		}
		// 複数申請に対応する　END
		
		// オペレータグループ属性
		$('#itemText7').combobox({ required: true,
			validType:"needSelect['#itemText7']"
		});
		
		// 閲覧権限コード
		$('#itemText8').textbox({
			validType : [ 'isAlphabetNum', 'maxLength[3]' ]
		});
		$('#itemText9').textbox({
			validType : [ 'isAlphabetNum', 'maxLength[3]' ]
		});
		$('#itemText10').textbox({
			validType : [ 'isAlphabetNum', 'maxLength[3]' ]
		});
		
		// 仲介業者名
		$('#itemText11').combobox({ required: true,
			validType:"needSelect['#itemText11']"
		});
		
		// 仲介業者コード
		$('#itemText12').textbox({
			validType : [ 'isAlphabetNum', 'maxLength[4]' ]
		});
		$('#itemText13').textbox({
			validType : [ 'isAlphabetNum', 'maxLength[4]' ]
		});
		$('#itemText14').textbox({
			validType : [ 'isAlphabetNum', 'maxLength[4]' ]
		});

	} else if(goForm.applicationDetailFormPattern == '01'){
		
		$('#itemText1').textbox({ required: true,
			validType:['isAlphabetNum','maxLength[3]']
		});
		//扱者コード
		$("#itemText2").textbox({ disabled : true });
		//ユーザＩＤ
		$("#itemText3").textbox({ disabled : true });
		//取扱者名
		$("#itemText4").textbox({ disabled : true });
		//取扱者（カナ）
		$("#itemText5").textbox({ disabled : true });
		$("#itemText6").combobox({ disabled : true });
		$("#itemText7").combobox({ disabled : true });

		$("#itemText11").combobox({ disabled : true });
		$("#itemText12").textbox({ disabled : true });
		$("#itemText13").textbox({ disabled : true });
		$("#itemText14").textbox({ disabled : true });
		
	} else if(goForm.applicationDetailFormPattern == '02'){

		// 部店コード
		$("#itemText1").textbox({ disabled : true });
		//扱者コード
		$("#itemText2").textbox({ disabled : true });
		//ユーザＩＤ
		$("#itemText3").textbox({ disabled : true });
		//取扱者名
		$("#itemText4").textbox({ disabled : true });
		//取扱者（カナ）
		$("#itemText5").textbox({ disabled : true });
		$("#itemText6").combobox({ disabled : true });
		$("#itemText7").combobox({ disabled : true });
		$("#itemText8").textbox({ disabled : true });
		$("#itemText9").textbox({ disabled : true });
		$("#itemText10").textbox({ disabled : true });
		$("#itemText11").combobox({ disabled : true });
		$("#itemText12").textbox({ disabled : true });
		$("#itemText13").textbox({ disabled : true });
		$("#itemText14").textbox({ disabled : true });

	} else if(goForm.applicationDetailFormPattern == '10'
		|| goForm.applicationDetailFormPattern == '11'
		|| goForm.applicationDetailFormPattern == '12' ){

		$("#trItemText1").hide();
		$("#trItemText2").hide();
		//ユーザＩＤ
		$("#trItemText3").show();
		$("#tdItemText3")[0].style.width = "155px";
		$("#itemText3").textbox({ disabled : true });
		$("#itemText3").textbox( 'resize' , 240 );

		//取扱者名
		$("#trItemText4").show();
		$("#tdItemText4")[0].style.width = "155px";
		$("#itemText4").textbox({ disabled : true });
		$("#itemText4").textbox( 'resize' , 240 );


		//取扱者（カナ）
		$("#trItemText5").show();
		$("#tdItemText5")[0].style.width = "155px";
		$("#itemText5").textbox({ disabled : true });
		$("#itemText5").textbox( 'resize' , 240 );
		
		$("#trItemText6").hide();
		$("#trItemText7").hide();
		$("#trItemText8").hide();
		$("#trItemText9").hide();
		$("#trItemText10").hide();

		$("#trItemText11").hide();
		$("#trItemText12").hide();
		$("#trItemText13").hide();
		$("#trItemText14").hide();
		$("#trItemText15").hide();
		$("#trItemText16").hide();

	} else {
		$("#tableDetail2").hide();
		
	}
	
	// 複数申請に対応する　START
	if("1" == goForm.multipleFlag){
		$("#trItemText3").hide();
		$("#trItemText4").hide();
		$("#trItemText5").hide();
		$("#trItemText6").hide();
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
	
	$("#itemText1").textbox("setValue", goForm.applicationInfoItem.itemText1);
	//扱者コード
	$("#itemText2").textbox("setValue", goForm.applicationInfoItem.itemText2);

	//ユーザＩＤ
	if(goForm.account1 != undefined && goForm.account1 != null && goForm.account1 != ""){
		$("#itemText3").textbox("setValue", goForm.account1);
	} else {
		$("#itemText3").textbox("setValue", goForm.account2);
	}

	//取扱者名
	$("#itemText4").textbox("setValue", goForm.userName);
	
	//取扱者（カナ）
	$("#itemText5").textbox("setValue", res.endUserNamekana);

	$("#itemText6").combobox("setValue", goForm.applicationInfoItem.itemText6);
	$("#itemText7").combobox("setValue", goForm.applicationInfoItem.itemText7);
	$("#itemText8").textbox("setValue", goForm.applicationInfoItem.itemText8);
	$("#itemText9").textbox("setValue", goForm.applicationInfoItem.itemText9);
	$("#itemText10").textbox("setValue", goForm.applicationInfoItem.itemText10);
	$("#itemText11").combobox("setValue", goForm.applicationInfoItem.itemText11);
	$("#itemText12").textbox("setValue", goForm.applicationInfoItem.itemText12);
	$("#itemText13").textbox("setValue", goForm.applicationInfoItem.itemText13);
	$("#itemText14").textbox("setValue", goForm.applicationInfoItem.itemText14);

}

function diableComponent(){
	
	// 部店コード
	$("#itemText1").textbox({ disabled : true });
	//扱者コード
	$("#itemText2").textbox({ disabled : true });
	//ユーザＩＤ
	$("#itemText3").textbox({ disabled : true });
	//取扱者名
	$("#itemText4").textbox({ disabled : true });
	//取扱者（カナ）
	$("#itemText5").textbox({ disabled : true });
	$("#itemText6").combobox({ disabled : true });
	$("#itemText7").combobox({ disabled : true });
	$("#itemText8").textbox({ disabled : true });
	$("#itemText9").textbox({ disabled : true });
	$("#itemText10").textbox({ disabled : true });
	$("#itemText11").combobox({ disabled : true });
	$("#itemText12").textbox({ disabled : true });
	$("#itemText13").textbox({ disabled : true });
	$("#itemText14").textbox({ disabled : true });
	
}