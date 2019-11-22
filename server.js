const express = require('express');
const path = require('path');

const app = express();


app.use((req, res, next) => {
  console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
  next();
});

/* app.get('/', (req, res) => res.sendFile(__dirname + '/client/index.html'));
app.get('/events', (req, res) => res.sendFile(__dirname + '/client/index.html'));
app.get('/galery', (req, res) => res.sendFile(__dirname + '/client/index.html'));
app.get('/about', (req, res) => res.sendFile(__dirname + '/client/index.html'));
app.get('/settings', (req, res) => res.sendFile(__dirname + '/client/index.html'));
app.get('/notfound', (req, res) => res.sendFile(__dirname + '/client/index.html')); */


app.use(express.static("client/public"));
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/client/public/index.html');
  //res.redirect('/notfound')
});
const PORT = process.env.PORT || 80;
app.listen(PORT, () => console.log("Server listening on localhost:" + PORT)) 