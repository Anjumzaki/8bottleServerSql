// const e = require("express");
const creds = require("../config/config");
const _ = require("underscore");
const path = require("path");
var nodemailer = require("nodemailer");
var ejs = require("ejs");
const client = require("twilio")(creds.SID, creds.TOKEN);

module.exports = {
  emailVerification: (req, res) => {
    console.log(req.body);

    var transport = {
      host: "smtp.gmail.com",
      auth: {
        user: "thenodeteam@gmail.com",
        pass: "Newyork2020",
      },
    };

    var transporter = nodemailer.createTransport(transport);

    ejs.renderFile(
      "../views/VerifyEmail.ejs",
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
  },
  numberVerification: (req, res) => {
    console.log("HIT", req.params);

    client.messages
      .create({
        body:
          " Hi User, Thanks for your interest in joining The Node! To complete your registration please Enter Code: " +
          req.params.num +
          " in your mobile.",
        from: "+12055707812",
        to: req.params.number1,
      })
      .then((message) => {
        console.log("messgae", message);
        res.send(message.sid);
      })
      .catch((err) => console.log("errr", err));
  },
};
