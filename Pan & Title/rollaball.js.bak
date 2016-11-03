function init() {
  document.getElementById("count").innerHTML = 0;
  if(window.DeviceOrientationEvent) {
    document.getElementById("log").innerHTML = "Supports orientation events";
    window.addEventListener("deviceorientation", orientationCallback, true);
  } else {
    document.getElementById("log").innerHMTL = "No orientation event support";
  }
}

function orientationCallback(eventData) {
  document.getElementById("count").innerHTML = Number( document.getElementById("count").innerHTML) + 1;
  document.getElementById("tilt").innerHTML = eventData.gamma;
  document.getElementById("pitch").innerHTML = eventData.beta;
}

alert("javascript loaded");
window.onload = init;
