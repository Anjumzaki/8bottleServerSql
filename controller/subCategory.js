module.exports = {
  addSubCategory: (req, res) => {
    let userID = req.body.userID;
    let placeID = req.body.placeID;
    if (userID) {
      if (placeID) {
        let query =
          "INSERT INTO view(userID,placeID) VALUES('" +
          userID +
          "','" +
          placeID +
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
              message: "Recent added succesfully",
              id: result.insertId,
            });
          }
        });
      } else {
        res.status(400).send({
          success: "false",
          message: "subCategoryName is required",
        });
      }
    } else {
      res.status(400).send({
        success: "false",
        message: "categoryID is required",
      });
    }
  },
  getSubCategory: (req, res) => {
    let query =
      "SELECT * FROM `view` LEFT JOIN place on place.placeID=view.placeID where userID=" + req.params.id;
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
