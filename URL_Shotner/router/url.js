const express = require('express');

const router = express.Router();
const {handle_Generate_new_url} = require('../controllers/url');




router.post('/',handle_Generate_new_url);
// router.get('/analytics')

module.exports = router;