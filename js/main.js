// TODO: Make a click button to change the time of forecast for the 5 days

// Creates current weather info
$.get("http://api.openweathermap.org/data/2.5/weather", {
    APPID: weatherKey,
    lat: 29.423017,
    lon: -98.48527,
    units: "imperial"
}).done(function (data) {
    displayInfoCurrent(data);
});

// Creates forecast for 5 days
$.get("http://api.openweathermap.org/data/2.5/forecast", {
    APPID: weatherKey,
    lat: 29.423017,
    lon: -98.48527,
    units: "imperial"
}).done(function (data) {
    // Use to see object attributes
    // console.log('5 day forecast', data);
    data.list.forEach(displayInfoForecast);
});

// Function to generate info for current day
function displayInfoCurrent(data) {
    $('#current').html('<p>Current: Temp ' + data.main.temp + 'F. Weather: ' + data.weather[0].main + ' Humidity: ' + data.main.humidity + ' Wind: ' + data.wind.speed + 'mph Pressure: ' + data.main.pressure +  '</p>')
}

// Function to generate info per day
function displayInfoForecast(data) {
        if (data.dt_txt.indexOf("15:00:00") !== -1)
    {
        let test = $('#forecast').append('<p>Date: ' + data.dt_txt + ' Temp: ' + data.main.temp + 'F Weather: ' + data.weather[0].main +  '<img src="http://openweathermap.org/img/w/' + data.weather[0].icon + '.png"> Humidity: ' + data.main.humidity + ' Wind: ' + data.wind.speed + 'mph Pressure: ' + data.main.pressure +  '</p>')
    }
}
// Takes in input of search, stores as searchFor
$('#searchbtn').click(function(e){
    e.preventDefault();
    let searchFor = $('#addresssearch').val();
    alert(searchFor)
})

// TODO: DONE -Creates map zoomed out, centered on San Antonio
// mapboxgl.accessToken = mapBoxKey;
// var map = new mapboxgl.Map({
//     container: 'map',
//     style: 'mapbox://styles/mapbox/streets-v9',
//     zoom: 10,
//     center: [-98.48527, 29.423017],
// });