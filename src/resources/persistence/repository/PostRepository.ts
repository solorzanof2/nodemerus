import { Repository } from 'src/resources/libs/persistence/Repository';
import { PostModel } from '../PostModel';
import { TermModel } from '../TermsModel';
import { UserModel } from '../UserModel';


export class PostRepository extends Repository<PostModel> {

  constructor() {
    super(PostModel);

    this.joinColumn({
      property: 'author',
      fieldName: 'user_id',
      target: UserModel,
      updatable: true,
      joinType: 'LEFT',
      // fetchType: 'LAZY',
    });

    this.joinTable({
      property: 'terms',
      joinTablename: 'posts_terms',
      joinColumn: 'post_id',
      inverseJoin: 'term_id',
      target: TermModel,
    });
  }
  
}