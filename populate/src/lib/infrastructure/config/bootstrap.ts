import { MongoClient } from 'mongodb';
import environment from './environment';

const init = async () => {
  const client = new MongoClient(environment.database.url);
  await client.connect();
  return client.db();
};

export default init;
