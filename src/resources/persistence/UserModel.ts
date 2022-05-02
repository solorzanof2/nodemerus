import { Model } from '../libs/persistence/models/Model';
import { PostModel } from './PostModel';


export class UserModel extends Model {

  id: number;
  username: string;
  password: string;
  email: string;
  state: string;
  created: string;
  updated: string;
  pin: string;
  isManual: string;
  postsCollection: PostModel[];

  constructor() {
    super('users');
    this.id = 0;
    this.username = '';
    this.password = '';
    this.email = '';
    this.state = '';
    this.created = '';
    this.updated = '';
    this.pin = '';
    this.isManual = '';
    this.postsCollection = new Array<PostModel>();
  }

}