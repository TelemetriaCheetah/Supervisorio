const express = require("express");
const http = require("http");
const path = require("path");
const fs = require("fs");
const socketio = require("socket.io");
const serialport = require("serialport");
console.log("Inicializando servidor de telemetria Cheetah E-racing\nPor favor aguarde . . .");
const CheetahLinkFormatter = require('./js/CheetahLinkFormatter');
const CheetahLinkParser = require('./js/CheetahLinkParser');
const DatabaseHandler = require('./js/DatabaseHandler');
const ttyPort = "/dev/ttyACM0";
const port = new serialport(ttyPort,
{
  baudRate:9600,
});

console.log("Módulos carregados");

const parser = port.pipe(new CheetahLinkParser({length: 12}));
const db = new DatabaseHandler();
var serial = new CheetahLinkFormatter();
var config = JSON.parse(fs.readFileSync('./config.json'));

const httpPort = 2000;
const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, "public")));

server.listen(httpPort);
console.log("Servidor aberto em localhost:"+httpPort);

io.on("connection", socket =>
{
  console.log("conexão de soquete bem sucedida");
  socket.on("timer", (msg) =>
  {
    socket.emit("analog", serial.getAnalogArray() );
    socket.emit("digital", serial.getDigitalArray());
  });
});

parser.on("data", (data) =>
{
  port.flush(function(err,results){});
  serial.setData(data , config.qtdMedicao , config.qtdDiscretos);
  db.insertIntoDatabase(serial.getAnalogArray() , serial.getDigitalArray() );
  console.log(serial.getDigitalArray());
});
