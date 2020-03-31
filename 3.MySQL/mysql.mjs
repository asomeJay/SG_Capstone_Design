import express from 'express'
import url from 'url'
import  bodyParser from 'body-parser'
import  dotenv from 'dotenv'
import  mysql from 'mysql'
import { insert_sensor } from './sensor.mjs'
import PythonShell from 'python-shell';
dotenv.config();

const app = express();
const port = 8000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

export const conn = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: process.env.PASSWORD,
  port: 3306,
  database: 'mydb'
});

conn.connect();
app.get('/sensor', function (req, res) {
  var url_parts = url.parse(req.url, true);

  var sensor_info = url_parts.query;
    console.log("GET %j", req.query);
  insert_sensor(sensor_info.device, sensor_info.unit, sensor_info.type, sensor_info.value,
   sensor_info.seq, req.connection.remoteAddress);

  res.send('OK:' + JSON.stringify(sensor_info));
});

app.post('/sensor', function (req, res) {
  var temperature = Number(req.body.temp).toFixed(1);
  var time = req.body.time;
  console.log(temperature, time);
  conn.query(`INSERT INTO temperature VALUES (${time}, ${temperature})`, function (error, results, fields) {
    try {
      if (error) throw error;
      console.log(results, fields);
    } catch (error) {
      console.log("ERROR", error);
    }
  });
});

var options = {
  mode: 'text',
  pythonPath: '',
  pythonOptions: ['-u'],
  scriptPath: '/home/ubuntu/SG_Capstone_Design/3.MySQL',
  args: []
};

function give_weather_data() {
    PythonShell.PythonShell.run('MARSS.py', options, function (err) {
    try {
      if (err) throw err;
      console.log('finished');
    } catch (error) {
      console.log(error);
    }
  });
}

var server = app.listen(port, () => {
  var host = server.address().address;
  var port = server.address().port;
  console.log(`Listening on port ${host}, ${port}`);
  give_weather_data();
    const interval = setInterval(function () {
        give_weather_data();
    }, 3600000);
});
