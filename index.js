const express = require('express');
const app = express();
const mysql = require('mysql');
const port = 3306;
require('dotenv').config()


var db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
});

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get('/', (req, res) => {
    db.query("SELECT * FROM user", function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
    // res.send('To get all users, go to link /users')
});

app.get('/users', (req, res) => {

});

app.listen(port, () => {
    console.log(`Backend running on port ${port}`);
});