$(function(){
	
	if ($.cookie('user')) {
		$('.login-a').css('display','none');
		$('.user-a').text($.cookie('user'));
	} else{
		$('.user-a').css('display','none');
		$('.logout-a').css('display','none');
	}
	
	$('.logout-a').click(function(){
		$.removeCookie('user');
		window.location.href = 'index.html';
	});
	
	$.ajax({
		type:'PSOT',
		url:'show_carousel.php',
		async:false,
		success:function(res){
			var data = $.parseJSON(res);
			var html = '';
			$.each(data, function(index,value) {
				html += '<a href="#"><img src="img/Carousel/'+value.carousel_url+'" /></a>';
			});
			$('.py_lunbo_container').html(html);
		}
	});
	
	$.ajax({
		type:'PSOT',
		url:'show_picture.php',
		async:false,
		success:function(res){
			var data = $.parseJSON(res);
			var html = '';
			$.each(data, function(index,value) {
				if (index==data.length-1) {
					html += '<a href="#" class="last"><img src="img/Top/'+value.top_picture_url+'" /></a>';
				} else{
					html += '<a href="#"><img src="img/Top/'+value.top_picture_url+'" /></a>';
				}
			});
			$('.main-banner').html(html);
		}
	});
	
	$.ajax({
		type:'PSOT',
		url:'show_content.php',
		success:function(res){
			var data = $.parseJSON(res);
			var html = '';
			$.each(data, function(index,value) {
				html += '<div class="item"><h2 class="item-title">'+value.BBS_content_title+'</h2><div class="item-img"><a href="#"><img title="'+value.BBS_content_title+'" src="img/BBS/'+value.BBS_content_img+'" /></a></div><p class="item-content">'+value.BBS_content_theme+'</p><p class="item-footer"><a class="item-footer-author" href="#">'+value.BBS_content_user_name+'</a> 发布于 <span class="item-footer-time">'+value.BBS_content_date+'</span></p></div>';
			});
			$('.main-container').html(html);
		}
	});
});
