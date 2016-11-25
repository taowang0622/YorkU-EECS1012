function find() {
    var selectELems = [document.getElementById('artist'), document.getElementById('year')];
    var filter = '';
    for (var i = 0; i < selectELems.length; i++) {
      if (selectELems[i].value === '') continue;
      filter = filter + selectELems[i].name + '\=' + "'" + selectELems[i].value + "'" + ' and ';
    }

    var query = 'select * from collection ';
    if (filter !== '') {
        query += 'where ' + filter.slice(0, -4);
    }

    // alert('"' + query + '"');

    var resultsElem = document.getElementById('results');
    // var display = '';
    var displayResults = function (arr) {
        //delete all child nodes
        while (resultsElem.firstChild) {
            resultsElem.removeChild(resultsElem.firstChild);
        }

         for (var i = 0; i < arr.length; i++) {
            resultsElem.innerHTML +=  `
<div class="media">
  <div class="media-left">
    <a href="#">
      <img class="media-object thumbnail" src="${arr[i].cover}" width="100px" height="100px" alt="cover">
    </a>
  </div>
  <div class="media-body">
    <h4 class="media-heading">${arr[i].album}</h4>
    <p><span class="label label-danger">\$${arr[i].price}</span></p>
    <p style="color:green" id="stock${arr[i].id}">${(arr[i].number > 0)? "In Stock": "Out of Stock"}</p>
    <div><button type="button" class="btn btn-info btn-xs" id="purchase${arr[i].id}">
    <span class="glyphicon glyphicon-shopping-cart"></span> Purchase</button></div>
  </div>
</div>
        `;
        }

        //register event handlers for every purchase button!
        arr.forEach(function(item, index){
          document.getElementById(`purchase${item.id}`).onclick = (function(){
          var id = item.id;  //store arr[i].id
          return function(){
            // alert(id);
            access(`select * from collection where id=${id}`, purchaseCallback)
          }
        })();
        })
    };


    access(query, displayResults);
}

function purchaseCallback(arr) {
    //arr only has one element
    if (arr[0].number < 1) {
        alert(`The album: "${arr[0].album}" is out of stock!`);
    }
    else {
        alert(`You have been charged \$${arr[0].price} for the album "${arr[0].album}"`);
        access(`update collection set number=${arr[0].number - 1} where id=${arr[0].id}`, function () {
        });
        //update the stock status;
        if((arr[0].number - 1) === 0) document.getElementById(`stock${arr[0].id}`).innerHTML = 'Out of Stock';
    }
}
