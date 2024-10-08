const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { db } = require('../utils/database');
const { checkKey } = require('../utils/helpers');

router.post('/send_friend_request', (req, res) => {
    if(!checkKey(req.query.apiKey)) { return res.status(401).json({ error: 'Unauthorized' }); } // Check if authorized

    const { username, req_user_id } = req.body; // request body ophalen
  
    var username_check = "SELECT * FROM user WHERE username = ?";
    db.query(username_check, [username], function (err, result) {
        if (err) throw err;
        if(result.length > 0) {
            const user = result.find(u => u.username === username); // user data ophalen
            var user_id = user.id;
            var insert_request = "INSERT INTO friend (user_id_1, user_id_2, request_by, accepted) VALUES (?, ?, ?, ?)";
            db.query(insert_request, [req_user_id, user_id, req_user_id, 0], function (err, result) {
                res.status(200).json({ message: `Vriendschapsverzoek is verstuurd naar ${username}!` });
            });

        } else {
            res.status(404).json({ message: "Deze gebruiker bestaat niet." });
        }
    });
});

module.exports = router;