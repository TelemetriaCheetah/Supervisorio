const dataInicio = document.getElementById("dateBegin");
const dataFinal = document.getElementById("dateEnd");
const horaFinal = document.getElementById("timeEnd");
const horaInicio = document.getElementById("timeBegin");
const botao = document.getElementById("btn").addEventListener("click", atualizar);
const socket = io();
const NUMERO_SENSORES = 10;
const NUMERO_CHAVES = 10;

function atualizar()
{
  console.log(dataInicio.value);
  console.log(dataFinal.value);
  var sql = "SELECT * FROM sensor_data_new WHERE timestamp>=\'" + dataInicio.value + "-" +horaInicio.value + "\' AND timestamp<\'" + dataFinal.value + "-" + horaFinal.value + "\'";
  socket.emit("query", sql);
}

socket.on("queryResponse", (message) =>
{
  var tabela = "<table style=\"width:100%\"><tr>";
  if(message.length>0)
  {
    var tabela = "<table style=\"width:100%\"><tr>";
    for(var i = 0 ; i < NUMERO_SENSORES ; i++)
    {
      tabela+="<th>SENSOR "+i+"</th>";
    }
    tabela+="</tr>";
    console.log(message[0].timestamp);
    for(var j = 0 ; j < message.length; j++)
    {
      tabela+="<tr>";
      tabela+="<td>" + message[j].SENSOR0 + "</td>";
      tabela+="<td>" + message[j].SENSOR1 + "</td>";
      tabela+="<td>" + message[j].SENSOR2 + "</td>";
      tabela+="<td>" + message[j].SENSOR3 + "</td>";
      tabela+="<td>" + message[j].SENSOR4 + "</td>";
      tabela+="<td>" + message[j].SENSOR5 + "</td>";
      tabela+="<td>" + message[j].SENSOR6 + "</td>";
      tabela+="<td>" + message[j].SENSOR7 + "</td>";
      tabela+="<td>" + message[j].SENSOR8 + "</td>";
      tabela+="<td>" + message[j].SENSOR9 + "</td>";
      tabela+="</tr>";
    }
    tabela+="</table>";

    tabela+= "<table style=\"width:100%\"><tr>";
    for(var i = 0 ; i < NUMERO_SENSORES ; i++)
    {
      tabela+="<th>CHAVE "+i+"</th>";
    }
    tabela+="</tr>";
    for(var j = 0 ; j < message.length; j++)
    {
      tabela+="<tr>";
      tabela+="<td>" + message[j].CHAVE0 + "</td>";
      tabela+="<td>" + message[j].CHAVE1 + "</td>";
      tabela+="<td>" + message[j].CHAVE2 + "</td>";
      tabela+="<td>" + message[j].CHAVE3 + "</td>";
      tabela+="<td>" + message[j].CHAVE4 + "</td>";
      tabela+="<td>" + message[j].CHAVE5 + "</td>";
      tabela+="<td>" + message[j].CHAVE6 + "</td>";
      tabela+="<td>" + message[j].CHAVE7 + "</td>";
      tabela+="<td>" + message[j].CHAVE8 + "</td>";
      tabela+="<td>" + message[j].CHAVE9 + "</td>";
      tabela+="</tr>";
    }
    tabela+="</table>";
  }
  else
    tabela+="</tr></table>";
  //console.log(tabela);
  document.getElementById("resposta").innerHTML = tabela;
});
