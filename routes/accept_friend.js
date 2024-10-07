const express = require('express');
const router = express.Router();
const { checkKey } = require('../utils/helpers');
const { db } = require('../utils/database');

router.post('/accept_friend', (req, res) => {
    if(!checkKey(req.query.apiKey)) { return res.status(401).json({ error: 'Unauthorized' }); } // Check if authorized
  
    const { friendReqId } = req.body; // request body ophalen

    if(!friendReqId) { // als er geen friendReqId wordt meegegeven
        return res.status(400).json({message: "Er is geen friendReqId meegegeven"});
    }

    var checkUser = "UPDATE friend SET accepted = 1 WHERE id = ?";
    db.query(checkUser, [friendReqId], function (err, result) {
        if (err) return res.status(400).json({message: "Er is een fout opgetreden tijdens het accepteren van het vriendschapverzoek..."})
        res.status(200).json({message: "Vriendschapsverzoek is geaccepteerd!"});
    });
});

module.exports = router;