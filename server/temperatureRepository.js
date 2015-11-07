var pg = require('pg');

function insertTemp(temp) {
  pg.connect(process.env.DATABASE_URL, function(err, client) {
    if (err) throw err;

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
  console.log("get Temp i repo kallt");
  pg.connect(process.env.DATABASE_URL, function(err, client) {
        if (err) {
          console.log("error pa getTemp")
        }

        var query = client.query('SELECT date_measured, temp FROM temperature');
        var rows = [];

        query.on('row', function(row, result) {
            result.addRow(row);
          });

        query.on('end', function(result) {
            response.send(result.rows);
          });
        });
      }

      module.exports.insertTemp = insertTemp;
      module.exports.getTemp = getTemp;
