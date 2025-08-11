import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  // Use transform to process JS/TS files with Babel
  transform: {
    '^.+\.(ts|tsx|js|jsx)$': ['babel-jest', { presets: ['next/babel', '@babel/preset-typescript'] }],
  },
  // Ignore node_modules except for specific ESM packages that need transformation
  transformIgnorePatterns: [
    '/node_modules/(?!node-fetch|data-uri-to-buffer|fetch-blob|formdata-polyfill).+'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
};

export default createJestConfig(config);