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
const ttyPort = "/dev/ttyACM1";
const port = new serialport(ttyPort,{baudRate:115200});

console.log("Módulos carregados");

const parser = port.pipe(new CheetahLinkParser({length: 10})); //EM BYTES, CONSULTAR DOCUMENTACAO
const db = new DatabaseHandler();
var serial = new CheetahLinkFormatter();
var config = JSON.parse(fs.readFileSync('./config.json'));
var cont = 0;
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

+new Date
var inicio = Date.now();
port.flush(function(err,results){});
parser.on("data", (data) =>
{
  serial.setData(data , config.qtdMedicao , config.qtdDiscretos);
  console.log(data);
  //db.insertIntoDatabase(serial.getAnalogArray() , serial.getDigitalArray() );
  //console.log(db.getSensorArray("A" , 0));
  //console.log(cont);
  //console.log(data);
  /*if(Date.now() >= inicio + 302000)
  {
    console.log("Contagem Final = " + cont);
    process.exit();
  }
  else if(Date.now() >= inicio + 2000)
    cont++;*/
});
