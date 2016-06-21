var pg = require('pg');
var dbURL = process.env.DATABASE_URL;

var lastTemp = 0.0;

function insertTemp(temp) {
    pg.connect(dbURL, function(err, client, done) {
        if(err){
            console.log("error i pg connection");
            done();
            return;
        }

        if(temp !== lastTemp) {
            lastTemp = temp;
            client.query('INSERT INTO temperature (date_measured, temp)' +
                'VALUES ($1,$2) RETURNING id', [new Date(), temp],
                function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                });
        }
        done();
    });
}

function getTemp(response) {
    console.log("get Temp i repo kallt");
    pg.connect(dbURL, function(err, client, done) {
        if(err) {
            console.log("error i pg connection");
            done()
            return;
        }

        var query = client.query('SELECT date_measured, temp, id FROM temperature');
        var rows = [];

        query.on('row', function(row, result) {
            result.addRow(row);
        });

        query.on('end', function(result) {
            response.send(result.rows);
        });
        done();
    });
}


module.exports.insertTemp = insertTemp;
module.exports.getTemp = getTemp;
