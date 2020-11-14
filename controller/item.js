module.exports = {
  addItem: (req, res) => {
    let productID = req.body.productID;
    let storeID = req.body.storeID;
    let productPrice = req.body.productPrice;
    let productDiscount = req.body.productDiscount;
    let isFeatured = req.body.isFeatured;
    let isOutOfStock = req.body.isOutOfStock;
    let outOfStockDate = req.body.outOfStockDate;
    let expDate = req.body.expDate;
    let featuredDetails = req.body.featuredDetails;
    let quantity = req.body.quantity;
    let speciaIInstructions = req.body.speciaIInstructions;
    let discount = req.body.discount;
    let itemBarcode = req.body.itemBarcode;
    let noOfImage = req.body.noOfImage;
    let disclaimer = req.body.disclaimer;
    let nutritionFacts = req.body.nutritionFacts;
    let itemActive = req.body.itemActive;
    console.log(req.body)
    if (productID) {
      if (storeID) {
        if (productPrice) {
          if (quantity) {
            let query =
              "INSERT INTO items(productID,storeID,productPrice,productDiscount,isFeatured,isOutOfStock,outOfStockDate,expDate,featuredDetails,speciaIInstructions,discount,itemBarcode,noOfImage,disclaimer,nutritionFacts,itemActive) VALUES('" +
              productID +
              "','" +
              storeID +
              "','" +
              productPrice +
              "','" +
              productDiscount +
              "','" +
              isFeatured +
              "','" +
              isOutOfStock +
              "','" +
              outOfStockDate +
              "','" +
              expDate +
              "','" +
              featuredDetails +

              "','" +
              speciaIInstructions +
              "','" +
              discount +
              "','" +
              itemBarcode +
              "','" +
              noOfImage +
              "','" +
              disclaimer +
              "','" +
              nutritionFacts +
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
                  message: "item added succesfully",
                  id: result.insertId,
                });
              }
            });
          } else {
            res.status(400).send({
              success: "false",
              message: "quantity is required",
            });
          }
        } else {
          res.status(400).send({
            success: "false",
            message: "productPrice is required",
          });
        }
      } else {
        res.status(400).send({
          success: "false",
          message: "storeID is required",
        });
      }
    } else {
      res.status(400).send({
        success: "false",
        message: "productID is required",
      });
    }
  },
  editItem: (req, res) => {
    let itemID = req.params.id;
    let productID = req.body.productID;
    let storeID = req.body.storeID;
    let productPrice = req.body.productPrice;
    let productDiscount = req.body.productDiscount;
    let isFeatured = req.body.isFeatured;
    let isOutOfStock = req.body.isOutOfStock;
    let outOfStockDate = req.body.outOfStockDate;
    let expDate = req.body.expDate;
    let featuredDetails = req.body.featuredDetails;
    let quantity = req.body.quantity;
    let speciaIInstructions = req.body.speciaIInstructions;
    let discount = req.body.discount;
    let itemBarcode = req.body.itemBarcode;
    let noOfImage = req.body.noOfImage;
    let disclaimer = req.body.disclaimer;
    let nutritionFacts = req.body.nutritionFacts;
    let itemActive = req.body.itemActive;
    console.log(req.body)

    if (itemID) {
      if (productID) {
        if (storeID) {
          if (productPrice) {
            if (quantity) {
              let query =
                "UPDATE items SET itemID=" +
                "'" +
                itemID +
                "'" +
                "," +
                "productID=" +
                "'" +
                productID +
                "'" +
                "," +
                "storeID=" +
                "'" +
                storeID +
                "'" +
                "," +
                "productPrice=" +
                "'" +
                productPrice +
                "'" +
                "," +
                "productDiscount=" +
                "'" +
                productDiscount +
                "'" +
                "," +
                "isFeatured=" +
                "'" +
                isFeatured +
                "'" +
                "," +
                "isOutOfStock=" +
                "'" +
                isOutOfStock +
                "'" +
                "," +
                "outOfStockDate=" +
                "'" +
                outOfStockDate +
                "'" +
                "," +
                "expDate=" +
                "'" +
                expDate +
                "'" +
                "," +
                "featuredDetails=" +
                "'" +
                featuredDetails +
                "'" +

                "," +
                "speciaIInstructions=" +
                "'" +
                speciaIInstructions +
                "'" +
                "," +
                "discount=" +
                "'" +
                discount +
                "'" +
                "," +
                "itemBarcode=" +
                "'" +
                itemBarcode +
                "'" +
                "," +
                "noOfImage=" +
                "'" +
                noOfImage +
                "'" +
                "," +
                "disclaimer=" +
                "'" +
                disclaimer +
                "'" +
                "," +
                "nutritionFacts=" +
                "'" +
                nutritionFacts +
                "'" +
                "," +
                "itemActive=" +
                "'" +
                itemActive +
                "'" +
                " WHERE itemID=" +
                req.params.id;
              console.log(query);
              db.query(query, (err, result) => {
                if (err) {
                  console.log(err)
                  res.status(400).send({
                    success: "false",
                    message: err,
                  });
                } else {
                  res.status(201).send({
                    success: "true",
                    message: "item edited succesfully",
                    id: result,
                  });
                }
              });
            } else {
              res.status(400).send({
                success: "false",
                message: "quantity is required",
              });
            }
          } else {
            res.status(400).send({
              success: "false",
              message: "productPrice is required",
            });
          }
        } else {
          res.status(400).send({
            success: "false",
            message: "storeID is required",
          });
        }
      } else {
        res.status(400).send({
          success: "false",
          message: "productID is required",
        });
      }
    } else {
      res.status(400).send({
        success: "false",
        message: "itemID is required",
      });
    }
  },
  getItems: (req, res) => {
    let query =
      "SELECT * FROM `items` LEFT JOIN product on product.productID=items.productID LEFT JOIN subCategory on subCategory.subCategoryID=product.productType WHERE items.itemActive=1";
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
  getItem: (req, res) => {
    let query = "SELECT * FROM items WHERE itemID=" + req.params.id;
    let query1 =
      "SELECT * FROM `items` LEFT JOIN product on product.productID=items.productID LEFT JOIN subCategory on subCategory.subCategoryID=product.productType WHERE items.itemID=" +
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
  getStoreItem: (req, res) => {
    let query1 =
      "SELECT * FROM `items` LEFT JOIN product on product.productID=items.productID LEFT JOIN subCategory on subCategory.subCategoryID=product.productType WHERE isFeatured=1 AND items.itemActive=1 AND  items.storeID=" +
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
  getStoreItemAll: (req, res) => {
    let query1 =
      "SELECT * FROM `items` LEFT JOIN product on product.productID=items.productID LEFT JOIN subCategory on subCategory.subCategoryID=product.productType WHERE items.itemActive=1 AND  items.storeID=" +
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
  getStoreAllItem: (req, res) => {
    let query1 =
      "SELECT * FROM `items` LEFT JOIN product on product.productID=items.productID LEFT JOIN subCategory on subCategory.subCategoryID=product.productType WHERE items.storeID=" +
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
  getFeaturedItem: (req, res) => {
    let query1 =
      "SELECT * FROM `items` LEFT JOIN product on product.productID=items.productID LEFT JOIN subCategory on subCategory.subCategoryID=product.productType WHERE items.storeID=" +
      req.params.id +
      " AND items.itemActive=1 AND isFeatured=" +
      1;
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

  deleteItem: (req, res) => {
    let query = "DELETE FROM items WHERE itemID=" + req.params.id;

    db.query(query, (err, result) => {
      if (err) {
        res.status(400).send({
          success: "false",
          message: err,
        });
      } else {
        res.status(201).send({
          success: "true",
          message: "Item Deleted succesfully",
          result: result,
        });
      }
    });
  },
};
