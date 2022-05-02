import { Repository } from 'src/resources/libs/persistence/Repository';
import { PostModel } from '../PostModel';
import { UserModel } from '../UserModel';


export class UserRepository extends Repository<UserModel> {

  constructor() {
    super(UserModel);

    this.inverseJoin({
      property: 'postsCollection',
      mappedBy: 'user_id',
      target: PostModel,
    });
  }

  async findByUsername(value: string): Promise<UserModel> {
    try {
      this.selectQuery
        .equals('username', value);

      const [model] = await this.execute(this.selectQuery);

      return Promise.resolve(model);
    } catch (error) {
      return Promise.reject(error);
    }
    finally {
      this.resetQuery();
    }
  }

  async findByEmail(value: string): Promise<UserModel> {
    try {
      const builder = new Array<string>();
      builder.push('SELECT * FROM users');
      builder.push(`WHERE email = ?`);

      const [model] = await this.queryBySql(builder.join(' '), [value]);

      return Promise.resolve(model);
    }
    catch (error) {
      return Promise.reject(error);
    }
    finally {
      this.resetQuery();
    }
  }
  
}