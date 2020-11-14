module.exports = {
  addStore: (req, res) => {
    console.log(req.body);
    let storeName = req.body.storeName;
    let emailAddress = req.body.emailAddress;
    let storeTax = req.body.storeTax;
    let companyID = req.body.companyID;
    let locationId = req.body.locationId;
    let messageFromStore = req.body.messageFromStore;
    let orderCancellationPolicy = req.body.orderCancellationPolicy;
    let aboutStore = req.body.aboutStore;
    let termsAndConditions = req.body.termsAndConditions;
    let minPickUpTime = req.body.minPickUpTime;
    let storeContact = req.body.storeContact;
    let endAcceptingTime = req.body.endAcceptingTime;
    let startAcceptingTime = req.body.startAcceptingTime;
    if (storeName) {
      if (emailAddress) {
        if (storeTax) {
          if (companyID) {
            if (locationId) {
              if (minPickUpTime) {
                let query =
                  "INSERT INTO store(storeName,emailAddress,storeTax,companyID,locationId,messageFromStore,orderCancellationPolicy,aboutStore,termsAndConditions,minPickUpTime,storeContact,startAcceptingTime,endAcceptingTime,isActive) VALUES('" +
                  storeName +
                  "','" +
                  emailAddress +
                  "','" +
                  storeTax +
                  "','" +
                  companyID +
                  "','" +
                  locationId +
                  "','" +
                  messageFromStore +
                  "','" +
                  orderCancellationPolicy +
                  "','" +
                  aboutStore +
                  "','" +
                  termsAndConditions +
                  "','" +
                  minPickUpTime +
                  "','" +
                  storeContact +
                  "','" +
                  startAcceptingTime +
                  "','" +
                  endAcceptingTime +
                  "','" +
                  "1" +
                  "')";
                db.query(query, (err, result) => {
                  if (err) {
                    res.status(400).send({
                      success: "false",
                      message: err,
                    });
                  } else {
                    res.status(201).send({
                      success: "true",
                      message: "Store added succesfully",
                      id: result.insertId,
                    });
                  }
                });
              } else {
                res.status(400).send({
                  success: "false",
                  message: "minPickUpTime is required",
                });
              }
            } else {
              res.status(400).send({
                success: "false",
                message: "locationID is required",
              });
            }
          } else {
            res.status(400).send({
              success: "false",
              message: "companyID is required",
            });
          }
        } else {
          res.status(400).send({
            success: "false",
            message: "storeTax is required",
          });
        }
      } else {
        res.status(400).send({
          success: "false",
          message: "emailAddress is required",
        });
      }
    } else {
      res.status(400).send({
        success: "false",
        message: "storeName is required",
      });
    }
  },
  editStore: (req, res) => {
    console.log(req.body);
    let storeName = req.body.storeName;
    let emailAddress = req.body.emailAddress;
    let storeTax = req.body.storeTax;
    let companyID = req.body.companyID;
    let locationId = req.body.locationId;
    let messageFromStore = req.body.messageFromStore;
    let orderCancellationPolicy = req.body.orderCancellationPolicy;
    let aboutStore = req.body.aboutStore;
    let termsAndConditions = req.body.termsAndConditions;
    let minPickUpTime = req.body.minPickUpTime;
    let storeContact = req.body.storeContact;
    let endAcceptingTime = req.body.endAcceptingTime;
    let startAcceptingTime = req.body.startAcceptingTime;
    if (storeName) {
      if (emailAddress) {
        if (storeTax) {
          if (companyID) {
            if (locationId) {
              if (minPickUpTime) {
                // UPDATE Customers
                // SET ContactName = 'Alfred Schmidt', City= 'Frankfurt'
                // WHERE CustomerID = 1;
                let query =
                  "UPDATE store SET storeName = " +
                  "'" +
                  storeName +
                  "'" +
                  "," +
                  "emailAddress=" +
                  "'" +
                  emailAddress +
                  "'" +
                  "," +
                  "storeTax=" +
                  "'" +
                  storeTax +
                  "'" +
                  "," +
                  "companyID=" +
                  "'" +
                  companyID +
                  "'" +
                  "," +
                  "messageFromStore=" +
                  "'" +
                  messageFromStore +
                  "'" +
                  "," +
                  "orderCancellationPolicy=" +
                  "'" +
                  orderCancellationPolicy +
                  "'" +
                  "," +
                  "aboutStore=" +
                  "'" +
                  aboutStore +
                  "'" +
                  "," +
                  "termsAndConditions=" +
                  "'" +
                  termsAndConditions +
                  "'" +
                  "," +
                  "minPickUpTime=" +
                  "'" +
                  minPickUpTime +
                  "'" +
                  "," +
                  "storeContact=" +
                  "'" +
                  storeContact +
                  "'" +
                  "," +
                  "startAcceptingTime=" +
                  "'" +
                  startAcceptingTime +
                  "'" +
                  "," +
                  "endAcceptingTime=" +
                  "'" +
                  endAcceptingTime +
                  "'" +
                  " WHERE storeID=" +
                  req.params.id;
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
                      message: "store edited succesfully",
                      id: result,
                    });
                  }
                });
              } else {
                res.status(400).send({
                  success: "false",
                  message: "minPickUpTime is required",
                });
              }
            } else {
              res.status(400).send({
                success: "false",
                message: "locationID is required",
              });
            }
          } else {
            res.status(400).send({
              success: "false",
              message: "companyID is required",
            });
          }
        } else {
          res.status(400).send({
            success: "false",
            message: "storeTax is required",
          });
        }
      } else {
        res.status(400).send({
          success: "false",
          message: "emailAddress is required",
        });
      }
    } else {
      res.status(400).send({
        success: "false",
        message: "storeName is required",
      });
    }
  },

  getStores: (req, res) => {
    let query =
      "SELECT * FROM store LEFT JOIN location on location.locationID=store.locationID ";
    db.query(query, (err, result) => {
      if (err) {
        res.status(400).send({
          success: "false",
          message: "Something is really bad happens",
        });
      } else {
        res.status(201).send({
          success: "true",
          //   message: "company added succesfully",
          result: result,
        });
      }
    });
  },
  getStore: (req, res) => {
    let query = "SELECT * FROM user WHERE storeId=" + req.params.id;
    let query1 =
      "SELECT * FROM `Store` LEFT JOIN location on location.locationID=store.locationID WHERE Store.storeId=" +
      req.params.id;

    db.query(query1, (err, result) => {
      if (err) {
        res.status(400).send({
          success: "false",
          message: err,
        });
      } else {
        res.status(201).send({
          success: "true",
          message: "company added succesfully",
          result: result,
        });
      }
    });
  },
  getStoreUser: (req, res) => {
    let query = "SELECT * FROM user WHERE storeId=" + req.params.id;
    db.query(query, (err, result) => {
      if (err) {
        res.status(400).send({
          success: "false",
          message: err,
        });
      } else {
        res.status(201).send({
          success: "true",
          // message: "company added succesfully",
          result: result,
        });
      }
    });
  },
  getStoreStatus: (req, res) => {
    let query =
      "SELECT * FROM Store  LEFT JOIN location ON location.locationID=store.locationID WHERE isActive=" +
      req.params.status;
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
  changeStoreStatus: (req, res) => {
    let storeID = req.params.id;
    let status = req.params.status;
    if (storeID) {
      if (status) {
        let query =
          "UPDATE store SET isActive = " +
          "'" +
          status +
          "'" +
          " WHERE storeID=" +
          req.params.id;
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
              message: "Status udpated succesfully",
              id: result,
            });
          }
        });
      } else {
        res.status(400).send({
          success: "false",
          message: "status is required",
        });
      }
    } else {
      res.status(400).send({
        success: "false",
        message: "storeID is required",
      });
    }
  },
};
