$(document).ready(function() {
	$('#submit').on('click', function() {
		$("#login").validate({
			submitHandler: function(form) {
				$(form).ajaxSubmit({
					type: "post",
					url: "login.php",
					success: function(responseText, statusText) {
						if(responseText == 'true') {
							$.cookie('user', $('#user').val());
							window.location.href = 'index.html';
						} else {
							alert('用户或密码错误！');
						}
					},
					error: function(responseText, statusText) {
						alert(responseText + '|' + statusText);
					}
				});
			}
		});
	});
});