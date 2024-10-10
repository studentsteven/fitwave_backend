const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { db } = require('../utils/database');
const { checkKey } = require('../utils/helpers');

router.get('/cal', async (req, res) => {
    if(!checkKey(req.query.apiKey)) { return res.status(401).json({ error: 'Unauthorized' }); } // Check if authorized

    const { user_id } = req.body; // request body ophalen

    if(!user_id) {
        return res.status(400).json({ message: "Mislukt" });
    }

    var getCals = "SELECT * FROM calories WHERE user_id = ?";
    db.query(getCals, [user_id], function (err, result) {
      if (err) throw err;
      res.send(result);
});
    
});

module.exports = router;