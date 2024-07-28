const express = require('express');
const dotenv = require('dotenv');
const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;

const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

app.get('/auth/google', (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/calendar']
  });
  res.redirect(url);
});

app.get('/auth/google/callback', async (req, res) => {
  const { code } = req.query;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    // Here you would typically save these tokens securely
    res.send('Authentication successful');
  } catch (error) {
    console.error('Error during authentication', error);
    res.status(500).send('Authentication failed');
  }
});

app.get('/api/availability', async (req, res) => {
  // TODO: Implement availability checking logic
  res.json({ message: 'Availability endpoint' });
});

app.post('/api/book', async (req, res) => {
  // TODO: Implement booking logic
  res.json({ message: 'Booking endpoint' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});