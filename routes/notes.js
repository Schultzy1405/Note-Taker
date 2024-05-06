const express = require('express');
const notesRouter = express.Router();
const path = require('path');
const fs = require('fs/promises');

const dbPath = path.join(__dirname, '../db/db.json');

// Read notes from the database file
const readNotes = async() => {
  try {
    const data = await fs.readFile(dbPath);
    console.log(data)
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    } else {
      console.error('Error reading notes:', error);
      throw error;
    }
  }
};

// Write notes to the database file
const writeNotes = (notes) => {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(notes));
  } catch (error) {
    console.error('Error writing notes:', error);
  }
};

// API endpoints
notesRouter.get('/notes', (req, res) => {
  const notes = readNotes();
  console.log(notes)
  if (!notes) {
    res.status(400).send('Could not get notes.')
    return;
  }
  res.json(notes);
});

notesRouter.post('/notes', (req, res) => {
  const { title, text } = req.body;
  const notes = readNotes();
  const newNote = { id: Date.now(), title, text };
  notes.push(newNote);
  writeNotes(notes);
  res.status(201).json(newNote);
});

module.exports = { notesRouter };