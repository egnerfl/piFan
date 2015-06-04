var sys = require('util'),
  exec = require('child_process').exec,
  child;

var GPIO = require('onoff').Gpio,
    fan = new GPIO(14, 'out');

setInterval(function() {
  child = exec("cat /sys/class/thermal/thermal_zone0/temp", function(error, stdout, stderr) {
    if (error !== null) {
      console.log('exec error: ' + error);
    } else {
      var temp = parseFloat(stdout) / 1000;
      console.log('temperatureUpdate', temp, 'C');

      if (temp >= 30) {
        fan.writeSync(1);
        console.log('fan ON');
      } else {
        fan.writeSync(0);
        console.log('fan OFF');
      }

    }
  });
}, 1000);
