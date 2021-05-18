const socket = io();

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
});

var myVar = setInterval(emiteMensagem, 50); //Timer principal

function emiteMensagem()
{
  socket.emit("timer", "");
}

var ctx = document.getElementById('myChart').getContext("2d");
var ctx2 = document.getElementById('myChart2').getContext("2d");
var ctx3 = document.getElementById('myChart3').getContext("2d");

var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);gradientStroke.addColorStop(0, "rgba(252,41,96,1)");gradientStroke.addColorStop(1, "rgba(255,84,44,1)");
var gradientStroke2 = ctx2.createLinearGradient(500, 0, 100, 0);gradientStroke2.addColorStop(0, "rgba(252,41,96,1)");gradientStroke2.addColorStop(1, "rgba(255,84,44,1)");
var gradientStroke3 = ctx3.createLinearGradient(500, 0, 100, 0);gradientStroke3.addColorStop(0, "rgba(252,41,96,1)");gradientStroke3.addColorStop(1, "rgba(255,84,44,1)");

const config = {
  type: 'line',
  data: {
    labels: [1,2,3,4,5,6,7,8],
    datasets: [{
      label: 'My First dataset',
      backgroundColor: gradientStroke,
      borderColor: 'rgb(255,255,255)',
      data: [0, 10, 5, 2, 20, 30, 45],
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{ticks: {fontSize: 16, fontFamily: "'Roboto', sans-serif", fontColor: '#fff', fontStyle: '500'}}],
      xAxes: [{ticks: {fontSize: 16, fontFamily: "'Roboto', sans-serif", fontColor: '#fff', fontStyle: '500'}}]
    },
legend: 
  {
    display: false
  }
  }
};

const config2 = {
  type: 'line',
  data: {
    labels: [1,2,3,4,5,6,7],
    datasets: [{
      label: 'My First dataset',
      backgroundColor: gradientStroke,
      borderColor: 'rgb(255,255,255)',
      data: [0, 1, 2, 3, 4, 5, 6],
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{ticks: {fontSize: 16, fontFamily: "'Roboto', sans-serif", fontColor: '#fff', fontStyle: '500'}}],
      xAxes: [{ticks: {fontSize: 16, fontFamily: "'Roboto', sans-serif", fontColor: '#fff', fontStyle: '500'}}]
    },
legend: 
  {
    display: false
  }
  }
};

const config3 = {
  type: 'line',
  data: {
    labels: [1,2,3,4,5,6,7],
    datasets: [{
      label: 'My First dataset',
      backgroundColor: gradientStroke,
      borderColor: 'rgb(255,255,255)',
      data: [0,22,49,31,27,99,2],
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{ticks: {fontSize: 16, fontFamily: "'Roboto', sans-serif", fontColor: '#fff', fontStyle: '500'}}],
      xAxes: [{ticks: {fontSize: 16, fontFamily: "'Roboto', sans-serif", fontColor: '#fff', fontStyle: '500'}}]
    },
legend: 
  {
    display: false
  }
  }
};

var myChart = new Chart(
  ctx,
  config
);

var myChart2 = new Chart(
  ctx2,
  config2
);

var myChart3 = new Chart(
  ctx3,
  config3
);





