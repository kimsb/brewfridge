var tellstick = require('./tellstick.js');
var target = process.env.TARGET_TEMP;

function controlTemperature(temp){
    
    if(temp > target ) {
        console.log("Temperatur er: " + temp + " starter kjøleskap");
        tellstick.startFridge();
    }
    if(temp <= target) {
        console.log("Temperatur er: " + temp + " stopper kjøleskap");
        tellstick.stopFridge();
    }

}

module.exports.controlTemperature = controlTemperature;
