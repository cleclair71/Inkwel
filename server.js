// Dependencies
const express = require('express');

// server to route
const routeAPI = require('./routes/routeAPI.js');
const routeHTML = require('./routes/routeHTML.js');
// Create Server
const app = express();
// Set Port
const PORT = process.env.PORT || 3001;
// incoming json
app.use(express.json());

// Incoming array/string
app.use(express.urlencoded({ extended: true }));
// Static files
app.use(express.static('public'));

// API Routes
app.use('/api', routeAPI);
app.use('/', routeHTML); 
// listen
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
