/**
 * Created by taowang on 10/10/2016.
 */

var go = (function () {
  var counter = 0;
    var outputNode = document.getElementById('output');
    var numOfCopies = 5;
    return function() {
        ++counter;

        switch (counter){
            case 1:
                outputNode.style.color = 'red';break;
            case 2:
                outputNode.style.fontFamily = 'sans-serif'; break;
            case 3:
                //innerHTML is so powerful!!!!!!
                var content = outputNode.innerHTML;
                var result = "";
                for(var i = 0; i < numOfCopies; i++)
                    result += content;
                outputNode.innerHTML = result; break;
            default:
                outputNode.innerHTML = "QUESTION DONE";
        }
    }
})();