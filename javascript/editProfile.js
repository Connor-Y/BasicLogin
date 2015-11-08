
$(window).ready( function () {
	console.log("Display Edit Profile");
	getSession(displayEditData);
	
	function displayEditData(rawData) {
		$.ajax({
			// URL for request
			url: 'profile',
			// Request type
			type: "POST",
			// Data sent
			data: JSON.stringify(rawData),
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
					var txt = "Email: <br> " + data.email;
					$("#editEmail").html(txt);
					// TODO: Change image as well
				}
			},
			// On Error, print error to console
			error: function(status, errorThrown) {
				console.log ("Error: " + errorThrown + ", Status: " + status);
				
			}
		});  
	}
});

function save() {
	getSession(saveData);

	function saveData(rawData) {
		data = {}
		data.username = $("#newName").val();
		data.desc = $("#newDesc").val();
		data.mail = rawData.sessView;
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
			dataType: "html",
			// On Success
			success: function(data) {
				if (data == "Error") {
					console.log("An Error has occurred");
					moveTo('index');
					// TODO: Insert data into html
				}
				else {
					console.log(data);
					moveTo('profile');
					// TODO: Change image as well
				
				}
			},
			// On Error, print error to console
			error: function(status, errorThrown) {
				console.log ("Error: " + errorThrown + ", Status: " + status);
				
			}
		}); 
	}
}

function changePass() {
	if ($("#newPass").val() != $("#newPassConfirmation").val())
		$("#msg").html("Passwords don't match");
	else {
		getSession(change);
		
		function change(rawData) {
			data = {}
			data.sessView = rawData.sessView;
			data.newPass = $("#newPass").val();
			data.oldPass = $("#oldPass").val();
			$.ajax({
				// URL for request
				url: 'changePassword',
				// Request type
				type: "POST",
				// Data sent
				data: JSON.stringify(data),
				contentType: 'application/json',
				// Expected return data
				dataType: "html",
				// On Success
				success: function(data) {
					if (data == "Error") {
						console.log("An Error has occurred");
						moveTo('profile');
					}
					else if (data == "Invalid") {
						$("#msg").html("Incorrect Old Password");
					}
					else {
						$("#msg").html("Password Changed");
					}
				},
				// On Error, print error to console
				error: function(status, errorThrown) {
					console.log ("Error: " + errorThrown + ", Status: " + status);
					
				}
			});
		}
	}
}