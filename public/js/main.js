const socket = io();
const NUMERO_SENSORES = 10;
const NUMERO_CHAVES = 10;

var ctx = document.getElementById('myChart').getContext('2d');
const dados1 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];

var opts = {
  angle: 0.12, // The span of the gauge arc
  lineWidth: 0.36, // The line thickness
  radiusScale: 1, // Relative radius
  pointer: {
    length: 0.56, // // Relative to gauge radius
    strokeWidth: 0, // The thickness
    color: '#FFFFFF' // Fill color
  },
  limitMax: false,     // If false, max value increases automatically if value > maxValue
  limitMin: false,     // If true, the min value of the gauge will be fixed
  colorStart: '#9C1506',   // Colors
  colorStop: '#2B3A42',    // just experiment with them
  strokeColor: '#5A94E0',  // to see which ones work best for you
  generateGradient: true,
  highDpiSupport: true,     // High resolution support
  staticLabels: {
  font: "10px sans-serif",  // Specifies font
  labels: [0,10000,15000,20000,25000,30000,35000],  // Print labels at these values
  color: "#000000",  // Optional: Label text color
  fractionDigits: 0  // Optional: Numerical precision. 0=round off.
  },
};

var target = document.getElementById('velocimetro'); // your canvas element
var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
gauge.maxValue = 35000; // set max gauge value
gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
gauge.animationSpeed = 60; // set animation speed (32 is default value)
gauge.set(150); // set actual value
gauge.setTextField(document.getElementById('velocimetroValor'));

socket.on("realtime", (message) =>
{
  const c = new ConversorSerial();
  c.setData(message,NUMERO_SENSORES,NUMERO_CHAVES);
  var sensores = c.getSensorArray();
  sensor1 = sensores[0];

  console.log(sensor1);
  gauge.set(sensor1);
  //chart.update();

});

/*chart = new Chart(ctx, {
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
*/

var myVar = setInterval(emiteMensagem, 300);

function emiteMensagem()
{
  socket.emit("timer", "");
}
