import express from 'express'
import url from 'url'
import bodyParser from 'body-parser'

import dotenv from 'dotenv'
import mysql from 'mysql'
import { insert_sensor } from './sensor.mjs'
dotenv.config();

const app = express();
const port = 8000;
export const conn = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : process.env.PASSWORD,
  port 	   : 3306,
  database : 'mydb'
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
conn.connect();
app.get('/sensor', (req, res) => {
  var url_parts = url.parse(req.url, true);
  var sensor_info = url_parts.query;
  console.log("GET %j", req.query);

  insert_sensor(sensor_info.device, sensor_info.unit, sensor_info.type, sensor_info.value,
    sensor_info.seq, req.connection.remoteAddress);
  res.send('OK:' + JSON.stringify(sensor_info));
});



var server = app.listen(port, () => {
  var host = server.address().address;
  var port = server.address().port;
  console.log(`Listening on port ${host}, ${port}`)
});


