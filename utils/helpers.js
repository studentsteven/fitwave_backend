require('dotenv').config();

const apiKey = process.env.API_KEY // Zorg ervoor dat je hier je echte API-sleutel plaatst

function checkKey(clientApiKey) {
  return clientApiKey === apiKey; // Dit retourneert true of false
}

module.exports = { checkKey };