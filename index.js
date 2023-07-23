const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

async function mergeUniqueIntegers(urls) {
    const responses = await Promise.allSettled(
        urls.map(async(url) => {
            try {
                const response = await axios.get(url, { timeout: 500 });
                return response.data;
            } catch (error) {
                return [];
            }
        })
    );

    const mergedNumbers = new Set();
    responses.forEach((response) => {
        if (response.status === 'fulfilled') {
            response.value.forEach((number) => mergedNumbers.add(number));
        }
    });

    return Array.from(mergedNumbers);
}

app.get('/numbers', async(req, res) => {
    const { url } = req.query;

    if (!url || !Array.isArray(url)) {
        return res.status(400).json({ error: 'Invalid URL parameter' });
    }

    try {
        const mergedNumbers = await mergeUniqueIntegers(url);
        return res.json({ numbers: mergedNumbers });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to process the request' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});