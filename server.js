require('dotenv').config()
const app = require("./src/app")
const mongoose = require("mongoose")
const connectDb = require("./src/config/database")

app.listen(process.env.PORT,async()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})


connectDb()