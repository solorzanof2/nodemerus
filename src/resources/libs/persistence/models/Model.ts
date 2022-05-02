

export class Model {
  tablename: string;
  relations: string[];
  
  id: number;
  isPresent: boolean;

  constructor(tablename: string) {
    this.tablename = tablename;
    this.relations = new Array<string>();
    this.isPresent = false;
  }
  
}