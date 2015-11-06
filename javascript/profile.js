
function editProfile () {
	moveTo('editProfile');
	
}

function deleteProfile () {
	// TODO: delete profile from DB
	getSession(deleteUser);
	
	function deleteUser(rawData) {
		$.ajax({
			// URL for request
			url: 'deleteProfile',
			// Request type
			type: "POST",
			// Data sent
			data: JSON.stringify(rawData),
			contentType: 'application/json',
			// Expected return data
			dataType: "html",
			// On Success
			success: function(data) {
				if (data == "Error") {
					console.log("An Error has occurred");
					moveTo('index');
				}
				else {
					moveTo('index');
				}
			},
			// On Failure, print error to console
			error: function(status, errorThrown) {
				console.log ("Error: " + errorThrown + ", Status: " + status);
			}
		});  
	}
}

$(window).ready( function () {
	console.log("Display Profile");
	getSession(displayData);
	
	function displayData(rawData) {
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
					console.log(data);
					var username;
					if (data.username == undefined)
						username = data.email;
					else
						username = data.username;
					var txt = "Email: <br> " + data.email + "<br> Username: <br> " + username + "<br> Description: <br>" + data.desc; 
					$("#infoPane").html(txt);
					// TODO: Change image as well
					console.log("sessdata: " + rawData.sessType);
					if (rawData.sessMail != rawData.sessView && !(rawData.sessType == 'admin' || rawData.sessType == 'super'))
						$("#editBtn").hide();
					if (!(rawData.sessType == 'admin' || rawData.sessType == 'super'))
						$("#deleteBtn").hide();
				}
			},
			// On Failure, print error to console
			error: function(status, errorThrown) {
				console.log ("Error: " + errorThrown + ", Status: " + status);
				
			}
		});  
	}
});

