// Dependencies
const express = require('express');

// Create Server
const app = express();


// server to route
const routeAPI = require('./routes/routeAPI.js');
const routeHTML = require('./routes/routeHTML.js');

// Set Port
const PORT = process.env.PORT || 3001;
// Incoming array/string
app.use(express.urlencoded({ extended: true }));
// incoming json
app.use(express.json());
// Static files
app.use(express.static('public'));

// API Routes
app.use('/api', routeAPI);
app.use('/', routeHTML); 
// listen
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});