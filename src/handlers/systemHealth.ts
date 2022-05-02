import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { Dates } from 'src/resources/libs/Dates';
import { ResponseEntity } from 'src/resources/libs/http/ResponseEntity';
import { Middlify } from 'src/resources/libs/middlify/Middlify';
import { PostRepository } from 'src/resources/persistence/repository/PostRepository';
import { UserRepository } from 'src/resources/persistence/repository/UserRepository';
import { UserModel } from 'src/resources/persistence/UserModel';


const systemHealthHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    
    const caption = 'BlockChain is ready for the party.';
    const response = { caption, };

    const repository = new UserRepository();
    // const user = await repository.findById(2);
    // response['user'] = user;

    const collection = await repository.findAll();
    response['collection'] = collection;

    // const user = await repository.findByUsername('felixidev');
    // response['user'] = user;

    // const user = await repository.findByEmail('janedoe@gmail.com');
    // response['user'] = user;

    // const userModel = new UserModel();
    // userModel.id = 6;
    // userModel.username = 'kiri',
    // userModel.email = 'kiri@gmail.com',
    // userModel.password = 'the-awesome-password-again-dude';
    // userModel.state = 'PENDING',
    // userModel.created = Dates.toDatabaseDatetime();
    // userModel.updated = Dates.toDatabaseDatetime();
    // userModel.pin = '1234';
    // userModel.isManual = 'Y';

    // const user = await repository.save(userModel);
    // response['user'] = user;

    // return ResponseEntity.ok({ caption, result });

    // const result = await repository.deleteById(5);
    // return ResponseEntity.ok({ caption, result });

    // TODO JOIN TESTS

    // const repository = new PostRepository();
    // const post = await repository.findById(1);
    // response['post'] = post;

    // const collection = await repository.findAll();
    // response['collection'] = collection;
    
    return ResponseEntity.ok(response);
  }
  catch (error) {
    return ResponseEntity.error(error);
  }
}

export const handler = Middlify(systemHealthHandler, []);