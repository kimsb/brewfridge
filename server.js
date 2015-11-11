var express = require('express');
var app = express();
var tellstick = require('./server/tellstick.js');
var temperature = require('./server/temperature.js');
var tempRepo = require('./server/temperatureRepository.js');
var currentTemp = 0;
var target = 20.0;
var threshold = 0.5
var interval = 1000*30;
app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/client'));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/client/index.html');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

app.post('/start', function(request, response){
    tellstick.startFridge(request, response);
    response.sendStatus(200);
});

app.post('/stop', function(request, response){
    tellstick.stopFridge(request, response);
    response.sendStatus(200);
});

app.get('/data', function (request, response) {
  tempRepo.getTemp(response);
});

app.get('/currentTemp', function (request, response) {
  var responseObj = {temp: currentTemp, isFridgeOn: tellstick.getIsFridgeOn(), isHeaterOn: tellstick.getIsHeaterOn};
  response.send(responseObj);
})
setInterval(fridgeController, interval);

fridgeController();
function fridgeController () {
  temperature.getTemperature(onGetTemperature);
}

function onGetTemperature(temp){
  console.log("Temperatur er: " +temp);
  if(temp != -127){
    currentTemp = temp.toFixed(2);
    tempRepo.insertTemp(currentTemp);

    if(temp > target) {
      tellstick.startFridge();
      tellstick.stopHeater();
    }
    else if (temp < target) {
      tellstick.startHeater();
      tellstick.stopFridge();
    }
    // if(temp > target){
    //   tellstick.stopHeater()
    // }
    // else if(temp < target) {
    //   tellstick.stopFridge();
    // }
  } else {
    console.log("Klarte ikke lese temperatur. Henter på nytt");
    fridgeController();
  }
}
