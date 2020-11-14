var domdbapikey = "828aefa5"



$("#cityNameInput").on("click", function(){
    var cityname  = $("#cityName").val()
    console.log(cityname)
    //RUN FUNCTION TO GET
    var getRandomInt = Math.floor(Math.random() * 1999999) + 1000000;
    
    console.log(getRandomInt)

    $.ajax({
      url: "http://www.omdbapi.com/?apikey="+domdbapikey+"&i=tt"+getRandomInt,
      method: "GET"
    }).then(function(response) {
      $("#movie-view").text(JSON.stringify(response));
    });

  })