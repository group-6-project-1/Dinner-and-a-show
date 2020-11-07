//calling Eventbrite AJAX

var settings = {
//"async" : true,
//"crossDomain": true,
"url": "https://www.eventbriteapi.com/v3/events/49216045517/",
"method": "GET",
"headers": {
        "Authorization": "Token X5QLAUR2EJUE5JM7JGSU",
        "Content-Type": "application/json"
        
    }
}

$.ajax(settings).then(function (response) {
    console.log(response)
});