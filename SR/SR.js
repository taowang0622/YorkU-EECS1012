/**
 * Created by taowang on 10/3/2016.
 */
var TARGET_SIZE = 16;
var startTime, intervalID;
var rescue, target, direction, radarRange, context;
var globalDistance;  //distance between the rescue vessel and the target ship

function validateHeight(defaultHeight) {
    var height = window.prompt("Search area height:", defaultHeight);
    //debug
    console.log(window.innerWidth);
    console.log(window.innerHeight);
    console.log(+height);
    return ((+height > 0) && (+height <= window.innerHeight)) ? height : window.innerHeight;
}

function start() {
    var canvas = document.getElementById("searchArea");
    // canvas.height = window.prompt("Search area height:", canvas.height);
    canvas.height = validateHeight(canvas.height);

    rescue = {x: canvas.width / 2, y: canvas.width / 2};
    target = {x: (canvas.width - TARGET_SIZE) * Math.random(), y: (canvas.height - TARGET_SIZE)* Math.random()};

    direction = {dx: 1, dy: 1};
    radarRange = document.getElementById("radar").value;

    context = canvas.getContext('2d');
    startTime = (new Date()).getTime();
    intervalID = setInterval(simulate, 5);
}

function simulate() {
    // clear();
    drawTarget();
    drawRescue();
    updateProgress();
    if (found()) {
        clearInterval(intervalID);
    }
    else {
        if (xBoundary()) direction.dx = -direction.dx;
        if (yBoundary()) direction.dy = -direction.dy;
        rescue.x += direction.dx;
        rescue.y += direction.dy;
    }
}

function clear() {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}

function drawTarget() {
    context.beginPath();
    context.lineWidth = "4";
    context.strokeStyle = "red";
    context.rect(target.x, target.y, TARGET_SIZE, TARGET_SIZE);
    context.stroke();
}

function drawRescue() {
    context.beginPath();
    context.fillStyle = "#0000ff";
    context.arc(rescue.x, rescue.y, radarRange, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
}

function xBoundary() {
    return (rescue.x >= (context.canvas.width - radarRange)) || (rescue.x <= radarRange);
}

function yBoundary() {
    return (rescue.y >= (context.canvas.height - radarRange)) || (rescue.y <= radarRange);
}

function updateProgress() {
    var elapsed = document.getElementById("elapsed");
    elapsed.innerHTML = Math.floor(((new Date()).getTime() - startTime) / 1000);

    var distanceNode = document.getElementById('distance');
    globalDistance = Math.floor(Math.sqrt(Math.pow((rescue.x - (target.x + TARGET_SIZE/2)), 2) + Math.pow((rescue.y - (target.y + TARGET_SIZE/2)), 2)));
    distanceNode.innerHTML = globalDistance;
}

function toTarget() {
    return Math.sqrt(Math.pow(Math.abs(target.x - rescue.x), 2) + Math.pow(Math.abs(target.y - rescue.y), 2));
}

function found() {
    var minDistance = +radarRange + TARGET_SIZE/2 + 1; //note that radarRange is a string
     return (globalDistance <= minDistance) || false;
}