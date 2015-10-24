var express = require('express');
var app = express();
var tellstick = require('./tellstick.js');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/views'));

app.get('/', function(request, response) {
  response.sendfile('./views/index.html');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

app.post('/start', function(request, response){
    tellstick.start(request, response);
    response.sendStatus(200);
});

app.post('/stop', function(request, response){
    tellstick.stop(request, response);
    response.sendStatus(200);
});

app.get('/state', function(request, response){
    console.log(response)
    response.body = tellstick.getIsPowerOn();
    console.log(response.body)
    response.sendStatus(200);
});
