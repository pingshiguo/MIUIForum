<?php
	require 'config.php';
	
	$query = mysql_query("SELECT BBS_content_title,BBS_content_img,BBS_content_theme,BBS_content_user_name,BBS_content_date FROM bbs_content LIMIT 0,10") or die('SQL 错误！');
	
	$json = '';
	
	while (!!$row = mysql_fetch_array($query, MYSQL_ASSOC)) {
		foreach ( $row as $key => $value ) {
			$row[$key] = urlencode(str_replace("\n","", $value));
		}
		$json .= urldecode(json_encode($row)).',';
	}
	
	echo '['.substr($json, 0, strlen($json) - 1).']';
	
	mysql_close();
?>