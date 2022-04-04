/* global data */
/* exported data */
var $photoUrl = document.querySelector('#photourl');
var $image = document.querySelector('img');

$photoUrl.addEventListener('input', function (event) {
  $image.setAttribute('src', $photoUrl.value);
  if ($photoUrl.value === '') {
    $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
});
