const e = require("express");

module.exports = {
  addLocation: (req, res) => {
    let locationType = req.body.locationType;
    let address1 = req.body.address1;
    let address2 = req.body.address2;
    let city = req.body.city;
    let state = req.body.state;
    let country = req.body.country;
    let zipCode = req.body.zipCode;
    let lat = req.body.lat;
    let lng = req.body.lng;

    let query =
      "INSERT INTO location(locationType,address1,address2,city,state,country,zipCode,lat,lng) VALUES('" +
      locationType +
      "','" +
      address1 +
      "','" +
      address2 +
      "','" +
      city +
      "','" +
      state +
      "','" +
      country +
      "','" +
      zipCode +
      "','" +
      lat +
      "','" +
      lng +
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
          message: "Location added succesfully",
          id: result.insertId,
        });
      }
    });
  },
  editLocation: (req, res) => {
    let locationType = req.body.locationType;
    let address1 = req.body.address1;
    let address2 = req.body.address2;
    let city = req.body.city;
    let state = req.body.state;
    let country = req.body.country;
    let zipCode = req.body.zipCode;
    let lat = req.body.lat;
    let lng = req.body.lng;

    if (locationType) {
      if (address1) {
        if (city) {
          if (state) {
            if (country) {
              if (zipCode) {
                // UPDATE Customers
                // SET ContactName = 'Alfred Schmidt', City= 'Frankfurt'
                // WHERE CustomerID = 1;
                let query =
                  "UPDATE location SET locationType = " +
                  "'" +
                  locationType +
                  "'" +
                  "," +
                  "address1=" +
                  "'" +
                  address1 +
                  "'" +
                  "," +
                  "address2=" +
                  "'" +
                  address2 +
                  "'" +
                  "," +
                  "city=" +
                  "'" +
                  city +
                  "'" +
                  "," +
                  "state=" +
                  "'" +
                  state +
                  "'" +
                  "," +
                  "country=" +
                  "'" +
                  country +
                  "'" +
                  "," +
                  "lat=" +
                  "'" +
                  lat +
                  "'" +
                  "," +
                  "lng=" +
                  "'" +
                  lng +
                  "'" +
                  "," +
                  "zipCode=" +
                  zipCode +
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
                      message: "location edited succesfully",
                      id: result,
                    });
                  }
                });
              } else {
                res.status(400).send({
                  success: "false",
                  message: "lat is required",
                });
              }
            } else {
              res.status(400).send({
                success: "false",
                message: "lng is required",
              });
            }
          } else {
            res.status(400).send({
              success: "false",
              message: "zipCode is required",
            });
          }
        } else {
          res.status(400).send({
            success: "false",
            message: "country is required",
          });
        }
      } else {
        res.status(400).send({
          success: "false",
          message: "state is required",
        });
      }
    } else {
      res.status(400).send({
        success: "false",
        message: "city is required",
      });
    }
  },
  getLocation: (req, res) => {
    let query = "SELECT * FROM LOCATION WHERE locationID=" + req.params.id;
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
