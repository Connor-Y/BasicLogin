
$.ajaxSetup({
    timeout: 2000
});
$(window).ready(function () {
	$.ajax({
			// URL for request
			url: 'loadMetrics',
			// Request type
			type: "POST",
			// Expected return data
			dataType: "json",
			// On Success
			success: function(data) {
				if (data == "Invalid") {
					moveTo('landing');
					return false; 
				}
				if (data) {
					var len = data.length;
					var txt = "";
					if (len > 0) {
						console.log(data[0]);
						for (var i = 0; i < len; i++) {
							if (data[i] == undefined)
								continue;
							var user;
							if (data[i].user == "")
								user = "Guest";
							else
								user = data[i].user;
							txt += "<tr><td>" + user + "</td><td>" + data[i].page + "</td><td>"
							+ data[i].latitude + "</td><td>" + data[i].longitude
							+ "</td><td>" + data[i].os + "</td><td>" + data[i].browser + "</td></tr>";
							console.log("Next Row: " + txt);
						}
						if (txt != "") {
							$("#metricTable tbody").append(txt);
						}
					}
					clickableTable();
				}
			},
			
			error: function(status, errorThrown) {
				console.log ("Error: " + errorThrown + ", Status: " + status);
				moveTo('landing');
			}
	});
});