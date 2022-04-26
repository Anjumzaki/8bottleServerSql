const e = require("express");

module.exports = {
  addRef_trans_products: (req, res) => {
    let orderID = req.body.orderID;
    let itemID = req.body.itemID;
    let itemQuantity = req.body.itemQuantity;
    if (orderID) {
      if (itemID) {
        if (itemQuantity) {
          let query =
            "INSERT INTO ref_trans_items(orderID,itemID,itemQuantity) VALUES('" +
            orderID +
            "','" +
            itemID +
            "','" +
            itemQuantity +
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
                message: "reference of product added added succesfully",
                id: result.insertId,
              });
            }
          });
        } else {
          res.status(400).send({
            success: "false",
            message: "itemQuantity is required",
          });
        }
      } else {
        res.status(400).send({
          success: "false",
          message: "itemID is required",
        });
      }
    } else {
      res.status(400).send({
        success: "false",
        message: "orderID is required",
      });
    }
  },
  editRef_trans_prod: (req, res) => {
    let orderID = req.body.orderID;
    let itemID = req.body.itemID;
    let itemQuantity = req.body.itemQuantity;
    if (orderID) {
      if (itemID) {
        if (itemQuantity) {
          let query =
            "UPDATE ref_trans_items SET orderID = " +
            "'" +
            orderID +
            "'" +
            "," +
            "itemID=" +
            "'" +
            itemID +
            "'" +
            "," +
            "itemQuantity=" +
            itemQuantity +
            " WHERE id=" +
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
                message: "reference of product edited succesfully",
                id: result,
              });
            }
          });
        } else {
          res.status(400).send({
            success: "false",
            message: "itemQuantity is required",
          });
        }
      } else {
        res.status(400).send({
          success: "false",
          message: "itemID is required",
        });
      }
    } else {
      res.status(400).send({
        success: "false",
        message: "orderID is required",
      });
    }
  },
  getRef_trans_prods: (req, res) => {
    let query = "SELECT * FROM ref_trans_items";
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
  getRef_trans_prod: (req, res) => {
    let query = "SELECT * FROM ref_trans_items WHERE orderId=" + req.params.id;
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
  deleteRef_trans_prod: (req, res) => {
    let query = "DELETE  FROM ref_trans_items WHERE id=" + req.params.id;
    db.query(query, (err, result) => {
      if (err) {
        res.status(400).send({
          success: "false",
          message: err,
        });
      } else {
        res.status(201).send({
          success: "true",
          message: "reference of product deleted succesfully",
          result: result,
        });
      }
    });
  },
};
