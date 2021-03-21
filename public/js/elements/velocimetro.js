class Velocimetro
{
  constructor()
  {
    var opts =
    {
      angle: -0.5,
      lineWidth: 0.08,
      radiusScale: 1,
      pointer:
      {
        length: 0.68,
        strokeWidth: 0.02,
        color: '#FFFFFF'
      },
      limitMax: false,
      limitMin: false,
      colorStart: '#9C2424',
      colorStop: '#C40000',
      strokeColor: '#222729',
      generateGradient: true,
      highDpiSupport: true,
      staticLabels:
      {
        font: "30px digital",
        labels: [0,10,20,30,40,50,60,70,80,90,100,110,120,130,140],
        color: "#FFFFFF",
        fractionDigits: 0
      },
      renderTicks:
      {
        divisions: 10,
        divWidth: 0.6,
        divLength: 0.7,
        divColor: '#FFFFFF',
        subDivisions: 2,
        subLength: 0.39,
        subWidth: 0.2,
        subColor: '#FFFFFF'
      }
    };

    var target = document.getElementById('velocimetro');
    this.gauge = new Gauge(target).setOptions(opts);
    this.gauge.maxValue = 100;
    this.gauge.setMinValue(0);
    this.gauge.animationSpeed = 128;
    this.gauge.set(150);
    this.gauge.setTextField(document.getElementById('velocimetroValor'));
  }
  atualizaVelocimetro(velvelocimetro)
  {
    this.gauge.set(velvelocimetro);
  }
}
