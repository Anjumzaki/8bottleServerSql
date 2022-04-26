const mysql = require("mysql");
const db = {
  host: "us-cdbr-east-02.cleardb.com",
  user: "b2d022681c048b",
  password: "e505af4e",
  database: "heroku_030ff3851a4ecae",
  port: 3306
};
// db.connect((err) => {
//     if(err){
//         throw err;
//     }else{
//         console.log("database connected");
//     }
// });
var connection;

function handleDisconnect() {
  connection = mysql.createConnection(db); // Recreate the connection, since

  // the old one cannot be reused.

  connection.connect(function (err) {
    // The server is either down
    if (err) {
      // or restarting (takes a while sometimes).
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    } else {
      console.log("connected to DB");
    } // to avoid a hot loop, and to allow our node script to
  }); // process asynchronous requests in the meantime.
  // If you're also serving http, display a 503 error.
  connection.on("error", function (err) {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      // Connection to the MySQL server is usually
      handleDisconnect(); // lost due to either server restart, or a
    } else {
      // connnection idle timeout (the wait_timeout
      throw err; // server variable configures this)
    }
  });
  global.db = connection;

}


handleDisconnect();
