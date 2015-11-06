// var url = "https://brew-fridge.herokuapp.com";
var url = "http://localhost:5000";
var Chart = require('chart.js');
var _ = require('underscore');
var d3 = require('d3');
var c3 = require('./libs/c3-0.4.10/c3.min.js');
function start() {
  console.log("start blir kalt");
  $.post(url + "/start", function(data) {
    console.log("jajajaja");
    var html = data === 'OK' ? 'OVN ER PÅ' : 'FAIL';
    $(".result").html(html);
  });
}

function stop() {
  console.log("stopp blir kalt");
  $.post(url + "/stop", function(data) {
    var html = data === 'OK' ? 'OVN ER AV' : 'FAIL'
    $(".result").html(html);
  });
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
  $.get(url + "/data", buildGraph);

  $('.startbutton').click(start);
  $('.stopbutton').click(stop);
});



function buildGraph(data) {
  console.log(data);
  var labels =[];
  var dataset = [];
  _.map(data, function (measurement) {
    console.log(measurement);
    labels.push(new Date(measurement.date_measured));
    dataset.push(measurement.temp);
  });
  // console.log(labels);
  // console.log(dataset);
  labels.unshift('x');
  dataset.unshift('dataFraPhoton');
  var chart = c3.generate({
      data: {
          x: 'x',
          xFormat: '%Y-%m-%d %H:%M:%S',
  //        xFormat: '%Y%m%d', // 'xFormat' can be used as custom format of 'x'
          columns: [
              labels,
  //            ['x', '20130101', '20130102', '20130103', '20130104', '20130105', '20130106'],
              dataset,
          ]
      },
      axis: {
          x: {
              type: 'timeseries',
              tick: {
                  format: '%Y-%m-%d'
              }
          }
      }
  });



  // });
  // new Chartist.Line('.ct-chart', {
  //   labels: ['1', '2', '3', '4', '5', '6'],
  //   series: [{
  //     name: 'Fibonacci sequence',
  //     data: [1, 2, 3, 5, 8, 13]
  //   }, {
  //     name: 'Golden section',
  //     data: [1, 1.618, 2.618, 4.236, 6.854, 11.09]
  //   }]
  // });
  //
  // var $chart = $('.ct-chart');
  //
  // var $toolTip = $chart
  //   .append('<div class="tooltip"></div>')
  //   .find('.tooltip')
  //   .hide();
  //
  // $chart.on('mouseenter', '.ct-point', function() {
  //   var $point = $(this),
  //     value = $point.attr('ct:value'),
  //     seriesName = $point.parent().attr('ct:series-name');
  //   $toolTip.html(seriesName + '<br>' + value).show();
  // });
  //
  // $chart.on('mouseleave', '.ct-point', function() {
  //   $toolTip.hide();
  // });
  //
  // $chart.on('mousemove', function(event) {
  //   $toolTip.css({
  //     left: (event.offsetX || event.originalEvent.layerX) - $toolTip.width() / 2 - 10,
  //     top: (event.offsetY || event.originalEvent.layerY) - $toolTip.height() - 40
  //   });
  // });
}
