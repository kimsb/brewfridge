var TelldusAPI = require('telldus-live');

var publicKey    = 'FEHUVEW84RAFR5SP22RABURUPHAFRUNU'
  , privateKey   = 'ZUXEVEGA9USTAZEWRETHAQUBUR69U6EF'
  , token        = 'da79ab974c76793d8db3df2eee9d7cba0562b6d68'
  , tokenSecret  = 'ca207a7e1daa227697cace0739421a8b'
  , cloud;

var device = {id: 927588} ;
cloud = new TelldusAPI.TelldusAPI({ publicKey  : publicKey, privateKey : privateKey })
			.login(token, tokenSecret, loginCallback)
			.on('error', errorCallback);

function loginCallback(err, user){
	if(err) {
		console.log('login error: ' + err.message);
	}
	else{
		console.log('login successful');
	}
}

function errorCallback(error) {
	console.log('background error ' + error.message);
}

function deviceCallback (error, devices) {
	if(error) {
    console.log(error);
  }
  var id;
  devices.forEach(function (device) {
    deviceId = device
  })
}

function turnOnOff(turnOn){
  cloud.onOffDevice(device, turnOn, function (err, result) {
    console.log(result);
  })
}

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.post('/start', function(request, response){
    turnOnOff(true)
    response.sendStatus(200);
});

app.post('/stop', function(request, response){
    turnOnOff(false)
    response.sendStatus(200);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
