var screen = document.querySelector('#screen');
var record_screen = document.querySelector('#record');
var startTime;
var endTime;
var record;
var timeout;


screen.addEventListener('click', function() {
  //var startTime;
  if (screen.classList.contains('waiting')) {
    screen.classList.remove('waiting');
    screen.classList.add('ready');
    screen.textContent = "Click when it turns green";
    timeout = setTimeout(function() {
      startTime = new Date();
      screen.click();
    }, Math.floor(Math.random() * 1000) + 2000);
  } else if(screen.classList.contains('ready')) {
    if(!startTime) {
      clearTimeout(timeout);
      screen.classList.remove('ready');
      screen.classList.add('waiting');
      screen.textContent = "Don't be hurry";
    } else {
      screen.classList.remove('ready');
      screen.classList.add('now');
      screen.textContent = "Click now!";
    }
  } else if(screen.classList.contains('now')) {
    endTime = new Date();
    record = endTime - startTime;
    record_screen.textContent = record/1000 + "sec";
    startTime = null;
    endTime = null;
    screen.classList.remove('now');
    screen.classList.add('waiting');
    screen.textContent = "Click to start";
  }
});
