const {
  dropTestDb,
  connectTestDb,
  closeDbConnection,
} = require('./mongoTestSetupUtils');

// connect and drop database before running any test
// we will not clear database between tests
// there we will only create connection and close it

module.exports = async function () {
  // Call initialization methods here.
  await connectTestDb();
  await dropTestDb();
  await closeDbConnection();
  return null;
};
