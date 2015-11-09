//var url = "https://brew-fridge.herokuapp.com";
//var url = "http://localhost:5000";
var url = "http://brew-fridge.azurewebsites.net"
var graph = require('./graph.js');

function start() {
  $.post(url + "/start", function(data) {});
}

function stop() {
  $.post(url + "/stop", function(data) {});
}

$(document).ready(function() {
  $.ajax({
    url: "/data",
    dataType: "jsonp",
    success: graph.buildGraph
  });
  //$.get(url + "/data", graph.buildGraph);


  // $.get(url + "/currentTemp", function(data) {
  //   var status = data.isOn ? "på" : "av";
  //   $(".result").html(data.temp + "\xB0 C er temperaturen nå og kjøleskapet er " + status);
  // });
  $.ajax({
    url: "/data",
    dataType: "jsonp",
    success: function (data) {
      var status = data.isOn ? "på" : "av";
      $(".result").html(data.temp + "\xB0 C er temperaturen nå og kjøleskapet er " + status);
    },
  });

  $('.startbutton').click(start);
  $('.stopbutton').click(stop);
});
