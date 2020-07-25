import { connect } from "mongoose";

const connectMongo = async () =>
  await connect("mongodb://localhost:27017/boilerplate", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

export default connectMongo;
