var five = require("johnny-five");
var Photon = require("particle-io");

console.log(process.env.PHOTON_ID_1);
console.log(process.env.PHOTON_TOKEN_1);

var board = new five.Board({
  io:  new Photon({
    token: process.env.PHOTON_TOKEN_1,
    deviceId: process.env.PHOTON_ID_1
  })
});

board.on("ready", function() {
  var led = new five.Led("D7");
  led.blink();
});
