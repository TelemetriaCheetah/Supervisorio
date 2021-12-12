const express = require("express");
const cors = require("cors")
const http = require("http");
const path = require("path");
const fs = require("fs");
const socketio = require("socket.io");
const serialport = require("serialport");
console.log("Inicializando servidor de telemetria Cheetah E-racing\nPor favor aguarde . . .");
const CheetahLinkFormatter = require('./js/CheetahLinkFormatter');
const CheetahLinkParser = require('./js/CheetahLinkParser');
const DatabaseHandler = require('./js/DatabaseHandler');
const CsvParser = require('./js/CsvParser.js');
const { parse } = require("path");

console.log("Módulos carregados");

var config = JSON.parse(fs.readFileSync('./config.json'));
const db = new DatabaseHandler();


const httpPort = 2000;
const app = express();
const server = http.createServer(app);
const io = socketio(server , {
  cors: 
  {
    origin: '*',
  }
});

//app.use(express.static(path.join(__dirname, "public")));

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

server.listen(httpPort);
console.log("Servidor aberto em localhost:"+httpPort);

let interval;

io.on("connection", socket =>
{
  console.log("conexão de soquete bem sucedida");
  if (interval) 
  {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 90);
});

function convertRange(value, range) 
{
  return Math.floor(((value - range.oldMin) * (range.newMax - range.newMin)) / (range.oldMax - range.oldMin) + range.newMin);
}

const csv = new CsvParser();

var cont = 0;
const getApiAndEmit = socket => 
{
  let valores = csv.parseCSV();
  // console.log(parseFloat(valores[cont].SA80.replace(/,/, '.')));
  console.log((parseFloat(valores[cont].SA6)  * 9.549265855 * 60)/(477.94));
  cont++;
  if(cont >= 2000)
    cont = 0;

  let analog = [];

  analog[0] = Math.floor(parseFloat(valores[cont].SA1) * 40.96);
  analog[1] = Math.floor(parseFloat(valores[cont].SA1) * 40.96);
  analog[2] = Math.floor(parseFloat(valores[cont].SA4) * 9.54);
  analog[3] = Math.floor(parseFloat(valores[cont].SA5) * 9.54);
  analog[4] = Math.floor(parseFloat(valores[cont].SA6) * 9.54);
  analog[5] = Math.floor(parseFloat(valores[cont].SA7) * 9.54);
  analog[6] = Math.floor(parseFloat(valores[cont].SA8) * 10);
  analog[7] = Math.floor(parseFloat(valores[cont].SA8) * 10);
  analog[8] = Math.floor(parseFloat(valores[cont].SA10) * 10);
  analog[9] = Math.floor(parseFloat(valores[cont].SA10) * 10);
  analog[10] = Math.floor(parseFloat(valores[cont].SA12) * 10);
  analog[11] = Math.floor(parseFloat(valores[cont].SA12) * 10);
  analog[12] = Math.floor(parseFloat(valores[cont].SA14) * 10);
  analog[13] = Math.floor(parseFloat(valores[cont].SA14) * 10);
  analog[14] = Math.floor(parseFloat(valores[cont].SA16));
  analog[15] = Math.floor(0);
  analog[16] = Math.floor(0);
  analog[17] = Math.floor(0);
  analog[18] = Math.floor(0);
  analog[19] = Math.floor(0);
  analog[20] = Math.floor(0);
  analog[21] = Math.floor(parseFloat(valores[cont].SA21.replace(/,/, '.')) * 9.78);
  analog[22] = Math.floor(parseFloat(valores[cont].SA22.replace(/,/, '.')) * 9.78);
  analog[23] = Math.floor(0);
  analog[24] = Math.floor(0);
  analog[25] = Math.floor(0);
  analog[26] = Math.floor(0);
  analog[27] = Math.floor(0);
  analog[28] = Math.floor(0);
  analog[29] = Math.floor(0);
  analog[30] = Math.floor(0);
  analog[31] = Math.floor(0);
  analog[32] = Math.floor(0);
  analog[33] = Math.floor(0);
  analog[34] = parseFloat(valores[cont].SA34.replace(/,/, '.'));
  analog[35] = Math.floor(0);
  analog[36] = Math.floor(0);
  analog[37] = Math.floor(0);
  analog[38] = parseFloat(valores[cont].SA61);
  analog[39] = Math.floor(0);
  analog[40] = Math.floor(0);
  analog[41] = Math.floor(0);
  analog[42] = Math.floor(0);
  analog[43] = Math.floor(0);
  analog[44] = Math.floor(0);
  analog[45] = Math.floor(0);
  analog[46] = Math.floor(0);
  analog[47] = Math.floor(0);
  analog[48] = Math.floor(0);
  analog[49] = Math.floor(0);
  analog[50] = Math.floor(0);
  analog[51] = Math.floor(0);
  analog[52] = Math.floor(0);
  analog[53] = Math.floor(0);
  analog[54] = Math.floor(0);
  analog[55] = 115 + Math.floor(Math.random() * 4);
  analog[56] = parseFloat(valores[cont].SA56.replace(/,/, '.'));
  analog[57] = Math.floor(0);
  analog[58] = Math.floor(0);
  analog[59] = Math.floor(0);
  analog[60] = Math.floor(0);
  analog[61] = parseFloat(valores[cont].SA61);
  analog[62] = Math.floor(0);
  analog[63] = parseFloat(valores[cont].SA61);
  analog[64] = Math.floor(0);
  analog[65] = Math.floor(0);
  analog[66] = Math.floor(0);
  analog[67] = Math.floor(0);
  analog[68] = Math.floor(0);
  analog[69] = Math.floor(0);
  analog[70] = 115 + Math.floor(Math.random() * 50)/10;
  analog[71] = Math.floor(0);
  analog[72] = Math.floor(0);
  analog[73] = Math.floor(0);
  analog[74] = Math.floor(parseFloat(valores[cont].SA74) * 40.96);
  analog[75] = Math.floor(0);
  analog[76] = Math.floor(parseFloat(valores[cont].SA74) * 40.96);
  analog[78] = Math.floor(parseFloat(valores[cont].SA74) * 40.96);
  analog[79] = Math.floor(parseFloat(valores[cont].SA74) * 40.96);
  analog[80] = parseFloat(valores[cont].SA80.replace(/,/, '.'));

  let saida = 
  {
    SA1  : convertRange(analog[0] , config.tps),
    SA2  : convertRange(analog[1] , config.tps),
    SA4  : convertRange(analog[2] , config.wheelSpeed),
    SA5  : convertRange(analog[3] , config.wheelSpeed),
    SA6  : convertRange(analog[4] , config.wheelSpeed),
    SA7  : convertRange(analog[5] , config.wheelSpeed),
    SA8  : convertRange(analog[6] , config.wheelTemperature),
    SA9  : convertRange(analog[7] , config.wheelTemperature),
    SA10 : convertRange(analog[8] , config.wheelTemperature),
    SA11 : convertRange(analog[9] , config.wheelTemperature),
    SA12 : convertRange(analog[10] , config.wheelTemperature),
    SA13 : convertRange(analog[11] , config.wheelTemperature),
    SA14 : convertRange(analog[12] , config.wheelTemperature),
    SA15 : convertRange(analog[13] , config.wheelTemperature),
    SA16 : convertRange(analog[14] , config.steeringRotation),
    // SA17 : -parseFloat(latitude, 10),
    // SA18 : -parseFloat(longitude, 10),
    SA19 : analog[19],
    SA20 : convertRange(analog[20] , config.hdop),
    SA21 : convertRange(analog[21] , config.imuAccel),
    SA22 : convertRange(analog[22] , config.imuAccel),
    SA23 : convertRange(analog[23] , config.imuAccel),
    SA24 : convertRange(analog[24] , config.imuAngle),
    SA25 : convertRange(analog[25] , config.imuAngle),
    SA26 : convertRange(analog[26] , config.imuAngle),
    SA27 : convertRange(analog[27] , config.imuMag),
    SA28 : convertRange(analog[28] , config.imuMag),
    SA29 : convertRange(analog[29] , config.imuMag),
    SA30 : convertRange(analog[30] , config.imuTemp),
    SA31 : convertRange(analog[31] , config.bmsCurrent),
    SA32 : convertRange(analog[32] , config.bmsVoltage),
    SA33 : convertRange(analog[33] , config.bmsVoltage),
    SA34 : analog[34],
    SA35 : convertRange(analog[35] , config.bmsSOC),
    SA36 : convertRange(analog[36] , config.bmsCapacity),
    SA37 : analog[37],
    SA38 : convertRange(analog[38] , config.bmsTemperature),
    SA39 : convertRange(analog[39] , config.bmsTemperature),
    SA40 : convertRange(analog[40] , config.bmsTemperature),
    SA41 : convertRange(analog[41] , config.bmsTemperature),
    SA42 : convertRange(analog[42] , config.bmsVoltage),
    SA43 : convertRange(analog[43] , config.bmsVoltage),
    SA44 : convertRange(analog[44] , config.bmsVoltage),
    SA45 : convertRange(analog[45] , config.bmsResistance),
    SA46 : convertRange(analog[46] , config.bmsResistance),
    SA47 : convertRange(analog[47] , config.bmsResistance),
    SA48 : analog[48],
    SA49 : analog[49],
    SA50 : analog[50],
    SA51 : convertRange(analog[51] , config.bmsFAN),
    SA52 : convertRange(analog[52] , config.bmsVcc),
    SA53 : convertRange(analog[53] , config.bmsIsol),
    SA54 : convertRange(analog[54] , config.bmsADC),
    SA55 : convertRange(analog[55] , config.tensao),
    SA56 : convertRange(analog[56] , config.inverterRPM),
    SA57 : convertRange(analog[57] , config.inverterCurrent),
    SA58 : convertRange(analog[58] , config.inverterFrequency),
    SA59 : convertRange(analog[59] , config.inverterState),
    SA60 : convertRange(analog[60] , config.inverterVoltage),
    SA61 : convertRange(analog[61] , config.inverterSpeed),
    SA62 : convertRange(analog[62] , config.inverterTorque),
    SA63 : convertRange(analog[63] , config.inverterTemperature),
    SA64 : convertRange(analog[64] , config.inverterTemperature),
    SA65 : convertRange(analog[65] , config.inverterTemperature),
    SA66 : analog[66],
    SA67 : analog[67],
    SA68 : analog[68],
    SA69 : analog[69],
    SA70 : convertRange(analog[70] , config.current),
    SA71 : convertRange(analog[71] , config.csPWM),
    SA72 : convertRange(analog[72] , config.csVoltage),
    SA73 : convertRange(analog[73] , config.csVoltage),
    SA74 : convertRange(analog[74] , config.pressure),
    SA75 : convertRange(analog[75] , config.csCurrent),
    SA76 : convertRange(analog[74] , config.pressure),
    SA77 : analog[77],
    SA78 : convertRange(analog[78] , config.pressure),
    SA79 : convertRange(analog[79] , config.pressure),
    SA80 : analog[80],
    // SD1  : digital[0],
    // SD2  : digital[1],
    // SD17 : digital[2],
  }
  socket.emit("cheetah_server" , saida);
};
