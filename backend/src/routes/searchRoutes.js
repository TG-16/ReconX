const express = require('express');
const router = express.Router();
const { search, getResults } = require('../controllers/searchController');

router.post('/search', search);
router.get('/targets/:id/results', getResults);

module.exports = router;
