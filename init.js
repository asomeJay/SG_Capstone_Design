
const express = require('express')
const app = express()
const port = 8000;
const url = require('url')
const requestip = require('request-ip')

let date_ob = new Date();
let m, y, h, mi, se;
// current date
// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);

// current month
//let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let month = date_ob.getMonth();

// current year
let year = date_ob.getFullYear();

// current hours
let hours = date_ob.getHours();
if (hours < 10)
    hours = "0" + hours;

// current minutes
let minutes = date_ob.getMinutes();
if (minutes < 10) 
    minutes = "0" + minutes;
    
// current seconds
let seconds = date_ob.getSeconds();
if (seconds < 10) 
    seconds = "0" + seconds;



app.listen(port, () => console.log(`Example app listening on port ${port}!`))
app.get('/', (req, res) => {
    url_parts = url.parse(req.url, true);
    var time_expression = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    var ret = {
        "email": "museum114@naver.com",
        "stuno": "20150038",
        "time": `${time_expression}`,
        "ip": `${requestip.getClientIp(req).slice(7)}`
    }

    var t = Object.assign(ret, url_parts.query)
    res.send(t);
    console.log(t);

});

app.post('/', (req, res) => {
    url_parts = url.parse(req.url, true);
    var time_expression = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    var ret = {
        "email": "museum114@naver.com",
        "stuno": "20150038",
        "time": `${time_expression}`,
        "ip": `${requestip.getClientIp(req).slice(7)}`
    }

    var t = Object.assign(ret, url_parts.query)
    res.send(t);
    console.log(t);

});
