import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleDirectories: ['node_modules', 'src'],
  testRegex: '.*\\.test\\.ts$',
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: 'reports',
        outputName: 'jest-junit.xml',
        suiteNameTemplate: '{filename}',
        ancestorSeparator: ' › ',
        uniqueOutputName: 'false',
      },
    ],
  ],
  setupFilesAfterEnv: ['./setupTests.ts'],
  collectCoverageFrom: ['src/**/*.ts'],
  coveragePathIgnorePatterns: ['src/index.ts'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  verbose: true,
};

export default config;
