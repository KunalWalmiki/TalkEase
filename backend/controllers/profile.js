const User = require("../models/UserModel");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.getUserDetails = async (req, res) => {

    try {

        const user = await User.findOne({ _id: req.user.id });

        if (!user) {

            return res.status(401).json({
                success: false,
                message: "User Not Found",
            })
        }

        const newUser = {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            bio: user.bio,
            image : user.image,
        }

        return res.status(200).json({
            success: true,
            message: "User Details Fetched Successfuly",
            user: newUser,
        });

    } catch (error) {

        console.log(error);
        return res.status(501).json({
            success: false,
            messsage: "Internal Server Error",
        })
    }
}

exports.updateUserDetails = async (req, res) => {

    try {

        const {
            firstName,
            lastName,
            bio = "",
        } = req.body;

        const userId = req.user.id;

        if (!userId) {

            return res.status(401).json({
                success: false,
                message: "UserId is Required",
            })
        }

        const user = await User.findOne({ _id: userId });

        if (!user) {

            return res.status(401).json({
                success: false,
                message: "User Not Found",
            })
        }

        const updatedUser = await User.findByIdAndUpdate({ _id: userId },
            {
                firstName: firstName,
                lastName: lastName,
                bio: bio,
            },
            { new: true });

        const newUser = {
            id: updatedUser._id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            bio: updatedUser.bio,
            image : updatedUser.image,
        }


        return res.status(200).json({
            success: true,
            message: "User Details Updated Successfuly",
            user: newUser,
        });


    } catch (error) {

        console.log(error);
        return res.status(501).json({
            success: false,
            messsage: "Internal Server Error",
        })

    }
}

exports.updateDisplayPicture = async (req, res) => {

    try {

        // extract user id 
        const userId = req.user.id;

        // extract image
        const image = req.files.File;
    

        if (!image) {

            return res.status(401).json({
                success: false,
                message: "Image Is Required",
            })
        }

        //  upload image to cloudinary
        const uploadedImage = await uploadImageToCloudinary(image, process.env.FOLDER_NAME, 1000, 1000);

        const updatedUser = await User.findByIdAndUpdate({ _id: userId },
            {
                image: uploadedImage?.secure_url,
            },
            { new: true });

        const newUser = {
            id: updatedUser._id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            bio: updatedUser.bio,
            image : updatedUser.image,
        }

        return res.status(200).json({
            success: true,
            message: "Profile Picture Updated Successfuly",
            user: newUser,
        })

    } catch (error) {

        console.log(error);
        return res.status(501).json({
            success: false,
            messsage: "Internal Server Error",
        })

    }
}

exports.removeImage = async (req, res) => {

    try {

        // extract user id 
        const userId = req.user.id;

        const user = await User.findById({_id : userId});

        if(!user) {

            return res.status(401).json({
                success : false,
                message : "User Not Found",
            })
        } 

        const updatedUser = await User.findByIdAndUpdate({ _id: userId },
            {
                image: `http://api.dicebear.com/5.x/initials/svg?seed=${user?.firstName} ${user?.lastName}`,
            },
            { new: true });


        const newUser = {
            id: updatedUser._id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            bio: updatedUser.bio,
            image : updatedUser.image,
        }

        return res.status(200).json({
            success: true,
            message: "Profile Picture Updated Successfuly",
            user: newUser,
        })

    } catch (error) {

        console.log(error);
        return res.status(501).json({
            success: false,
            messsage: "Internal Server Error",
        })

    }
}