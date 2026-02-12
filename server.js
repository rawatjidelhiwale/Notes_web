require('dotenv').config()
const app = require("./src/app")
const mongoose = require("mongoose")
const connectDb = require("./src/config/database")

app.listen(3000,async()=>{
    console.log("Server is running on port 3000")
})


connectDb()