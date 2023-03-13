const express = require('express');
const router = express.Router();
const database = require('../db/database.js');

// API get request
router.get('/notes', (req, res) => {
    database
        .getNotes()
        .then((notes) => res.json(notes))
        .catch((err) => res.status(500).json(err));
        console.log("getNotes");
});
// API post request
router.post('/notes', (req, res) => {
    database
        .addNotes(req.body)
        .then((note) => res.json(note))
        .catch((err) => res.status(500).json(err));
});
// Delete the clicked note
router.delete('/notes/:id', (req, res) => {
    database
        .removeNotes(req.params.id)
        .then(() => res.json({ ok: true }))
        .catch((err) => res.status(500).json(err));
});

module.exports = router;

