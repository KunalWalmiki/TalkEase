const cloudinary = require("cloudinary");

require("dotenv").config();

exports.cloudinaryConnect = () => {

    try {

        cloudinary.config({

            cloud_name : process.env.cloud_name,
            api_key : process.env.api_key,
            api_secret : process.env.api_secret,
    
        })

    }
    catch (error) {

        console.log("Failed To Connect Cloudinary");
        console.log(error);
        
    }
   
}
