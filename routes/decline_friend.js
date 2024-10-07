const express = require('express');
const router = express.Router();
const { checkKey } = require('../utils/helpers');
const { db } = require('../utils/database');

router.post('/decline_friend', (req, res) => {
    if(!checkKey(req.query.apiKey)) { return res.status(401).json({ error: 'Unauthorized' }); } // Check if authorized
  
    const { friendReqId } = req.body; // request body ophalen

    if(!friendReqId) { // als er geen friendReqId wordt meegegeven
        return res.status(400).json({message: "Er is geen friendReqId meegegeven"});
    }

    var checkUser = "DELETE FROM friend WHERE id = ?;";
    db.query(checkUser, [friendReqId], function (err, result) {
        if (err) return res.status(400).json({message: "Er is een fout opgetreden tijdens het afwijzen van het vriendschapverzoek..."})
        res.status(200).json({message: "Vriendschapsverzoek is afgewezen!"});
    });
});

module.exports = router;