const express = require('express');
const fs = require('fs');
const db = require('../db/database.js');
const st = require('../storage/storage.js');

// Init router
const router = express.Router();

// All events
router.get('/', (req, res) => {
  db.listEvents()
    .then( resultado => res.json(resultado) )
    .catch(e => {
      console.error(e.stack);
      res.status(400).send('No se han podido cargar los eventos.');
    });
});

// Event with id
router.get('/:id', (req, res) => {
  db.searchEvent( parseInt(req.params.id) )
    .then( resultado => res.json(resultado) )
    .catch(e => {
      console.error(e.stack);
      res.status(400).send('Evento no encontrado.');
    });
});

// Create new event
router.post('/', (req, res) => {
  st.uploadEvent(req, res, (err) => {
    if (err) return res.status(400).send(err);
    const event = { name: req.body.name, date: req.body.date, cover: req.file.path }
    
     db.createEvent( event )
      .then( resultado => res.json(resultado) )
      .catch(e => {
        console.error(e.stack);
        res.status(400).send('No se ha podido crear el evento.');
      });
  });
});

// Update event
router.put('/:id', (req, res) => {
  db.searchEvent( parseInt(req.params.id) )
    .then( resultado => {
      st.uploadEvent(req, res, (err) => {
        if (err) return res.status(400).send(err);
        if (resultado.cover !== req.file.path) fs.unlinkSync(resultado.cover);

        const event = { name: req.body.name, date: req.body.date, cover: req.file.path }
        
         db.updateEvent( req.params.id, event )
          .then( resultado => res.json(resultado) )
          .catch(e => {
            console.error(e.stack);
            res.status(400).send('No se ha podido actualizar el evento.');
          });
      });
    }).catch(e => {
      console.error(e.stack);
      res.status(400).send('No se ha encontrado el evento.');
    });
});

// Delete event with id
router.delete('/:id', (req, res) => {
  db.deleteEvent( req.params.id )
    .then( resultado => {
      
      fs.unlinkSync(resultado.cover);
      res.json(resultado);

    }).catch(e => {
      console.error(e.stack)
      res.status(400).send('No se ha encontrado el evento.');
    });
});

module.exports = router;