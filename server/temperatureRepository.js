var pg = require('pg');

function insertTemp(temp) {
  pg.connect(process.env.DATABASE_URL, function(err, client) {
    if (err) throw err;
    console.log('Connected to postgres! Getting schemas...');

    console.log(new Date());
    client.query('INSERT INTO temperature (date_measured, temp)' +
      'VALUES ($1,$2) RETURNING id', [new Date(), temp],
      function(err, result) {
        if (err) {
          console.log(err)
        } else {
          console.log("Insert temperature with id: " + result.rows[0].id)
        }
      });
  });
}

function getTemp(response) {
  pg.connect(process.env.DATABASE_URL, function(err, client) {
        if (err) {
          console.log("error")
          throw err;
        }
        console.log('Connected to postgres! ');

        var query = client.query('SELECT date_measured, temp FROM temperature');
        var rows = [];

        query.on('row', function(row, result) {
            result.addRow(row);
          });

        query.on('end', function(result) {
            console.log("on end");
            // console.log(JSON.stringify(result.rows));
            response.send(result.rows);
          });
        });
      }

      module.exports.insertTemp = insertTemp;
      module.exports.getTemp = getTemp;
