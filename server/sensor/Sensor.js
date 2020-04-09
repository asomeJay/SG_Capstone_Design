import mysql from 'mysql';
import { conn } from './mysql.js';
import url from 'url';
import moment from 'moment';
import { ok } from 'assert';
import { type } from 'os';

export const sensorGet = (req, res) => {
    const urlQuery = url.parse(req.url, true).query;
    const deviceId = urlQuery.device_id;
    const temperature = urlQuery.temperature_value;
    const sequenceNumber = urlQuery.sequence_number;

    if (deviceId === null) {
        // All value    
    } else {
        // special value
    }
    const send = {
        device_id: deviceId,
        status: "ok",
        time: `${moment().format("YYYY-MM-DD HH:mm:ss")}`,
    };
    res.setHeader("200", { "Content-Type": "application/json" });
    res.send(send);
}


//http://ec2-54-242-181-132.compute-1.amazonaws.com:8000/sensor?device_id=23&temperature_value=45.56&sequence_number=456 
