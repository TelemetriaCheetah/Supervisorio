class DatabaseHandler
{
  constructor()
  {
    const fs = require('fs');
    this.mysql = require("sync-mysql");
    this.config = JSON.parse(fs.readFileSync('./config.json')); //Arquivo de configuração geral
    this.password = JSON.parse(fs.readFileSync('./password.json')); //Informações do banco de dados NÃO UPAR PARA O GITHUB

    this.nSensors = this.config.qtdMedicao + this.config.qtdDiscretos;
    this.nAnalog = this.config.qtdMedicao;
    this.nDigital = this.config.qtdDiscretos;
    this.db = new this.mysql(this.password);
    this._initializeDatabase();
  }

  _initializeDatabase() //Cria tabela e colunas se não existirem
  {
    let sql = "SHOW TABLES";
    let tables = this.db.query(sql);
    if(tables.length<2)
    {
      let sql2 = "CREATE TABLE `telemetriaCheetah`.`sensores` (`id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP) ENGINE = InnoDB;" ;
      let sql3 = "CREATE TABLE `telemetriaCheetah`.`testeID` (`id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, `nome` VARCHAR(60) NOT NULL , `responsavel` VARCHAR(60) NOT NULL , `local` VARCHAR(60) NOT NULL , `duracao` INT NOT NULL) ENGINE = InnoDB;" ;
      let query2 = this.db.query(sql2);
      query2 = this.db.query(sql3);
      this._alterTable();
    }
    else
    {
      this._alterTable();
    }
  }

  _alterTable() //usado pela função de inicializar
  {
    let sql2 = "ALTER TABLE `sensores` ";
    for(var i = 0 ; i < this.nAnalog ; i++)
    {
      sql2 += "ADD COLUMN IF NOT EXISTS SA" +i+" INT";
      if(i!=this.nAnalog-1)
        sql2 += ",";
      else if(this.nDigital>0)
        sql2 += ",";
    }
    for(var i = 0 ; i < this.nDigital ; i++)
    {
      sql2 += "ADD COLUMN IF NOT EXISTS SD"+i+" INT" ;
      if(i!=this.nDigital-1)
        sql2 += ",";
    }
    sql2+=";";
    //console.log(sql2);
    let query2 = this.db.query(sql2);
  }

  getSensorArray(sensorType , sensorCode) //Retorna array de um sensor- D = discreto / A = medição
  {
    let sql = "SELECT S" + sensorType + sensorCode + " FROM sensores";
    let result = this.db.query(sql);
    let answer = [];
    for(let i = 0 ; i < result.length ; i++)
    {
      answer.push(Object.values(result[i]));
      answer[i] = parseInt(answer[i] , 10);
    }
    return answer;
  }

  insertIntoDatabase(analogSensor , digitalSensor)
  {
    let sql = "INSERT INTO sensores ( ";
    for(let i = 0 ; i < this.nAnalog ; i++)
    {
      sql+="SA" + i + ",";
    }
    for(let i = 0 ; i < this.nDigital ; i++)
    {
      if(i!=this.nDigital-1)
        sql+="SD" + i + ",";
      else
        sql+="SD" + i + " ) VALUES ( ";
    }
    for(let i = 0 ; i < this.nAnalog ; i++)
    {
      sql+= analogSensor[i] + ",";
    }
    for(let i = 0; i < this.nDigital ; i++)
    {
      if(i!=this.nDigital-1)
        sql+=digitalSensor[i] + ",";
      else
        sql+=digitalSensor[i] + ")";
    }
    //console.log(sql);
    let result = this.db.query(sql);
  }

  teste(analogSensor , digitalSensor)
  {
    console.log(analogSensor);
    console.log(digitalSensor);
  }
}

module.exports = DatabaseHandler;
