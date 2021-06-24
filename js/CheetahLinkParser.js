const { Transform } = require('stream')

class CheetahLinkParser extends Transform
{
  constructor(options = {})
  {
    super(options)

    if (typeof options.length !== 'number') {
      throw new TypeError('"length" is not a number')
    }

    if (options.length < 1) {
      throw new TypeError('"length" is not greater than 0')
    }

    this.length = options.length
    this.position = 0
    this.buffer = Buffer.alloc(this.length)
    this.transmitindo = false;
  }

  _transform(chunk, encoding, cb)
  {
    let cursor = 0;

    while (cursor < chunk.length)
    {
      if(chunk[cursor] === 255 && this.transmitindo === false)
      {
        //console.log("Inicio da transmissao");
        this.transmitindo = true;
        this.buffer[this.position] = chunk[cursor];
        this.position++;
      }
      else if(this.transmitindo === true)
      {
        this.buffer[this.position] = chunk[cursor];
        this.position++;
      }
      else
      {
        console.log(this.buffer);
        console.log("fora de sincronia");
      }
      cursor++;
      if (this.buffer[0] == 255 && this.buffer[this.length-1] == 254)
      {
        console.log(this.buffer);
        //console.log("fim da transmissao");
        this.push(this.buffer);
        this.buffer = Buffer.alloc(this.length);
        this.position = 0;
        this.transmitindo = false;
      }
      else if(this.position === this.length)
      {
        console.log(this.buffer);
        console.log("mensagem corrompida");
        this.transmitindo = false;
        this.position = 0;
        this.buffer = Buffer.alloc(this.length);
      }
    }
    cb();
  }

  _flush(cb)
   {
    this.push(this.buffer.slice(0, this.position));
    this.buffer = Buffer.alloc(this.length);
    cb();
  }
}

module.exports = CheetahLinkParser
