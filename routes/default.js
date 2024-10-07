const express = require('express');
const router = express.Router();
const { checkKey } = require('../utils/helpers');

router.get('/', (req, res) => {
    if(!checkKey(req.query.apiKey)) { return res.status(401).json({ error: 'Unauthorized' }); } // Check if authorized
  
    res.send(`FITWAVE_API
    ----------------------
    Endpoints:
    /users (Get all users from table users)
    /sign_in (Check if user exists and password is correct, then give auth)
    /sign_up (Create account, with username, email and password (hashed))`);
});

module.exports = router;