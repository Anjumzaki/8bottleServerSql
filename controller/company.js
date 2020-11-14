module.exports = {
  addCompany: (req, res) => {
    console.log(req.body);
    let placeName = req.body.placeName;
    let imgUrl = req.body.imgUrl;
    let imgUrl1 = req.body.imgUrl1;
    let imgUrl2 = req.body.imgUrl2;

    let placeDescription = req.body.placeDescription;
    let noOfImage = req.body.noOfImage;
    let address = req.body.address;
    let categoryID = req.body.categoryID;
    let audioUrl = req.body.audioUrl;
    let lat = req.body.lat;
    let lng = req.body.lng;
    if (placeName) {
      if (imgUrl) {
        if (placeDescription) {
          if (noOfImage) {
            if (address) {
              if (categoryID) {
                let query =
                  "INSERT INTO place(placeName,imgUrl,imgUrl1,imgUrl2,placeDescription,noOfImage,address,categoryID,audioUrl,lat,lng,placeActive) VALUES('" +
                  placeName +
                  "','" +
                  imgUrl +
                  "','" +
                  imgUrl1 +
                  "','" +
                  imgUrl2 +
                  "','" +
                  placeDescription +
                  "','" +
                  noOfImage +
                  "','" +
                  address +
                  "','" +
                  categoryID +
                  "','" +
                  audioUrl +
                  "','" +
                  lat +
                  "','" +
                  lng +
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
                      message: "place added succesfully",
                      id: result.insertId,
                    });
                  }
                });
              } else {
                res.status(400).send({
                  success: "false",
                  message: "categoryID is required",
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
              message: "noOfImage is required",
            });
          }
        } else {
          res.status(400).send({
            success: "false",
            message: "placeDescription is required",
          });
        }
      } else {
        res.status(400).send({
          success: "false",
          message: "imgUrl is required",
        });
      }
    } else {
      res.status(400).send({
        success: "false",
        message: "placeName is required",
      });
    }
  },
  editCompany: (req, res) => {
    console.log(req.body);
    let placeName = req.body.placeName;
    let imgUrl = req.body.imgUrl;
    let imgUrl1 = req.body.imgUrl1;
    let imgUrl2 = req.body.imgUrl2;
    let placeDescription = req.body.placeDescription;
    let noOfImage = req.body.noOfImage;
    let address = req.body.address;
    let categoryID = req.body.categoryID;
    let audioUrl = req.body.audioUrl;
    let placeActive = req.body.placeActive;
    let lat = req.body.lat;
    let lng = req.body.lng;
    if (placeName) {
      if (imgUrl) {
        if (placeDescription) {
          if (noOfImage) {
            if (address) {
              if (categoryID) {
                // UPDATE Customers
                // SET ContactName = 'Alfred Schmidt', City= 'Frankfurt'
                // WHERE CustomerID = 1;
                let query =
                  "UPDATE place SET placeName = " +
                  "'" +
                  placeName +
                  "'" +
                  "," +
                  "imgUrl=" +
                  "'" +
                  imgUrl +
                  "'" +
                  "," +
                  "imgUrl1=" +
                  "'" +
                  imgUrl1 +
                  "'" +
                  "," +
                  "imgUrl2=" +
                  "'" +
                  imgUrl2 +
                  "'" +
                  "," +
                  "noOfImage=" +
                  "'" +
                  noOfImage +
                  "'" +
                  "," +
                  "address=" +
                  "'" +
                  address +
                  "'" +
                  "," +
                  "categoryID=" +
                  "'" +
                  categoryID +
                  "'" +
                  "," +
                  "placeDescription=" +
                  "'" +
                  placeDescription +
                  "'" +
                  "," +
                  "audioUrl=" +
                  "'" +
                  audioUrl +
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
                  "placeActive=" +
                  "'" +
                  placeActive +
                  "'" +
                  " WHERE placeID=" +
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
                      message: "company edited succesfully",
                      id: result,
                    });
                  }
                });
              } else {
                res.status(400).send({
                  success: "false",
                  message: "categoryID is required",
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
              message: "noOfImage is required",
            });
          }
        } else {
          res.status(400).send({
            success: "false",
            message: "placeDescription is required",
          });
        }
      } else {
        res.status(400).send({
          success: "false",
          message: "imgUrl is required",
        });
      }
    } else {
      res.status(400).send({
        success: "false",
        message: "placeName is required",
      });
    }
  },
  getCompanies: (req, res) => {
    let query =
      "SELECT * FROM place";
    db.query(query, (err, result) => {
      if (err) {
        res.status(400).send({
          success: "false",
          message: "Something is really bad happens",
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
  getCompany: (req, res) => {
    let query = "SELECT * FROM place WHERE placeID=" + req.params.id;
    let query1 =
      "SELECT * FROM `place` WHERE place.placeID=" +
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

  getCompanyByCategID: (req, res) => {
    let query1 =
      "SELECT * FROM `place`  WHERE place.categoryID=" +
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
          result: result,
        });
      }
    });
  },
  deleteCompanies: (req, res) => {
    let query =
      "Delete FROM `place` WHERE placeID=" + req.params.id;
    db.query(query, (err, result) => {
      if (err) {
        res.status(400).send({
          success: "false",
          message: "Something is really bad happens",
        });
      } else {
        res.status(201).send({
          success: "true",
          message: "place deleted succesfully",
          result: result,
        });
      }
    });
  },
};
