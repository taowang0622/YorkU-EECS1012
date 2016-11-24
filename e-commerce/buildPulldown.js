//The paramter arr is in the form of, for example, [{artist:"Led Zeppelin"},{artist:"Davis, Miles"}]
function createAPulldown(arr){
  // alert(JSON.stringify(arr));
  //Gain the titile of the pulldown
  var str = JSON.stringify(arr[0]);
  var reg = /^{"([^"]+)".+/;
  var idOfPulldown = str.match(reg)[1];

  var selectElem = document.getElementById(idOfPulldown);
  var optionElem = document.createElement('option');
  optionElem.setAttribute('value', '');
  optionElem.innerHTML = `<b>${idOfPulldown}</b>`;
  selectElem.appendChild(optionElem); //!!!

  arr.forEach(function(item, index, arr){
    var value = item[idOfPulldown];
    var option = document.createElement('option');
    option.setAttribute('value', value);
    option.innerHTML = value;
    selectElem.appendChild(option); //!!!
  })
}
