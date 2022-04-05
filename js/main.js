/* global data */
/* exported data */
var $photoUrl = document.querySelector('#photourl');
var $title = document.querySelector('#title');
var $notes = document.querySelector('#notes');
var $image = document.querySelector('img');
var $form = document.querySelector('form');
var $entriesButton = document.querySelector('.entries');
var $views = document.querySelectorAll('.view');

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
  data.nextEntryId++;
  data.entries.unshift(entry);
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
});

function renderEntries(journalentry) {
  var $container = document.createElement('div');
  $container.setAttribute('class', 'container');
  var $row = document.createElement('div');
  $row.setAttribute('class', 'row padding-bottom align-items-center');
  $container.appendChild($row);
  var $columnHalf = document.createElement('div');
  $columnHalf.setAttribute('class', 'column-half');
  $row.appendChild($columnHalf);
  var $img = document.createElement('img');
  $img.setAttribute('src', journalentry.photourl);
  $columnHalf.appendChild($img);
  var $secondColumnHalf = document.createElement('div');
  $secondColumnHalf.setAttribute('class', 'column-half');
  $row.appendChild($secondColumnHalf);
  var $h2 = document.createElement('h2');
  $h2.textContent = journalentry.title;
  $secondColumnHalf.appendChild($h2);
  var $p = document.createElement('p');
  $p.textContent = journalentry.notes;
  $secondColumnHalf.appendChild($p);
  return $container;
}

var $ul = document.querySelector('ul');
for (let i = 0; i < data.entries.length; i++) {
  var value = renderEntries(data.entries[i]);
  $ul.appendChild(value);
}

$entriesButton.addEventListener('click', function (event) {
  for (let i = 0; i < $views.length; i++) {
    var $dataView = $views[i].getAttribute('data-view');
    if ($dataView === 'entries') {
      $views[i].className = 'view';
    } else if ($dataView !== 'entries') {
      $views[i].className = 'view hidden';
    }
  }
});
