import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { ResponseEntity } from 'src/resources/libs/http/ResponseEntity';
import { Middlify } from 'src/resources/libs/middlify/Middlify';
import { MigrationManager } from 'src/resources/libs/persistence/MigrationManager';


const migrationHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const migrationManager = MigrationManager.getInstance('src/migrations');
    await migrationManager.initialize();

    return ResponseEntity.noContent();
  }
  catch (error) {
    return ResponseEntity.error(error);
  }
}

export const handler = Middlify(migrationHandler, []);