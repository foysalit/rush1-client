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
					var deleteButton = '<a href="#" class="status-delete" data-id="'+ status._id +'">Delete</a>'
					var likeButton = '<a href="#" class="status-like" data-id="'+ status._id +'">Like</a>'
					statusList += '<li><h3>'+ status.content +' <span class="status-likes-count">Likes: '+ status.likes_count+'</span></h3>'+ '<a>'+ status.username +'</a>'+ deleteButton + likeButton +'</li>';
				});

				statusList += '</ul>';

				$('#status_container').html(statusList);
			}
		});	
	};

	getStatuses();

	$('#status_container').on('click', '.status-like', function (e) {
		var $el = $(this),
			_id = $el.attr('data-id');

		$.ajax({
			url: 'http://localhost:4100/statuses/'+ _id,
			dataType: 'json',
			type: 'PUT',
		    contentType: "application/json; charset=utf-8",
			data: JSON.stringify({ status: { likes_count: 1} }),
			success: function (res) {
				getStatuses();
			}
		});
	});

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

	var $username = $('input[name="username"]');
	$username.on('change', function (e) {
		e.preventDefault();

		if ($username.val().length < 1) {
			return alert('your username can not be empty');
		}

		username = $username.val();
	});
});