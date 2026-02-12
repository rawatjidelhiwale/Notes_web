const express = require("express")
const noteModel = require("./models/noteModel")
const app = express()
const cors = require("cors")
const path = require("path")


app.use(cors())
app.use(express.json())
app.use(express.static("./public"))


app.post("/notes",async(req,res)=>{
    const {title,content} = req.body
    const note = await noteModel.create({title,content})

    res.status(201).json({message:"Note created successfully",note})
})


app.get("/notes",async (req,res)=>{
    const notes = await noteModel.find()
    res.status(200).json({
        message:"Notes fetched successfully",
        notes
    })
})


app.delete("/notes/:id",async(req,res)=>{
    const id =req.params.id
    await noteModel.findByIdAndDelete(id)

    res.status(200).json({message:"Note deleted successfully"})
})


app.patch("/notes/:id",async(req,res)=>{
    const id = req.params.id
    const {title,content} =req.body
    const updatedNote = await noteModel.findByIdAndUpdate(id,{title,content},{new:true})

    res.status(200).json({message:"Note updated successfully",updatedNote})
})


app.use('*name',(req,res)=>{
    res.sendFile(path.join(__dirname,"../public/index.html"))
})






module.exports = app

