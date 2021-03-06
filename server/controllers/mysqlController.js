
import dotenv from 'dotenv'
import mysql from 'mysql'
import moment from 'moment'
import fs from 'fs';

moment.tz.setDefault("Asia/Seoul");
dotenv.config();

export const conn = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: process.env.PASSWORD,
  port: 3306,
  database: 'mydb'
});

conn.connect();

function getTimestampToDate(timestamp){
  var date = new Date(timestamp * 1000);
  date.setHours(date.getHours() + 9);
  return date.toLocaleString();
}

export const graphGet = (req, res) => {
    console.log("graph");
    var html = fs.readFile('./graph1.html', function (err, html) {
        console.log(err);
    html = " " + html;
    console.log('read file');
    var qstr = `select * from temperature;`;

    conn.query(qstr, (err, row, col) => {
      try {
        if (err) throw err;
        var data = "";
        var comma = "";
        for (var i = 0; i < row.length; i++) {
          var r = row[i];
          data += comma + "['" + getTimestampToDate(r.time) + "'," + r.temp + "]";
          comma = ",";
        }
  
        var header = "data.addColumn('string', 'time');";
        header += "data.addColumn('number', 'temp');";
        html = html.replace("<%HEADER%>", header);
        html = html.replace("<%DATA%>", data);
  
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(html);
        res.end();
      } catch (error) {
	      console.log("ERROR");
        console.log(error);
      }
    });
  });
}
/*
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
}*/