const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { db } = require('../utils/database');
const { checkKey } = require('../utils/helpers');

router.post('/sign_in', (req, res) => {
    if(!checkKey(req.query.apiKey)) { return res.status(401).json({ error: 'Unauthorized' }); } // Check if authorized

    const { username, password } = req.body; // request body ophalen
  
    db.query("SELECT * FROM user", async function (err, users, fields) { // alle users ophalen database
      if (err) throw err;
  
      const user = users.find(u => u.username === username); // bekijken of user bestaat, alle userinfo zetten in user const
      if(!user) {
        return res.status(400).json({ message: 'Gebruiker niet gevonden' });
      }
  
      const isPassCorrect = await bcrypt.compare(password, user.password); // controleren password met bcrypt
      if(!isPassCorrect) {
        return res.status(400).json({ message: 'Ongeldig wachtwoord' });
      }
  
      res.status(200).json({ auth: true, user_id: user.id, username: user.username, email: user.email }); // authenticated, teruggeven user.id
    });
});

module.exports = router;