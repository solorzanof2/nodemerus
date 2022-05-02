import * as mysql from 'mysql';
import { QueryBuilder } from './interfaces/QueryBuilder';


export class DatabaseFactory {
  static instance;

  private connection;

  private loggingSQL = true;
  
  constructor() {
    this.connection = mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });
    this.connection.connect();
  }

  static getInstance(): DatabaseFactory {
    if (DatabaseFactory.instance) {
      return DatabaseFactory.instance;
    }

    DatabaseFactory.instance = new DatabaseFactory();
    return DatabaseFactory.instance;
  }

  async prepare(builder: QueryBuilder): Promise<any[] | any> {
    try {
      const sql = builder.build();
      
      if (this.loggingSQL) {
        console.log(sql.query);
      }
      
      if (sql.parameters.length) {
        return this.execute(sql.query, sql.parameters);
      }

      return this.plainExecute(sql.query);
    }
    catch (error) {
      return Promise.reject(error);
    }
  }

  async plainExecute(query: string, isExternal: boolean = false): Promise<any[] | any> {
    return new Promise((resolve, reject) => {
      if (isExternal && this.loggingSQL) {
        console.log(query);
      }
      
      this.connection.query(query, (error, results, fields) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(results);
      });
    });
  }

  async execute(query: string, values, isExternal: boolean = false): Promise<any[] | any> {
    return new Promise((resolve, reject) => {
      if (isExternal && this.loggingSQL) {
        console.log(query);
      }
      
      this.connection.query(query, values, (error, results, fields) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(results);
      });
    });
  }
  
}