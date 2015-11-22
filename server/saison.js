var tellstick = require('./tellstick.js');

var lastTemp;

var target = 30.0;

function controlTemperature(temp){

    if(temp < target) {
      tellstick.startHeater();
      tellstick.stopFridge();
      console.log("starter varmeovn");
    }
    else if(temp > target) {
      tellstick.stopHeater();
      tellstick.stopFridge();
      console.log("stopper varmeovn");
    }
}

module.exports.controlTemperature = controlTemperature;
