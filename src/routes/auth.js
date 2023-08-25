const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
// require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URL = process.env.REDIRECT_URL

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);

router.get('/auth', (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/calendar.events'],
  });
  console.log(authUrl)
  res.redirect(authUrl);
});

router.get('/callback', async (req, res) => {
  const code = req.query.code;

  try {
      const { tokens } = await oauth2Client.getToken(code);
      console.log(tokens)
    const access_token = tokens.access_token;
    const refresh_token = tokens.refresh_token;

    // You can save access_token and refresh_token to your database or configuration
    // For example, you can store these values in your .env file

    res.send('Authorization successful. Tokens saved.');
  } catch (error) {
    console.error('Error exchanging code for tokens:', error);
    res.status(500).send('An error occurred');
  }
});



module.exports = router;
