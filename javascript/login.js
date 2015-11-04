

function submit() {
	console.log("Submit Login");
	var data = {}
	data.mail = $("#emailField").val();
	data.pass = $("#passField").val();
	console.log(JSON.stringify(data));
	$.ajax({
		// URL for request
		url: 'loginVerification',
		// Request type
		type: "POST",
		// Data sent
		data: JSON.stringify(data),
		contentType: 'application/json',
		// Expected return data
		dataType: "html",
		// On Success
		success: function(data) {
			if (data == "Success") {
				moveTo('landing');
				// TODO: Move to landing
			}
			else 
				$("#msg").html(data);
		},
		// On Failure, print error to console
		error: function(status, errorThrown) {
			console.log ("Error: " + errorThrown + ", Status: " + status);
			
		}
	}); 
}