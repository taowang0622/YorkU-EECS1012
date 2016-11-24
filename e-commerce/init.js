window.onload = function(){
  var formElem = document.getElementById('pulldown');
  //create a pulldown for artists;
  access('select distinct artist from collection order by artist', createAPulldown);
  //create a pulldown for year;
  access('select distinct year from collection order by year', createAPulldown);
  //register event handlers
  document.getElementById('selection').onclick = find;
}
