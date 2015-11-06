
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
		moveTo('profile');
		console.log("Display Profile");
		var query = {};
		query.mail = $(this).find(".mail").html(); 
		console.log(JSON.stringify(query));
		$.ajax({
			// URL for request
			url: 'profile',
			// Request type
			type: "POST",
			// Data sent
			data: JSON.stringify(query),
			contentType: 'application/json',
			// Expected return data
			dataType: "json",
			// On Success
			success: function(data) {
				if (data == "Error") {
					console.log("An Error has occured");
					moveTo('index');
				}
				else {
					console.log("Current Sess: " + data.sess);
					var username;
					if (data.username == undefined)
						username = data.email;
					else
						username = data.username;
					var txt = "Email: <br> " + data.email + "<br> Username: <br> " + username + "<br> Description: <br>" + data.desc; 
					$("#infoPane").html(txt);
					// TODO: Change image as well
					console.log("type: " + data.sessType);
					if (data.sessMail != query.mail && !(data.sessType == 'admin' || data.sessType == 'super'))
						$("#editBtn").hide();
				
				}
			},
			// On Failure, print error to console
			error: function(status, errorThrown) {
				console.log ("Error: " + errorThrown + ", Status: " + status);
				
			}
		}); 
	});
}	
		






	