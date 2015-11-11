var _ = require('underscore');
var d3 = require('d3');
var c3 = require('./libs/c3-0.4.10/c3.min.js');

function buildGraph(data) {
  var labels =[];
  var dataset = [];
  _.map(data, function (measurement) {
    labels.push(new Date(measurement.date_measured));
    dataset.push(measurement.temp);
  });
  // console.log(labels);
  // console.log(dataset);
  dataset = _.filter(dataset, function (element) {
    return element !== null;
  })
  maxValue = _.max(dataset);
  minValue = _.min(dataset);

  var ticks = getTickValues(labels);
  labels.unshift('x');
  dataset.unshift('Temperaturdata');
  var chart = c3.generate({
      data: {
          x: 'x',
          xFormat: '%Y-%m-%d %H:%M:%S',
          columns: [
              labels,
              dataset,
          ]
      },
      axis: {
          x: {
              type: 'timeseries',
              tick: {
                  values: ticks,
                  fit: true,
                  format: "%e %b %y",
              }
          },
          y: {
            max: maxValue + 2,
            min: minValue -2,
          }
      },
      zoom: {
        enabled: true,
      },
      tooltip: {
        format: {
          name: function (name, ratio, id, index) { return formatDateString(labels[index]) },
          value: function (value, ratio, id, index) { return (value).toFixed(2) + "\xB0 C"; }
        }
      },
  });
}

function getTickValues(dates) {
  var ticks = [];
  _.each(dates, function(date) {
    if(!hasDate(ticks, date)) {
      ticks.push(date);
    }
  });
  return ticks;
}

function hasDate(dates, dateToCheck) {
  return _.some(dates, function (date) {
    return date.toDateString() === dateToCheck.toDateString();
  });
}

function formatDateString(date) {
  var hours = convertToClockFormat(date.getHours());
  var minutes = convertToClockFormat(date.getMinutes());
  var seconds = convertToClockFormat(date.getSeconds());
  return hours +":"+ minutes +":"+ seconds;
}

function convertToClockFormat(timeUnit) {
  if(timeUnit < 10) {
    return "0" + timeUnit
  }
  return timeUnit;
}


module.exports.buildGraph = buildGraph;
