function init() {
    if (window.DeviceOrientationEvent) {
        document.getElementById("text").innerHTML = "Supports orientation events";
        window.addEventListener("deviceorientation", orientationCallback, true);
    } else {
        document.getElementById("text").innerHMTL = "No orientation event support";
    }
}

function orientationCallback(eventData) {
    document.getElementById("text").innerHTML = "Gamma: " + eventData.gamma + " Beta: " + eventData.beta;
    var tilt = eventData.gamma;
    var pitch = eventData.beta;

    (pitch > 90) ? pitch = 90: ((pitch < -90) ? pitch = -90 : null);
    (tilt > 90) ? tilt = 90: ((tilt < -90) ? tilt = -90 : null);

    var d = document.getElementById("center");
    var y = (window.innerHeight - d.offsetHeight) / 2;
    var x = (window.innerWidth - d.offsetWidth) / 2;

    d.style.top = y;
    d.style.left = x;

    var dx = x * tilt/90;
    var dy = y * pitch/90;

    var c = document.getElementById("ball");
    c.style.top = y + dy;
    c.style.left = x + dx;
}

alert("javascript loaded");
window.onload = init;
