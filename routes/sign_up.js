const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { db } = require('../utils/database');
const { checkKey } = require('../utils/helpers');

router.post('/sign_up', async (req, res) => {
    if(!checkKey(req.query.apiKey)) { return res.status(401).json({ error: 'Unauthorized' }); } // Check if authorized

    const { username, email, password } = req.body; // request body ophalen
    
    if(!username || !email || !password) { // Checken of alle values zijn opgehaalt of bestaan
     return res.status(400).json({message: "Er mist een value, hierdoor is het script gestopt."});
    }

    // Checken of username al bestaat, anders message
    var checkUser = "SELECT username FROM user WHERE username = ?";
    db.query(checkUser, [username], function (err, result) {
      if (err) throw err;
      if(result.length > 0) {
        res.status(409).json({ message: "Er bestaat al een gebruiker met deze naam. Probeer een andere gebruikersnaam." });
      }
    });
    
    // Wachtwoorden hashen met bcrypt
    const hash_salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, hash_salt); 
    
    // Gebruiker toevoegen aan user tabel
    var insert_user = "INSERT INTO user (username, email, password) VALUES (?, ?, ?)";
    db.query(insert_user, [username, email, password_hash], function (err, result) {
      if (err) throw err;
      res.status(201).json({ auth: true, user_id: result.insertId, username: username, email: email });
    });
});

module.exports = router;