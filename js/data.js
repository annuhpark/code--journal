/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', function (event) {
  var todosJSON = JSON.stringify(data.entries);
  localStorage.setItem('javascript-local-storage', todosJSON);
});

var previousEntriesJSON = localStorage.getItem('javascript-local-storage');
if (previousEntriesJSON !== null) {
  data.entries = JSON.parse(previousEntriesJSON);
}
