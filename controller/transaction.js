const { query } = require("express");

module.exports = {
  addTransaction: (req, res) => {
    let salesPrice = req.body.salesPrice;
    let storeID = req.body.storeID;
    let workerID = req.body.workerID;
    let tax = req.body.tax;
    let totalAmount = req.body.totalAmount;
    let customerName = req.body.customerName;
    let someOneElse = req.body.someOneElse;
    let orderTime = req.body.orderTime;
    let pickupTime = req.body.pickupTime;
    let orderDate = req.body.orderDate;
    let pickupDate = req.body.pickupDate;
    let isGuest = req.body.isGuest;
    let guestName = req.body.guestName;
    let statusCode = req.body.statusCode;
    let specialInstructions = req.body.specialInstructions;
    let orderNumber = req.body.orderNumber;
    let someOneElseFirstName = req.body.someOneElseFirstName;
    let someOneElseLastName = req.body.someOneElseLastName;
    let someOneElseEmail = req.body.someOneElseEmail;
    let someOneElsePhone = req.body.someOneElsePhone;
    if (storeID) {
      if (salesPrice) {
        if (pickupTime) {
          let query =
            "INSERT INTO transaction(workerID,salesPrice,tax,totalAmount,customerName,someOneElse,orderTime,pickupTime,isGuest,guestName,statusCode,specialInstructions,orderDate,pickupDate,storeID,orderNumber,someOneElseFirstName,someOneElseLastName,someOneElseEmail,someOneElsePhone) VALUES('" +
            workerID +
            "','" +
            salesPrice +
            "','" +
            tax +
            "','" +
            totalAmount +
            "','" +
            customerName +
            "','" +
            someOneElse +
            "','" +
            orderTime +
            "','" +
            pickupTime +
            "','" +
            isGuest +
            "','" +
            guestName +
            "','" +
            statusCode +
            "','" +
            specialInstructions +
            "','" +
            orderDate +
            "','" +
            pickupDate +
            "','" +
            storeID +
            "','" +
            orderNumber +
            "','" +
            someOneElseFirstName +
            "','" +
            someOneElseLastName +
            "','" +
            someOneElseEmail +
            "','" +
            someOneElsePhone +
            "')";
          db.query(query, (err, result) => {
            if (err) {
              return res.status(400).send({
                success: "false",
                message: err,
                errasd: result,
              });
            } else {
              return res.status(201).send({
                success: "true",
                message: "transaction added succesfully",
                id: result.insertId,
              });
            }
          });
        } else {
          res.status(400).send({
            success: "false",
            message: "pickupTime is required",
          });
        }
      } else {
        res.status(400).send({
          success: "false",
          message: "salesPrice is required",
        });
      }
    } else {
      res.status(400).send({
        success: "false",
        message: "storeID is required",
      });
    }
  },
  editTransaction: (req, res) => {
    let salesPrice = req.body.salesPrice;
    let workerID = req.body.workerID;
    let tax = req.body.tax;
    let totalAmount = req.body.totalAmount;
    let customerName = req.body.customerName;
    let someOneElse = req.body.someOneElse;
    let orderTime = req.body.orderTime;
    let pickupTime = req.body.pickupTime;
    let orderDate = req.body.orderDate;
    let pickupDate = req.body.pickupDate;
    let isGuest = req.body.isGuest;
    let guestName = req.body.guestName;
    let statusCode = req.body.statusCode;
    let storeID = req.body.storeID;
    let specialInstructions = req.body.specialInstructions;
    let orderNumber = req.body.orderNumber;
    let someOneElseFirstName = req.body.someOneElseFirstName;
    let someOneElseLastName = req.body.someOneElseLastName;
    let someOneElseEmail = req.body.someOneElseEmail;
    let someOneElsePhone = req.body.someOneElsePhone;
    if (storeID) {
      if (orderTime) {
        if (salesPrice) {
          if (tax) {
            if (pickupTime) {
              // UPDATE Customers
              // SET ContactName = 'Alfred Schmidt', City= 'Frankfurt'
              // WHERE CustomerID = 1;
              let query =
                "UPDATE transaction SET storeID = " +
                "'" +
                storeID +
                "'" +
                "," +
                "salesPrice=" +
                "'" +
                salesPrice +
                "'" +
                "," +
                "workerID=" +
                "'" +
                workerID +
                "'" +
                "," +
                "tax=" +
                "'" +
                tax +
                "'" +
                "," +
                "totalAmount=" +
                "'" +
                totalAmount +
                "'" +
                "," +
                "customerName=" +
                "'" +
                customerName +
                "'" +
                "," +
                "someOneElse=" +
                "'" +
                someOneElse +
                "'" +
                "," +
                "orderTime=" +
                "'" +
                orderTime +
                "'" +
                "," +
                "pickupTime=" +
                "'" +
                pickupTime +
                "'" +
                "," +
                "isGuest=" +
                "'" +
                isGuest +
                "'" +
                "," +
                "guestName=" +
                "'" +
                guestName +
                "'" +
                "," +
                "statusCode=" +
                "'" +
                statusCode +
                "'" +
                "," +
                "specialInstructions=" +
                "'" +
                specialInstructions +
                "'" +
                "," +
                "orderDate=" +
                "'" +
                orderDate +
                "'" +
                "," +
                "pickupDate=" +
                "'" +
                pickupDate +
                "'" +
                "," +
                "orderNumber=" +
                "'" +
                orderNumber +
                "'" +
                "," +
                "someOneElseFirstName=" +
                "'" +
                someOneElseFirstName +
                "'" +
                "," +
                "someOneElseLastName=" +
                "'" +
                someOneElseLastName +
                "'" +
                "," +
                "someOneElseEmail=" +
                "'" +
                someOneElseEmail +
                "'" +
                "," +
                "someOneElsePhone=" +
                "'" +
                someOneElsePhone +
                "'" +
                " WHERE orderID=" +
                req.params.id;
              db.query(query, (err, result) => {
                if (err) {
                  res.status(400).send({
                    success: "false",
                    message: err,
                  });
                } else {
                  res.status(201).send({
                    success: "true",
                    message: "transaction edited succesfully",
                    id: result,
                  });
                }
              });
            } else {
              res.status(400).send({
                success: "false",
                message: "pickupTime is required",
              });
            }
          } else {
            res.status(400).send({
              success: "false",
              message: "tax is required",
            });
          }
        } else {
          res.status(400).send({
            success: "false",
            message: "salesPrice is required",
          });
        }
      } else {
        res.status(400).send({
          success: "false",
          message: "orderTime is required",
        });
      }
    } else {
      res.status(400).send({
        success: "false",
        message: "storeID is required",
      });
    }
  },
  getTransactions: (req, res) => {
    let otherResult = [];
    let myResult = [];
    // let query = "select * from user";
    let query1 =
      "SELECT * FROM transaction LEFT JOIN ref_order_status ON ref_order_status.statusCode=transaction.statusCode LEFT JOIN user ON user.userID=transaction.customerName  LEFT JOIN store ON transaction.storeID=store.storeID WHERE transaction.storeID";
    myResult = db.query(query1, (err, result) => {
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
  getTransaction: (req, res) => {
    let myvar = [];
    let myProducts = [];
    let query1 =
      "SELECT * FROM transaction LEFT JOIN ref_order_status ON ref_order_status.statusCode=transaction.statusCode  LEFT JOIN user ON user.userID=transaction.customerName LEFT JOIN store ON store.storeID=transaction.storeID where transaction.orderId=" +
      req.params.id;
    db.query(query1, (err, result) => {
      if (err) {
        res.status(400).send({
          success: "false",
          message: err,
          qq: query1,
        });
      } else {
        myvar = result;
      }
    });
    setTimeout(function () {
      for (var i = 0; i < myvar.length; i++) {
        let query =
          "SELECT productID AS product_ID, items.itemID AS item_ID , ref_trans_items.itemQuantity AS itemQuantity,(SELECT productPrice FROM items WHERE itemID=item_ID) productPrice  ,(SELECT speciaIInstructions FROM items WHERE itemID=item_ID) speciaIInstructions ,(SELECT discount FROM items WHERE itemID=item_ID) discount, (SELECT itemBarcode FROM items WHERE itemID=item_ID) itemBarcode, (SELECT productName FROM product WHERE productID=product_ID) productName, (SELECT productDescription FROM product WHERE productID=product_ID) productDescription, (SELECT productType FROM product WHERE productID=product_ID) productType, (SELECT productBarcode FROM product WHERE productID=product_ID) productBarcode FROM ref_trans_items LEFT JOIN items ON items.itemID=ref_trans_items.itemID WHERE orderID=" +
          myvar[i].orderID;
        db.query(query, (err, result1) => {
          if (err) {
            res.status(400).send({
              success: "false",
              message: err,
              result: query1,
            });
          } else {
            myProducts.push(result1);
          }
        });
      }
    }, 1000);
    setTimeout(() => {
      for (var i = 0; i < myvar.length; i++) {
        myvar[i].products = myProducts[i];
      }
      res.status(200).send({
        success: "false",
        result: myvar,
      });
    }, 2000);
  },
  getTransactionByState: (req, res) => {
    let myvar = [];
    let myProducts = [];
    let query1 =
      "SELECT * FROM transaction LEFT JOIN ref_order_status ON ref_order_status.statusCode=transaction.statusCode  LEFT JOIN user ON user.userID=transaction.customerName LEFT JOIN store ON store.storeID=transaction.storeID where " +
      req.params.table +
      "." +
      req.params.search +
      "=" +
      "'" +
      req.params.id +
      "'";
    db.query(query1, (err, result) => {
      if (err) {
        res.status(400).send({
          success: "false",
          message: err,
          qq: query1,
        });
      } else {
        myvar = result;
      }
    });
    setTimeout(function () {
      for (var i = 0; i < myvar.length; i++) {
        let query =
          "SELECT productID AS product_ID, items.itemID AS item_ID, ref_trans_items.itemQuantity AS itemQuantity,(SELECT productPrice FROM items WHERE itemID=item_ID) productPrice ,(SELECT productDiscount FROM items WHERE itemID=item_ID) productDiscount ,(SELECT speciaIInstructions FROM items WHERE itemID=item_ID) speciaIInstructions ,(SELECT discount FROM items WHERE itemID=item_ID) discount, (SELECT itemBarcode FROM items WHERE itemID=item_ID) itemBarcode, (SELECT productName FROM product WHERE productID=product_ID) productName, (SELECT productDescription FROM product WHERE productID=product_ID) productDescription, (SELECT productType FROM product WHERE productID=product_ID) productType, (SELECT productBarcode FROM product WHERE productID=product_ID) productBarcode FROM ref_trans_items LEFT JOIN items ON items.itemID=ref_trans_items.itemID  WHERE orderID=" +
          myvar[i].orderID;
        db.query(query, (err, result1) => {
          if (err) {
            res.status(400).send({
              success: "false",
              message: err,
              result: query1,
            });
          } else {
            myProducts.push(result1);
          }
        });
      }
    }, 1000);
    setTimeout(() => {
      for (var i = 0; i < myvar.length; i++) {
        myvar[i].products = myProducts[i];
      }
      res.status(200).send({
        success: "false",
        result: myvar,
      });
    }, 2000);
  },
  getStoreTransaction: async (req, res) => {
    let myvar = [];
    let myProducts = [];
    let query1 =
      "SELECT * FROM transaction LEFT JOIN ref_order_status ON ref_order_status.statusCode=transaction.statusCode  LEFT JOIN user ON user.userID=transaction.customerName LEFT JOIN store ON store.storeID=transaction.storeID  where transaction.storeID=" +
      req.params.id;
    db.query(query1, (err, result) => {
      if (err) {
        res.status(400).send({
          success: "false",
          message: err,
          qq: query1,
        });
      } else {
        myvar = result;
      }
    });
    setTimeout(function () {
      for (var i = 0; i < myvar.length; i++) {
        let query =
          "SELECT productID AS product_ID, items.itemID AS item_ID , ref_trans_items.itemQuantity AS itemQuantity,(SELECT productPrice FROM items WHERE itemID=item_ID) productPrice ,(SELECT productDiscount FROM items WHERE itemID=item_ID) productDiscount ,(SELECT speciaIInstructions FROM items WHERE itemID=item_ID) speciaIInstructions ,(SELECT discount FROM items WHERE itemID=item_ID) discount, (SELECT itemBarcode FROM items WHERE itemID=item_ID) itemBarcode, (SELECT productName FROM product WHERE productID=product_ID) productName, (SELECT productDescription FROM product WHERE productID=product_ID) productDescription, (SELECT productType FROM product WHERE productID=product_ID) productType, (SELECT productBarcode FROM product WHERE productID=product_ID) productBarcode FROM ref_trans_items LEFT JOIN items ON items.itemID=ref_trans_items.itemID WHERE orderID=" +
          myvar[i].orderID;
        db.query(query, (err, result1) => {
          if (err) {
            res.status(400).send({
              success: "false",
              message: err,
              result: query1,
            });
          } else {
            myProducts.push(result1);
          }
        });
      }
    }, 1000);
    setTimeout(() => {
      for (var i = 0; i < myvar.length; i++) {
        myvar[i].products = myProducts[i];
      }
      res.status(200).send({
        success: "false",
        result: myvar,
      });
    }, 2000);
  },
  getStoreTransactionWithStatus: (req, res) => {
    let myvar = [];
    let myProducts = [];
    let query1 =
      "SELECT * FROM transaction LEFT JOIN user ON user.userID=transaction.customerName where statusCode=" +
      req.params.code +
      " AND transaction.storeID=" +
      req.params.id;
    db.query(query1, (err, result) => {
      if (err) {
        return res.status(400).send({
          success: "false",
          message: err,
          qq: query1,
        });
      } else {
        myvar = result;
      }
    });
    setTimeout(function () {
      for (var i = 0; i < myvar.length; i++) {
        let query =
          "SELECT productID AS product_ID, items.itemID AS item_ID, ref_trans_items.itemQuantity AS itemQuantity,(SELECT productPrice FROM items WHERE itemID=item_ID) productPrice ,(SELECT productDiscount FROM items WHERE itemID=item_ID) productDiscount  ,(SELECT speciaIInstructions FROM items WHERE itemID=item_ID) speciaIInstructions ,(SELECT discount FROM items WHERE itemID=item_ID) discount, (SELECT itemBarcode FROM items WHERE itemID=item_ID) itemBarcode, (SELECT productName FROM product WHERE productID=product_ID) productName, (SELECT productDescription FROM product WHERE productID=product_ID) productDescription, (SELECT productType FROM product WHERE productID=product_ID) productType, (SELECT productBarcode FROM product WHERE productID=product_ID) productBarcode FROM ref_trans_items LEFT JOIN items ON items.itemID=ref_trans_items.itemID  WHERE orderID=" +
          myvar[i].orderID;
        db.query(query, (err, result1) => {
          if (err) {
            return res.status(400).send({
              success: "false",
              message: err,
              result: query1,
            });
          } else {
            myProducts.push(result1);
          }
        });
      }
    }, 1000);
    setTimeout(() => {
      for (var i = 0; i < myvar.length; i++) {
        myvar[i].products = myProducts[i];
      }
      return res.status(200).send({
        success: "false",
        result: myvar,
      });
    }, 2000);
  },
  chnageTransactionStatusCode: (req, res) => {
    let code = req.params.code;
    if (code) {
      // UPDATE Customers
      // SET ContactName = 'Alfred Schmidt', City= 'Frankfurt'
      // WHERE CustomerID = 1;
      let query =
        "UPDATE transaction SET statusCode = " +
        "'" +
        code +
        "'" +
        " WHERE orderID=" +
        req.params.id;
      db.query(query, (err, result) => {
        if (err) {
          res.status(400).send({
            success: "false",
            message: err,
          });
        } else {
          res.status(201).send({
            success: "true",
            message: "Status udpated succesfully",
            id: result,
          });
        }
      });
    } else {
      res.status(400).send({
        success: "false",
        message: "code is required",
      });
    }
  },
  chnageTransactionItemQuantity: (req, res) => {
    let query =
      "UPDATE ref_trans_items SET itemQuantity = " +
      "'" +
      req.body.itemQuantity +
      "'" +
      " WHERE orderID=" +
      req.params.orderId +
      " And itemID=" +
      req.params.itemId;
    db.query(query, (err, result) => {
      if (err) {
        res.status(400).send({
          success: "false",
          message: err,
        });
      } else {
        res.status(201).send({
          success: "true",
          message: "Status udpated succesfully",
          id: result,
        });
      }
    });
  },
  getStoreTransactionByDate: (req, res) => {
    let myvar = [];
    let myProducts = [];
    let query1 =
      "SELECT * FROM transaction LEFT JOIN ref_order_status ON ref_order_status.statusCode=transaction.statusCode  LEFT JOIN user ON user.userID=transaction.customerName LEFT JOIN store ON store.storeID=transaction.storeID  where transaction.storeID=" +
      req.params.id +
      " AND pickupDate=" +
      "'" +
      req.params.date +
      "'";
    db.query(query1, (err, result) => {
      if (err) {
        res.status(400).send({
          success: "false",
          message: err,
          qq: query1,
        });
      } else {
        myvar = result;
      }
    });
    setTimeout(function () {
      for (var i = 0; i < myvar.length; i++) {
        let query =
          "SELECT productID AS product_ID, items.itemID AS item_ID ,(SELECT productPrice FROM items WHERE itemID=item_ID) productPrice  ,(SELECT speciaIInstructions FROM items WHERE itemID=item_ID) speciaIInstructions ,(SELECT discount FROM items WHERE itemID=item_ID) discount, (SELECT itemBarcode FROM items WHERE itemID=item_ID) itemBarcode, (SELECT productName FROM product WHERE productID=product_ID) productName, (SELECT productDescription FROM product WHERE productID=product_ID) productDescription, (SELECT productType FROM product WHERE productID=product_ID) productType, (SELECT productBarcode FROM product WHERE productID=product_ID) productBarcode FROM ref_trans_items LEFT JOIN items ON items.itemID=ref_trans_items.itemID WHERE orderID=" +
          myvar[i].orderID;
        db.query(query, (err, result1) => {
          if (err) {
            res.status(400).send({
              success: "false",
              message: err,
              result: query1,
            });
          } else {
            myProducts.push(result1);
          }
        });
      }
    }, 1000);
    setTimeout(() => {
      for (var i = 0; i < myvar.length; i++) {
        myvar[i].products = myProducts[i];
      }
      res.status(200).send({
        success: "false",
        result: myvar,
        reqs: req.params,
      });
    }, 2000);
  },
  getStoreTransactionStats: (req, res) => {
    let query1 =
      "SELECT * FROM transaction where storeID=" + req.params.storeID;
    db.query(query1, (err, orders) => {
      if (err) {
        res.status(400).send({
          success: "false",
          message: err,
        });
      } else {
        var totalOrders = orders.length;
        var newOrders = 0;
        var inPrepOrders = 0;
        var readyOrders = 0;
        var pickedOrders = 0;
        var totalRevenue = 0;
        for (var i = 0; i < orders.length; i++) {
          if (orders[i].statusCode === 0) {
            newOrders++;
          } else if (orders[i].statusCode === 1) {
            inPrepOrders++;
          } else if (orders[i].statusCode === 2) {
            readyOrders++;
          } else if (orders[i].statusCode === 3) {
            pickedOrders++;
          } else if (orders[i].statusCode === 3) {
            pickedOrders++;
            totalRevenue += parseFloat(orders[i].salesPrice);
          }
        }
        var stats = {};

        stats = {
          totalOrders: totalOrders,
          newOrders: newOrders,
          inPrepOrders: inPrepOrders,
          readyOrders: readyOrders,
          pickedOrders: pickedOrders,
          totalRevenue: totalRevenue,
        };

        res.status(201).send({
          success: "true",
          stats: stats,
        });
      }
    });
  },
};
