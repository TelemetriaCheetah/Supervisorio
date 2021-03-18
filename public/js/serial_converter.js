class ConversorSerial
{
  setData(data,ns,nc)
  {
    this.data = data;
    this.ns = ns;
    this.nc = nc;
  }
  logData()
  {
    console.log(this.data);
  }
  getSensorArray()
  {
    let sensores = [];
    if((this.data.length-1) === (this.nc + this.ns*5))
    {
      for(var i = 0 ; i < this.ns ; i++)
      {
        sensores[i] = this.data.substring(i*5,i*5+5);
      }
    }
    return sensores;
  }
  getBoolArray()
  {
    let chaves = [];
    if((this.data.length-1) === (this.nc + this.ns*5))
    {
      for(var i = 0 ; i < this.nc ; i++)
      {
        chaves[i] = this.data[i + this.ns*5];
      }
    }
    return chaves;
  }
}

module.exports = ConversorSerial;
