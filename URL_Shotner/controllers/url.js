

const shortid = require("shortid")
const URL = require('../models/url.js');

async function handle_Generate_new_url(req,res){
    const x = shortid(8);
    const body = req.body;
    if(!body.url) return res.status(400).json({error: 'url is required'});

    await URL.create({
        shortId: x,
        redirectURL: body.url,
        visitHistory: [],
    });
    return res.render('home',{
        id: x,
    })
    // return res.json({id: x});
}


module.exports ={
    handle_Generate_new_url,
}