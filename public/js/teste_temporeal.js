const socket = io();
const NUMERO_SENSORES = 10;
const NUMERO_CHAVES = 10;
var ctx = document.getElementById('myChart').getContext('2d');
const dados1 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];

socket.on("message", (message) =>
{
  const dados2 = [];
  //dados1.unshift(parseInt(message[0],10));
  for(var i = 0 ; i < dados1.length ; i++)
  {
    dados2[i] = dados1[i];
  }
  //console.log(dados1);
  console.log(dados2);
  dados1[0] = parseInt(message[0],10);
  for(var i = 0 ; i < 29 ; i++)
  {
    dados1[i+1] = dados2[i];
  }
  var tabela = "<table style=\"width:100%\"><tr>";
  for(var i = 0 ; i < NUMERO_SENSORES ; i++)
  {
    tabela+="<th>SENSOR "+i+"</th>";
  }
  tabela+="</tr><tr>";
  for(var i = 0 ; i < NUMERO_SENSORES ; i++)
  {
    tabela+="<td>"+message[i]+"</td>";
  }

  tabela +="</tr></table> <table style=\"width:100%\"><tr>";
  for(var i = 0 ; i < NUMERO_CHAVES ; i++)
  {
    tabela+="<th>CHAVE "+i+"</th>";
  }
  tabela+="</tr><tr>";
  for(var i = 0 ; i < NUMERO_CHAVES ; i++)
  {
    tabela+="<td>"+message[i+NUMERO_SENSORES]+"</td>";
  }
  tabela+="</tr></table>";
  //console.log(tabela);
  document.getElementById("resposta").innerHTML = tabela;
  chart.update();
});

chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
        datasets: [
          {
            label: 'Sensor 0',
            backgroundColor: 'rgba(255,255, 255,000)',
            borderColor: 'rgb(255, 99, 132)',
            data: dados1
        }
      ]
    },

    // Configuration options go here
    options:
    {
      responsive: true,
      maintainAspectRatio: false,
      showTooltips: false,
      animation:
      {
        duration: 0
      }
    }
});

var myVar = setInterval(emiteMensagem, 100);

function emiteMensagem()
{
  socket.emit("timer", "");
}
