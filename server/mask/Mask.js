import dot from 'dotenv'
import axios from 'axios'
import CryptoJS from 'crypto-js'
import requestip from 'request-ip';
import { find_nearest_store } from './app.js';

dot.config();

const access_key = process.env.access_key;
const secret_key = process.env.secret_key;

const requestMethod = "GET";
const hostName = 'https://geolocation.apigw.ntruss.com'
const requestUrl= '/geolocation/v2/geoLocation'

export const user_location_info = (req, res) => {
    const timeStamp = Math.floor(+new Date).toString();
    const user_ip = requestip.getClientIp(req).slice(7);
    const sortedSet = {};
    sortedSet["ip"] = user_ip;
    sortedSet["ext"] = "t";
    sortedSet["responseFormatType"] = "json";
  
    let queryString = Object.keys(sortedSet).reduce((prev, curr) => {
        return prev + curr + '=' + sortedSet[curr] + '&';
    }, "");
  
    queryString = queryString.substr(0, queryString.length - 1);
  
    const baseString = requestUrl + "?" + queryString;
    const signature = makeSignature(secret_key, requestMethod, baseString, timeStamp, access_key);
  
    const config = {
        headers: {
            'x-ncp-apigw-timestamp': timeStamp,
            'x-ncp-iam-access-key': access_key,
            'x-ncp-apigw-signature-v2': signature
        }
    }
  
    axios.get(`${hostName}${baseString}`, config)
        .then(response => {
            const result = find_nearest_store(response.data, user_ip, res);
        })
        .catch(error => { console.log(error.response.data); })
    
};

function makeSignature(secretKey, method, baseString, timestamp, accessKey) {
    const space = " ";
    const newLine = "\n";
    let hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);

    hmac.update(method);
    hmac.update(space);
    hmac.update(baseString);
    hmac.update(newLine);
    hmac.update(timestamp);
    hmac.update(newLine);
    hmac.update(accessKey);
    const hash = hmac.finalize();

    return hash.toString(CryptoJS.enc.Base64);
}

