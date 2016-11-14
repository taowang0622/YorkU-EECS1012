/* jslint browser:true */

var id_global = null;
var firstTime_global = -1;

//Two locations below are for calibrating
var LOCATION1 = {
    latitude: 43.7716775,
    longitude: -79.5058877,
    u: 195,
    v: 265
};
var LOCATION2 = {
    latitude: 43.7770194,
    longitude: -79.5012091,
    u: 425,
    v: 65
};

var CACHES = [
    {
        lat: 43.7757618,
        long: -79.5027668,
        description: 'near vanier college'
    },
    {
        lat: 43.7740883,
        long: -79.5036843,
        description: 'near student center'
    }
];

var BALL_FOR_ME = document.getElementById('me');
var BALL_FOR_TARGET = document.getElementById('target');

function togglegps() {
    //show the 'me' ball
    BALL_FOR_ME.classList.remove('hideElem');

    var button = document.getElementById("togglegps");
    if (navigator.geolocation) {
        if (id_global === null) {
            id_global = navigator.geolocation.watchPosition(showPosition, handleError, {
                enableHighAccuracy: true,
                timeout: 1000
            });
            button.innerHTML = "STOP GPS";
            firstTime_global = -1;
        } else {
            navigator.geolocation.clearWatch(id_global);
            id_global = null;
            button.innerHTML = "START GPS";
        }
    } else {
        alert("NO GPS AVAILABLE");
    }
}

function handleError(error) {
    var errorstr = "Really unknown error";
    switch (error.code) {
        case error.PERMISSION_DENIED:
            errorstr = "Permission deined";
            break;
        case error.POSITION_UNAVAILABLE:
            errorstr = "Permission unavailable";
            break;
        case error.TIMEOUT:
            errorstr = "Timeout";
            break;
        case error.UNKNOWN_ERROR:
            error = "Unknown error";
            break;
    }
    alert("GPS error " + error);
}


function showPosition(position) {
    var latitude = document.getElementById("latitude");
    var longitude = document.getElementById("longitude");
    var now = document.getElementById("now");

    var lat = position.coords.latitude;
    var long = position.coords.longitude;

    latitude.innerHTML = lat;
    longitude.innerHTML = long;

    var debug = document.getElementById("debug");
    var u = interplolate(LOCATION1.longitude, LOCATION2.longitude, LOCATION1.u, LOCATION2.u, long);
    var v = interplolate(LOCATION1.latitude, LOCATION2.latitude, LOCATION1.v, LOCATION2.v, lat);
    debug.innerHTML = '(' + u + ', ' + v + ' )';

    //locate the "me" ball
    BALL_FOR_ME.style.left = u - 11 + 'px';
    BALL_FOR_ME.style.top = v - 11 + 'px';

    if (firstTime_global < 0) {
        firstTime_global = position.timestamp;
    }
    now.innerHTML = position.timestamp - firstTime_global;

}

// gps1 represents the latitude or longitude of LOCATION1 for calibration
// gps2 represents the latitude or longitude of LOCATION2 for calibration
// u1 represents the left or top value of LOCATION1 for calibration
// u2 represents the left or top value of LOCATION2 for calibration
// gps represents the latitude or longitude of the current location
function interplolate(gps1, gps2, u1, u2, gps) {
    console.log((u2 - u1) * (gps - gps1) / (gps2 - gps1));
    return u1 + (u2 - u1) * (gps - gps1) / (gps2 - gps1);
}

var showCache = (function () {
    var counter = 0;
    return function () {
        BALL_FOR_TARGET.classList.remove('hideElem');

        counter %= CACHES.length;
        var lat = CACHES[counter].lat;
        var long = CACHES[counter++].long;

        var u = interplolate(LOCATION1.longitude, LOCATION2.longitude, LOCATION1.u, LOCATION2.u, long);
        var v = interplolate(LOCATION1.latitude, LOCATION2.latitude, LOCATION1.v, LOCATION2.v, lat);

        // locate the "target" ball
        BALL_FOR_TARGET.style.left = u - 11 + 'px'; //In strict mode, 'px' can not be omitted!!!!
        BALL_FOR_TARGET.style.top = v - 11 + 'px';

        BALL_FOR_TARGET.setAttribute('data-toggle', 'popover');
        BALL_FOR_TARGET.setAttribute('title', 'Cache ' + counter);
        BALL_FOR_TARGET.setAttribute('data-content', CACHES[counter - 1].description);

        $('#target').popover('show');
    }
})();

//initiation
window.onload = function () {
    //register all event handlers
    document.getElementById('togglegps').onclick = togglegps;
    document.getElementById('showNextGeocache').onmousedown = function () {
        $('#target').popover('destroy');
    };
    document.getElementById('showNextGeocache').onmouseup = showCache;
};
