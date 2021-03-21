const socket = io();
const NUMERO_SENSORES = 10;
const NUMERO_CHAVES = 10;

//var ctx = document.getElementById('myChart').getContext('2d');
const dados1 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];

var batteryLevel = document.getElementById("bateria1");
var air = document.getElementById("airelay");
var velocimetro = new Velocimetro();

socket.on("realtime", (message) =>
{
  const c = new ConversorSerial();
  c.setData(message,NUMERO_SENSORES,NUMERO_CHAVES);
  var sensores = c.getSensorArray();
  var chaves = c.getBoolArray();
  c_air = chaves[0];
  sensor1 = sensores[9];
  sensor2 = sensores[1];
  velocimetro.atualizaVelocimetro((sensor1-10000)/160);
  batteryLevel.style.width = (sensor2-10000)/300 + "%";
  if(c_air)
  {
    air.innerHTML = "AIR FECHADO";
    air.style.backgroundImage = "url(\'./images/air_closed.svg\')";
  }
  else
  {
    air.innerHTML = "AIR ABERTO";
    air.style.backgroundImage = "url(\'./images/air_open.svg\')";
  }
});

var myVar = setInterval(emiteMensagem, 200); //Timer principal

function emiteMensagem()
{
  socket.emit("timer", "");
}
