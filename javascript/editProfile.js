
function save() {
	var data = {}
	data.mail = "aa" // TODO: get profile email
	data.username = $("#newName").val();
	data.desc = $("#newDesc").val();
	console.log(JSON.stringify(data));
	$.ajax({
		// URL for request
		url: 'saveProfile',
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
				// TODO: Change image as well
			
			}
		},
		// On Failure, print error to console
		error: function(status, errorThrown) {
			console.log ("Error: " + errorThrown + ", Status: " + status);
			
		}
	}); 
}

function changePass() {
	if ($("#newPass").val() != $("#newpassConfirmation").val())
		$(".msg").html("Passwords don't match");
	else {
		console.log("Matches");
	}
}