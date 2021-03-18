class InsertIntoDatabase
{
  constructor(sensores,chaves,NUMERO_SENSORES,NUMERO_CHAVES)
  {
    this.sensores = sensores;
    this.chaves = chaves;
    this.NUMERO_SENSORES = NUMERO_SENSORES;
    this.NUMERO_CHAVES = NUMERO_CHAVES;
  }

  formatInsert()
  {
    let sql = "INSERT INTO sensor_data_new (";
    for(var i = 0 ; i < this.NUMERO_SENSORES ; i++)
    {
      sql+="SENSOR" + i + ",";
    }
    for(var i = 0 ; i < this.NUMERO_CHAVES ; i++)
    {
      if(i!=this.NUMERO_CHAVES-1)
        sql+="CHAVE" + i + ",";
      else
        sql+="CHAVE" + i + ") VALUES (";
    }

    for(var i = 0 ; i < this.NUMERO_SENSORES ; i++)
    {
      sql+=this.sensores[i] + ",";
    }
    for(var i = 0 ; i < this.NUMERO_CHAVES ; i++)
    {
      if(i!=this.NUMERO_CHAVES-1)
        sql+=this.chaves[i] + ",";
      else
        sql+=this.chaves[i] + ")";
    }
    return sql;
  }
}

module.exports = InsertIntoDatabase;
