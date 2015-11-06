
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
   method: 'POST',
   headers: headers,
}


function getTemperature(callback) {
  console.log("temp BLir kallt!");
  request(options, function (error, response, body) {
    console.log("error: " + error);
    console.log("response: " + response),
    console.log("body: " + body);
    if(error){
      console.log(error);
    }
     if (!error && response.statusCode == 200) {
         // Print out the response body
         var data = JSON.parse(body);
         console.log(data.return_value)
         callback(data.return_value);
     }
  })

}


module.exports.getTemperature = getTemperature;
