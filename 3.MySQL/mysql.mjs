import express from 'express';
import url from 'url';
import body-parser from 'body-parser';

import dotenv from 'dotenv'
import mysql from 'mysql'
dotenv.config();

const app = express();
const port = 8000;

app.use(body-parser.urlencoded({extended: true}));
app.use(body-parser.json());



app.get('/', (req, res) =>{
	var url_parts = url.parse(req.url, true);

})


const conn = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : process.env.PASSWORD,
  port 	   : 3306,
  database : 'mydb'
});
 
conn.connect();
 
conn.query('SELECT * from sensors', function (error, row, fields) {
  if (error) {
	  throw error;
  }

  console.log('The solution is: ', row[0]);
});
 
conn.end();

app.listen(port, ()=>console.log(`Listening on port ${port}`);
