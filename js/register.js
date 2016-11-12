$(document).ready(function() {
	$('#submit').on('click', function() {
		$("#register").validate({
			submitHandler: function(form) {
				$(form).ajaxSubmit({
					type: "post",
					url: "add_register.php",
					success: function(responseText, statusText) {
						if(responseText == 1) {
							window.location.href = 'login.html';
						} else {
							alert('注册失败！');
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