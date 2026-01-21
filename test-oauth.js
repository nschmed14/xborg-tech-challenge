const http = require('http');
require('dotenv').config();

const clientID = process.env.GOOGLE_CLIENT_ID;
const callbackURL = process.env.GOOGLE_CALLBACK_URL;

console.log('Client ID:', clientID ? `${clientID.substring(0, 30)}...` : 'MISSING');
console.log('Callback URL:', callbackURL || 'MISSING');

if (clientID && callbackURL) {
  const params = new URLSearchParams({
    client_id: clientID,
    redirect_uri: callbackURL,
    response_type: 'code',
    scope: 'email profile',
    access_type: 'offline',
    prompt: 'consent',
  });
  
  console.log('\nTest this URL in browser:');
  console.log(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`);
  console.log('\nMake sure this EXACT URL is in Google Cloud Console:');
  console.log(callbackURL);
}
