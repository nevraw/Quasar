(function() {
 loadOptions();
 buttonHandler();
})();

function buttonHandler() {
 var $submitButton = $('#submitButton');

 $submitButton.on('click', function() {
  console.log('Submit');
 
  var return_to = getQueryParam('return_to', 'pebblejs://close#');
  document.location = return_to + encodeURIComponent(JSON.stringify(getAndStoreConfigData()));
 });

 var $cancelButton = $('#cancelButton');

 $cancelButton.on('click', function() {
  console.log('Cancel');
 
  var return_to = getQueryParam('return_to', 'pebblejs://close#');
  document.location = return_to;
 });
}


function loadOptions() {
 var $bgColorPicker = $('#bgColorPicker');
 var $timeColorPicker = $('#timeColorPicker');

 if (localStorage.bgColor) {
  $bgColorPicker[0].value = localStorage.bgColor;
 }
 if (localStorage.timeColor) {
  $timeColorPicker[0].value = localStorage.timeColor;
 }
} 

function getAndStoreConfigData() {
 var $bgColorPicker = $('#bgColorPicker');
 var $timeColorPicker = $('#timeColorPicker');

// console.log('bg: ' + $bgColorPicker.val() + ', time: ' + $timeColorPicker.val());

 if ($bgColorPicker == $timeColorPicker) {
  console.log('matching');
  alert('Please select different colors for time and background');
  return
 }
 
 var options = {
  bgColor: $bgColorPicker.val(),
  timeColor: $timeColorPicker.val()
 };
 
 localStorage.bgColor = options.bgColor;
 localStorage.timeColor = options.timeColor;

 console.log('Got options: ' + JSON.stringify(options));
 return options;
}

function getQueryParam(variable, defaultValue) {
 var query = location.search.substring(1);
 var vars = query.split('&');
 for (var i = 0; i < vars.length; i++) {
  var pair = vars[i].split('=');
  if (pair[0] === variable) {
   return decodeURIComponent(pair[1]);
  }
 }
 return defaultValue || false;
}
