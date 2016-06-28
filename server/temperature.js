
var request = require('request');

var deviceId = process.env.PHOTON_ID_1;
var token = process.env.PHOTON_TOKEN_1;
var photonUrl = "https://api.particle.io/v1/devices/";
// Set the headers
var headers = {
   'Authorization':       "Bearer " + token,
}

// Configure the request
var options = {
   url: photonUrl + deviceId + "/temp",
   method: 'GET',
   headers: headers,
}

var timeoutCount = 0;

function getTemperature(callback) {
  request(options, function (error, response, body) {
    if(error){
      console.log("Photon error: /n" +error);
    }
     if (!error && response.statusCode == 200) {
         var data = JSON.parse(body);
         callback(data.result);
     }
      if (response.statusCode === 408) {
          timeoutCount++;
      }
      console.log("response status: " + response.statusCode + (data ? ", data: " + data.result : "") + ", timeouts: " + timeoutCount);
  })
}


module.exports.getTemperature = getTemperature;
