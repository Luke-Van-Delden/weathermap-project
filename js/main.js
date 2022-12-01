
// This logs current weather data
$.get("http://api.openweathermap.org/data/2.5/weather", {
    APPID: weatherKey,
    lat:    29.423017,
    lon:   -98.48527,
    units: "imperial"
}).done(function(data) {
    console.log('current weather', data);
});

// This logs forecasted data
$.get('http://api.openweathermap.org/data/2.5/forecast?lat=29.423017&lon=-98.48527&appid=' + weatherKey).done(function(data) {
    console.log('5 day forecast', data);
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