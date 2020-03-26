
import express from 'express';
import url from 'url';
import requestip from 'request-ip';
import request from 'request-promise';
import bodyParser from 'body-parser';
import moment from 'moment';
import timezone from 'moment-timezone';

const app = express();
moment.tz.setDefault("Asia/Seoul");
const port = 8000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let date_ob = new Date();
const mask_url = "https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json"
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
    var url_parts = url.parse(req.url, true);
    var time_expression = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    var ret = {
        "email": "museum114@naver.com",
        "stuno": "20150038",
        "time": `${moment().format("YYYY-MM-DD HH:mm:ss")}`,
        "ip": `${requestip.getClientIp(req).slice(7)}`
    }
    var t = Object.assign(ret, url_parts.query)
    res.send(t)
    console.log(t);
});
//app.get('/mask', mask());
app.post('/', (req, res) => {
    var ret = {
        "email": "museum114@naver.com",
        "stuno": "20150038",
        "time": `${moment().format("YYYY-MM-DD HH:mm:ss")}`,
        "ip": `${requestip.getClientIp(req).slice(7)}`
    }
    var t = Object.assign(ret, req.body);
    console.log(t);
    res.setHeader("200", { "Content-Type": "text/plain" });
    res.send(t);
    res.end(JSON.stringify(t, null, 2));

});

app.get('/mask', async (req, res) => {
    var mask_cnt = ":";
    var time_expression = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;

    var request_option = {
        url: mask_url,
        method: 'GET',
        json: true
    };
    console.log("ENTER");
    await request(request_option, (_, __, body) => {
        console.log("?");
        mask_cnt = body.stores[0];
    });
    var result = `${moment().format("YYYY-MM-DD HH:mm:ss")}` + " " + mask_cnt.name +" 마스크가 ";
        result += mask_cnt.remain_stat + " 입니다.";
        console.log(result);

        res.send(result);

});

export default app;