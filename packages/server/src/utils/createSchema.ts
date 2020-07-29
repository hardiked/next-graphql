import { buildSchema } from 'type-graphql';
import * as path from 'path';

const createSchema = async () =>
  buildSchema({
    resolvers: [path.join(__dirname, `/../modules/*/*.ts`)],
  });

export default createSchema;
