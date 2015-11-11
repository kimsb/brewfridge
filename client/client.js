var url = "https://brew-fridge.herokuapp.com";
//var url = "http://localhost:5000";
//var url = "https://brew-fridge.azurewebsites.net"
var graph = require('./graph.js');

$(document).ready(function() {
  $.get(url + "/data", graph.buildGraph);

  $.get(url + "/currentTemp", function(data) {
    var status = data.isOn ? "på" : "av";
    $(".result").html(data.temp + "\xB0 C er temperaturen nå og kjøleskapet er " + status);
  });
});
