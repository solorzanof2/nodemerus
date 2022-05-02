import { Model } from '../libs/persistence/models/Model';
import { TermModel } from './TermsModel';
import { UserModel } from './UserModel';


export class PostModel extends Model {
  name: string;
  // description: string;
  status: string;
  created: string;
  user_id: number;
  author: UserModel;
  terms: TermModel[];

  constructor() {
    super('posts');
    this.id = 0;
    this.name = '';
    // this.description = '';
    this.status = '';
    this.created = new Date().toISOString();
    this.user_id = 0;
    this.author = new UserModel();
    this.terms = new Array<TermModel>();
  }
}