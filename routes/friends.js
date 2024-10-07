const express = require('express');
const router = express.Router();
const { checkKey } = require('../utils/helpers');
const { db } = require('../utils/database');

router.post('/friends', (req, res) => {
    if(!checkKey(req.query.apiKey)) { return res.status(401).json({ error: 'Unauthorized' }); } // Check if authorized
  
    const { user_id } = req.body; // request body ophalen

    if(!user_id) { // als er geen user_id wordt meegegeven
        return res.status(400).json({message: "Er is geen user_id meegegeven"});
    }

    var checkUser = "SELECT u1.username AS username1, u2.username AS username2, f.sended FROM friend f JOIN user u1 ON f.user_id_1 = u1.id JOIN user u2 ON f.user_id_2 = u2.id WHERE (f.user_id_1 = ? OR f.user_id_2 = ?) AND f.accepted = 1;";
    db.query(checkUser, [user_id, user_id], function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

module.exports = router;