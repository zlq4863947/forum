//画面を初期化
$(document).ready(function() {
	var setting = {
		data : null,
		url : "/IDMS0014/showAuthority.htm",
		hasLoading : true,
		success : function(res) {
			for (var i = 0; i < res.applicationAuthorityList.length; i++) {
				var no = new Option();
				no.value = res.applicationAuthorityList[i].value;
				no.text = res.applicationAuthorityList[i].text;
				$("#authorityList")[0].add(no);
			}
		}
	};
	postAjax(setting);
});

// 閉じるボタンを押した、画面を閉じる
function closed() {
	parent.closeMainDialog();
}