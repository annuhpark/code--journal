/* global data */
/* exported data */

/* DOM Querying */
var $photoUrl = document.querySelector('#photourl');
var $title = document.querySelector('#title');
var $notes = document.querySelector('#notes');
var $image = document.querySelector('img');
var $form = document.querySelector('form');
var $entriesButton = document.querySelector('.entries');
var $codeJournalButton = document.querySelector('.code-journal');
var $views = document.querySelectorAll('.view');
var $ul = document.querySelector('ul');
var $newEntryHeading = document.querySelector('.new-entry-heading');

/* Updating photo from image URL */
$photoUrl.addEventListener('input', function (event) {
  $image.setAttribute('src', $photoUrl.value);
  if ($photoUrl.value === '') {
    $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  }
});

/* Submit event */
$form.addEventListener('submit', function (event) {
  event.preventDefault();
  if (data.editing === null) {
    var entry = {
      title: $title.value,
      photourl: $photoUrl.value,
      notes: $notes.value,
      entryId: data.nextEntryId
    };
    data.nextEntryId++;
    data.entries.unshift(entry);
    $image.setAttribute('src', 'images/placeholder-image-square.jpg');
    $form.reset();
    $ul.prepend(renderEntries(entry));
    $views[0].className = 'view hidden';
    $views[1].className = 'view';
  } else {
    var newEntry = {
      title: $title.value,
      photourl: $photoUrl.value,
      notes: $notes.value,
      entryId: data.editing.entryId
    };
    var $newEntry = renderEntries(newEntry);
    for (var i = 0; i < $ul.children.length; i++) {
      if (parseInt($ul.children[i].getAttribute('data-entry-id')) === newEntry.entryId) {
        $ul.children[i].replaceWith($newEntry);
        data.entries.splice(i, 1, newEntry);
      }
    }
    data.editing = null;
  }
  switchViewTo('entries');
});

/* Rendering the Entries */
function renderEntries(journalentry) {
  var $container = document.createElement('div');
  $container.setAttribute('class', 'container');
  $container.setAttribute('data-entry-id', journalentry.entryId);
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
  var $secondRow = document.createElement('div');
  $secondRow.setAttribute('class', 'row2 space-between align-items-center');
  $secondColumnHalf.appendChild($secondRow);
  var $h2 = document.createElement('h2');
  $h2.textContent = journalentry.title;
  $secondRow.appendChild($h2);
  var $pencil = document.createElement('i');
  $pencil.setAttribute('class', 'fas fa-pencil-alt');
  $secondRow.appendChild($pencil);
  var $thirdRow = document.createElement('div');
  $thirdRow.setAttribute('class', 'row');
  $secondColumnHalf.appendChild($thirdRow);
  var $p = document.createElement('p');
  $p.textContent = journalentry.notes;
  $thirdRow.appendChild($p);
  return $container;
}

/* DOM Content Loaded (for refreshing the page & loading entries (including new ones) */
document.addEventListener('DOMContentLoaded', function (event) {
  for (let i = 0; i < data.entries.length; i++) {
    var value = renderEntries(data.entries[i]);
    $ul.appendChild(value);
  }
  switchViewTo(data.view);
  data.editing = null;
});

/* Button Functions */

$entriesButton.addEventListener('click', function (event) {
  switchViewTo('entries');
});

$codeJournalButton.addEventListener('click', function (event) {
  switchViewTo('entry-form');
  $newEntryHeading.textContent = 'New Entry';
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $title.value = '';
  $notes.value = '';
  $photoUrl.value = '';
});

/* Switching View */
function switchViewTo(targetPage) {
  for (let i = 0; i < $views.length; i++) {
    if ($views[i].getAttribute('data-view') === targetPage) {
      $views[i].className = 'view';
      data.view = targetPage;
    } else {
      $views[i].className = 'view hidden';
    }
  }
}

/* Editing an Entry */
$ul.addEventListener('click', function (event) {
  if (event.target.nodeName === 'I') {
    switchViewTo('entry-form');
    $newEntryHeading.textContent = 'Edit Entry';
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === parseInt(event.target.closest('.container').getAttribute('data-entry-id'))) {
        data.editing = data.entries[i];
      }
    }
    $title.value = data.editing.title;
    $photoUrl.value = data.editing.photourl;
    $image.setAttribute('src', $photoUrl.value);
    $notes.value = data.editing.notes;
  }
});
