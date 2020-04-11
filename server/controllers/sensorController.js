import url from 'url';
import moment from 'moment';
import { conn } from './mysqlController.js';

moment.tz.setDefault("Asia/Seoul");

export const sensorPost = (req, res) => {
    const {
        seqNumber: seqNumber,
        deviceId: deviceId,
        value: value
    } = req.body;

    conn.query(`INSERT INTO sensors (seq, \
        device, value) VALUES (${seqNumber}, ${deviceId}, ${value})`, function (error, results, fields) {
        try {
            if (error) throw error;
            console.log("Sensor : ", req.body);
        } catch (error) {
            console.log("ERROR", error);
        }
    });
}

export const sensorGet = (req, res) => {
    
    const urlQuery = url.parse(req.url, true).query;
    const deviceId = urlQuery.device_id;
    const temperature = urlQuery.temperature_value;
    const sequenceNumber = urlQuery.sequence_number;

    if (temperature !== undefined && sequenceNumber !== undefined) {
        const send = {
            device_id: deviceId,
            status: "ok",
            time: `${moment().format("YYYY-MM-DD HH:mm:ss")}`,
        };

        conn.query(`INSERT INTO sensors (seq, \
            device, value) VALUES (${sequenceNumber}, ${deviceId}, ${temperature})`, function (error, results, fields) {
            try {
                if (error) throw error;
            } catch (error) {
                console.log("ERROR", error);
            }
        });

        res.json(send);

    } else if (deviceId === '') {
        conn.query(`SELECT * FROM sensors`, (error, results, body) => {

            res.json(results);
        });
        // All value   
    } else {
        // special value : deviceId와 일치하는 것만 빼준다. 
        conn.query(`SELECT * FROM sensors where device = ${deviceId}`, (error, results, body) => {
                try {
                    if (error)
                        throw error;
                    res.json(results);
                } catch (error) {
                    console.log("ERROR", error);
                }
        })
    }
}


//http://ec2-54-242-181-132.compute-1.amazonaws.com:8000/sensor?device_id=23&temperature_value=45.56&sequence_number=456 
