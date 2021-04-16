const socket = io();

var batteryLevel = document.getElementById("bateria1");
var air = document.getElementById("airelay");
var regua = document.getElementById("texto");
var regua2 = document.getElementById("texto2");
var velocimetro = new Velocimetro();

socket.on("analog", (message) =>
{
  console.log(message);
  let sensor1 = message[0];
  let sensor2 = message[1];
  velocimetro.atualizaVelocimetro(sensor1/70);
  batteryLevel.style.width = 75-(sensor1/20) + "%";
  let corrente = ( ((4.83 - sensor1/204.8)/12000) *1000).toFixed(3) ;
  regua.innerHTML = corrente + "mA";
  let A =  3.9114610;
  let w = 7.2873782;
  let y0 = 0.0475052733;
  let v =  22.79147837;
  //regua.innerHTML = (sensor1/204.8).toFixed(2) + "V";
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

var myVar = setInterval(emiteMensagem, 50); //Timer principal

function emiteMensagem()
{
  socket.emit("timer", "");
}
