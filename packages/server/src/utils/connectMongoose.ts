import { connect } from 'mongoose';

const connectMongo = async (dbName: string) =>
  connect(`mongodb://localhost:27017/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

export default connectMongo;
