weatherAPIkey = "bd7544f64bf587d19477113cdaf0ae60";
weatherURL = "http://api.openweathermap.org/data/2.5/weather?q=";


// Input for user to submit the location of the place they want the weather for//
$(document).ready(function(){
     $('#submit').click(function(){
        let location = $("#location").val();
        // function to call weather API to retrieve information//
        if (location != ''){
            $.ajax({
                url: `${weatherURL}` + location + "&units=metric" + "&appid=" + `${weatherAPIkey}`,
                method: "GET",
                dataType: "json",
                success: function(data){
                        $("#error").empty();
                        const weatherApp  = showWeather(data);
                        $('.weatherContainer').html(weatherApp);
                        $("#location").val('');
                }
            });
        } else {
            $("#error").html('Please put a city name');
        }
    });
});

// submitting input when Enter key is pressed //
$('form').on('submit', function(event){
    event.preventDefault();
  });

// display information //
function showWeather(data){
    return "<div class='transition'>" + "<img id='icon' src='http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png' alt='Icon depicting current weather.'>" +
           "<h3 class='description'>" + data.weather[0].description +"</h3>" +
           "<h2>" + data.name + " " + data.sys.country +"</h2>" +
           "<h1>" + Math.round(data.main.temp) + "</h1>" +
           "<p class='feels'>Feels like:" + " " + Math.round(data.main.feels_like) +"</p>" +
           "<p class='humidity'>Humidity:" + " " + (data.main.humidity)+ "</p>" +
            //converting wind speed from meter per second --> to miles per hour //
           "<h3>Wind:" + " " + Math.round((data.wind.speed) * 2.237) + " " + "MPH" + "</h3>" + "</div>";
};

