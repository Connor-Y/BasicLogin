
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
			// On Failure, print error to console
			error: function(status, errorThrown) {
				console.log ("Error: " + errorThrown + ", Status: " + status);
				
			}
		}); 
	}
}
function changePass() {
	if ($("#newPass").val() != $("#newpassConfirmation").val())
		$(".msg").html("Passwords don't match");
	else {
		console.log("Matches");
	}
}