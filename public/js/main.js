const socket = io();

var velocimetro = new Velocimetro();
var indicador1 = new Indicador(1);
var indicador2 = new Indicador(2);
var indicador3 = new Indicador(3);
var indicador4 = new Indicador(4);
var indicador5 = new Temperatura(5);
var indicador6 = new Temperatura(6);
var indicador7 = new Temperatura(7);
var indicador8 = new Temperatura(8);
var indicador9 = new Temperatura(9);
var indicador10 = new Temperatura(10);
var indicador11 = new Temperatura(11);
var indicador12 = new Temperatura(12);

socket.on("analog", (message) =>
{
  console.log(message[0]);
  let sensor1 = message[0];
  let sensor2 = message[1];
  velocimetro.atualizaVelocimetro(sensor1);
});

var myVar = setInterval(emiteMensagem, 50); //Timer principal

function emiteMensagem()
{
  socket.emit("timer", "");
}
