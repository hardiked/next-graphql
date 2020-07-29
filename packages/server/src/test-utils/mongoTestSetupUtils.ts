import mongoose from 'mongoose';
import connectMongo from '../utils/connectMongoose';

export const connectTestDb = async () => connectMongo('test');

export const dropTestDb = async () =>
  mongoose.connection.db.dropDatabase().catch(error => console.error(error));

export const closeDbConnection = async () =>
  mongoose.connection.close().catch(error => console.error(error));
