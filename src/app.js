const express = require("express");
const noteModel = require("./models/noteModel");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.post("/notes", async (req, res) => {
  const { title, content } = req.body;
  const note = await noteModel.create({ title, content });

  res.status(201).json({
    message: "Note created successfully",
    note,
  });
});

app.get("/notes", async (req, res) => {
  const notes = await noteModel.find();
  res.status(200).json({
    message: "Notes fetched successfully",
    notes,
  });
});

app.delete("/notes/:id", async (req, res) => {
  await noteModel.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Note deleted successfully" });
});

app.patch("/notes/:id", async (req, res) => {
  const { title, content } = req.body;
  const updatedNote = await noteModel.findByIdAndUpdate(
    req.params.id,
    { title, content },
    { new: true }
  );

  res.status(200).json({
    message: "Note updated successfully",
    updatedNote,
  });
});

// ✅ Serve React build
app.use(express.static(path.join(__dirname, "../public")));

// ✅ Catch-all (VERY IMPORTANT)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = app;
