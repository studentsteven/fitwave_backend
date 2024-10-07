const express = require('express');
const router = express.Router();
const { checkKey } = require('../utils/helpers');
const { db } = require('../utils/database');

router.get('/workouts', (req, res) => {
    if(!checkKey(req.query.apiKey)) { return res.status(401).json({ error: 'Unauthorized' }); } // Check if authorized

    db.query("SELECT * FROM workout", function (err, result, fields) { // user query sql
      if (err) throw err;
      res.send(result);
    });
});

module.exports = router;