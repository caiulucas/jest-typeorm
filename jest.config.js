/* eslint-disable max-len */
module.exports = {
  clearMocks: true,  
  maxWorkers: 1,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '!**/__tests__/coverage/**',
    '!**/__tests__/utils/**',
    '!**/__tests__/images/**',
  //   "**/?(*.)+(spec|test).[tj]s?(x)"
  ],
};