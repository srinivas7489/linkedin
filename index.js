const express = require('express');
const crypto = require('crypto');

const app = express();
const port = process.env.PORT || 3000;  // You can change this port if needed

// Middleware to parse query parameters
app.use(express.json());

// Endpoint to handle the LinkedIn validation request
app.get('/', (req, res) => {
  const challengeCode = req.query.challengeCode;
  const applicationId = req.query.applicationId;

  // Your LinkedIn client secret (replace this with the actual clientSecret you have)
  const clientSecret = 'WPL_AP1.LgrDqHT357Ak8C8W.BX47ZA==';

  if (challengeCode) {
    // Compute the challengeResponse using HMACSHA256
    const challengeResponse = crypto
      .createHmac('sha256', clientSecret)
      .update(challengeCode)
      .digest('hex');

    // Send back the challengeCode and challengeResponse as JSON
    res.status(200).json({
      challengeCode,
      challengeResponse
    });
  } else {
    // If the challengeCode is missing
    res.status(400).json({ error: 'Missing challengeCode in request' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
