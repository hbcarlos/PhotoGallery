const express = require('express');

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

// Init router
const router = express.Router();



module.exports = router;