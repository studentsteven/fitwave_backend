const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { db } = require('../utils/database');
const { checkKey } = require('../utils/helpers');

router.post('/cal_toevoegen', async (req, res) => {
    if(!checkKey(req.query.apiKey)) { return res.status(401).json({ error: 'Unauthorized' }); } // Check if authorized

    const { user_id, name, calories } = req.body; // request body ophalen

    if(!user_id || !calories || !name) {
        return res.status(400).json({ message: "Mislukt" });
    }

    var addCalories = "INSERT INTO calories (user_id, name, calories_number) VALUES (?, ?, ?)";
    db.query(addCalories, [user_id, name, calories], function (err, result) {
      if (err) throw err;
      return res.status(200).json({ message: "Calorieën toegevoegd!" });
    });
    
});

module.exports = router;