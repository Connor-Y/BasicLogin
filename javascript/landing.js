
$(window).ready( function() {
	$.ajax({
			// URL for request
			url: 'loadTable',
			// Request type
			type: "POST",

			// Expected return data
			dataType: "json",
			// On Success
			success: function(data) {
				console.log("Success");
				console.log(data);
				if (data) {
					var len = data.length;
					var txt = "";
					if (len > 0) {
						for (var i = 0; i < len; i++) {
							if (data[i] == undefined)
								continue;
							
							var displayName = data[i].username;
							
							if (displayName === "")
								displayName = data[i].email;
							
							txt += "<tr><td>" + displayName + "</td><td class='mail'>" + data[i].email + "</td></tr>";	
						}
						if (txt != "") {
							$("#userTable tbody").append(txt);
						}
					}
					clickableTable();
				}
			},
			
			error: function(status, errorThrown) {
				console.log ("Error: " + errorThrown + ", Status: " + status);
			}
	});
});

function clickableTable () {
	$('#userTable tbody tr').on("click", function () {
		var mail = $(this).find(".mail").html();
		moveTo('profile');
	});
}






	