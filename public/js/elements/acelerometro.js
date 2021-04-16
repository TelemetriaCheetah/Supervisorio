const socket = io();
function setup() {
    var canvas = createCanvas(400, 400, WEBGL);
    canvas.parent('container');//store the canvas into a div with id='container'
}
//global variable : 3 axis
var x = 0;
var y = 0;
var z = 0;
socket.on("analog", (message) =>
{
  console.log(message);
  x = message[0];
  y = message[1];

});

function draw() {
    background(255,0,0); //tone of the backgroud behind our figure
    console.log("y : " + y); //DEBUG
    console.log("x : " + x); //DEBUG
    console.log("z : " + z); //DEBUG
    //rotate the figure from our real orientation
    rotateX(x/10000);
    rotateY(y/10000);
    rotateZ(z/10000);
    //translate(y/10, 20);
    //the figure is a box
    box(100, 50, 100);
}

var myVar = setInterval(emiteMensagem, 50); //Timer principal

function emiteMensagem()
{
  socket.emit("timer", "");
}
