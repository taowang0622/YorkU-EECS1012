function find(){
  var formElem = document.getElementById('pulldown');
  var children = formElem.childNodes;
  var filter = '';
  for(var i = 0; i < children.length; i++){
    if(children[i].nodeName === 'SELECT'){
      if(children[i].value === '') continue;
      filter = filter + children[i].name + '\=' + "'" + children[i].value + "'" + ' and ';
    }
  }

  var query = 'select * from collection ';
  if(filter !== '') {
    query += 'where ' + filter.slice(0, -4);
  }

  // alert('"' + query + '"');

  var resultsElem = document.getElementById('results');
  var displayResults = function(arr){
      //delete all child nodes
      while(resultsElem.firstChild){
        resultsElem.removeChild(resultsElem.firstChild);
      }

      for(var i = 0; i < arr.length; i++){
        var div = document.createElement('div');
        resultsElem.appendChild(div);

        var img = document.createElement('img');
        img.setAttribute('src', arr[i].cover);
        img.setAttribute('width', '100px');
        img.setAttribute('height', '100px');
        div.appendChild(img);

        var album = document.createElement('span');
        album.innerHTML = arr[i].album + ' ';
        div.appendChild(album);

        var price = document.createElement('span');
        price.innerHTML = arr[i].price + ' ';
        div.appendChild(price);

        var purchaseBtn = document.createElement('button');
        purchaseBtn.innerHTML = 'Purchase';
        purchaseBtn.setAttribute('type', 'button');
        purchaseBtn.onclick = (function(){
          var id = arr[i].id;  //store arr[i].id
          return function(){
            // alert(id);
            access(`select * from collection where id=${id}`, purchaseCallback)
          }
        })();
        div.appendChild(purchaseBtn);
      }
  }

  access(query, displayResults);
}

function purchaseCallback(arr){
  //arr only has one element
  if(arr[0].number < 1){
    alert(`The album: "${arr[0].album}" is out of stock!`);return;
  }
  else {
    alert(`You have been charged \$${arr[0].price} for the album "${arr[0].album}"`);
    access(`update collection set number=${arr[0].number - 1} where id=${arr[0].id}`, function(){});
  }
}
