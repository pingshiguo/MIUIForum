<?php
	require 'config.php';
	
	$_pass = sha1($_POST['pwd']);
	
	$query = mysql_query("SELECT Register_phone,Register_password FROM register WHERE Register_phone='{$_POST['user']}' AND Register_password='{$_pass}'") or die('SQL 错误！');
	
	if (mysql_fetch_array($query, MYSQL_ASSOC)) {
		echo 'true';
	} else {
		echo 'false';
	}
	
	mysql_close();
?>