const express = require("express");
const router = express.Router();
const u = require('../models/url');
router.get('/', async(req,res) =>{
    const allurl = await  u.find({});
    return res.render('home.ejs',{
        urls: allurl,
    });
    
})
module.exports = router;