const e = require("express");

module.exports = {
  addFavourites: (req, res) => {
    let userID = req.body.userID;
    let storeID = req.body.storeID;
    let productID = req.body.productID;

    if (userID) {
      if (storeID) {
        if (productID) {
          let query =
            "INSERT INTO favourite(userID,storeID,productID) VALUES('" +
            userID +
            "','" +
            storeID +
            "','" +
            productID +
            "')";
          db.query(query, (err, result) => {
            if (err) {
              res.status(400).send({
                success: "false",
                message: "Something went wrong",
              });
            } else {
              res.status(201).send({
                success: "true",
                message: "fave added succesfully",
                id: result.insertId,
              });
            }
          });
        } else {
          res.status(400).send({
            success: "false",
            message: "productID is required",
          });
        }
      } else {
        res.status(400).send({
          success: "false",
          message: "storeID is required",
        });
      }
    } else {
      res.status(400).send({
        success: "false",
        message: "userID type is required",
      });
    }
  },
  editFavourites: (req, res) => {
    let userID = req.body.userID;
    let storeID = req.body.storeID;
    let productID = req.body.productID;

    if (userID) {
      if (storeID) {
        if (productID) {
          // UPDATE Customers
          // SET ContactName = 'Alfred Schmidt', City= 'Frankfurt'
          // WHERE CustomerID = 1;
          let query =
            "UPDATE location SET userID = " +
            "'" +
            userID +
            "'" +
            "," +
            "storeID=" +
            "'" +
            storeID +
            "'" +
            "," +
            "productID=" +
            "'" +
            productID +
            "'" +
            " WHERE locationID=" +
            "'" +
            req.params.id +
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
                message: "fav edited succesfully",
                id: result,
              });
            }
          });
        } else {
          res.status(400).send({
            success: "false",
            message: "productID is required",
          });
        }
      } else {
        res.status(400).send({
          success: "false",
          message: "storeID is required",
        });
      }
    } else {
      res.status(400).send({
        success: "false",
        message: "userID type is required",
      });
    }
  },
  //   getLocation: (req, res) => {
  //     let query = "SELECT * FROM LOCATION WHERE locationID=" + req.params.id;
  //     db.query(query, (err, result) => {
  //       if (err) {
  //         res.status(400).send({
  //           success: "false",
  //           message: err,
  //         });
  //       } else {
  //         res.status(201).send({
  //           success: "true",
  //           result: result,
  //         });
  //       }
  //     });
  //   },
};
