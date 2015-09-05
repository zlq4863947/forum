var goFolderList = {};

function checkAppDetail(){
	return true;
}

function initDetail() {

	goAppDetail.editAppDetail = function() {
		editAppDetail();
	};

	$("#itemText1").combobox({
		onSelect : function(rec) {

			onSelectFloder(rec);

		}
	});

	if (goForm.applicationDetailFormPattern == '10') {

		initDisplay();

		if (goForm.systemInfo == "21" && goForm.applicationDetailFormPattern == '10') {
			// システムコード：21共有フォルダ、新規作成
			// 登録詳細画面から（registerFlag）
			if (detailEnableFlag == DETAIL_ENABLE_FLAG_REGISTER) {

				var setting = {
					data : null,
					url : "/IDMS0127/reloadingDrive.htm",
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

							setDriveCombo(res.driveList);

						}

					}
				};

				postAjax(setting);

			}

		}

	} else {

		var setting = {
			data : {
				"systemCd" : goForm.systemInfo
			},
			url : "/IDMS0127/reloading.htm",
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

					initDisplay();

					setFolderCombo(res.folderList);

				}

			}
		};

		postAjax(setting);

	}
}

function setDriveCombo(dataList) {

	var arrList = new Array();
	arrList.push({
		"text" : COMBOBOX_BLANK_OPTION_TEXT,
		"value" : ""
	});
	if (dataList != null && dataList.length != 0) {
		for (var i = 0; i < dataList.length; i++) {

			arrList.push({
				"text" : dataList[i].path,
				"value" : dataList[i].driveCd
			});
		}
	}
	$('#itemText5').combobox('loadData', arrList);

}

function setFolderCombo(dataList) {

	var arrList = new Array();
	arrList.push({
		"text" : COMBOBOX_BLANK_OPTION_TEXT,
		"value" : ""
	});
	if (dataList != null && dataList.length != 0) {
		for (var i = 0; i < dataList.length; i++) {
			goFolderList[dataList[i].folderId.toString()] = dataList[i];
			arrList.push({
				"text" : dataList[i].folderName,
				"value" : dataList[i].folderId.toString()
			});
		}
	}
	$('#itemText1').combobox('loadData', arrList);

}

function onSelectFloder(rec) {

	if (rec.value == "") {
		$("#itemText4").textbox("setValue", "");
		return;
	}
	var floderId = rec.value;

	if (goFolderList[floderId] != undefined && goFolderList[floderId] != null && goFolderList[floderId].description != undefined) {
		$("#itemText4").textbox("setValue", goFolderList[floderId].description);
	}

}

function editAppDetail() {

	goForm.applicationInfoItem.itemText1 = $("#itemText1").combobox('getValue');
	goForm.applicationInfoItem.itemText2 = $("#itemText2").val();
	goForm.applicationInfoItem.itemText3 = $("#itemText3").val();
	goForm.applicationInfoItem.itemText4 = $("#itemText4").val();
	goForm.applicationInfoItem.itemText5 = $("#itemText5").combobox('getValue');
}

function initDisplay() {

	if (goForm.applicationDetailFormPattern == '00') {
		$("#trItemText1").hide();

		$('#itemText2').textbox({
			required : true,
			validType : 'maxLength[50]'
		});
		$('#itemText3').textbox({
			required : true,
			validType : [ 'isInteger', 'maxLength[10]' ]
		});
		$('#itemText4').textbox({
			required : true,
			validType : 'maxLength[200]'
		});

	} else if (goForm.applicationDetailFormPattern == '01') {
		$('#itemText1').combobox({
			required : true,
			validType : "needSelect['#itemText1']"
		});
		$('#itemText2').textbox({
			required : true,
			validType : 'maxLength[50]'
		});

		$("#tdItemText2").html("フォルダ名（変更）");
		$("#trItemText3").hide();

		$("#itemText3").textbox({
			disabled : true
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

		$("#itemText3").textbox({
			disabled : true
		});
		$("#itemText4").textbox({
			disabled : true
		});

	} else if (goForm.applicationDetailFormPattern == '10') {
		$("#trItemText1").hide();
		$("#trItemText3").hide();

		$('#itemText2').textbox({
			required : true,
			validType : 'maxLength[50]'
		});

		$('#itemText4').textbox({
			required : true,
			validType : 'maxLength[200]'
		});

	} else if (goForm.applicationDetailFormPattern == '11') {

		$('#itemText1').combobox({
			required : true,
			validType : "needSelect['#itemText1']"
		});

		$('#itemText2').textbox({
			required : true,
			validType : 'maxLength[50]'
		});

		$("#trItemText3").hide();

		$("#tdItemText2").html("フォルダ名（変更）");

		$("#itemText4").textbox({
			disabled : true
		});

	} else if (goForm.applicationDetailFormPattern == '12') {

		$('#itemText1').combobox({
			required : true,
			validType : "needSelect['#itemText1']"
		});

		$("#trItemText2").hide();
		$("#trItemText3").hide();

		$("#itemText4").textbox({
			disabled : true
		});

	}

	else {
		$("#tableDetail7").hide();
	}

	var disableFlag = true;

	// 申請詳細から
	if (detailEnableFlag == DETAIL_ENABLE_FLAG_APPLY) {
		disableFlag = false;
		$("#itemText5").combobox({
			disabled : true
		});
		$("#trItemText5").hide();
	}
	// 承認詳細から
	else if (detailEnableFlag == DETAIL_ENABLE_FLAG_APPROVAL) {
		disableFlag = true;
		$("#itemText5").combobox({
			disabled : true
		});
		$("#trItemText5").hide();
	}
	// 登録詳細から
	else if (detailEnableFlag == DETAIL_ENABLE_FLAG_REGISTER) {

		if (goForm.applicationDetailFormPattern == '10') {
			$('#itemText5').combobox({
				required : true,
				validType : "needSelect['#itemText5']"
			});
		} else {
			$("#itemText5").combobox({
				disabled : true
			});
			$("#trItemText5").hide();
		}

		if (goForm.registerDetailInputFlag != undefined && goForm.registerDetailInputFlag == "1") {
			disableFlag = false;
		} else {
			disableFlag = true;
		}
	}

	if (disableFlag) {
		diableComponent();
	}

	$("#itemText1").combobox("setValue", goForm.applicationInfoItem.itemText1);
	$("#itemText2").textbox("setValue", goForm.applicationInfoItem.itemText2);
	$("#itemText3").textbox("setValue", goForm.applicationInfoItem.itemText3);
	$("#itemText4").textbox("setValue", goForm.applicationInfoItem.itemText4);
	$("#itemText5").combobox("setValue", goForm.applicationInfoItem.itemText5);

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

}