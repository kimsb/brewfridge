var tellstick = require('./tellstick.js');

var lastTemp;
var currentTemp = 0;

var target = 19.0;

var highThresh =19.25;
var lowThresh = 18.75;

fridgeHighThresh = 19.35
function controlTemperature(temp){
    var deltaTemp = temp-lastTemp;

    if(temp > lowThresh && deltaTemp > 0 ) {
      console.log("Temperatur er: " + temp + " og deltaTemp er: " + deltaTemp +". Stopper varmeovn og starter kjøleskap")
      tellstick.stopHeater();
      tellstick.startFridge();
    }
    if(temp < highThresh && deltaTemp < 0){
      console.log("Temperatur er: " + temp + " og deltaTemp er: " + deltaTemp +". Starter varmeovn")
      tellstick.startHeater();
    }
    if(temp < fridgeHighThresh && deltaTemp < 0){
      console.log("Temperatur er: " + temp + " og deltaTemp er: " + deltaTemp +". Stopper kjøleskap")
      tellstick.stopFridge();
    }
    if(temp < lowThresh){
      console.log("Temperatur er: " + temp + " og deltaTemp er: " + deltaTemp +". Starter varmeovn stopper kjøleskap")
      tellstick.startHeater();
      tellstick.stopFridge();
    }
    if(temp > highThresh) {
      console.log("Temperatur er: " + temp + " og deltaTemp er: " + deltaTemp +". starter varmeovn og starter kjøleskap")
      tellstick.startFridge();
      tellstick.stopHeater();
    }
    lastTemp = temp;
}

module.exports.controlTemperature = controlTemperature;
