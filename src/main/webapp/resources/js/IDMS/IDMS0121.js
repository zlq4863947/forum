function checkAppDetail(){
	return true;
}

function initDetail() {
	try {
		initDisplay();
	} catch (e) {
	}
	goAppDetail.editAppDetail = function() {
		editAppDetail();
	};

}

function editAppDetail() {
		goForm.applicationInfoItem.itemText1 = $("#itemText1").val();
		goForm.applicationInfoItem.itemText2 = $("#itemText2").val();
		goForm.applicationInfoItem.itemText3 = $("#itemText3").val();
		goForm.applicationInfoItem.itemText4 = $("#itemText4").val();
}

function initDisplay() {
	if (goForm.applicationDetailFormPattern == '10') {

		$("#trPcName")[0].style.display = '';
		$("#trIpAddress")[0].style.display = '';

		$('#itemText1').textbox({
			required : true,
			validType : [ 'isAlphabetNum', 'maxLength[20]' ]
		});
		$('#itemText2').textbox({
			required : true,
			validType : 'ipCheck'
		});



		$("#trBranchCd")[0].style.display = 'none';
		$("#trBranchAccountNo")[0].style.display = 'none';
	}
	else if (goForm.applicationDetailFormPattern == '11') {

		$("#trPcName")[0].style.display = '';
		$("#trIpAddress")[0].style.display = '';

		$("#itemText1").textbox({
			disabled : true
		});
		$("#itemText2").textbox({
			disabled : true
		});


		$("#trBranchCd")[0].style.display = 'none';
		$("#trBranchAccountNo")[0].style.display = 'none';
		
	} else if (goForm.applicationDetailFormPattern == '20') {
		$("#trPcName")[0].style.display = 'none';
		$("#trIpAddress")[0].style.display = 'none';
		$("#trBranchCd")[0].style.display = '';
		$("#trBranchAccountNo")[0].style.display = '';

		$('#itemText3').textbox({
			required : true,
			validType : [ 'isNumber', 'maxLength[3]' ]
		});
		$('#itemText4').textbox({
			required : true,
			validType : [ 'isNumber', 'maxLength[4]' ]
		});

	} else if (goForm.applicationDetailFormPattern == '21') {
		$("#trPcName")[0].style.display = 'none';
		$("#trIpAddress")[0].style.display = 'none';
		$("#trBranchCd")[0].style.display = '';
		$("#trBranchAccountNo")[0].style.display = '';

		$("#itemText3").textbox({
			disabled : true
		});
		$("#itemText4").textbox({
			disabled : true
		});


	} else {
		$("#trPcName")[0].style.display = 'none';
		$("#trIpAddress")[0].style.display = 'none';
		$("#trBranchCd")[0].style.display = 'none';
		$("#trBranchAccountNo")[0].style.display = 'none';

	}

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

	if (disableFlag) {
		diableComponent();
	}
	
	$("#itemText1").textbox("setValue", goForm.applicationInfoItem.itemText1);
	$("#itemText2").textbox("setValue", goForm.applicationInfoItem.itemText2);
	$("#itemText3").textbox("setValue", goForm.applicationInfoItem.itemText3);
	$("#itemText4").textbox("setValue", goForm.applicationInfoItem.itemText4);
	
}

function diableComponent() {

	$("#itemText1").textbox({
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
