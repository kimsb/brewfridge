// var url = "https://brew-fridge.herokuapp.com";
var url = process.env.BREW_URL;
var graph = require('./graph.js');
var deviceId = process.env.PHOTON_ID_1;
function start() {
  $.post(url + "/start", function(data) {});
}

function stop() {
  $.post(url + "/stop", function(data) {});
}

$(document).ready(function() {
  var photonUrl = "https://api.particle.io/v1/devices/310019000447343337373739/temp"
    //var url = "http://localhost:5000";
  var data = {
    on: true
  };

  $.get(url + "/data", graph.buildGraph);

  $.get(url + "/currentTemp", function(data) {
    var status = data.isOn ? "på" : "av";
    $(".result").html(data.temp + "\xB0 C er temperaturen nå og kjøleskapet er " + status);
  });

  $('.startbutton').click(start);
  $('.stopbutton').click(stop);
});
