const SerialPort = require('serialport');
const CheetahLinkFormatter = require('./js/CheetahLinkFormatter');
const CheetahLinkParser = require('./js/CheetahLinkParser');
const DatabaseHandler = require('./js/DatabaseHandler');

const port = new SerialPort('/dev/ttyACM0');
const parser = port.pipe(new CheetahLinkParser({length: 12}));
const db = new DatabaseHandler();
const fs = require('fs');

var serial = new CheetahLinkFormatter();
var config;

config = JSON.parse(fs.readFileSync('./config.json'));

parser.on('data', (data) =>
{
  port.flush(function(err,results){});
  //console.log(db.getSensorArray("A" , 1));
  //console.log(db.getSensorArray("D" , 28));
  serial.setData(data , config.qtdMedicao , config.qtdDiscretos);
  console.log(serial.getAnalogArray());
  //console.log(serial.getDigitalArray());
  db.insertIntoDatabase(serial.getAnalogArray() , serial.getDigitalArray())
});
