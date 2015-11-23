var tellstick = require('./tellstick.js');

var lastTemp;

var target = 30.0;
var lowThresh = 29.75
var highThresh =30.10

function controlTemperature(temp){
  var deltaTemp = temp-lastTemp;

  if(temp > lowThresh && deltaTemp > 0 ) {
    console.log("Temperatur er: " + temp + " og deltaTemp er: " + deltaTemp +". Stopper varmeovn og starter kjøleskap")
    tellstick.stopHeater();
  }
  if(temp < highThresh && deltaTemp < 0){
    console.log("Temperatur er: " + temp + " og deltaTemp er: " + deltaTemp +". Starter varmeovn")
    tellstick.startHeater();
  }
  if(temp < lowThresh){
    console.log("Temperatur er: " + temp + " og deltaTemp er: " + deltaTemp +". Starter varmeovn stopper kjøleskap")
    tellstick.startHeater();
  }
  if(temp > highThresh) {
    tellstick.stopHeater();
  }
  lastTemp = temp;
}

module.exports.controlTemperature = controlTemperature;
