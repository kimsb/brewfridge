var express = require('express');
var app = express();
var tellstick = require('./server/tellstick.js');
var temperature = require('./server/temperature.js');
var tempRepo = require('./server/temperatureRepository.js');

var target = 23;
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

app.get('/state', function(request, response){
    console.log(response)
    response.body = tellstick.getIsPowerOn();
    console.log(response.body)
    response.sendStatus(200);
});

app.get('/data', function (request, response) {
  console.log("mottatt request")
  tempRepo.getTemp(response);
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
    if(temp < target) {
      tellstick.start();
    }
    else if (temp > target) {
      tellstick.stop();
    }
    else{
      console.log("Temperaturen er fin gjor ingen ting");
    }
  } else {
    console.log("Klarte ikke lese temperatur.");
  }
}
