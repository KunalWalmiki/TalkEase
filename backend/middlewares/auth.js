const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async(req, res, next) => {

    try {

        const authHeader = req.headers.authorization;

        if(!authHeader | !authHeader.startsWith("Bearer")) {

            return res.status(401).json({
                success : false,
                message :  "Auth Header is missing",
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        // console.log(decoded);

        if(decoded?.id) {

            req.user = decoded;
            next();

        } else {

            return res.status(401).json({
                success :false,
                message : 'Invalid Token',
            });

        }

    } catch(error) {

        console.log(error);
        return res.status(501).json({
            success : false,
            message : "Internal Server Error",
        })
    }
}