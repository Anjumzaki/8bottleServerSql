// const e = require("express");

module.exports = {
  addStoreTimings: (req, res) => {
    let storeID = req.body.storeID;
    let day = req.body.day;
    let openTime = req.body.openTime;
    let closeTime = req.body.closeTime;
    let isClosed = req.body.isClosed;
    if (storeID) {
      if (day) {
        let query =
          "INSERT INTO storetimings(storeID,day,openTime,closeTime,isClosed) VALUES('" +
          storeID +
          "','" +
          day +
          "','" +
          openTime +
          "','" +
          closeTime +
          "','" +
          isClosed +
          "')";
        db.query(query, (err, result) => {
          if (err) {
            res.status(400).send({
              success: "false",
              message: "Something went wrong",
              id: err,
            });
          } else {
            res.status(201).send({
              success: "true",
              message: "timing added succesfully",
              id: result.insertId,
            });
          }
        });
      } else {
        res.status(400).send({
          success: "false",
          message: "day is required",
        });
      }
    } else {
      res.status(400).send({
        success: "false",
        message: "storeID type is required",
      });
    }
  },
  editStoreTimings: (req, res) => {
    let storeID = req.params.id;
    let day = req.params.day;
    let openTime = req.body.openTime;
    let closeTime = req.body.closeTime;
    let isClosed = req.body.isClosed;
    if (storeID) {
      if (day) {
        // UPDATE Customers
        // SET ContactName = 'Alfred Schmidt', City= 'Frankfurt'
        // WHERE CustomerID = 1;
        let query =
          "UPDATE storetimings SET storeID= " +
          "'" +
          storeID +
          "'" +
          "," +
          "day=" +
          "'" +
          day +
          "'" +
          "," +
          "openTime=" +
          "'" +
          openTime +
          "'" +
          "," +
          "closeTime=" +
          "'" +
          closeTime +
          "'" +
          "," +
          "isClosed=" +
          "'" +
          isClosed +
          "'" +
          " WHERE storeID=" +
          "'" +
          req.params.id +
          "'" +
          "and day=" +
          "'" +
          req.params.day +
          "'";
        console.log(query);
        db.query(query, (err, result) => {
          if (err) {
            res.status(400).send({
              success: "false",
              message: err,
            });
          } else {
            res.status(201).send({
              success: "true",
              message: "store timings edited succesfully",
              id: result,
            });
          }
        });
      }
    } else {
      res.status(400).send({
        success: "false",
        message: "closeTime is required",
      });
    }
  },
  getStoreTimings: (req, res) => {
    let query = "SELECT * FROM storetimings WHERE storeID=" + req.params.id;
    db.query(query, (err, result) => {
      if (err) {
        res.status(400).send({
          success: "false",
          message: err,
        });
      } else {
        res.status(201).send({
          success: "true",
          result: result,
        });
      }
    });
  },
};
