var tellstick = require('./tellstick.js');

var lastTemp;
var currentTemp = 0;

var target = 12.0;
var buffer = 0.1;

fridgeHighThresh = 19.35
function controlTemperature(temp){
    var deltaTemp = temp-lastTemp;

    if(temp > target + buffer) {
      console.log("Temperatur er: " + temp + " starter kjøleskap")
      tellstick.startFridge();
    }
    if(temp < target + buffer){
      console.log("Temperatur er: " + temp + " stopper kjøleskap")
      tellstick.stopFridge();
    }

}

module.exports.controlTemperature = controlTemperature;
