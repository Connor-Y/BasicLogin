$.ajaxSetup({
    timeout: 2000
});

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
					moveTo('landing');
				}
			},
			// On Failure, print error to console
			error: function(status, errorThrown) {
				console.log ("Error: " + errorThrown + ", Status: " + status);
			}
		});  
	}
}

function toggleAdmin () {
	
	getSession(toggle);
	
	function toggle(sessData) {
		$.ajax({
			// URL for request
			url: 'toggleAdmin',
			// Request type
			type: "POST",
			// Data sent
			contentType: 'application/json',
			data: JSON.stringify(sessData),
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
					$("#msg").html(data);
					
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
	// If not logged in, move back to front page
	if (typeof getSession == "undefined") {
		console.log("Undefined Session");
		window.location.href = '/';
	}
	// Get the current users data
	getSession(displayData);
	// Display the selected profile
	// Along with buttons that the current user has access to.
	function displayData(rawData) {
		console.log("Raw Data: " + rawData);
		
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
					if (rawData.sessMail == undefined)
						moveTo('landing');
					if (rawData.sessMail != rawData.sessView && (!(rawData.sessType == 'admin' || rawData.sessType == 'super') || (rawData.sessTargetType == 'admin' || rawData.sessTargetType == 'super')))
						$("#editBtn").hide();
					if (!(rawData.sessType == 'admin' || rawData.sessType == 'super') || (rawData.sessTargetType == 'admin' || rawData.sessTargetType == 'super'))
						$("#deleteBtn").hide();
					if (rawData.sessType != 'super' || rawData.sessView == rawData.sessMail)
						$("#toggleAdmin").hide()
					if (rawData.sessType == 'super' && rawData.sessView != rawData.sessMail) {
						$("#deleteBtn").show();
						$("#editBtn").show();
					}
				}
			},
			// On Failure, print error to console
			error: function(status, errorThrown) {
				console.log ("Error: " + errorThrown + ", Status: " + status);
				
			}
		});  
	}
});

