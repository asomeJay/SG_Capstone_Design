
import express from 'express';
import url from 'url';
import requestip from 'request-ip';
import request from 'request-promise';
import bodyParser from 'body-parser';
import moment from 'moment';
import timezone from 'moment-timezone';
import geoip from "geoip-lite";


const app = express();
moment.tz.setDefault("Asia/Seoul");
const port = 8000;
var geo;
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
    var user_ip = requestip.getClientIp(req).slice(7);
    geo = geoip.lookup(user_ip);
    const mask_info = await find_nearest_store(geo.ll[0], geo.ll[1]);

    var result = `${moment().format("YYYY-MM-DD HH:mm:ss")}` + "<br>";
    result += `당신은 ${geo.city} { 위도 : ${geo.ll[0]}, 경도 : ${geo.ll[1]} }에 위치해있습니다<br>`;
    result += `가장 가까운 마스크 판매점은 <br>`;
    result += `<h2>${mask_info.mask_addr}</h2>`;
    result += `<b><font size = "5.5">${mask_info.mask_name} </font></b> 입니다<br><br>`;
    result += "<b><font size = '5.5'>";
    if (mask_info.remain_stat >= 100) 
        result += `100개 이상 남았습니다. <br>`;    
    else if(mask_info.remain_stat >= 30)
        result += `30개 ~ 99개 남았습니다.<br>`;    
    else if (mask_info.remain_stat >= 2)
        result += `2개 ~ 29개 남았습니다.<br>`;    
    else
        result += `0 ~ 1개 남았습니다. <br>`;       
    result += "</font></b>";

    res.send(result);
});

async function find_nearest_store(lat, lon) {
    var mask_name, mask_addr, mask_remain_stat;
    var request_option = {
        url: mask_url + `?lat=${lat.toString()}` + `&lng=${lon.toString()}`+ "&m=2000",
        method: 'GET',
        json: true
    };

    console.log("ENTER");
    
    await request(request_option, (_, __, body) => {
        console.log("?");
        mask_name = body.stores[0].name;
        mask_addr = body.stores[0].addr;
        mask_remain_stat = body.stores[0].remain_stat;
    });
    
    return {mask_name, mask_addr, mask_remain_stat};
}

export default app;