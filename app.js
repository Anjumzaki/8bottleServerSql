const express = require("express");
const body_parser = require("body-parser");
const file_upload = require("express-fileupload");
const cookieParser = require("cookie-parser");
var nodemailer = require("nodemailer");
var ejs = require("ejs");
const creds = require("./config/config");
const _ = require("underscore");
const client = require("twilio")(creds.SID, creds.TOKEN);
const path = require("path");
const port = process.env.PORT || 5000;
const app = express();
require("./db_conn.js");
app.use(cookieParser());
app.set("port", process.env.port || port);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(file_upload());
const checkAuth = require("./controller/checkAuth");

const {
  addUser,
  getUsers,
  getUser,
  editUser,
  userLogin,
  checkEmail,
  checkNumber,
  forgotPassword,
} = require("./controller/users.js");

// const {
//   addGuest,
//   getGuest,
//   editGuest,
//   guestLogin,
// } = require("./controller/guest.js");
const {
  addCompany,
  getCompanies,
  getCompany,
  editCompany,
  deleteCompanies,
  getCompanyByCategID
} = require("./controller/company.js");
// const {
//   addStore,
//   getStores,
//   editStore,
//   getStore,
//   getStoreStatus,
//   changeStoreStatus,
//   getStoreUser,
// } = require("./controller/store.js");
// const {
//   addLocation,
//   getLocation,
//   editLocation,
// } = require("./controller/location.js");
const {
  addCategory,
  getCategories,
  editCategory,
  getCategory,
  deleteCategory,
} = require("./controller/category.js");
// const {
//   addProduct,
//   getProduct,
//   getProducts,
//   editProduct,
// } = require("./controller/product.js");
// const {
//   addItem,
//   getItem,
//   getItems,
//   editItem,
//   getStoreItem,
//   deleteItem,
//   getFeaturedItem,
//   getStoreAllItem,
//   getStoreItemAll
// } = require("./controller/item.js");
// const {
//   addTransaction,
//   getTransaction,
//   getTransactions,
//   editTransaction,
//   getStoreTransaction,
//   getStoreTransactionWithStatus,
//   chnageTransactionStatusCode,
//   getStoreTransactionStats,
//   getStoreTransactionByDate,
//   getTransactionByState,
//   chnageTransactionItemQuantity,
// } = require("./controller/transaction.js");
const {
  addSubCategory,
  getSubCategory,
} = require("./controller/subCategory.js");
// const {
//   addStoreTimings,
//   editStoreTimings,
//   getStoreTimings,
// } = require("./controller/storeTimings.js");
// const {
//   addRef_trans_products,
//   editRef_trans_prod,
//   getRef_trans_prod,
//   deleteRef_trans_prod,
// } = require("./controller/ref_trans_products.js");
const {
  addRef_prod_fav,
  editRef_prod_fav,
  getRef_prod_fav,
  deleteRef_prod_fav,
  userRef_prod_fav,
  userStoreRef_prod_fav,
} = require("./controller/ref_prod_fav.js");

// const { addFavourites, editFavourites } = require("./controller/favourites.js");
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
// //
// app.get("/v1/ref_trans_products/:id", checkAuth, getRef_trans_prod);
// app.post("/v1/ref_trans_products", checkAuth, addRef_trans_products);
// app.put("/v1/ref_trans_products/:id", checkAuth, editRef_trans_prod);
// app.delete("/v1/ref_trans_products/:id", checkAuth, deleteRef_trans_prod);

// //ref_favs_items
app.get("/v1/ref_prod_fav/:id", checkAuth, getRef_prod_fav);
app.post("/v1/ref_prod_fav", checkAuth, addRef_prod_fav);
app.put("/v1/ref_prod_fav/:id", checkAuth, editRef_prod_fav);
app.delete("/v1/ref_prod_fav/:id", checkAuth, deleteRef_prod_fav);
app.get("/v1/user/ref_prod_fav/:id", checkAuth, userRef_prod_fav);
app.get(
  "/v1/store/user/ref_prod_fav/:id/:storeID",
  checkAuth,
  userStoreRef_prod_fav
);


// // storeTimings
// app.post("/v1/storeTimings", checkAuth, addStoreTimings);
// app.put("/v1/storeTimings/:id/:day", checkAuth, editStoreTimings);
// app.get("/v1/storeTimings/:id", checkAuth, getStoreTimings);

//Sub Categories
app.post("/v1/recent", checkAuth, addSubCategory);
app.get("/v1/recent/:id", checkAuth, getSubCategory);

// //Transaction
// // app.get("/v1/transaction", checkAuth, getTransactions);
// app.post("/v1/transaction", checkAuth, addTransaction);
// app.put("/v1/transaction/:id", checkAuth, editTransaction);
// app.get("/v1/transaction/:id", checkAuth, getTransaction); //done
// app.get(
//   "/v1/transaction/status/:id/:code",
//   checkAuth,
//   getStoreTransactionWithStatus
// ); //done
// app.get("/v1/transaction/store/:id", checkAuth, getStoreTransaction); //done
// app.put(
//   "/v1/transaction/status/:id/:code",
//   checkAuth,
//   chnageTransactionStatusCode
// );
// app.put(
//   "/v1/transaction/itemQuantity/:orderId/:itemId",
//   checkAuth,
//   chnageTransactionItemQuantity
// );

// app.get("/v1/transaction/stats/:storeID", checkAuth, getStoreTransactionStats);
// app.get("/v1/transaction/date/:id/:date", checkAuth, getStoreTransactionByDate);
// app.get(
//   "/v1/transaction/state/:table/:search/:id",
//   checkAuth,
//   getTransactionByState
// );

//users
app.post("/v1/user", addUser);
app.get("/v1/user", checkAuth, getUsers);
app.get("/v1/user/:id", checkAuth, getUser);
app.put("/v1/user/:id", checkAuth, editUser);
app.post("/v1/login/user", userLogin);
app.get("/v1/checkEmail/:id", checkEmail);
app.get("/v1/checkNumber/:id", checkNumber);
app.post("/v1/forgotPassword/", forgotPassword);

// //guest
// app.post("/v1/guest", addGuest);
// app.get("/v1/guest/:id", checkAuth, getGuest);
// app.put("/v1/guest/:id", checkAuth, editGuest);
// app.post("/v1/login/guest", guestLogin);

//companies
app.get("/v1/place", checkAuth, getCompanies);
app.post("/v1/place", checkAuth, addCompany);
app.put("/v1/place/:id", checkAuth, editCompany);
app.post("/v1/place/:id", checkAuth, getCompany);
app.delete("/v1/place/:id", checkAuth, deleteCompanies);
app.get("/v1/placeyCateg/:id", checkAuth, getCompanyByCategID);


// //locations
// app.post("/v1/location", checkAuth, addLocation);
// app.post("/v1/location/:id", checkAuth, getLocation);
// app.put("/v1/location/:id", checkAuth, editLocation);
// //Store
// app.get("/v1/store", getStores);
// app.post("/v1/store", checkAuth, addStore);
// app.put("/v1/store/:id", checkAuth, editStore);
// app.post("/v1/store/:id", checkAuth, getStore);
// app.get("/v1/store/status/:status", checkAuth, getStoreStatus);
// app.put("/v1/store/status/:status/:id", checkAuth, changeStoreStatus);
// app.post("/v1/store/users/:id", checkAuth, getStoreUser);
// //Category
app.get("/v1/category", checkAuth, getCategories);
app.post("/v1/category", checkAuth, addCategory);
app.put("/v1/category/:id", checkAuth, editCategory);
app.post("/v1/category/:id", checkAuth, getCategory);
app.delete("/v1/category/:id", checkAuth, deleteCategory);
// //Product
// app.get("/v1/product", checkAuth, getProducts);
// app.post("/v1/product", checkAuth, addProduct);
// app.put("/v1/product/:id", checkAuth, editProduct);
// app.post("/v1/product/:id", checkAuth, getProduct);
// //item
// app.get("/v1/item", checkAuth, getItems);
// app.post("/v1/item", checkAuth, addItem);
// app.put("/v1/item/:id", checkAuth, editItem);
// app.post("/v1/item/:id", checkAuth, getItem);
// app.delete("/v1/item/:id", checkAuth, deleteItem);
// app.post("/v1/item/store/:id", checkAuth, getStoreItem);
// app.post("/v1/all/item/store/:id", checkAuth, getStoreAllItem);

// app.get("/v1/item/featured/:id", checkAuth, getFeaturedItem);
// app.get("/v2/item/all/store/:id", checkAuth, getStoreItemAll);
// /v1/email/verification/anjumzaki8@gmail.com/565656


app.get("/v1/email/verification/:email/:num", async (req, res) => {
  console.log(req.body);

  var transport = {
    host: "smtp.gmail.com",
    auth: {
      user: "anjumzaki8@gmail.com",
      pass: "anjum123",
    },
  };

  var transporter = nodemailer.createTransport(transport);

  ejs.renderFile(
    "./views/VerifyEmail.ejs",
    {
      email: Buffer.from(req.params.email).toString("base64"),
      num: req.params.num,
    },
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        var mainOptions = {
          from: "The Node",
          to: req.params.email,
          // to: "shahacademy333@gmail.com",
          subject: "The Node Email Verification",
          html: data,
        };
        // console.log("html data ======================>", mainOptions.html);
        transporter.sendMail(mainOptions, function (err, info) {
          if (err) {
            res.status(404).send({
              success: "false",
              message: "Something really bad happens",
              err,
            });
          } else {
            res.status(200).send({
              success: "true",
              message: "email verification sent",
              info,
            });
          }
        });
      }
    }
  );
});

//post user
// app.get("/v1/number/verification/:number1/:num", async (req, res) => {
//   // console.log("HIT", req.params);
//   client.messages
//     .create({
//       body:
//         " Hi User, Thanks for your interest in joining The Node! To complete your registration please Enter Code: " +
//         req.params.num +
//         " in your mobile.",
//       from: "+12055707812",
//       to: req.params.number1,
//     })
//     .then((message) => {
//       console.log("messgae", message);
//       res.status(200).send({
//         success: "true",
//         message: message.sid,
//       });
//     })
//     .catch((err) =>
//       res.status(404).send({
//         success: "false",
//         message: "Something really bad happens",
//         err,
//       })
//     );
// });
setInterval(function () {
  db.query("SELECT 1");
  console.log("query");
}, 9000);
module.exports = app;
