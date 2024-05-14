const mongoose = require("mongoose");
require("dotenv").config();


const dbConnect = () => {

    mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("Database Connected Successfuly"))
    .catch((e) => console.log(e))

}

module.exports = dbConnect;