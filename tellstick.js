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
		console.log('user: ' + user);
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
turnOnOff();

function turnOnOff(){

  cloud.onOffDevice(device, true, function (err, result) {
    console.log(result);
    console.log("WOHOO DEN ER På");
  })
}
