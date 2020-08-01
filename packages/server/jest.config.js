module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/src/test-utils/setup.ts'],
  globalSetup: '<rootDir>/src/test-utils/globalTestSetup.js',
};
