$.ajaxSetup({
    timeout: 2000
});

$(window).ready( function() {
	console.log("---");
	$.ajax({
			// URL for request
			url: 'loadTable',
			// Request type
			type: "POST",
			// Expected return data
			dataType: "json",
			// On Success
			success: function(data) {
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
		getSession(isLoggedIn);	
		var query = {};
		query.mail = $(this).find(".mail").html();
		
		function isLoggedIn(rawData) {
			if (rawData.result === "Invalid")
				return false; 
	
			moveTo('profile');
			console.log("Display Profile");
			 
			console.log(JSON.stringify(query));
			$.ajax({
				// URL for request
				url: 'setView',
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
						console.log("An Error has occurred");
						moveTo('landing');
					}
					else {
						moveTo('profile');
					}
				},
				// On Failure, print error to console
				error: function(status, errorThrown) {
					console.log ("Error: " + errorThrown + ", Status: " + status);
					
				},
				timeout: 2000
			}); 
		}
	});
}	






	