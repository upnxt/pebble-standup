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
  Vibe.vibrate('double');
}

function schedule()
{
  var nextNotification = new Date();
  nextNotification.setMinutes(nextNotification.getMinutes() + 30);
  
  Wakeup.cancel('all');
  Wakeup.schedule({
    time: nextNotification
  }, function(e) {
    if (new Date().getHours() > 19)
      return;
    
    standUp();
  });
}
  
schedule();

main.on('hide', function() {
  schedule();
});