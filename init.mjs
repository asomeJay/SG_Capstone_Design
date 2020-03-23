
import express from 'express';
import url from 'url';
import requestip from 'request-ip';
import request from 'request';
import globalRouter from './mask.mjs';

const app = express();

const port = 8000;

app.set('view engine', 'ejs');

let date_ob = new Date();
const mask_url = "https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json"
const mask = () => request({
    url: mask_url,
    method: 'GET'
}, (error, res, body) => {
    console.log(body.count);
});
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
    mask();
    url_parts = url.parse(req.url, true);
    var time_expression = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    var ret = {
        "email": "museum114@naver.com",
        "stuno": "20150038",
        "time": `${time_expression}`,
        "ip": `${requestip.getClientIp(req).slice(7)}`
    }

    var t = Object.assign(ret, url_parts.query)
    res.send(t)
    console.log(t);

});
//app.get('/mask', mask());
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
    res.send(req.body);
    console.log(t);

});

app.use('/mask', globalRouter);

export default app;