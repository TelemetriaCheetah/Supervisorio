class Velocimetro
{
  constructor()
  {
    var opts =
    {
      angle: -0.21, // The span of the gauge arc
      lineWidth: 0.00001, // The line thickness
      radiusScale: 0.9, // Relative radius
      pointer:
      {
        iconScale: 0.09,
        length: 0.39, // // Relative to gauge radius
        strokeWidth: 0.01, // The thickness
        color: "#ff3e42" // Fill color
      },
      limitMax: false,     // If false, max value increases automatically if value > maxValue
      limitMin: false,     // If true, the min value of the gauge will be fixed
      colorStart: '#CFCFCF',   // Colorsmyicon
      colorStop: '#DADADA',    // just experiment with them
      strokeColor: '#E0E0E0',  // to see which ones work best for you
      generateGradient: true,
      highDpiSupport: true,     // High resolution support

    };

    var target = document.getElementById('velocimetro');
    this.gauge = new Gauge(target).setOptions(opts);
    this.gauge.maxValue = 130;
    this.gauge.setMinValue(0);
    this.gauge.animationSpeed = 128;
    this.gauge.set(70);
    this.gauge.setTextField(document.getElementById('velocimetroValor'));
  }
  atualizaVelocimetro(velvelocimetro)
  {
    this.gauge.set(velvelocimetro);
  }
}
