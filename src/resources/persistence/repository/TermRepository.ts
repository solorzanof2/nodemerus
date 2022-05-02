import { Repository } from 'src/resources/libs/persistence/Repository';
import { TermModel } from '../TermsModel';


export class TermRepository extends Repository<TermModel> {

  constructor() {
    super(TermModel);
  }
  
}