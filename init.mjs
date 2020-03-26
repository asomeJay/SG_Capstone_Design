
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

const mask_url = "https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json"
// current date
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
app.get('/', (req, res) => {
    var url_parts = url.parse(req.url, true);
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

    var request_option = {
        url: mask_url,
        method: 'GET',
        json: true
    };
    console.log("ENTER");
    await request(request_option, (_, __, body) => {
        mask_cnt = body.stores[0];
    });
    var result = `${moment().format("YYYY-MM-DD HH:mm:ss")}` + " " + mask_cnt.name +" 마스크가 ";
        result += mask_cnt.remain_stat + " 입니다.";
        console.log(result);

        res.send(result);
});

export default app;