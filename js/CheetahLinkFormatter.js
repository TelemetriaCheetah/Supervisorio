class CheetahLinkFormatter
{
  setData(data, nAnalog, nDigital)
  {
    this.data = data;
    this.nDigital = nDigital;
    this.nAnalog = nAnalog;
    this.continuo = [];
    this.discreto = [];
  }

  getAnalogArray()
  {
    let answer = [];
    for(var i = 1 ; i < (this.nAnalog*2) ; i += 2 )
    {
      var a = this.data[i].toString(16).padStart(2,"0");
      var b = this.data[i+1].toString(16).padStart(2,"0");
      answer.push(parseInt(a+b , 16 ));
    }
    return answer;
  }

  getDigitalArray()
  {
    // console.log(this.data);
    let answer = [];
    let a = "";
    for(var i = (this.nAnalog*2)+1 ; i < this.nAnalog*2 + Math.ceil(this.nDigital/8) +1; i++ )
    {
      a += this.data[i].toString(2).padStart(8,"0");
    }
    answer = a.split("").map(function (b)
      {
        return parseInt(b , 10);
      }
    );
    return answer;
  }
}

module.exports = CheetahLinkFormatter;
