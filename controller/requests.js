const e = require("express");
const axios = require("axios");
let baseUrl = "http://localhost:5000/"
// let baseUrl = "https://eightbottleserver.herokuapp.com/"

module.exports = {
    addFriend_req: (req, res) => {
        let senderID = req.body.senderID;
        let recieverID = req.body.recieverID;
        let createdAt = new Date();
        if (senderID) {
            if (recieverID) {
                let query =
                    "INSERT INTO requests(senderID,recieverID,createdAt) VALUES('" +
                    senderID +
                    "','" +
                    recieverID +
                    "','" +
                    createdAt +
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
                            message: "Friend request sent",
                            id: result.insertId,
                        });
                        console.log('userID:', recieverID);
                        axios.post(baseUrl + "v1/notification/add", {
                            userID: recieverID,
                            clientID: req.body.clientID,
                            newNoti: req.body.newNoti,
                            seen: req.body.seen,
                            creationDate: new Date()
                        }).catch((err) => {
                            console.log(String(err));
                        })
                    }
                });
            } else {
                res.status(400).send({
                    success: "false",
                    message: "recieverID is required",
                });
            }
        } else {
            res.status(400).send({
                success: "false",
                message: "senderID  is required",
            });
        }
    },
    getUserFriendRequests: (req, res) => {
        let query =
            "SELECT * FROM requests LEFT JOIN user on requests.senderID = user.userId  where requests.recieverID=" +
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
    addFriend: (req, res) => {
        let userID = req.body.userID;
        let friendID = req.body.friendID;
        let freindDates = new Date();
        if (userID) {
            if (friendID) {
                let query =
                    "INSERT INTO ref_friends(userID,friendID,freindDates) VALUES('" +
                    userID +
                    "','" +
                    friendID +
                    "','" +
                    freindDates +
                    "')";
                db.query(query, (err, result) => {
                    if (err) {
                        res.status(400).send({
                            success: "false",
                            message: "Something went wrong",
                            err
                        });
                    } else {
                        res.status(201).send({
                            success: "true",
                            message: "Freind added",
                            id: result.insertId,
                        });
                    }
                });
            } else {
                res.status(400).send({
                    success: "false",
                    message: "friendID is required",
                });
            }
        } else {
            res.status(400).send({
                success: "false",
                message: "userID  is required",
            });
        }
    },
    getUserFriends: (req, res) => {
        let query =
            "SELECT * FROM ref_friends LEFT JOIN user on ref_friends.userID = user.userId  where ref_friends.userID=" +
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
};
