/* exported data */
function search() {
  var searchInput = document.getElementById('searchInput').value;
  var url = 'https://api.api-ninjas.com/v1/nutrition?query=' + searchInput;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.setRequestHeader('X-Api-Key', 'ldFZ5O7DePfOQX0DUryfbGsA4plEPBdFxn3xZXut');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function () {
    if (xhr.status === 200) {
      var result = JSON.parse(xhr.responseText);
      console.log(result);
      displayResults(result);
    } else {
      console.error('Error: ' + xhr.status);
    }
  };
  xhr.onerror = function () {
    console.error('Request failed');
  };
  xhr.send();
}
