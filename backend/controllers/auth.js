const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.signup = async(req, res) => {

    try {

        const {firstName, lastName, email, password} = req.body;

        if(!firstName | !lastName | !email | !password) {

            return res.status(401).json({
                success : false,
                message : "All Fields Are Required",
            })
        }

        const ExistedUser = await User.findOne({email : email});

        if(ExistedUser) {

            return res.status(401).json({
                success : false,
                message : "Email Already Exists"
            })
        }

        let hashedPassword;

        try {

            hashedPassword = await bcrypt.hash(password, 10);

        } catch(error) {
            console.log("error", error);
            return res.status(401).json({
                success : false,
                message : "Error Occured While Hashing password",
            })
        }

        const user = await User.create({
            firstName,
            lastName,
            email,
            password : hashedPassword,
            image : `http://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        });

        return res.status(200).json({
            success : true,
            message : "Account Created Successfuly",
            data : user,
        })

    } catch(error) {

        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Internal Server Error"
        })
    }
}

exports.login = async(req, res) => {

    try { 

        const {email, password} = req.body;

        if(!email | !password) {

            return res.status(401).json({
                success : false,
                message : "All Fields Are Required",
            })
        }

        const existedUser = await User.findOne({email : email});

        if(!existedUser) {

            return res.status(401).json({
                success : false,
                message : "Sorry..! Your Email is Not Registered With Us",
            })
        }

        const user = await User.findOne({email: email});

        if(!user) {
            return res.status(401).json({
                success : false,
                message : "User Not Found",
            })
        }

        if(await bcrypt.compare(password, user?.password)) {

            const payload = {
                id : user?.id,
                email : user?.email,
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn : "30d"
            });

            const newUser = {
                id : user?._id,
                firstName : user?.firstName,
                lastName : user?.lastName,
                bio : user?.bio,
                image : user?.image,
            }

            return res.status(200).json({
                success : true,
                message : "Logged In Successfuly",
                token : token, 
                user : newUser,
            });

        } else {

            return res.status(401).json({
                success : false,
                message : "Incorrect Password",
            })
        }

    } catch(error) {

        console.log(error);
        return res.status(501).json({
            success : false,
            message : "Internal Server Error",
        });

    }
}

exports.getAllUsers = async(req, res) => {

    try {

        const keyword = req.query.search 
        ? {
             $or :[
                {firstName : {$regex : req.query.search, $options : "i"}},
                {lastName : {$regex : req.query.search, $options : "i"}}
             ]
          }
        : {};


        const users = await User.find({...keyword, _id : {$ne : req.user.id}})
        .select("-password").select("-email").select("-createdAt").select("-updatedAt");
        

        return res.status(200).json({
            success : true,
            message : "All Users Fetched Successfuly",
            users,
        });

    } catch(error) {

        console.log(error);
        return res.status(501).json({
            success : false,
            message : "Internal Server Error",
        })
    }
}

