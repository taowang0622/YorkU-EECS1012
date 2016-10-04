
//constants
var START = 8, //indicating the start time one day
    END = 22; //indicating the end time one day

//display time on the top of the table
 var updatePage = (function(){
    var lastTime = null;
    return function() {
        var date = new Date();
        var time = document.getElementById('info');
        var day = date.getDay(),
            hour = date.getHours(),
            minutes = date.getMinutes();

        if(minutes < 30) hour -= 1;

        // var block = "time " + day + ":" + hour;
        // time.innerHTML = "Time is now " + block;
        time.innerHTML = "My Timetable";

        //highlight the corresponding block
        var elemLocated = locateElem(day, hour);

        if((lastTime !== null) && (elemLocated !== lastTime)) lastTime.style.background = "white";

        if(elemLocated !== null) elemLocated.style.background = "red";

        lastTime = elemLocated;
    }
})();



//create a table
function createTimeTable() {
    function duration(num) {
        var startTime = (num === 12) ? num : (num % 12); //ensure 12pm will not be displayed as 0:30-1:30
        var endTime = ((startTime + 1) === 12) ? 12 : (startTime + 1) % 12;
        return startTime + ":30-" + endTime + ":30";
    }

    var tableElem = document.getElementById('table');
    var rowNum = END - START,
        dayNum = 5;

    for (var i = START; i < END + 1; i++) {

        var trElem = document.createElement("tr");
        tableElem.appendChild(trElem);

        var thElem = document.createElement("th");
        thElem.appendChild(document.createTextNode(duration(i)));
        trElem.appendChild(thElem);

        for(var j = 0; j < dayNum; j++){
            trElem.appendChild(document.createElement("td"));
        }
    }
}

//locate specified element
function locateElem(day, hour) {
    if((day > 5 || (hour < START) || (hour > END))) return null;
    var tableElem = document.getElementById('table');
    return tableElem.childNodes[hour - START + 1].childNodes[day]
}



function addMyCourses() {
    function addNewNode(codeNode, code, url) {
        var aTag = document.createElement("a");
        aTag.setAttribute("href", url);
        aTag.innerHTML = code;

        codeNode.appendChild(aTag);
    }

    addNewNode(locateElem(2, 9), "EECS1012", "https://moodle.yorku.ca/moodle/course/view.php?id=72836");
    addNewNode(locateElem(2, 10), "EECS1012", "https://moodle.yorku.ca/moodle/course/view.php?id=72836");
    addNewNode(locateElem(2, 11), "EECS1012", "https://moodle.yorku.ca/moodle/course/view.php?id=72836");

    addNewNode(locateElem(1, 13), "PHYS1410", "https://moodle.yorku.ca/moodle/course/view.php?id=71867");
    addNewNode(locateElem(2, 13), "PHYS1410", "https://moodle.yorku.ca/moodle/course/view.php?id=71867");
    addNewNode(locateElem(3, 13), "PHYS1410", "https://moodle.yorku.ca/moodle/course/view.php?id=71867");
    addNewNode(locateElem(5, 13), "PHYS1410", "https://moodle.yorku.ca/moodle/course/view.php?id=71867");

    addNewNode(locateElem(1, 16), "EECS1012", "https://moodle.yorku.ca/moodle/course/view.php?id=72836");
    addNewNode(locateElem(5, 16), "EECS1012", "https://moodle.yorku.ca/moodle/course/view.php?id=72836")
}


//init the entire web page on load
function init() {
    createTimeTable();
    addMyCourses();
    updatePage();
    window.setInterval(updatePage, 10000); //call updatePage function every 10 seconds
}

window.onload = init;