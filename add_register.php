<?php
	
	require 'config.php';
	
	$query = "INSERT INTO register (Register_phone, Register_password,date) 
			VALUES ('{$_POST['phone']}', sha1('{$_POST['pwd']}'),NOW())";
	
	mysql_query($query) or die('新增失败！'.mysql_error());
	
	echo mysql_affected_rows();
	
	mysql_close();
?>