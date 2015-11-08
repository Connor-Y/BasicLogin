

function moveTo(page) {
	$.ajax({
		// URL for request
		url: page + '.html',
		// Request type
		type: "GET",
		// Expected data
		dataType: "html",
		// On Success, atttempt to perform action on received data.
		success: function(newFile) {
			console.log("Load Success");
			$("#swapPane").html(newFile);
		},
		// On Failure, print error to console
		error: function(status, errorThrown) {
			console.log ("Error: " + errorThrown + ", Status: " + status);
			
		}
	});
}

function getSession(callback) {
	console.log("getSession");
	$.ajax({
		// URL for request
		url: 'getSession',
		// Request type
		type: "POST",
		// Expected data
		dataType: "json",
		// On Success, atttempt to perform action on received data.
		success: function(sess) {
			console.log("getSession sess: " + JSON.stringify(sess));
			callback(sess);
			
			
		},
		// On Failure, print error to console
		error: function(status, errorThrown) {
			console.log ("Error: " + errorThrown + ", Status: " + status);
			
		}
	});
	
}

function logoClicked() {
	getSession(isLoggedIn);	
	
	function isLoggedIn(rawData) {
		if (rawData.result === "Invalid")
			moveTo('index');
		else
			moveTo('landing');	 
	}	
}
	