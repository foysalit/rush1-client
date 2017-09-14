$(document).ready(function () {
	var username = '';

	function getStatuses () {
		$.ajax({
			url: 'http://localhost:4100/statuses',
			dataType: 'json',
			type: 'GET',
			success: function (res) {
				if (res.error) {
					return alert('error in api call: '+ res.message);
				}

				var statusList = '<ul class="status-list">';

				res.data.map(function (status) {
					statusList += '<li><h3>'+ status.content +'</h3>'+ '<a>'+ status.username +'</a></li>';
				});

				statusList += '</ul>';

				$('#status_container').html(statusList);
			}
		});	
	};

	getStatuses();

	$('#status_form').on('submit', function (e) {
		e.preventDefault();

		var $content = $('textarea[name="content"]');

		if ($content.val().length < 1) {
			return alert('your status can not be empty');
		}

		$.ajax({
			url: 'http://localhost:4100/statuses',
			dataType: 'json',
		    contentType: "application/json; charset=utf-8",
			data: JSON.stringify({ status: {content: $content.val(), username: username} }),
			type: 'POST',
			success: function (res) {
				if (res.error) {
					return alert('error in api call: '+ res.message);
				}

				$content.val("").html("");

				getStatuses();
			}
		});
	});

	$('#username_form').on('submit', function (e) {
		e.preventDefault();

		var $username = $('input[name="username"]');

		if ($username.val().length < 1) {
			return alert('your username can not be empty');
		}

		username = $username.val();
		$username.val("");
	});
});