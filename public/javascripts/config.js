'use strict';
$(document).ready(function () {
	$("#createBtn").click(function () {
		$.ajax({
			url: "/api",
			data: $('form').serialize(),
			type: "POST",
			dataType: "json",
			success: function (data) {
				alert(JSON.stringify(data.message));
				$("#createModal").modal('toggle');
			},
			fail: function (data) {
				alert(JSON.stringify(data.message));
			}
		})
	})
});
