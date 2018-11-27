var jwt = require("jsonwebtoken");
var sequelize = require("../db");
var User = sequelize.import("../models/user");

module.exports = function(req, res, next) {
    if (req.method == "OPTIONS") {
         next()
     } else {

    var sessionToken = req.headers.authorization; 
    console.log(sessionToken) 
    if (!sessionToken) return res.status(403).send({ auth: false, message: "No token provided." }) //If no token is present, the 403 Forbidden error is returned as the response. We have several different error handling responses in this file, so assigning each a different error code or message is a big help in debugging.
    else { 
        jwt.verify(sessionToken, process.env.JWT_SECRET, (err,decoded) => { 
            if(decoded){
                User.findOne({where: { id: decoded.id}}).then(user => { 
                    req.user = user; 
                    next();
                },
                function(){ 
                    res.status(401).send({error: "Not authorized"});
                });
            } else { 
                res.status(400).send({error: "Not authorized"});
            }
        });
    }
}
}