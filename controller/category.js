module.exports = {
  addCategory: (req, res) => {
    let categoryName = req.body.categoryName;
    let imgurl = req.body.imgurl;
    if (categoryName) {
      let query =
        "INSERT INTO category(categoryName,imgurl,categoryActive) VALUES('" +
        categoryName +
        "','" +
        imgurl +
        "','" +
        "1" +
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
            message: "category added succesfully",
            id: result.insertId,
          });
        }
      });
    } else {
      res.status(400).send({
        success: "false",
        message: "categoryName is required",
      });
    }
  },
  editCategory: (req, res) => {
    let categoryName = req.body.categoryName;
    let imgurl = req.body.imgurl;
    let categoryActive = req.body.categoryActive;
    if (categoryName) {
      if (imgurl) {
        // UPDATE Customers
        // SET ContactName = 'Alfred Schmidt', City= 'Frankfurt'
        // WHERE CustomerID = 1;
        let query =
          "UPDATE category SET categoryName = " +
          "'" +
          categoryName +
          "'" +
          "," +
          "imgurl=" +
          "'" +
          imgurl +
          "'" +
          "," +
          "categoryActive=" +
          "'" +
          categoryActive +
          "'" +
          " WHERE categoryID=" +
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
              message: "category edited succesfully",
              id: result,
            });
          }
        });
      } else {
        res.status(400).send({
          success: "false",
          message: "categoryDescription is required",
        });
      }
    } else {
      res.status(400).send({
        success: "false",
        message: "categoryName is required",
      });
    }
  },
  getCategories: (req, res) => {
    let query = "SELECT * FROM category";
    db.query(query, (err, result) => {
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
  getCategory: (req, res) => {
    let query = "SELECT * FROM category WHERE categoryID=" + req.params.id;
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
  getZebraCheck: (req, res) => {
    res.status(200).send({
      success: "true",
      check: 'true',
    });
  },
  deleteCategory: (req, res) => {
    let query = "DELETE  FROM category WHERE categoryID=" + req.params.id;
    db.query(query, (err, result) => {
      if (err) {
        res.status(400).send({
          success: "false",
          message: err,
        });
      } else {
        res.status(201).send({
          success: "true",
          message: "Category deleted succesfully",
          result: result,
        });
      }
    });
  },
};
