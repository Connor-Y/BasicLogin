

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

