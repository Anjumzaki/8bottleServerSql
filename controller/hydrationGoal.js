const e = require("express");

module.exports = {
  addHydrationGoal: async (req, res) => {
    let creationDate = new Date();
    let updatedDate = new Date()

    let MALE_MULTIPLIER_VALUE = 1.0;
    let FEMALE_MULTIPLIER_VALUE = 0.9;

    let ACTIVITY_LEVEL_NOT_ACTIVE = "Not Active";
    let ACTIVITY_LEVEL_ACTIVE = "Active";
    let ACTIVITY_LEVEL_VERY_ACTIVE = "Very Active";
    let ACTIVITY_LEVEL_NOT_ACTIVE_VAL = 0.0;
    let ACTIVITY_LEVEL_ACTIVE_VAL = 30.0;
    let ACTIVITY_LEVEL_VERY_ACTIVE_VAL = 60.0;

    let MALE = "Male";
    let FEMALE = "Female";
    let OTHER = "Other";

    let AGE_MULTIPLIER_LIMIT = 40.0;
    let WEIGHT_MULTIPLIER = 0.45;
    let HEIGHT_MULTIPLIER = 10.0;
    let HEIGHT_DIVIDER = 70.0;
    let ACTIVITY_LEVEL_DIVIDER = 30.0;
    let ACTIVITY_LEVEL_MULTIPLIER = 12.0;

    function getHydrationLevel(weight, height, age, gender, activityLevel, unit) {
      if (unit == "Metric") {
        weight = weight * 2.20462;
        height = height * 0.393701;
      }
      let ageMultiplyer = age <= AGE_MULTIPLIER_LIMIT ? MALE_MULTIPLIER_VALUE : FEMALE_MULTIPLIER_VALUE;
      let gednerMultiplyer = gender===MALE ? MALE_MULTIPLIER_VALUE : FEMALE_MULTIPLIER_VALUE;

      let abc = (weight * WEIGHT_MULTIPLIER) + ((height / HEIGHT_DIVIDER) * HEIGHT_MULTIPLIER);
      let def = abc * gednerMultiplyer * ageMultiplyer;
      let hydrationLevel = def + ((activityLevel / ACTIVITY_LEVEL_DIVIDER) * ACTIVITY_LEVEL_MULTIPLIER);

      return Math.round(hydrationLevel * 100) / 100;
    }

    let query1 =
      "SELECT * FROM user WHERE userID=" +
      req.params.id;
    db.query(query1, (err, result) => {
      if (err) {
        res.status(400).send({
          success: "false",
          message: err,
        });
      } else {
        let data = result
        console.log('data: ', data);
        let weight = data[0]?.weight
        let height = data[0]?.height
        let age = data[0]?.age || 0
        let gender = data[0].gender
        let activityLevel = data[0]?.activityLevel || 0
        let unit = data[0]?.unit
        let reqData = getHydrationLevel(weight, height, age, gender, activityLevel, unit)
        console.log('reqData: ', reqData);
        let hydrationGoal = reqData
        let userId = req.params.id
        let query =
          "INSERT INTO hydrationGoal(creationDate,hydrationGoal,userId,updatedDate) VALUES('" +
          creationDate +
          "','" +
          hydrationGoal +
          "','" +
          userId +
          "','" +
          updatedDate +
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
              message: "Hydration Goal added successfully",
              id: result.insertId,
            });
          }
        });
      }
    }
    )
  },
  editHydrationGoal: (req, res) => {
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
  getHydrationGoal: (req, res) => {
    let query = "SELECT * FROM hydrationGoal WHERE userId=" + req.params.id;
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
