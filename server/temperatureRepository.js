var pg = require('pg');

function insertTemp(temp) {
  pg.connect(process.env.DATABASE_URL, function(err, client) {
    if(handleError(err)){
      console.log("error i pg connection");
      return;
    }

    client.query('INSERT INTO temperature (date_measured, temp)' +
      'VALUES ($1,$2) RETURNING id', [new Date(), temp],
      function(err, result) {
        if (err) {
          console.log(err)
        } else {
          console.log("Insert temperature with id: " + result.rows[0].id)
        }
      });
      client.end();
  });
}

function getTemp(response) {
  console.log("get Temp i repo kallt");
  pg.connect(process.env.DATABASE_URL, function(err, client) {
        if(handleError(err,client)) {
            console.log("error i pg connection");
            return;
        }

        var query = client.query('SELECT date_measured, temp FROM temperature');
        var rows = [];

        query.on('row', function(row, result) {
            result.addRow(row);
          });

        query.on('end', function(result) {
            response.send(result.rows);
          });
        client.end();
        });
      }

  function handleError(err, client) {
    // no error occurred, continue with the request
     if(!err) return false;

     // An error occurred, remove the client from the connection pool.
     // A truthy value passed to done will remove the connection from the pool
     // instead of simply returning it to be reused.
     // In this case, if we have successfully received a client (truthy)
     // then it will be removed from the pool.
     if(client){
       done(client);
     }
     res.writeHead(500, {'content-type': 'text/plain'});
     res.end('An error occurred');
     return true;
  }
      module.exports.insertTemp = insertTemp;
      module.exports.getTemp = getTemp;
