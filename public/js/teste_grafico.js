const dataInicio = document.getElementById("dateBegin");
const dataFinal = document.getElementById("dateEnd");
const horaFinal = document.getElementById("timeEnd");
const horaInicio = document.getElementById("timeBegin");
const botao = document.getElementById("btn").addEventListener("click", atualizar);
var ctx = document.getElementById('myChart').getContext('2d');
var ctx2 = document.getElementById('myChart2').getContext('2d');
const socket = io();
const NUMERO_SENSORES = 10;
const NUMERO_CHAVES = 10;

var chart;
var chart2;

function atualizar()
{
  console.log(dataInicio.value);
  console.log(dataFinal.value);
  var sql = "SELECT * FROM sensor_data_new WHERE timestamp>=\'" + dataInicio.value + "-" +horaInicio.value + "\' AND timestamp<\'" + dataFinal.value + "-" + horaFinal.value + "\'";
  socket.emit("query", sql);
}

socket.on("queryResponse", (message) =>
{
  var dados1 = [];
  var dados2 = [];
  var dados3 = [];
  var horarios = [];
  for(var i = 0 ; i < message.length ; i++)
  {
      dados1[i] = message[i].SENSOR0;
      dados2[i] = message[i].SENSOR1;
      dados3[i] = message[i].SENSOR1;
      horarios[i] = message[i].timestamp.substring(11,19);
  }
  console.log(dados1);
  if (chart)
  {
    chart.destroy();
    chart2.destroy();
  }

  chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
          labels: horarios,
          datasets: [
            {
              label: 'Sensor 0',
              backgroundColor: 'rgba(255,255, 255,000)',
              borderColor: 'rgb(255, 99, 132)',
              data: dados1
          },
          {
              label: 'Sensor 1',
              backgroundColor: 'rgba(255,255, 255,000)',
              borderColor: 'rgb(000,255,000)',
              data: dados2
          }
        ]
      },

      // Configuration options go here
      options: {  responsive: true,
    maintainAspectRatio: false}
  });


  chart2 = new Chart(ctx2, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
          labels: horarios,
          datasets: [
            {
              label: 'Sensor 3',
              backgroundColor: 'rgb(000,000,255)',
              borderColor: 'rgb(000,000,255)',
              data: dados3
          }
        ]
      },

      // Configuration options go here
      options: { responsive: true,
    maintainAspectRatio: false}
  });
});
