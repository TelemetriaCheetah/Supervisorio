class CsvParser
{
  constructor()
  {
    this.fs = require('fs');
    this.parse = require('csv-parse/lib/sync')
    this.config = JSON.parse(this.fs.readFileSync('./config.json')); //Arquivo de configuração geral
  }
  parseCSV()
  {
    const input = this.fs.readFileSync(this.config.csvFile);
    this.output = this.parse(input , {columns: true , skip_empty_lines : true , fromLine: 14});
    return this.output;
  }
}
module.exports = CsvParser