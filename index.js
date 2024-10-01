const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const port = 3000;

require('dotenv').config();
app.use(bodyParser.json());

const apiKey = process.env.API_KEY;

var db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
});

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected with the database!");
});

function checkKey(clientApiKey) {
    if (clientApiKey !== apiKey) { return false; } 
    else { return true; }
  }

app.get('/', (req, res) => { // alle endpoints teruggeven
  if(!checkKey(req.query.apiKey)) { return res.status(401).json({ error: 'Unauthorized' }); } // Check if authorized
  
  res.send(`FITWAVE_API
    ----------------------
    Endpoints:
    /users (Get all users from table users)
    /sign_in (Check if user exists and password is correct, then give auth)
    /sign_up (Create account, with username, email and password (hashed))`);
});

app.get('/users', (req, res) => { // Alle users ophalen
  if(!checkKey(req.query.apiKey)) { return res.status(401).json({ error: 'Unauthorized' }); } // Check if authorized

  db.query("SELECT * FROM user", function (err, result, fields) { // user query sql
    if (err) throw err;
    res.send(result);
  });
});

app.post('/sign_in', (req, res) => {
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

    res.status(200).json({ auth: true, user_id: user.id }); // authenticated, teruggeven user.id
  });
});

app.post('/sign_up', async (req, res) => {
  if(!checkKey(req.query.apiKey)) { return res.status(401).json({ error: 'Unauthorized' }); } // Check if authorized

  const { username, email, password } = req.body; // request body ophalen

  if(!username || !email || !password) { // Checken of alle values zijn opgehaalt of bestaan
   return res.status(400).json({message: "Er mist een value, hierdoor is het script gestopt."});
  }

  // Wachtwoorden hashen met bcrypt
  const hash_salt = await bcrypt.genSalt(10);
  const password_hash = await bcrypt.hash(password, hash_salt); 

  // Gebruiker toevoegen aan user tabel
  var insert_user = "INSERT INTO user (username, email, password) VALUES (?, ?, ?)";
  db.query(insert_user, [username, email, password_hash], function (err, result) {
    if (err) throw err;
    res.status(201).json({ auth: true, user_id: result.insertId });
  });
});

app.listen(port, () => {
    console.log(`Backend running on port ${port}`);
});