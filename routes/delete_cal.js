const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { db } = require('../utils/database');
const { checkKey } = require('../utils/helpers');

router.post('/cal_delete', async (req, res) => {
    if(!checkKey(req.query.apiKey)) { return res.status(401).json({ error: 'Unauthorized' }); } // Check if authorized

    const { cal_id } = req.body; // request body ophalen

    if(!cal_id) {
        return res.status(400).json({ message: "Mislukt" });
    }

    var removeCal = "DELETE FROM calories WHERE id = ?";
    db.query(removeCal, [cal_id], function (err, result) {
      if (err) throw err;
      return res.status(200).json({ message: "Gelukt!" });
});
    
});

module.exports = router;