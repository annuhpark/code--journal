/* global data */
/* exported data */
var $photoUrl = document.querySelector('#photourl');
var $title = document.querySelector('#title');
var $notes = document.querySelector('#notes');
var $image = document.querySelector('img');
var $form = document.querySelector('form');

$photoUrl.addEventListener('input', function (event) {
  $image.setAttribute('src', $photoUrl.value);
  if ($photoUrl.value === '') {
    $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
});

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  var entry = {
    title: $title.value,
    photourl: $photoUrl.value,
    notes: $notes.value,
    nextEntryId: data.nextEntryId
  };
  data.entries.unshift(entry);
  data.nextEntryId++;
  // console.log(data.nextEntryId);
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
});
