const jwt = require("jsonwebtoken");
const User = require("../Db").import("../Models/User");

const validateSession = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(403).send({auth: false, message: "No token provided"})
    } else {
        jwt.verify(token, process.env.SECRET, (err, decodeToken) => {

            if (!err && decodeToken) {
                User.findOne({
                    where: {
                        id: decodeToken.id
                    }
                })
                .then(user => {
                    console.log("user --> ", user);
                    if (!user) throw err;

                    console.log("req --> ", req);
                    req.user = user;
                    return next();
                })
                .catch(err => next(err));
            } else {
                req.errors = err;
                return res.status(500).send("Not authorized");
            }
        });
    }
};

module.exports = validateSession;