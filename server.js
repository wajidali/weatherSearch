/**
 * Created by wajidkhilji on 17/04/2017.
 */
'use strict';
// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');

const app = express();


// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/src', express.static(path.join(__dirname, 'src')));

// Catch all other routes and return the index file
app.get('*', function(req, res)  {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3001';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, function() { console.log('App running on localhost:' + port)});
