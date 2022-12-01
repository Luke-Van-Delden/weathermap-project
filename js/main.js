// This logs current weather data
$.get("http://api.openweathermap.org/data/2.5/weather", {
    APPID: weatherKey,
    lat: 29.423017,
    lon: -98.48527,
    units: "imperial"
}).done(function (data) {
    // console.log('current weather', data);
    displayInfoCurrent(data);
});

function displayInfoCurrent(data) {
    $('#current').html('<p>Current: Temp ' + data.main.temp + 'F. Weather: ' + data.weather[0].main + ' Humidity: ' + data.main.humidity + ' Wind: ' + data.wind.speed + 'mph  </p>')
}


function displayInfoForecast(data) {
        let original = $('#forecast').html();
        if (data.dt_txt.indexOf("00:00:00") !== -1)
    {
        let test = $('#forecast').append('<p>Date: ' + data.dt_txt + '</p>')
    }
}


// #("<p style='font-weight: bold; font-size: 16px; text-align: center; display: inline-block'>" + x.name + ' is in the ' + x.genre + ' genre. My favorite dish there is ' + x.favorite + ' and it is ' + x.fancy + ".</p><br><div>" + x.picture + '</div>')
// marker.setPopup(pop);

// current needs to show:
//     Date
// Temp
// Description (cloudy, sunny etc)
// humidity
// wind
// pressure

// This logs forecasted data
$.get('http://api.openweathermap.org/data/2.5/forecast?lat=29.423017&lon=-98.48527&appid=' + weatherKey).done(function (data) {
    console.log('5 day forecast', data);
    data.list.forEach(displayInfoForecast);
});

// Logs basic data
// $.get("http://api.openweathermap.org/data/2.5/onecall", {
//     APPID: weatherKey,
//     lat:    29.423017,
//     lon:   -98.48527,
//     units: "imperial"
// }).done(function(data) {
//     console.log('The entire response:', data);
//     console.log('Diving in - here is current information: ', data.current);
//     console.log('A step further - information for tomorrow: ', data.daily[1]);
// });


// TODO: DONE -Creates map zoomed out, centered around golden dragon
// mapboxgl.accessToken = mapBoxKey;
// var map = new mapboxgl.Map({
//     container: 'map',
//     style: 'mapbox://styles/mapbox/streets-v9',
//     zoom: 10,
//     center: [-98.52921778721883, 29.54246088109029],
// });