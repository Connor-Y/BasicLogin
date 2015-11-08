
$.ajaxSetup({
    timeout: 2000
});


function getLocation(page) {
    if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (position) {
			logData([position.coords.latitude, position.coords.longitude], page)});
	} else {
       alert("Geolocation is not supported by this browser.");
	   logData([], page);
    }
}


function logData(coords, page) {
	data = {};
	if (coords.length == 0) {
		data.lati = "";
		data.longi = "";
	} else {
		data.lati = coords[0].toString();
		data.longi = coords[1].toString();
	}
	data.ip = "0";
	data.pg = page;
	data.os = navigator.platform;
	data.browser = navigator.userAgent;
	console.log("Move To Client Data: " + JSON.stringify(data));
	$.ajax({
		// URL for request
		url: 'logInfo',
		// Request type
		type: "POST",
		// Data sent
		data: JSON.stringify(data),
		contentType: 'application/json',
		// Expected data
		dataType: "html",
		// On Success, atttempt to perform action on received data.
		success: function(data) {
			console.log("log " + data);
		},
		// On Failure, print error to console
		error: function(status, errorThrown) {
			console.log ("Error: " + errorThrown + ", Status: " + status);
		},
		timeout: 2000
	});	
}
	
	
function moveTo(page) {
	getLocation(page);
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
			$("swapPane").html("An Error Has Occurred.");
		},
		timeout: 2000
	});
}





function getSession(callback) {
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


function logoutClicked() {
	$.ajax({
		// URL for request
		url: 'logout',
		// Request type
		type: "POST",
		// Expected data
		dataType: "html",
		// On Success, atttempt to perform action on received data.
		success: function(data) {
			if (data == "Success")
				moveTo('index');
		},
		// On Failure, print error to console
		error: function(status, errorThrown) {
			console.log ("Error: " + errorThrown + ", Status: " + status);
			
		}
	});
	
	
}
	