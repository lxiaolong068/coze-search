const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000; // Server will listen on this port

app.use(express.json()); // Middleware to parse JSON bodies

const apiUrl = "https://api.coze.com/open_api/v2/chat";
const personalAccessToken = "pat_5hOcaSVfwrK6mmiEORD1kzQlMZVZbFjwbKqPEeAtpWYofKN7kc1eALcusw9nLmAI"; // Replace with your Personal Access Token
const botId = "7347668210487476225"; // Replace with your Bot ID
const userId = "29032201862555"; // Replace with the user ID

app.post('/api/query', async (req, res) => {
    const userQuery = req.body.query;

    if (!userQuery) {
        return res.status(400).send({ message: 'Query parameter is required.' });
    }

    try {
        const response = await axios.post(apiUrl, {
            bot_id: botId,
            user: userId,
            query: userQuery,
            stream: false // Set to false for non-streaming response
        }, {
            headers: {
                'Authorization': `Bearer ${personalAccessToken}`,
                'Content-Type': 'application/json'
            }
        });

        res.status(200).send(response.data);
    } catch (error) {
        console.error('Error during HTTP request:', error.message);
        res.status(500).send({ message: 'Failed to process the query', error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
