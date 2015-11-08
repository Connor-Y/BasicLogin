
$.ajaxSetup({
    timeout: 2000
});
$(window).ready({
	$.ajax({
			// URL for request
			url: 'loadMetrics',
			// Request type
			type: "POST",
			// Expected return data
			dataType: "json",
			// On Success
			success: function(data) {
				if (data) {
					console.log(data);
					var len = data.length;
					var txt = "";
					if (len > 0) {
						for (var i = 0; i < len; i++) {
							if (data[i] == undefined)
								continue;
							
							
						//	txt += "<tr><td>" + displayName + "</td><td class='mail'>" + data[i].email + "</td></tr>";	
						//	txt += "<tr><td>" + 
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