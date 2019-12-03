const express = require('express');
const fs = require('fs');
const db = require('../db/database.js');
const st = require('../storage/storage.js');

// Init router
const router = express.Router();

// All galleries
router.get('/', (req, res) => {
  db.listGalleries()
    .then( resultado => res.json(resultado) )
    .catch(e => {
      console.error(e.stack);
      res.status(400).send('No se han podido cargar las galerias.');
    });
});

// Gallery with id
router.get('/:id', (req, res) => {
  db.searchGallery( parseInt(req.params.id) )
    .then( resultado => res.json(resultado) )
    .catch(e => {
      console.error(e.stack);
      res.status(400).send('Galeria no encontrada.');
    });
});

// Create new gallery
router.post('/', (req, res) => {
  st.uploadGallery(req, res, (err) => {
    if (err) return res.status(400).send(err);
    const gallery = { name: req.body.name, cover: req.file.path }
    
     db.createGallery( gallery )
      .then( resultado => res.json(resultado) )
      .catch(e => {
        console.error(e.stack);
        res.status(400).send('No se ha podido crear la galeria.');
      });
  });
});

// Update gallery
router.put('/:id', (req, res) => {
  db.searchGallery( parseInt(req.params.id) )
    .then( resultado => {
      st.uploadGallery(req, res, (err) => {
        if (err) return res.status(400).send(err);
        if (resultado.cover !== req.file.path) fs.unlinkSync(resultado.cover);

        const gallery = { name: req.body.name, date: req.body.date, cover: req.file.path }
        
         db.updateGallery( req.params.id, gallery )
          .then( resultado => res.json(resultado) )
          .catch(e => {
            console.error(e.stack);
            res.status(400).send('No se ha podido actualizar la galeria.');
          });
      });
    }).catch(e => {
      console.error(e.stack);
      res.status(400).send('No se ha encontrado la galeria.');
    });
});

// Delete gallery with id
router.delete('/:id', (req, res) => {
  db.deleteGallery( req.params.id )
    .then( resultado => {
      
      fs.unlinkSync(resultado.cover);
      res.json(resultado);

    }).catch(e => {
      console.error(e.stack)
      res.status(400).send('Galeria no encontrada.');
    });
});

module.exports = router;