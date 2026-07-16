const express = require("express");
const u = require('./models/url.js');
const staticRoutes = require('./router/staticRouter.js');
const path = require('path');
const app = express();
const port = 8001;
const urlRoute = require('./router/url');
const {connectMDB} = require('./connect.js');
connectMDB('mongodb://127.0.0.1:27017/short-url');

// EJS as the view engine

app.set("view engine","ejs"); 
app.set('views', path.resolve("./views"));


// Middleware
app.use(express.json()); // 
app.use(express.urlencoded({extended: false})); // parse form submissions



app.use("/url", urlRoute); // post request


app.use("/",staticRoutes); // main home page


app.get('/:shortId', async (req,res) =>{

    const shortId = req.params.shortId;
   const entry = await u.findOneAndUpdate({
        shortId
    },{$push: {
        visitHistory: {
            timestamp: Date.now()
        }
    }});
    res.redirect(entry.redirectURL)

})
app.get('/analytic/:shortId', async (req,res) =>{

    const shortId = req.params.shortId;
   const entry = await u.findOne({shortId});
return res.json({
        view: entry.visitHistory.length,
        analytic: entry.visitHistory
    });

})
app.listen(port,()=> console.log(`Server started at PORT ${port}`));
