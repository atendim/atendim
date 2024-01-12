/** @jest-environment jest-environment-node */
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './'
});

/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/coverage',
    '<rootDir>/dist'
  ],
  transformIgnorePatterns: ['node_modules/(?!(superjson)/)']
};

/** @type {() => Promise<import('jest').Config>} */
const exportConfig = async () => ({
  ...(await createJestConfig(config)()),
  transformIgnorePatterns: ['node_modules/(?!(superjson)/)'],
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.ts']
});

export default exportConfig;
