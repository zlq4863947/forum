function loginLoad() {
	var setting = {
		data : {
			"userAlias" : $("#loginForm input[name='loginId']")[0].value
		},
		url : "/IDMS0000/login.htm",
		hasLoading : true,
		contentType : false,
		success : function(res) {
			if (res.errorResultDto) {
				errors = res.errorResultDto.errorList;
				var messages = "";
				$.each(errors, function(i, err) {
					messages += err.errorMessage + "<br>";
				});
				jQuery.messager.alert(' ', messages);
			} else {
				window.location.href = CONTEXT_PATH
				+ "/index.htm";
			}
		}
	};
	postAjax(setting);
}
function clean() {

	$("#loginForm input[name='loginId']")[0].value = "";
	$("#loginForm input[name='password']")[0].value = "";
}

function shut() {
	window.opener=null;
	window.open('','_self');
	window.close();
}

$(document).ready(function() {
	$("#loginId").bind('keydown', function(e){
		if (e.keyCode == 13){
			loginLoad();
		}
	});
});