var TelldusAPI = require('telldus-live');

var publicKey    = 'FEHUVEW84RAFR5SP22RABURUPHAFRUNU'
  , privateKey   = 'ZUXEVEGA9USTAZEWRETHAQUBUR69U6EF'
  , token        = 'da79ab974c76793d8db3df2eee9d7cba0562b6d68'
  , tokenSecret  = 'ca207a7e1daa227697cace0739421a8b'
  , cloud;

var device = {id: 927588};
var isPowerOn = true;

cloud = new TelldusAPI.TelldusAPI({ publicKey  : publicKey, privateKey : privateKey })
			.login(token, tokenSecret, loginCallback)
			.on('error', errorCallback);

function loginCallback(err, user){
	if(err) {
		console.log('login error: ' + err.message);
	}
	else{
    //stop();
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
  devices.forEach(function (device) {
    deviceId = device
  })
}

function getIsPowerOn(){
  return isPowerOn;
}

function start() {
  if(!isPowerOn){
    console.log("Starter tellstick");
    cloud.onOffDevice(device, true, function (err, result) {
      if(err)  console.log(err);
    });
  }
  isPowerOn = true;
}

function stop() {
  if(isPowerOn){
    console.log("Stopper tellstick");
    cloud.onOffDevice(device, false, function (err, result) {
      if(err)  console.log(err);
    });
  }
  isPowerOn = false;
}



module.exports.getIsPowerOn = getIsPowerOn;
module.exports.start = start;
module.exports.stop = stop;
