import { QueryManager } from './core/QueryManager';
import { ColumnType, FetchType, JoinType } from './interfaces/JoinMappers';
import { Model } from './models/Model';


export class Repository<T extends Model> extends QueryManager<T> {

  get tablename(): string {
    return this.model.tablename;
  }

  get queryTablename(): string {
    return "`%s`".replace('%s', this.tablename);
  }

  constructor(model) {
    super(model);
  }

  async findById(value: number): Promise<T> {
    try {
      this.selectQuery
        .safeAnd()
        .equals(QueryManager.ColumnID, `${value}`);

      const results = await this.query<T>(this.selectQuery);

      const [model] = this.dataMapper(results);
      
      return Promise.resolve(model);
    }
    catch (error) {
      return Promise.reject(error);
    }
    finally {
      this.resetQuery();
    }
  }

  async findAll(): Promise<T[]> {
    try {
      const results = await this.query<T>(this.selectQuery);
      return Promise.resolve(this.dataMapper(results));
    }
    catch (error) {
      return Promise.reject(error);
    }
  }

  async save(model: T): Promise<T> {
    try {
      let result = {} as StatementResult;

      // is update
      if (model.id) {
        const query = this.update();

        for (const field of this.fieldsCollection) {
          if (field === QueryManager.ColumnID) {
            continue;
          }

          query.set(field, `${model[field]}`);
        }

        query.equals(QueryManager.ColumnID, `${model.id}`);

        result = await this.database.prepare(query) as StatementResult;
        if (!result.affectedRows || !result.changedRows) {
          throw new Error(`Something went wrong when try to update register with id: ${model.id}.`);
        }

        return Promise.resolve(await this.findById(model.id));
      }

      // is save
      const insert = this.insert();

      const collection = [];
      const values = [];

      let value;
      for (const field of this.fieldsCollection) {
        value = model[field];
        if (!value) {
          continue;
        }

        collection.push(field);
        values.push(value);
      }
      
      insert.fields(collection);
      insert.values(values);

      result = await this.database.prepare(insert) as StatementResult;
      if (!result.affectedRows) {
        throw new Error(`Something went wrong when try to insert the data.`);
      }

      return Promise.resolve(await this.findById(result.insertId));
    }
    catch (error) {
      return Promise.reject(error);
    }
  }

  async deleteById(value: number): Promise<void> {
    try {
      const query = this.delete()
        .equals(QueryManager.ColumnID, `${value}`);

      const result = await this.database.prepare(query);
      if (!result.affectedRows) {
        throw new Error(`Something went wrong when try to delete the register with id ${value}.`);
      }

      return Promise.resolve();
    }
    catch (error) {
      return Promise.reject(error);
    }
  }
  
}

interface StatementResult {
  fieldCount: number;
  affectedRows: number;
  insertId: number;
  serverStatus: number;
  warningCount: number;
  message: string;
  protocol41: boolean;
  changedRows: number;
}
// {
//   "fieldCount": 0,
//   "affectedRows": 1,
//   "insertId": 4,
//   "serverStatus": 2,
//   "warningCount": 0,
//   "message": "",
//   "protocol41": true,
//   "changedRows": 0
// }

// {
//   "fieldCount": 0,
//   "affectedRows": 1,
//   "insertId": 0,
//   "serverStatus": 2,
//   "warningCount": 0,
//   "message": "(Rows matched: 1  Changed: 1  Warnings: 0",
//   "protocol41": true,
//   "changedRows": 1
// }

export interface JoinOptions {
  property: string;
  target;
  fieldName?: string;
  type?: ColumnType;
  fetchType?: FetchType;
  updatable?: boolean;
  joinType?: JoinType;
  joinTablename?: string;
  joinColumn?: string;
  inverseJoin?: string;
  mappedBy?: string;
  orphanRemoval?: boolean;
}

export interface WhereOptions {
  tablename: string;
  fieldFK: string;
  foreignTablename: string;
  foreignFieldPK: string;
}