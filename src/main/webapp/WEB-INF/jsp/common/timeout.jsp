<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript">

function returnLogin(){
	try{
		parent.toLogin();
	} catch(e){
		window.location.href = "<%=request.getContextPath()%>" + "/IDMS0000/IDMS0000.htm";
	}
}

</script>
<title>メインメニュー</title>

</head>
<body>
	<div align="center">
		<h1>セッションタイムアウトしました。もう一度ログインして下さい。</h1>
		<h2><a href="javascript:void(0)" onclick="returnLogin()">ログイン画面へ</a></h2>
	</div>
</body>

</html>