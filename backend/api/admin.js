const express = require('express');
const fs = require('fs');
const db = require('../db/database.js');
const st = require('../storage/storage.js');

// Init router
const router = express.Router();

const loggedIn = (req, res, next) => {
  if (!req.session.userId) res.status(401).send('Primero debes loggearte.');
  else next();
}

// All users
router.get('/', loggedIn, (req, res) => {
  db.listUsers()
    .then( resultado => res.json(resultado) )
    .catch(e => {
      console.error(e.stack);
      res.status(400).send('No se han podido cargar los usuarios.');
    });
});

// User account with id
router.get('/account/:id', loggedIn, (req, res) => {
  console.log(req.session);
  db.searchUserAccount( parseInt(req.params.id) )
    .then( resultado => res.json(resultado) )
    .catch(e => {
      console.error(e.stack);
      res.status(400).send('Usuario no encontrado.');
    });
});

// Create new user
router.post('/', loggedIn, (req, res) => {
  db.createUser( req.body )
    .then( resultado => res.json(resultado) )
    .catch(e => {
      console.error(e.stack);
      res.status(400).send('No se ha podido crear el usuario.');
    });
});

// Update user account
router.put('/account/:id', loggedIn, (req, res) => {
  db.updateUserAccount( req.params.id, req.body.username )
    .then( resultado => res.json(resultado) )
    .catch(e => {
      console.error(e.stack);
      res.status(400).send('No se ha podido actualizar el nombre de usuario.');
    });
});

// Update user password
router.put('/password/:id', loggedIn, (req, res) => {
  db.searchUserPassword( req.params.id )
    .then(resultado => {

      if (resultado.password !== req.body.password) return res.status(400).send('Contraseña incorrecta.');

      db.updateUserPassword( req.params.id, req.body.newpass )
        .then( resultado => res.json(resultado) )
        .catch(e => {
          console.error(e.stack);
          res.status(400).send('No se ha podido actualizar la contraseña.');
        });
    }).catch(e => {
      console.error(e.stack);
      res.status(400).send('Usuario no encontrado.');
    });
});

// Update user contact
router.put('/contact/:id', loggedIn, (req, res) => {
  db.searchUserContact( parseInt(req.params.id) )
    .then( resultado => {
      st.uploadUser(req, res, (err) => {
        if (err) return res.status(400).send(err);
        if (req.file && resultado.image && resultado.image !== req.file.path) fs.unlinkSync(resultado.image);
        if (!req.file && resultado.image) fs.unlinkSync(resultado.image);
        
        const path = req.file ? req.file.path : "";
        const contact = { name: req.body.name, email: req.body.email, image: path, description: req.body.description };
        
         db.updateUserContact( req.params.id, contact )
          .then( resultado => res.json(resultado) )
          .catch(e => {
            console.error(e.stack);
            res.status(400).send('No se ha podido actualizar la información de contacto.');
          });
      });
    }).catch(e => {
      console.error(e.stack);
      res.status(400).send('No se ha encontrado el usuario.');
    });

});

// Update user info
router.put('/info/:id', loggedIn, (req, res) => {
  db.updateUserInfo( req.params.id, req.body )
    .then( resultado => res.json(resultado) )
    .catch(e => {
      console.error(e.stack);
      res.status(400).send('No se ha podido actualizar la información de contacto.');
    });
});

// Delete event with id
router.delete('/:id', loggedIn, (req, res) => {
  db.deleteUser( req.params.id )
    .then( resultado => {
      
      fs.unlinkSync(resultado.image);
      res.json(resultado)

    }).catch(e => {
      console.error(e.stack)
      res.status(400).send('No se ha encontrado el usuario.');
    });
});

module.exports = router;