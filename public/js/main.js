const socket = io();

var batteryLevel = document.getElementById("bateria1");
var air = document.getElementById("airelay");
var velocimetro = new Velocimetro();

socket.on("analog", (message) =>
{
  console.log(message);
  let sensor1 = message[0];
  let sensor2 = message[1];
  velocimetro.atualizaVelocimetro((sensor1-10000)/160);
  batteryLevel.style.width = (sensor2-10000)/300 + "%";
});

socket.on("digital" , (message) =>
{
  let c_air = message[40];
  console.log(message);
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
