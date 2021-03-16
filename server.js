const express = require('express');
const app = express();
const conf = require('./config.json');

app.use(express.static("public"));
app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    let data = {
        pageName: conf.strings.sitename,
        footerText: conf.strings.footerText,
        conf
    }
    return res.render('home.ejs', data)
});

// ? 404 endpoints
app.get("*", (req, res) => {
    var fourOfourMsg = conf.strings['404_messages'][Math.floor(Math.random()*conf.strings['404_messages'].length)];
    let data = {
        pageName: conf.strings.sitename,
        footerText: conf.strings.footerText,
        conf,
        fourOfourMsg
    }
    return res.render('error.ejs', data)
});

let listenPort = conf.port.dev;

if(conf.isProdMode) listenPort = conf.port.production;

app.listen(listenPort, err => {
    if(err) return console.log(err);

    console.log("Server running on port: " + listenPort)
})