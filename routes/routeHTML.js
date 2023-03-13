const path = require('path');
const router = require('express').Router();

// HTML GET Requests
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '..//public/notes.html'));
});

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..//public/index.html'));
});

// If no matching route is found default to home
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..//public/index.html'));
});

module.exports = router;