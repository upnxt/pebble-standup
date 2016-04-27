/*
todo
  - setting for days
  - setting for start/end time
  - setting for reminder interval
*/

var UI = require('ui');
var Vector2 = require('vector2');
var Wakeup = require('wakeup');
var Vibe = require('ui/vibe');

var text = new UI.Text({
  position: new Vector2(0, 65),
  size: new Vector2(144, 30),
  font: 'gothic-24-bold',
  text: 'STAND UP!',
  textAlign: 'center'
});

var main = new UI.Window({
  fullscreen: true,
});

main.add(text);
main.show();  

function standUp()
{
  var loop = setInterval(function() { Vibe.vibrate('double'); }, 1000 * 2);
  setTimeout(function() {
    clearInterval(loop); 
  }, 1000 * 7);  
}

function schedule()
{
  Wakeup.cancel('all');
  Wakeup.schedule({
    time: Date.now() / 1000 + (60 * 30)
  }, function(e) {
    if (Date.getHours() > 19)
      return;
    
    standUp();
  });
}
  
schedule();

main.on('hide', function() {
  schedule();
});