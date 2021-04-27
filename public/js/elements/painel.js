class Indicador
{
  constructor(id)
  {
    var opts =
    {
      angle: -0.5, // The span of the gauge arc
      lineWidth: 0.13, // The line thickness
      radiusScale: 1, // Relative radius
      pointer: {
        length: 0.0, // // Relative to gauge radius
        strokeWidth: 0.0, // The thickness
        color: '#FF3838' // Fill color
      },
      limitMax: false,     // If false, max value increases automatically if value > maxValue
      limitMin: false,     // If true, the min value of the gauge will be fixed
      colorStart: '#FC2960',   // Colors
      colorStop: '#FF542C',    // just experiment with them
      strokeColor: '#E0E0E0',  // to see which ones work best for you
      generateGradient: true,
      highDpiSupport: true,     // High resolution support
    };

    var target = document.getElementById('indicador' + id);
    target.style.position = 'relative';
    target.style.top = '12px';
    target.style.left = '6px';
    this.gauge = new Gauge(target).setOptions(opts);
    this.gauge.maxValue = 130;
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
