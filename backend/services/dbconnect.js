var mysql = require('mysql');
/**
 * Create a connection to the Mysql Database
*/

var pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database : 'folyou',
  multipleStatements: true
});

/**
 * Connection Test
 */

var DB = (function () {

    function _query(query, params, callback) {
        pool.getConnection(function (err, connection) {
            if (err) {
                connection.release();
                callback(null, err);
                throw err;
            }

            connection.query(query, params, function (err, rows) {
                console.log(query,params);
                connection.release();
                if (!err) {
                    callback(rows,null);
                }
                else {
                    callback(null, err);
                }

            });

            connection.on('error', function (err) {
                connection.release();
                callback(null, err);
                throw err;
            });
        });
    };

    return {
        query: _query
    };
})();

module.exports = DB;