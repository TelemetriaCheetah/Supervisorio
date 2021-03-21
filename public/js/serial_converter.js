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
        sensores[i] = parseInt(this.data.substring(i*5,i*5+5),10);
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
        chaves[i] = parseInt(this.data[i + this.ns*5],10);
      }
    }
    return chaves;
  }
}

module.exports = ConversorSerial;
