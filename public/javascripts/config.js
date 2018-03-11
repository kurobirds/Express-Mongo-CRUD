'use strict';

//Main
$(document).ready(function () {

	async:false;

	//validate Image URL

	function imageExists(url, callback) {
		var img = new Image();
		img.onload = function () {
			callback(true);
		};
		img.onerror = function () {
			callback(false);
		};
		img.src = url;
	}

	function validateImageURL(card, imageUrl) {
		imageExists(imageUrl, function (exists) {

			//Show the result
			// console.log('Fileexists=' + exists);
			// alert('Fileexists=' + exists);

			if (exists) {
				card.find('.card-img-top').attr("src", imageUrl)
			}
			else {
				card.find('.card-img-top').attr("src", "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22348%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20348%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1621112864c%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A17pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1621112864c%22%3E%3Crect%20width%3D%22348%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22116.7265625%22%20y%3D%22120.3%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E");
			}
		});
	}


	$(document).on('click', '#btnCreate', function () {
		$.ajax({
			url: "/api",
			data: $('#frmCreate').serialize(),
			type: "POST",
			dataType: "json",
			success: function (data) {
				var newContent = '<div class="col-md-4 card-loop" card-id="' + data._id + '">\n' +
						'\t\t\t\t\t\t<div class="card mb-4 box-shadow">\n' +
						'\t\t\t\t\t\t\t<img class="card-img-top"\n' +
						'\t\t\t\t\t\t\t\t alt="Card image cap" height="225" width="348">\n' +
						'\t\t\t\t\t\t\t<div class="card-body">\n' +
						'\t\t\t\t\t\t\t\t<h5 class="card-title">' + data.title + '</h5>\n' +
						'\t\t\t\t\t\t\t\t<p class="card-text">' + data.description + '</p>\n' +
						'\t\t\t\t\t\t\t\t<div class="d-flex justify-content-between align-items-center">\n' +
						'\t\t\t\t\t\t\t\t\t<div class="btn-group">\n' +
						'\t\t\t\t\t\t\t\t\t\t<button type="button" class="btn btn-sm btn-outline-primary btnCardEdit"\n' +
						'\t\t\t\t\t\t\t\t\t\t\t\tdbID="' + data._id + '">Edit\n' +
						'\t\t\t\t\t\t\t\t\t\t</button>\n' +
						'\t\t\t\t\t\t\t\t\t\t<button type="button" class="btn btn-sm btn-outline-danger btnCardDelete"\n' +
						'\t\t\t\t\t\t\t\t\t\t\t\tdbID="' + data._id + '">Delete\n' +
						'\t\t\t\t\t\t\t\t\t\t</button>\n' +
						'\t\t\t\t\t\t\t\t\t</div>\n' +
						'\t\t\t\t\t\t\t\t</div>\n' +
						'\t\t\t\t\t\t\t</div>\n' +
						'\t\t\t\t\t\t</div>\n' +
						'\t\t\t\t\t</div>';

				alert(JSON.stringify("Create Success!"));
				$("#createModal").modal('toggle');
				$(".row").append(newContent);
				var card = $('.card-loop[card-id="' + data._id + '"]');
				validateImageURL(card, data.images);
			},
			fail: function (data) {
				alert(JSON.stringify(data.message));
			}
		})
	});


	//Update event
	$(document).on('click', '.btnCardEdit', function () {
		var id = $(this).attr("dbID");
		var url = '/api/' + id;

		$.ajax({
			url,
			type: "GET",
			success: (data) => {
				$("#updateCharTitle").val(data.title);
				$("#updateCharDescription").val(data.description);
				$("#updateCharImage").val(data.images);
				$("#updateModal").modal('toggle');
				$("#btnUpdate").attr("dbID", id);
			},
			fail: (data) => {
				alert(JSON.stringify(data.message));
			}
		});

	});


	$(document).on('click', '#btnUpdate', function () {

		var id = $(this).attr("dbID");

		$.ajax({
			url: '/api/' + id,
			data: $('#frmUpdate').serialize(),
			type: "PUT",
			dataType: "json",
			success: (data) => {
				alert("Update success");
				$("#updateModal").modal('toggle');
				var card = $('.card-loop[card-id="' + id + '"]');
				card.find('.card-title').text(data.title);
				card.find('.card-text').text(data.description);
				validateImageURL(card, data.images);
			},
			error: (data) => {
				alert(JSON.stringify(data.message));
			}
		})
	});


	//Delete event
	$(document).on('click', '.btnCardDelete', function () {

		var dbID = $(this).attr("dbID");
		var delURL = '/api/' + dbID;

		$("#btnYNDelete").attr("dbID", dbID);

		$("#ynModal").modal('toggle');

	});

	$(document).on('click', '#btnYNDelete', function () {
		var id = $(this).attr("dbID");

		$.ajax({
			url: '/api/' + id,
			type: "DELETE",
			success: (data) => {
				alert(JSON.stringify(data.message));
				$(this).removeAttr("dbID");
				$('.card-loop[card-id="' + id + '"]').remove();
				$("#ynModal").modal('hide');
			},
			error: (data) => {
				alert(JSON.stringify(data.message));
			}
		})
	});

});
