

// const shortid = require("shortid")
const { nanoid } = require("nanoid");
const URL = require('../models/url.js');

async function handle_Generate_new_url(req,res){
    const x = nanoid(3);;
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

async function handle_Get_Analytics(req,res){
    const shortId = req.params.shortId;
    
}
module.exports ={
    handle_Generate_new_url,
}