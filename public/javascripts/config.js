'use strict';
$(document).ready(function () {

	$("#createBtn").click(function () {
		$.ajax({
			url: "/api",
			data: $('form').serialize(),
			type: "POST",
			dataType: "json",
			success: function (data) {
				var newContent = '<div class="col-md-4 card-loop" card-id="' + data._id + '">' +
						'<div class="card mb-4 box-shadow">' +
						'<img class="card-img-top"' +
						'alt="Card image cap" height="225" width="348" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22348%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20348%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16210450e5b%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A17pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16210450e5b%22%3E%3Crect%20width%3D%22348%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22116.7265625%22%20y%3D%22120.3%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E">' +
						'<div class="card-body">' +
						'<h5 class="card-title">' + data.title + '</h5>' +
						'<p class="card-text">' + data.description + '</p>' +
						'<div class="d-flex justify-content-between align-items-center">' +
						'<div class="btn-group">' +
						'<button type="button" class="btn btn-sm btn-outline-secondary btnCardEdit" dbID="' + data._id + '">Edit</button>' +
						'<button type="button" class="btn btn-sm btn-outline-secondary btnCardDelete" dbID="' + data._id + '">Delete</button>' +
						'</div>' +
						'</div>' +
						'</div>' +
						'</div>' +
						'</div>';

				alert(JSON.stringify("Create Success!"));
				$("#createModal").modal('toggle');
				$(".row").append(newContent);
			},
			fail: function (data) {
				alert(JSON.stringify(data.message));
			}
		})
	});

	$(".btnCardEdit").click(function () {
		var data = $(this).attr("dbID");
		alert('Edit: ' + data);
	});


	$(".btnCardDelete").click(function () {

		var dbID = $(this).attr("dbID");
		var delURL = '/api/' + dbID;

		$("#btnYNDelete").attr("dbID", dbID);

		$("#ynModel").modal('toggle');

	});

	$("#btnYNDelete").click(function () {
		var id = $(this).attr("dbID");

		$.ajax({
			url: '/api/' + id,
			type: "DELETE",
			success: (data) => {
				alert(JSON.stringify(data.message));
				$(this).removeAttr("dbID");
				$('.card-loop[card-id="' + id + '"]').remove();
				$("#ynModel").modal('hide');
			},
			error: (data) => {
				alert(JSON.stringify(data.message));
			}
		})
	});

});
