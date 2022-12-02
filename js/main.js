// TODO: Make a click button to change the time of forecast for the 5 days
// TODO: Move marker to search result



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
    $('#current').html('<p>Current: Temp ' + data.main.temp + 'F. Weather: ' + data.weather[0].main + ' Humidity: ' + data.main.humidity + ' Wind: ' + data.wind.speed + 'mph Pressure: ' + data.main.pressure + '</p>')
    $('#current').html('<div class="row d-flex space-between flex-wrap divbox mb-3 mt-3"><div class="d-flex justify-content-center bg-secondary flex-grow-1">Current</div><div class="d-flex flex-grow-1 justify-content-center"> Temp: ' + data.main.temp + 'F</div><div class="d-flex flex-grow-1 justify-content-center"> Weather: ' + data.weather[0].main + '</div><div class="d-flex justify-content-center border-bottom"><img src="http://openweathermap.org/img/w/' + data.weather[0].icon + '.png"></div><div class="d-flex justify-content-center border-bottom">Humidity: ' + data.main.humidity + '</div><div class="d-flex justify-content-center border-bottom">Wind: ' + data.wind.speed + 'mph</div><div class="d-flex justify-content-center"> Pressure: ' + data.main.pressure + '</div></div>')

}

// Function to generate info per day
function displayInfoForecast(data) {
    if (data.dt_txt.indexOf("15:00:00") !== -1) {
        let test = $('#forecast').append('<div class="row d-flex space-between flex-wrap divbox mb-3"><div class="d-flex justify-content-center bg-secondary flex-grow-1">Date: ' + data.dt_txt + '</div><div class="d-flex flex-grow-1 justify-content-center"> Temp: ' + data.main.temp + 'F</div><div class="d-flex flex-grow-1 justify-content-center"> Weather: ' + data.weather[0].main + '</div><div class="d-flex justify-content-center border-bottom"><img src="http://openweathermap.org/img/w/' + data.weather[0].icon + '.png"></div><div class="d-flex justify-content-center border-bottom">Humidity: ' + data.main.humidity + '</div><div class="d-flex justify-content-center border-bottom">Wind: ' + data.wind.speed + 'mph</div><div class="d-flex justify-content-center"> Pressure: ' + data.main.pressure + '</div></div>')
    }
}

// Takes in input of search, stores as searchFor
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
        const marker = new mapboxgl.Marker({
            draggable: true
        })
            .setLngLat(data.coord)
            .addTo(map);
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
            });
            $.get("http://api.openweathermap.org/data/2.5/forecast", {
                APPID: weatherKey,
                lat: lngLat.lat,
                lon: lngLat.lng,
                units: "imperial"
            }).done(function (data) {
                data.list.forEach(displayInfoForecast);
            });
        }
        marker.on('dragend', onDragEnd)
    });
    $.get("http://api.openweathermap.org/data/2.5/forecast", {
        APPID: weatherKey,
        q: searchFor,
        units: "imperial"
    }).done(function (data) {
        data.list.forEach(displayInfoForecast);
    });
})

// TODO: DONE -Creates map zoomed out, centered on San Antonio
mapboxgl.accessToken = mapKey;
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    zoom: 10,
    center: [-98.48527, 29.423017],
});
// Initialize the GeolocateControl.
const geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
});
// Add the control to the map.
map.addControl(geolocate);
// Set an event listener that fires
// when a geolocate event occurs.
geolocate.on('geolocate', () => {
    console.log('A geolocate event has occurred.');
});
// Example of a MapMouseEvent of type "click"
map.on('click', (e) => {
    const marker = new mapboxgl.Marker({
        draggable: true
    })
        .setLngLat(e.lngLat)
        .addTo(map);
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
    });
    $.get("http://api.openweathermap.org/data/2.5/forecast", {
        APPID: weatherKey,
        lat: e.lngLat.lat,
        lon: e.lngLat.lng,
        units: "imperial"
    }).done(function (data) {
        data.list.forEach(displayInfoForecast);
    });

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
        });
        $.get("http://api.openweathermap.org/data/2.5/forecast", {
            APPID: weatherKey,
            lat: lngLat.lat,
            lon: lngLat.lng,
            units: "imperial"
        }).done(function (data) {
            data.list.forEach(displayInfoForecast);
        });
    }
    marker.on('dragend', onDragEnd)
});