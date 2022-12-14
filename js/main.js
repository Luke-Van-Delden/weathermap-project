// Gathers data and displays current weather
$.get("http://api.openweathermap.org/data/2.5/weather", {
    APPID: weatherKey,
    lat: 29.423017,
    lon: -98.48527,
    units: "imperial"
}).done(function (data) {
    displayInfoCurrent(data);
});

// Gathers data and displays forecast for 5 days
$.get("http://api.openweathermap.org/data/2.5/forecast", {
    APPID: weatherKey,
    lat: 29.423017,
    lon: -98.48527,
    units: "imperial"
}).done(function (data) {
    $('#topofpage').html("Weathermap: " + data.city.name)
    data.list.forEach(displayInfoForecast);
});


// Creates Map focused on San Antonio
mapboxgl.accessToken = mapKey;
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    zoom: 9,
    center: [-98.48527, 29.423017],
});

// Creates original marker on San Antonio, dragable
const marker = new mapboxgl.Marker({
    draggable: true
})
    .setLngLat([-98.48527, 29.423017])
    .addTo(map);

// Initialize the GeolocateControl.
const geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
});

// Adds Mapbox feaatures for clickable zoom / zoomout and Location
map.addControl(new mapboxgl.NavigationControl());
map.addControl(geolocate);

// When dragend function for marker - displays updated info and centers on marker
function onDragEnd() {
    const lngLat = marker.getLngLat();
    $.get("http://api.openweathermap.org/data/2.5/weather", {
        APPID: weatherKey,
        lat: lngLat.lat,
        lon: lngLat.lng,
        units: "imperial"
    }).done(function (data) {
        let original = $('#forecast').html()
        if (original !== "") {
            $('#forecast').html("")
        }
        displayInfoCurrent(data);
        map.flyTo({
            center: [data.coord.lon, data.coord.lat],
            essential: true, // this animation is considered essential with respect to prefers-reduced-motion
            zoom: 13
        });
    });
    $.get("http://api.openweathermap.org/data/2.5/forecast", {
        APPID: weatherKey,
        lat: lngLat.lat,
        lon: lngLat.lng,
        units: "imperial"
    }).done(function (data) {
        $('#topofpage').html("Weathermap: " + data.city.name)
        data.list.forEach(displayInfoForecast);
    });
}

marker.on('dragend', onDragEnd)

// Creates new marker on mouseclick, updates current and forecasted weather at that location- is draggable
map.on('click', (e) => {
    marker
        .setLngLat(e.lngLat)
    $.get("http://api.openweathermap.org/data/2.5/weather", {
        APPID: weatherKey,
        lat: e.lngLat.lat,
        lon: e.lngLat.lng,
        units: "imperial"
    }).done(function (data) {
        let original = $('#forecast').html()
        if (original !== "") {
            $('#forecast').html("")
        }
        displayInfoCurrent(data);
        map.flyTo({
            center: [data.coord.lon, data.coord.lat],
            essential: true, // this animation is considered essential with respect to prefers-reduced-motion
            zoom: 13
        });
    });
    $.get("http://api.openweathermap.org/data/2.5/forecast", {
        APPID: weatherKey,
        lat: e.lngLat.lat,
        lon: e.lngLat.lng,
        units: "imperial"
    }).done(function (data) {
        $('#topofpage').html("Weathermap: " + data.city.name)
        data.list.forEach(displayInfoForecast);
    });
});

// Searches for value entered, flys to location, updates current and forecasted info
$('#searchbtn').click(function (e) {
    e.preventDefault();
    let searchFor = $('#addresssearch').val();
    $.get("http://api.openweathermap.org/data/2.5/weather", {
        APPID: weatherKey,
        q: searchFor,
        units: "imperial"
    }).done(function (data) {
        let original = $('#forecast').html()
        if (original !== "") {
            $('#forecast').html("")
        }
        displayInfoCurrent(data);
        map.flyTo({
            center: [data.coord.lon, data.coord.lat],
            essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });
        marker.setLngLat(data.coord)
    });
    $.get("http://api.openweathermap.org/data/2.5/forecast", {
        APPID: weatherKey,
        q: searchFor,
        units: "imperial"
    }).done(function (data) {
        $('#topofpage').html("Weathermap: " + data.city.name)

        data.list.forEach(displayInfoForecast);
    });
})

// Function to generate info for current day
function displayInfoCurrent(data) {
    $('#current').html('<div class="row d-flex space-between flex-wrap divbox mb-3 mt-3"><div class="d-flex justify-content-center bg-secondary flex-grow-1"><span>Current Weather</span></div><div class="d-flex flex-grow-1 justify-content-center"> Temp: <span>' + data.main.temp + 'F</span></div><div class="d-flex flex-grow-1 justify-content-center"> Weather: <span>' + data.weather[0].main + '</span></div><div class="d-flex justify-content-center border-bottom"><img src="http://openweathermap.org/img/w/' + data.weather[0].icon + '.png" alt="Weathericon"></div><div class="d-flex justify-content-center border-bottom">Humidity: <span>' + data.main.humidity + '</span></div><div class="d-flex justify-content-center border-bottom">Wind: <span>' + data.wind.speed + 'mph</span></div><div class="d-flex justify-content-center"> Pressure: <span>' + data.main.pressure + '</span></div></div>')

}

// Function to generate info per day
function displayInfoForecast(data) {
    if (data.dt_txt.indexOf("15:00:00") !== -1) {
        $('#forecast').append('<div class="row d-flex space-between flex-wrap divbox mb-3"><div class="d-flex justify-content-center bg-secondary flex-grow-1">Date: <span>' + data.dt_txt + '</span></div><div class="d-flex flex-grow-1 justify-content-center"> Temp: <span>' + data.main.temp + 'F</span></div><div class="d-flex flex-grow-1 justify-content-center"> Weather: <span>' + data.weather[0].main + '</span></div><div class="d-flex justify-content-center border-bottom"><img src="http://openweathermap.org/img/w/' + data.weather[0].icon + '.png" alt="Weathericon"></div><div class="d-flex justify-content-center border-bottom">Humidity: <span>' + data.main.humidity + '</span></div><div class="d-flex justify-content-center border-bottom">Wind: <span>' + data.wind.speed + 'mph</span></div><div class="d-flex justify-content-center"> Pressure: <span>' + data.main.pressure + '</span></div></div>')
    }
}
