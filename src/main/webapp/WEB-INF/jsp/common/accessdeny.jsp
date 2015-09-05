<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<title>アクセス拒否</title>
<script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/jquery.min.js?${initParam.version}"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resources/js/IDMS/messages.js?${initParam.version}"></script>

<script type="text/javascript">

$(document).ready(function() {
	$("#accessDenyContent").html(getMessage("E1030"));
});

</script>

</head>
<body>
	<div align="center">
	<h1 id="accessDenyContent"></h1>
	</div>
</body>

</html>