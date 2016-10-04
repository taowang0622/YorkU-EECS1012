function start()
{
  var now = document.getElementById("now");
  now.innerHTML = "Last updated: " + new Date();
  now.style.color = "green";
}

var swap = (function(){
  var label = 0;
  return function (img){
    (label == 0) ? img.src = "myPortrait.jpg" : img.src = "myPortrait2.jpg";
    label = (label + 1) % 2;
  }
})();
