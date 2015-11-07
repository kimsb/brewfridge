 var url = "https://brew-fridge.herokuapp.com";
//var url = "http://localhost:5000";
var graph = require('./graph.js');

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

  $.get(url + "/state", function(data) {
    $(".result").html(data.body);
  })

  $.get(url + "/data", graph.buildGraph);

  $.get(url + "/currentTemp", function(data) {
    $(".result").html(data + "\xB0 C er temperaturen nå");
  });

  $('.startbutton').click(start);
  $('.stopbutton').click(stop);
});
