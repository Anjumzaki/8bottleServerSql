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
app.set("port", port);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(file_upload()); 
const logger = require('morgan')
app.use(logger("dev"))
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
  fbLogin,
  googleLogin,
  hydrationGoal
} = require("./controller/users.js");

const {
  addCompany,
  getCompanies,
  getCompany,
  editCompany,
  deleteCompanies,
  getCompanyByCategID
} = require("./controller/company.js");

const {
  addCategory,
  getCategories,
  editCategory,
  getCategory,
  deleteCategory,
  getZebraCheck
} = require("./controller/category.js");

const {
  addSubCategory,
  getSubCategory,
} = require("./controller/subCategory.js");

const {
  addRef_prod_fav,
  editRef_prod_fav,
  getRef_prod_fav,
  deleteRef_prod_fav,
  userRef_prod_fav,
  userStoreRef_prod_fav,
} = require("./controller/ref_prod_fav.js");
const {
  addFriend_req,
  getUserFriendRequests,
  deleteFreindRequest,
  addFriend,
  getUserFriends,
  friendRequestsByUser
} = require("./controller/requests.js");

const {
  addHydrationGoal,
  getHydrationGoal
} = require("./controller/hydrationGoal.js");

const {
  addNotification,
  getAllNotifications
} = require("./controller/notification.js");


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
app.get("/v1/getUserFriendRequests/:id", checkAuth, getUserFriendRequests);
app.post("/v1/addFriend_req", checkAuth, addFriend_req);
app.delete("/v1/deleteFreindRequest/:id", checkAuth, deleteFreindRequest);
app.post("/v1/addFriend", checkAuth, addFriend);
app.get("/v1/getUserFriends/:id", checkAuth, getUserFriends);
app.get("/v1/friendRequestsByUser/:id", checkAuth, friendRequestsByUser);


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




//Sub Categories
app.post("/v1/recent", checkAuth, addSubCategory);
app.get("/v1/recent/:id", checkAuth, getSubCategory);

//Hydration Goal
app.post("/v1/hydrationGoal/add/:id", addHydrationGoal);
app.get("/v1/get/hydrationGoal/:id", getHydrationGoal);

//Notification
app.post("/v1/notification/add", addNotification);
app.get("/v1/get/Notification", getAllNotifications);

//users
app.post("/v1/user", addUser);
app.get("/v1/user", checkAuth, getUsers);
app.get("/v1/user/:id", checkAuth, getUser);
app.put("/v1/user/:id", editUser);
app.post("/v1/login/user", userLogin);
app.get("/v1/checkEmail/:id", checkEmail);
app.get("/v1/checkNumber/:id", checkNumber);
app.post("/v1/forgotPassword/", forgotPassword);
app.post("/v1/fbLogin/", fbLogin);
app.post("/v1/googleLogin/", googleLogin);
app.get("/v1/hydrationGoal/:id", hydrationGoal);


//companies
app.get("/v1/place", checkAuth, getCompanies);
app.post("/v1/place", checkAuth, addCompany);
app.put("/v1/place/:id", checkAuth, editCompany);
app.post("/v1/place/:id", checkAuth, getCompany);
app.delete("/v1/place/:id", checkAuth, deleteCompanies);
app.get("/v1/placeyCateg/:id", checkAuth, getCompanyByCategID);

// //Category
app.get("/v1/category", checkAuth, getCategories);
app.post("/v1/category", checkAuth, addCategory);
app.put("/v1/category/:id", checkAuth, editCategory);
app.post("/v1/category/:id", checkAuth, getCategory);
app.delete("/v1/category/:id", checkAuth, deleteCategory);
app.get("/v1/getZebraCheck", getZebraCheck);



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

setInterval(function () {
  db.query("SELECT 1");
  console.log("query");
}, 9000);
module.exports = app;
