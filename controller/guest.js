const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  addGuest: async (req, res) => {
    console.log(req.body);
    let firstName = req.body.firstName;
    let guestID = req.body.guestID;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let mobile = req.body.mobile;
    let password = req.body.password;
    let isGuest = req.body.isGuest;
    let type = req.body.type;
    let shippingAddress = req.body.shippingAddress;
    let billingAddress = req.body.billingAddress;
    let storeID = req.body.storeID;
    let creationDate = new Date();
    if (guestID) {
      let myQuery = "SELECT * FROM user where guestID=" + "'" + guestID + "'";
      db.query(myQuery, (err, result) => {
        if (err) {
          return res.status(400).send({
            success: "false",
            message: "ASDsda",
          });
        }
        if (result.length > 0) {
          // console.log(result);
          res.status(200).send({
            success: "true",
            // message: result.userID,
            id: result[0].userID,
          });
        } else {
          console.log("ASD");

          bcrypt.hash(password, 10, function (err, hash) {
            if (err) {
              res.status(500).send({
                success: "false",
                message: "ASDsda1123",
              });
            } else {
              let query =
                "INSERT INTO user(firstName,guestID,lastName,email,mobile,password,isGuest,type,shippingAddress,billingAddress,creationDate,storeID,isActive) VALUES('" +
                firstName +
                "','" +
                guestID +
                "','" +
                lastName +
                "','" +
                email +
                "','" +
                mobile +
                "','" +
                hash +
                "','" +
                1 +
                "','" +
                type +
                "','" +
                shippingAddress +
                "','" +
                billingAddress +
                "','" +
                creationDate +
                "','" +
                storeID +
                "','" +
                "1" +
                "')";
              console.log(query);
              db.query(query, (err, result) => {
                if (err) {
                  return res.status(400).send({
                    success: "false",
                    message: "err",
                    error: "Is here",
                  });
                } else {
                  return res.status(201).send({
                    success: "true",
                    message: "user added succesfully",
                    id: result.insertId,
                  });
                }
              });
            }
          });
        }
      });
    } else {
      res.status(400).send({
        success: "false",
        message: "guestID is required",
      });
    }
  },
  getGuest: (req, res) => {
    let query =
      "SELECT * FROM user LEFT JOIN location ON location.locationID=user.shippingAddress WHERE guestID=" +
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
          // message: "company added succesfully",
          result: result,
        });
      }
    });
  },
  editGuest: (req, res) => {
    console.log(req.body);
    let firstName = req.body.firstName;
    let middleName = req.body.middleName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let mobile = req.body.mobile;
    let isGuest = req.body.isGuest;
    let type = req.body.type;
    let shippingAddress = req.body.shippingAddress;
    let billingAddress = req.body.billingAddress;
    let storeID = req.body.storeID;
    let creationDate = new Date();
    // UPDATE Customers
    // SET ContactName = 'Alfred Schmidt', City= 'Frankfurt'
    // WHERE CustomerID = 1;
    let query =
      "UPDATE user SET firstName = " +
      "'" +
      firstName +
      "'" +
      "," +
      "middleName=" +
      "'" +
      middleName +
      "'" +
      "," +
      "lastName=" +
      "'" +
      lastName +
      "'" +
      "," +
      "email=" +
      "'" +
      email +
      "'" +
      "," +
      "mobile=" +
      "'" +
      mobile +
      "'" +
      "," +
      "isGuest=" +
      "'" +
      isGuest +
      "'" +
      "," +
      "type=" +
      "'" +
      type +
      "'" +
      "," +
      "shippingAddress=" +
      "'" +
      shippingAddress +
      "'" +
      "," +
      "billingAddress=" +
      "'" +
      billingAddress +
      "'" +
      "," +
      "storeID=" +
      "'" +
      storeID +
      "'" +
      "," +
      "creationDate=" +
      "'" +
      creationDate +
      "'" +
      " WHERE userID=" +
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
          message: "guest edited succesfully",
          id: result,
        });
      }
    });
  },

  guestLogin: (req, res) => {
    let guestID = req.body.guestID;
    let query =
      "SELECT * FROM user LEFT JOIN location ON location.locationID=user.shippingAddress WHERE guestID=" +
      "'" +
      guestID +
      "'";
    db.query(query, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(400).send({
          success: "false",
          message: err,
        });
      } else {
        const token = jwt.sign(
          {
            email: user[0].email,
            userId: user[0].userID,
            firstName: user[0].firstName,
            middleName: user[0].middleName,
            lastName: user[0].lastName,
            email: user[0].email,
            mobile: user[0].mobile,
            zipCode: user[0].zipCode,
            isGuest: user[0].isGuest,
            type: user[0].type,
            storeID: user[0].storeID,
            shippingAddress: user[0].shippingAddress,
            location: user[0].address1 + user[0].address2,
            type: "user",
            address1: user[0].address1,
            address2: user[0].address2,
            city: user[0].city,
            country: user[0].country,
            state: user[0].state,
            zipCode: user[0].zipCode,
            lat: user[0].lat,
            lng: user[0].lng,
          },
          "hereIsMySpecialToken",
          {
            expiresIn: "720h",
          }
        );
        return res.status(200).send({
          message: "Auth successful",
          token: token,
        });
      }
    });
  },
};
