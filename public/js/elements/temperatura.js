class Temperatura
{
  constructor(id)
  {
    var opts =
    {
      angle: -0.25, // The span of the gauge arc
      lineWidth: 0.1, // The line thickness
      radiusScale: 0.9, // Relative radius
      pointer: {
        length: 0.6, // // Relative to gauge radius
        strokeWidth: 0.035, // The thickness
        color: '#FFFFFF' // Fill color
      },
      limitMax: false,     // If false, max value increases automatically if value > maxValue
      limitMin: false,     // If true, the min value of the gauge will be fixed
      staticZones:
      [
         {strokeStyle: "#F03E3E", min: 0, max: 40}, // Red from 100 to 130
         {strokeStyle: "#FFDD00", min: 40, max: 150}, // Yellow
         {strokeStyle: "#30B32D", min: 150, max: 220}, // Green
         {strokeStyle: "#FFDD00", min: 220, max: 260}, // Yellow
         {strokeStyle: "#F03E3E", min: 260, max: 300}  // Red
      ],
      strokeColor: '#EEEEEE',  // to see which ones work best for you
      generateGradient: true,
      highDpiSupport: true,     // High resolution support
    };

    var target = document.getElementById('indicador' + id);
    target.style.position = 'relative';
    target.style.top = '12px';
    target.style.left = '6px';
    this.gauge = new Gauge(target).setOptions(opts);
    this.gauge.maxValue = 300;
    this.gauge.setMinValue(0);
    this.gauge.animationSpeed = 128;
    this.gauge.set(70);
    //this.gauge.setTextField(document.getElementById('velocimetroValor'));
  }
  atualizaVelocimetro(velvelocimetro)
  {
    this.gauge.set(velvelocimetro);
  }
}
