const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  addUser: async (req, res) => {
    console.log(req.body);
    let name = req.body.name;
    let dob = req.body.dob;
    let gender = req.body.gender;
    let email = req.body.email;
    let mobile = req.body.mobile;
    let password = req.body.password;
    let type = req.body.type;
    let unit = req.body.unit;
    let height = req.body.height;
    let heightUnit = req.body.heightUnit;
    let notification = req.body.notification;
    let clientId = req.body.clientId;
    let weight = req.body.weight
    let weightUnit = req.body.weightUnit
    let avatar = req.body.avatar;
    let loggedType = req.body.loggedType;
    let fbID = req.body.fbID;
    let age = req.body.fbID;
    let goal = req.body.fbID;
    let GID = req.body.GID;
    let activity = req.body.activity || 0;
    let creationDate = new Date();
    let updatedDate = new Date()
    if (name) {
      if (email) {
        let myQuery = "SELECT * FROM user where email=" + "'" + email + "'";
        db.query(myQuery, (err, result) => {
          if (err) {
            return res.status(400).send({
              success: "false",
              message: "ASDsda",
            });
          }
          if (result.length > 0) {
            res.status(409).send({
              success: "false",
              message: "Email/Username already exists",
            });
          } else {
            if (password) {
              console.log("ASD");
              if (type) {
                bcrypt.hash(password, 10, function (err, hash) {
                  // console.log("ASD");
                  if (err) {
                    res.status(500).send({
                      success: "false",
                      message: "ASDsda1123",
                    });
                  } else {
                    let query =
                      "INSERT INTO user(name,age,goal,activity,avatar,loggedType,fbID,GID,unit,height,heightUnit,notification,weight,weightUnit,clientId,dob,gender,email,mobile,password,type,creationDate,updatedDate,isActive) VALUES('" +
                      name +
                      "','" +
                      age +
                      "','" +
                      goal +
                      "','" +
                      activity +
                      "','" +
                      avatar +
                      "','" +
                      loggedType +
                      "','" +
                      fbID +
                      "','" +
                      GID +
                      "','" +
                      unit +
                      "','" +
                      height +
                      "','" +
                      heightUnit +
                      "','" +
                      notification +
                      "','" +
                      weight +
                      "','" +
                      weightUnit +
                      "','" +
                      clientId +
                      "','" +
                      dob +
                      "','" +
                      gender +
                      "','" +
                      email +
                      "','" +
                      mobile +
                      "','" +
                      hash +
                      "','" +
                      type +
                      "','" +
                      creationDate +
                      "','" +
                      updatedDate +
                      "','" +
                      "1" +
                      "')";
                    console.log(query);
                    db.query(query, (err, result) => {
                      if (err) {
                        return res.status(400).send({
                          success: "false",
                          message: err,
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
              } else {
                res.status(400).send({
                  success: "false",
                  message: "type is required",
                });
              }
            } else {
              res.status(400).send({
                success: "false",
                message: "password is required",
              });
            }
          }
        });
      } else {
        res.status(400).send({
          success: "false",
          message: "email is required",
        });
      }
    } else {
      res.status(400).send({
        success: "false",
        message: "name is required",
      });
    }
  },
  getUsers: (req, res) => {
    let query =
      "SELECT * FROM user";
    db.query(query, (err, result) => {
      if (err) {
        res.status(400).send({
          success: "false",
          message: "Something is really bad happens",
        });
      } else {
        res.status(201).send({
          success: "true",
          result: result,
        });
      }
    });
  },
  getUser: (req, res) => {
    let query =
      "SELECT * FROM user WHERE userID=" +
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
  hydrationGoal: (req, res) => {
    //gender
    const MALE_MULTIPLIER_VALUE = 1.0;
    const FEMALE_MULTIPLIER_VALUE = 0.9;

    //Activity level
    const ACTIVITY_LEVEL_NOT_ACTIVE = "Not Active";
    const ACTIVITY_LEVEL_ACTIVE = "Active";
    const ACTIVITY_LEVEL_VERY_ACTIVE = "Very Active";
    const ACTIVITY_LEVEL_NOT_ACTIVE_VAL = 0.0;
    const ACTIVITY_LEVEL_ACTIVE_VAL = 30.0;
    const ACTIVITY_LEVEL_VERY_ACTIVE_VAL = 60.0;

    // Age

    const AGE_MULTIPLIER_LIMIT = 40.0;
    const WEIGHT_MULTIPLIER = 0.45;
    const HEIGHT_MULTIPLIER = 10.0;
    const HEIGHT_DIVIDER = 70.0;
    const ACTIVITY_LEVEL_DIVIDER = 30.0;
    const ACTIVITY_LEVEL_MULTIPLIER = 12.0;

    let query =
      "SELECT * FROM user WHERE userID=" +
      req.params.id;
    db.query(query, (err, result) => {
      if (err) {
        res.status(400).send({
          success: "false",
          message: err,
        });
      } else {
        let age = result[0].dob ? new Date().getFullYear() - parseFloat(result[0].dob) : 0
        let weight = result[0].weight.match(/(\d+)/);
        weight = !!weight?.length ? weight[0] : 0
        let height = result[0].height
        let activityLevel = result[0].activity ? result[0].activity : 0
        ageMultiplyer = age <= AGE_MULTIPLIER_LIMIT ? MALE_MULTIPLIER_VALUE : FEMALE_MULTIPLIER_VALUE;
        let genderMultiplyer = result[0].gender == 'Male' ? MALE_MULTIPLIER_VALUE : FEMALE_MULTIPLIER_VALUE;
        let abc = (weight * WEIGHT_MULTIPLIER) + ((height / HEIGHT_DIVIDER) * HEIGHT_MULTIPLIER);
        def = abc * genderMultiplyer * ageMultiplyer;
        hydrationLevel = def + ((activityLevel / ACTIVITY_LEVEL_DIVIDER) * ACTIVITY_LEVEL_MULTIPLIER);
        res.status(201).send({
          success: "true",
          // message: "company added succesfully",
          result: Math.round(hydrationLevel * 100) / 100,
        });
      }
    });
  },
  editUser: (req, res) => {
    console.log(req.body);
    let name = req.body.name;
    let mobile = req.body.mobile;
    let updatedDate = new Date()
    let dob = req.body.dob;
    let gender = req.body.gender;
    let unit = req.body.unit;
    let height = req.body.height;
    let notification = req.body.notification;
    let clientId = req.body.clientId;
    let weight = req.body.weight
    let avatar = req.body.avatar
    let loggedType = req.body.loggedType;
    let fbID = req.body.fbID
    let GID = req.body.GID;
    let year = req.body.year
    let activity = req.body.activity;
    let query =
      "UPDATE user SET name = " +
      "'" +
      name +
      "'" +
      "," +
      "unit=" +
      "'" +
      unit +
      "'" +
      "," +
      "activity=" +
      "'" +
      activity +
      "'" +
      "," +
      "loggedType=" +
      "'" +
      loggedType +
      "'" +
      "," +
      "fbID=" +
      "'" +
      fbID +
      "'" +
      "," +
      "year=" +
      "'" +
      year +
      "'" +
      "," +
      "GID=" +
      "'" +
      GID +
      "'" +
      "," +
      "height=" +
      "'" +
      height +
      "'" +
      "," +
      "notification=" +
      "'" +
      notification +
      "'" +
      "," +
      "clientId=" +
      "'" +
      clientId +
      "'" +
      "," +
      "weight=" +
      "'" +
      weight +
      "'" +
      "," +
      "dob=" +
      "'" +
      dob +
      "'" +
      "," +
      "gender=" +
      "'" +
      gender +
      "'" +
      "," +
      "avatar=" +
      "'" +
      avatar +
      "'" +
      "," +
      "updatedDate=" +
      "'" +
      updatedDate +
      "'" +
      " WHERE userID=" +
      req.params.id;
    console.log(query);
    db.query(query, (err, result) => {
      if (err) {
        res.status(400).send({
          success: "false",
          message: err,
        });
        console.log(err);
      } else {
        res.status(201).send({
          success: "true",
          message: "User edited succesfully",
          id: result,
        });
      }
    });
  },
  checkEmail: (req, res) => {
    let query = "SELECT * FROM user WHERE email=" + "'" + req.params.id + "'";
    db.query(query, (err, result) => {
      if (err) {
        res.status(400).send({
          success: "false",
          message: "Something is really bad happens",
          err,
        });
      } else {
        if (result.length > 0) {
          res.status(200).send({
            success: "true",
            result: result,
          });
        }else{
          res.status(400).send({
            success: "false",
            message: "No user found",
          });
        }
      }
    });
  },
  forgotPassword: (req, res) => {
    let query = "SELECT * FROM user WHERE email=" + "'" + req.body.email + "'";
    db.query(query, (err, result) => {
      if (err) {
        res.status(400).send({
          success: "false",
          message: "Something is really bad happens",
          err,
        });
      } else {
        if (result.length > 0) {
          bcrypt.hash(req.body.password, 10, function (err, hash) {
            if (err) {
              res.status(500).send({
                success: "false",
                message: "ASDsda1123",
              });
            } else {
              let query =
                "UPDATE user SET password = " +
                "'" +
                hash +
                "'" +
                " WHERE email=" +
                "'" +
                req.body.email +
                "'";
              db.query(query, (err, result) => {
                if (err) {
                  res.status(400).send({
                    success: "false",
                    message: "Something is really bad happens",
                    err,
                  });
                } else {
                  res.status(200).send({
                    success: "true",
                    result: result,
                  });
                }
              });
            }
          });
        } else {
          res.status(200).send({
            success: "true",
            message: "userName Does not exists",
          });
        }
      }
    });
  },
  checkNumber: (req, res) => {
    let query = "SELECT * FROM user WHERE mobile=" + "'" + req.params.id + "'";
    db.query(query, (err, result) => {
      if (err) {
        res.status(400).send({
          success: "false",
          message: "Something is really bad happens",
          err,
        });
      } else {
        res.status(200).send({
          success: "true",
          result: result,
        });
      }
    });
  },
  userLogin: (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let query =
      "SELECT * FROM user WHERE email=" +
      "'" +
      email +
      "'";
    db.query(query, (err, user) => {
      if (err) {
        console.log(err);

        return res.status(400).send({
          success: "false",
          message: err,
        });
      }
      if (user.length > 0) {
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(401).send({
              message: "Auth failed",
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                email: user[0].email,
                userId: user[0].userId,
                name: user[0].name,
                email: user[0].email,
                mobile: user[0].mobile,
                type: user[0].type,
                gender: user[0].gender,
                unit: user[0].unit,
                height: user[0].height,
                notification: user[0].notification,
                clientId: user[0].clientId,
                weight: user[0].weight,
                avatar: user[0].avatar,
                dob: user[0].dob,
                year: user[0].year,
                loggedType: user[0].loggedType,
                fbID: user[0].fbID,
                GID: user[0].GID,
                activity: user[0].activity,
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
          } else {
            return res.status(401).send({
              message: "Auth failed",
            });
          }
        });
      } else {
        res.status(404).send({
          success: "false",
          message: "User Does not exists",
          // user: result,
        });
      }
    });
  },
  fbLogin: (req, res) => {
    let fbID = req.body.fbID;
    let query =
      "SELECT * FROM user WHERE fbID=" +
      "'" +
      fbID +
      "'";
    db.query(query, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(400).send({
          success: "false",
          message: err,
        });
      }
      if (user.length > 0) {
        const token = jwt.sign(
          {
            email: user[0].email,
            userId: user[0].userId,
            name: user[0].name,
            email: user[0].email,
            mobile: user[0].mobile,
            type: user[0].type,
            gender: user[0].gender,
            unit: user[0].unit,
            height: user[0].height,
            heightUnit: user[0].heightUnit,
            notification: user[0].notification,
            clientId: user[0].clientId,
            weight: user[0].weight,
            weightUnit: user[0].weightUnit,
            avatar: user[0].avatar,
            dob: user[0].dob,
            year: user[0].year,
            loggedType: user[0].loggedType,
            fbID: user[0].fbID,
            GID: user[0].GID,
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
      } else {
        return res.status(401).send({
          message: "Auth failed",
        });
      }
    });
  },
  googleLogin: (req, res) => {
    let GID = req.body.GID;
    let query =
      "SELECT * FROM user WHERE GID=" +
      "'" +
      GID +
      "'";
    db.query(query, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(400).send({
          success: "false",
          message: err,
        });
      }
      if (user.length > 0) {
        const token = jwt.sign(
          {
            email: user[0].email,
            userId: user[0].userId,
            name: user[0].name,
            email: user[0].email,
            mobile: user[0].mobile,
            type: user[0].type,
            gender: user[0].gender,
            unit: user[0].unit,
            height: user[0].height,
            notification: user[0].notification,
            clientId: user[0].clientId,
            weight: user[0].weight,
            avatar: user[0].avatar,
            dob: user[0].dob,
            year: user[0].year,
            loggedType: user[0].loggedType,
            fbID: user[0].fbID,
            GID: user[0].GID,
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
      } else {
        return res.status(401).send({
          message: "Auth failed",
        });
      }
    });
  },
};
