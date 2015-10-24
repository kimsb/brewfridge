var TelldusAPI = require('telldus-live');

var publicKey    = 'FEHUVEW84RAFR5SP22RABURUPHAFRUNU'
  , privateKey   = 'ZUXEVEGA9USTAZEWRETHAQUBUR69U6EF'
  , token        = 'da79ab974c76793d8db3df2eee9d7cba0562b6d68'
  , tokenSecret  = 'ca207a7e1daa227697cace0739421a8b'
  , cloud;

var device = {id: 927588};

cloud = new TelldusAPI.TelldusAPI({ publicKey  : publicKey, privateKey : privateKey })
			.login(token, tokenSecret, loginCallback)
			.on('error', errorCallback);

var isPowerOn = function isPowerOn(){
  cloud.getDeviceInfo(device, function(err, res){
    return res.parameter[2].value;
  });
}();

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
  devices.forEach(function (device) {
    deviceId = device
  })
}

function getIsPowerOn(){
  return isPowerOn;
}

function start(request, response) {
  console.log("start");
  console.log("stopp");
  cloud.onOffDevice(device, true, function (err, result) {
    if(err)  console.log(err);
  })
  response.sendStatus(200);
}

function stop(request, response) {
  console.log("stopp");
  cloud.onOffDevice(device, false, function (err, result) {
    if(err)  console.log(err);
  })
  response.sendStatus(200);
}

module.exports.getIsPowerOn = getIsPowerOn;
module.exports.start = start;
module.exports.stop = stop;
