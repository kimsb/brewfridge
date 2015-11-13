var TelldusAPI = require('telldus-live');

var publicKey    = 'FEHUVEW84RAFR5SP22RABURUPHAFRUNU'
  , privateKey   = 'ZUXEVEGA9USTAZEWRETHAQUBUR69U6EF'
  , token        = 'da79ab974c76793d8db3df2eee9d7cba0562b6d68'
  , tokenSecret  = 'ca207a7e1daa227697cace0739421a8b'
  , cloud;


var fridgeId = {id: 927588};
var heaterId ={id: 960768};
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
