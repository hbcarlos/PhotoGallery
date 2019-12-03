const express = require('express');
const db = require('../db/database.js');

// Init router
const router = express.Router();

// User contact with id
router.get('/contact/:id', (req, res) => {
  db.searchUserContact( parseInt(req.params.id) )
    .then( resultado => res.json(resultado) )
    .catch(e => {
      console.error(e.stack);
      res.status(400).send('Usuario no encontrado.');
    });
});

// User info with id
router.get('/info/:id', (req, res) => {
  db.searchUserInfo( parseInt(req.params.id) )
    .then( resultado => res.json(resultado) )
    .catch(e => {
      console.error(e.stack);
      res.status(400).send('Usuario no encontrado.');
    });
});

// User home info with id
router.get('/home/:id', (req, res) => {
  db.searchUserHome( parseInt(req.params.id) )
    .then( resultado => res.json(resultado) )
    .catch(e => {
      console.error(e.stack);
      res.status(400).send('Usuario no encontrado.');
    });
});

// User links with id
router.get('/links/:id', (req, res) => {
  db.searchUserLinks( parseInt(req.params.id) )
    .then( resultado => res.json(resultado) )
    .catch(e => {
      console.error(e.stack);
      res.status(400).send('Usuario no encontrado.');
    });
});

module.exports = router;