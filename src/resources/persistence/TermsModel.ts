import { Model } from '../libs/persistence/models/Model';


export class TermModel extends Model {

  name: string;
  slug: string;
  taxonomy: string;

  constructor() {
    super('terms');
    this.id = 0;
    this.name = '';
    this.slug = '';
    this.taxonomy = '';
  }
  
}