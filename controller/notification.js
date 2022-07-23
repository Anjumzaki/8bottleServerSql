const e = require("express");

var sendNotificationSpecific = function (data) {
    var headers = {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": "Basic NzZjNThjNTgtODM2Yy00YmJlLThhN2UtNGUzNTcyYjU2MWIx"
    };

    var options = {
        host: "onesignal.com",
        port: 443,
        path: "/api/v1/notifications",
        method: "POST",
        headers: headers
    };

    var https = require('https');
    var req = https.request(options, function (res) {
        res.on('data', function (data) {
            // console.log("Response:");
            console.log(JSON.parse(data));
        });
    });

    req.on('error', function (e) {
        console.log("ERROR:");
        console.log(e);
    });

    req.write(JSON.stringify(data));
    req.end();
};

var message1 = {
    app_id: "57ef35f7-600f-4d69-bd4d-99a786551c60",
    contents: { "en": "" },
    include_player_ids: []
};

module.exports = {
    addNotification: (req, res) => {
        var temp = message1
        temp.contents = { "en": req.body.newNoti }
        temp.include_player_ids = [req.body.clientID]
        console.log('temp: ', temp);
        let userID = req.body.userID;
        let senderID = req.body.senderID;
        let clientID = req.body.clientID;
        let newNoti = req.body.newNoti;
        let seen = req.body.seen;
        let creationDate = new Date();
        if (req.body.clientID) {
            let query =
                "INSERT INTO notification(newNoti, seen, creationDate, clientID, userID, senderID) VALUES('" +
                newNoti +
                "','" +
                seen +
                "','" +
                creationDate +
                "','" +
                clientID +
                "','" +
                userID +
                "','" +
                senderID +
                "')";
            console.log(query)
            db.query(query, (err, result) => {
                if (err) {
                    console.log('err: ', String(err));
                    res.status(400).send({
                        success: "false",
                        message: "Something went wrong",
                    });
                } else {
                    sendNotificationSpecific(message1)
                    res.status(201).send({
                        success: "true",
                        message: "Notification sent",
                    });
                }
            });
        } else {
            res.status(400).send({
                success: "false",
                message: "clientID is required",
            });
        }
    },
    getAllNotifications: (req, res) => {
        let query =
            "SELECT * FROM notification"
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
    deleteFreindRequest: (req, res) => {
        let query =
            "DELETE FROM requests WHERE reqID=" +
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
                    result: result,
                });
            }
        });
    },
    getNotificationByUser: (req, res) => {
        let query =
            "SELECT * FROM notification INNER JOIN user WHERE user.userId =" + req.params.id;
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
