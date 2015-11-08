$.ajaxSetup({
    timeout: 2000
});
function submit() {
	console.log("Submit Registration");
	var data = {}
	if ($("#verifyPassField").val() != $("#passField").val())
		$("#msg").html("Passwords don't match");
	else {
		data.mail = $("#emailField").val();
		data.pass = $("#passField").val();
		data.IP = clientIP;
		console.log(JSON.stringify(data));
		$.ajax({
			// URL for request
			url: 'registration',
			// Request type
			type: "POST",
			// Data sent
			data: JSON.stringify(data),
			contentType: 'application/json',
			// Expected return data
			dataType: "html",
			// On Success
			success: function(data) {
				if (data === "Success") {
					setTimeout(function() {
						window.location.href = "/";
					}, 1500);
					$("#msg").html("Registration Successful, redirecting to main page");
				} else if (data === "User Exists") {
					$("#msg").html("Email already in use.");
				} else if (data === "Invalid") {
					$("#msg").html("Invalid Name/Password");
				}
				else {
					$("#msg").html("An error has occured. Please try again.");
				}
			},
			// On Failure, print error to console
			error: function(status, errorThrown) {
				console.log ("Error: " + errorThrown + ", Status: " + status);
				
			}
		}); 
	}
}