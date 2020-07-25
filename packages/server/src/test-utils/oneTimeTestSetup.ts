import { connectTestDb, closeDbConnection } from "./mongoTestSetupUtils";

beforeAll(async () => {
  await connectTestDb();
});

afterAll(async () => {
  await closeDbConnection();
});
