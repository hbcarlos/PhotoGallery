const express = require('express');
const session = require('express-session');
const config = require('./backend/config.json')
const { logger } = require('./backend/lib/logger.js');

const app = express();

// Middleware logger
app.use(logger);

// Middleware for control users' sessions
app.use(session({
  name: "sid",
  resave: false, // save back the session to the back store
  saveUninitialized: false, // No save uninitialized sessions
  secret: config.secret,
  cookie: {
    maxAge: 32140800000, // 1000 * 60 * 60 * 24 * 31 * 12 ,1 year
    sameSite: true,
    secure: config.production // true for https, false otherwise
  }
}));

// Middleware body parser url encoded data
app.use(express.json());
app.use(express.urlencoded( { extended: false } ));

app.use(express.static('./client/public/'));

// Middleware public routes
app.use('/api/users', require('./backend/api/users.js'));
app.use('/api/events', require('./backend/api/events.js'));
app.use('/api/galleries', require('./backend/api/galleries.js'));

// Middleware private routes
app.use('/api/admin', require('./backend/api/admin.js'));

// Routes for image storage
app.get('/backend/storage/events/:name', (req, res) => res.download(`${__dirname}/backend/storage/events/${req.params.name}`) );
app.get('/backend/storage/galleries/:name', (req, res) => res.download(`${__dirname}/backend/storage/galleries/${req.params.name}`) );
app.get('/backend/storage/photos/:name', (req, res) => res.download(`${__dirname}/backend/storage/events/${req.params.name}`) );
app.get('/backend/storage/users/:name', (req, res) => res.download(`${__dirname}/backend/storage/users/${req.params.name}`) );

// Middleware web routes
//app.use('/', require('./backend/api/routes.js'));

const redirectLogin = (req, res, next) => {
  console.error("Login");
  if (!req.session.userId) res.redirect('/login');
  else next();
}
const redirectAdmin = (req, res, next) => {
  console.error("Admin");
  if (req.session.userId) res.redirect('/admin');
  else next();
}

// Routes public
app.get('/', (req, res) => res.sendFile(__dirname + '/client/public/index.html') );
app.get('/events', (req, res) => res.sendFile(__dirname + '/client/public/index.html') );
app.get('/galleries', (req, res) => res.sendFile(__dirname + '/client/public/index.html') );
app.get('/about', (req, res) => res.sendFile(__dirname + '/client/public/index.html') );

// Routes private
app.get('/login', redirectAdmin, (req, res) => res.sendFile(__dirname + '/client/public/index.html') );
app.get('/admin', redirectLogin, (req, res) => res.sendFile(__dirname + '/client/public/index.html') );

// All routes
app.get('/notfound', (req, res) => res.sendFile(__dirname + '/client/public/index.html') );
app.get('*', (req, res) => res.redirect('/notfound'));

const PORT = process.env.PORT || 80;
app.listen(PORT, () => console.log("Server listening on localhost:" + PORT))