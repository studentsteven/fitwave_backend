function checkKey(clientApiKey) {
  if (clientApiKey !== apiKey) { return false; } 
  else { return true; }
}