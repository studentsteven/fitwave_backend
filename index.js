const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

require('dotenv').config();
app.use(bodyParser.json());

// Route naar deafult route, met alle endpoints
const defaultRoute = require('./routes/default');
app.get('/', defaultRoute);

// Route naar users, krijg alle users terug
const usersRoute = require('./routes/users');
app.get('/users', usersRoute);

// Route naar sign up, maak een nieuw account aan.
const signUpRoute = require('./routes/sign_up');
app.post('/sign_up', signUpRoute);

// Route naar sign in, login met een bestaand account.
const signInRoute = require('./routes/sign_in');
app.post('/sign_in', signInRoute);

// Route naar friends, bekijk alle vrienden die je hebt
const friendsRoute = require('./routes/friends');
app.post('/friends', friendsRoute);

// Route naar friendrequests, bekijk alle vriendschapsverzoeken
const friendrequestsRoute = require('./routes/friendrequests');
app.post('/friendrequests', friendrequestsRoute);

// Route naar friendrequests, bekijk alle vriendschapsverzoeken
const acceptFriendRoute = require('./routes/accept_friend');
app.post('/accept_friend', acceptFriendRoute);

// Route naar friendrequests, bekijk alle vriendschapsverzoeken
const declineFriendRoute = require('./routes/decline_friend');
app.post('/decline_friend', declineFriendRoute);

// Route naar friendrequests, bekijk alle vriendschapsverzoeken
const sendFriendRequest = require('./routes/send_friend_request');
app.post('/send_friend_request', sendFriendRequest);

// Route naar workout
const workoutRoute = require('./routes/workouts');
app.get('/workouts', workoutRoute);

app.listen(port, '0.0.0.0', () => {
  console.log(`Backend running on port ${port}`);
});