const e = require("express");

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
                            message: "Freind request sent",
                            id: result.insertId,
                        });
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
};
