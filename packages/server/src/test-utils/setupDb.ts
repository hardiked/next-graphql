import { dropTestDb, connectTestDb } from './mongoTestSetupUtils';

// connect and drop database before running any test
// we will not clear database between tests
// there we will only create connection and close it
connectTestDb().then(() => dropTestDb().then(() => process.exit()));
