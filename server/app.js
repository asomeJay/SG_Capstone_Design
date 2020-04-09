
import express from 'express';
import url from 'url';
import requestip from 'request-ip';
import request from 'request-promise';
import bodyParser from 'body-parser';
import moment from 'moment';
import timezone from 'moment-timezone';
import routes from './routes.js';
import globalRouter from './routers/globalRouter.js'

moment.tz.setDefault("Asia/Seoul");

const app = express();
const port = 8000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(routes.home, globalRouter);

app.listen(port, () => console.log(`app listening on port ${port}!`))

const basic = (req) => {
    var ret = {
        "email": "museum114@naver.com",
        "stuno": "20150038",
        "time": `${moment().format("YYYY-MM-DD HH:mm:ss")}`,
        "ip": `${requestip.getClientIp(req).slice(7)}`
    }
    return ret;
}

app.get('/', (req, res) => {
    var url_parts = url.parse(req.url, true);
    var ret = basic(req);
    var t = Object.assign(ret, url_parts.query)
    res.send(t)
});

app.post('/', (req, res) => {
    var ret = baisc(req);
    var t = Object.assign(ret, req.body);
    res.setHeader("200", { "Content-Type": "text/plain" });
    res.send(t);
});

app.get('/mask', (req, res) => {
    user_location_info(req, res)
});

export async function find_nearest_store(user_location_info, user_ip, res) {
    var lat = user_location_info.geoLocation.lat;
    var lon = user_location_info.geoLocation.long;
    var user_geo = user_location_info.geoLocation;
    var mask_name, mask_addr, remain_stat;

    var geo_city = user_geo.r1 + " " + user_geo.r2 + " " + user_geo.r3; 
    var request_option = {
        url: mask_url + `?lat=${lat.toString()}` + `&lng=${lon.toString()}`+ "&m=2000",
        method: 'GET',
        json: true
    };

    console.log(moment().format("YYYY-MM-DD HH:mm:ss"), geo_city, user_ip , lat, lon);
    
    await request(request_option, (_, __, body) => {
        mask_name = body.stores[0].name;
        mask_addr = body.stores[0].addr;
        remain_stat = body.stores[0].remain_stat;
    });
    var result = `${moment().format("YYYY-MM-DD HH:mm:ss")}` + "<br>";
    const cord = `{ 위도: ${ lat }, 경도: ${ lon }}`;
    result += `당신은 ${geo_city}에 위치해있습니다<br>`;
    result += `가장 가까운 마스크 판매점은 <br>`;
    result += `<h2>${mask_addr}</h2>`;
    result += `<b><font size = "5.5">${mask_name} </font></b> 입니다<br><br>`;
    result += "<b><font size = '5.5'>";
    if (remain_stat >= 100) 
        result += `100개 이상 남았습니다. <br>`;    
    else if(remain_stat >= 30)
        result += `30개 ~ 99개 남았습니다.<br>`;    
    else if (remain_stat >= 2)
        result += `2개 ~ 29개 남았습니다.<br>`;    
    else
        result += `0 ~ 1개 남았습니다. <br>`;       
    result += "</font></b>";
    res.send(result);
}

app.get('/', )
export default app;