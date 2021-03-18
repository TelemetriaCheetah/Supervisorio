const express = require("express");
const http = require("http");
const path = require("path");
const fs = require("fs");
const socketio = require("socket.io");
const mysql = require("mysql");
const serialport = require("serialport");
const readline = require("@serialport/parser-readline");
const ConversorSerial = require("./public/js/serial_converter.js");
const InsertIntoDatabase = require("./js/sql.js");

const NUMERO_SENSORES = 10;
const NUMERO_CHAVES = 10;
var sensores = [];
var chaves = [];
var saida;
var realtimeData;

const ttyPort = "/dev/ttyACM2";
const serial = new serialport(ttyPort,
{
  baudRate:115200,
});

const parser = new readline();
serial.pipe(parser);

const converte_serial = new ConversorSerial();
parser.on("data", (data) =>
{
  console.log(data);
  realtimeData = data;
  converte_serial.setData(data,NUMERO_SENSORES,NUMERO_CHAVES);
  if((data.length-1) === (NUMERO_CHAVES + NUMERO_SENSORES*5))
  {
    sensores = converte_serial.getSensorArray();
    chaves = converte_serial.getBoolArray();
    const SQL = new InsertIntoDatabase(sensores,chaves,NUMERO_SENSORES,NUMERO_CHAVES);
    let sql = SQL.formatInsert();
    let query = db.query(sql, (err, results) =>
    {
      if(err){throw err;}
    });
  }
});

const port = 2000;
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const db = mysql.createConnection
(
  {
    host: "localhost",
    user: "kodi",
    password: "kodi",
    database: "esp_data"
  }
);

db.connect(() =>
  {
    console.log("MySQL connected");
  }
);

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", socket =>
{
  console.log("conexão de soquete bem sucedida");
  socket.on("timer", (msg) =>
  {
    socket.emit("realtime", realtimeData);
  });

  socket.on("query", (msg) =>
  {
    console.log(msg);
    let query = db.query(msg, (err, results) =>
    {
      if(err){throw err;}
      socket.emit("queryResponse", results);
    });
  });

});

app.get('/', function(req, res)
{
  res.send('Hello World!');
});

server.listen(port);
