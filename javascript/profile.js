
$(window).ready( function () {
	console.log("Display Profile");
	var data = {}
	data.mail = "aa" // TODO: get profile email
	console.log(JSON.stringify(data));
	$.ajax({
		// URL for request
		url: 'profile',
		// Request type
		type: "POST",
		// Data sent
		data: JSON.stringify(data),
		contentType: 'application/json',
		// Expected return data
		dataType: "json",
		// On Success
		success: function(data) {
			if (data == "Error") {
				console.log("An Error has occured");
				moveTo('index');
				// TODO: Insert data into html
			}
			else {
				console.log(data);
				var username;
				if (data.username == undefined)
					username = data.email;
				else
					username = data.username;
				var txt = "Email: <br> " + data.email + "<br> Username: <br> " + username + "<br> Description: <br>" + data.desc; 
				$("#infoPane").html(txt);
			
			}
		},
		// On Failure, print error to console
		error: function(status, errorThrown) {
			console.log ("Error: " + errorThrown + ", Status: " + status);
			
		}
	}); 
});