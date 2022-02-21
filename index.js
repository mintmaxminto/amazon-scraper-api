const express = require('express');
const request = require('request-promise');

const app = express();
const PORT = process.env.PORT || 3000;

const baseURL = `http://api.scraperapi.com?api_key=${process.env.API_KEY}&autoparse=true`;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Amazon Scraper API.');
})

//GET PRODUCT DETAILS
app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params;

    try {
        const response = await request(`${baseURL}&url=https://www.amazon.com/dp/${productId}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
})

//GET PRODUCT REVIEWS
app.get('/products/:productId/reviews', async (req, res) => {
    const { productId } = req.params;

    try {
        const response = await request(`${baseURL}&url=https://www.amazon.com/product-reviews/${productId}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
})

//GET PRODUCT OFFERS
app.get('/products/:productId/offers', async (req, res) => {
    const { productId } = req.params;

    try {
        const response = await request(`${baseURL}&url=https://www.amazon.com/gp/offer-listing/${productId}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
})

//GET SEARCH RESULTS
app.get('/search/:searchQuery', async (req, res) => {
    const { searchQuery } = req.params;

    try {
        const response = await request(`${baseURL}&url=https://www.amazon.com/s?k=${searchQuery}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));