const express = require('express');

const db = require('../../data/dbConfig.js');

const router = express.Router();

router.get('/', (req, res) => {
  db.select('*')
    .from('accounts')
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({errorMessage: 'failed to get the list of posts'})
    })
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  db.select('*')
    .from('accounts')
    .where({ id })
    .first()
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({errorMessage: 'failed to get the list of posts'})
    })
})

router.post('/', (req, res) => {
  db('accounts')
    .insert(req.body)
    .then(ids => {
      res.status(201).json({successMessage: 'Added Account'})
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({errorMessage: 'failed to get the list of posts'})
    })
})

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  db('accounts')
    .where({ id })
    .update(changes)
    .then(count => {
      res.status(200).json({successMessage: 'Editted Account'})
    })
    .catch(error => {
      console.log(error);

      res.status(500).json({ error: "failed to update the post" });
    });
})

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  db('accounts')
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json(count)
    })
    .catch(error => {
      console.log(error);

      res.status(500).json({ error: "failed to remove the post" });
    });
})

module.exports = router
