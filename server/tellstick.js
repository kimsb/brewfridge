var TelldusAPI = require('telldus-live');

var publicKey    = process.env.TELDUS_PUBLICKEY
  , privateKey   = process.env.TELDUS_PRIVATEKEY
  , token        = process.env.TELDUS_TOKEN
  , tokenSecret  = process.env.TELDUS_TOKEN_SECRET
  , cloud;


var fridgeId = {id: 927588};
var heaterId ={id: 989609};
var isFridgeOn = true;
var isHeaterOn = true;

cloud = new TelldusAPI.TelldusAPI({ publicKey  : publicKey, privateKey : privateKey })
			.login(token, tokenSecret, loginCallback)
			.on('error', errorCallback);

function loginCallback(err, user){
	if(err) {
		console.log('login error tellstick: ' + err.message);
	}
	else{
    //stop();
		console.log('login successfull telstick');
	}
}

function errorCallback(error) {
	console.log('background error tellstick: ' + error.message);
}

function deviceCallback (error, devices) {
	if(error) {
    console.log(" devicecallback error tellstick /n" +error);
  }
  devices.forEach(function (device) {
    deviceId = device
  })
}

function getIsFridgeOn(){
  return isFridgeOn;
}
function getIsHeaterOn() {
  return isHeaterOn;
}

function startFridge() {
  cloud.onOffDevice(fridgeId, true, function (err, result) {
    if(err){
       console.log("start error /n" + err);
       return;
    }
    isFridgeOn = true;
  });
}

function stopFridge() {
  cloud.onOffDevice(fridgeId, false, function (err, result) {
    if(err) {
      console.log("Stop error /n" + err);
      return;
    }
    isFridgeOn = false;
  });
}

function startHeater() {
  cloud.onOffDevice(heaterId, true, function (err, result) {
    if(err){
      console.log("start error /n" + err);
      return;
    }
    isHeaterOn = true;
  });
}

function stopHeater() {
  cloud.onOffDevice(heaterId, false, function (err, result) {
    if(err) {
      console.log("Stop error /n" + err);
      return;
    }
    isHeaterOn = false;
  });
}



module.exports.getIsFridgeOn = getIsFridgeOn;
module.exports.startFridge = startFridge;
module.exports.stopFridge = stopFridge;

module.exports.getIsHeaterOn = getIsHeaterOn;
module.exports.startHeater = startHeater;
module.exports.stopHeater = stopHeater;
