var express = require('express');
var app = express();
var tellstick = require('./server/tellstick.js');
var temperature = require('./server/temperature.js');
var tempRepo = require('./server/temperatureRepository.js');
var currentTemp = 0;
var target = 15;
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
    tellstick.start(request, response);
    response.sendStatus(200);
});

app.post('/stop', function(request, response){
    tellstick.stop(request, response);
    response.sendStatus(200);
});

app.get('/data', function (request, response) {
  tempRepo.getTemp(response);
});

app.get('/currentTemp', function (request, response) {
  response.send(currentTemp);
})
setInterval(fridgeController, interval);

fridgeController();
function fridgeController () {
  temperature.getTemperature(onGetTemperature);
}

function onGetTemperature(temp){
  console.log("Temperatur er: " +temp);
  if(temp != -127){
    tempRepo.insertTemp(temp);
    currentTemp = temp.toFixed(2);
    if(temp > target) {
      tellstick.start();
    }
    else if (temp > target) {
      tellstick.stop();
    }
    else{
      console.log("Temperaturen er fin gjor ingen ting");
    }
  } else {
    console.log("Klarte ikke lese temperatur. Henter på nytt");
    fridgeController();
  }
}
