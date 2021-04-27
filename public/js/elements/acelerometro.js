const socket = io();
function setup() {
    var canvas = createCanvas(400, 400, WEBGL);
    canvas.parent('container');//store the canvas into a div with id='container'
}
//global variable : 3 axis
var accelX = 0;
var accelY = 0;
var accelZ = 0;
socket.on("analog", (message) =>
{
  //console.log(message);
  accelX = message[0]-16384;
  accelY = message[1]-16384;
  accelZ = message[2]-16384;
});

function draw() {
    background(255,0,0);
    let pitch = 180 * Math.atan(accelX/ sqrt(accelY*accelY + accelZ*accelZ))/Math.PI;
    let roll = 180 * Math.atan(accelY/ sqrt(accelX*accelX + accelZ*accelZ))/Math.PI;
    rotateX(-roll/50);
    rotateZ(-pitch/45);
    box(100, 50, 100);
}

var myVar = setInterval(emiteMensagem, 50); //Timer principal

function emiteMensagem()
{
  socket.emit("timer", "");
}
