const path = require('path');

module.exports = (config) => {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.resolve.alias,
      '@axios': path.resolve('./client/axios'),
      '@components': path.resolve('./client/components'),
      '@redux': path.resolve('./client/Redux'),
      '@img': path.resolve('./client/img'),
    },
  };

  return config;
};

// Jest config
module.exports.jest = function (config) {
  config.collectCoverageFrom = ['client/**/*.{js,jsx,ts,tsx}', '!client/**/*.d.ts'];
  config.testMatch = [
    '<rootDir>/client/**/__tests__/**/*test.{js,jsx,ts,tsx}',
    '<rootDir>/server/**/__tests__/**/*test.{js,jsx,ts,tsx}',
    '<rootDir>/client/**/*.{spec,test}.{js,jsx,ts,tsx}',
    '<rootDir>/server/**/*.{spec,test}.{js,jsx,ts,tsx}',
  ];
  config.roots = ['<rootDir>/client', '<rootDir>/server'];
  return config;
};

// paths config
module.exports.paths = function (paths, env) {
  paths.appIndexJs = path.resolve(__dirname, 'client/index.js');
  paths.appSrc = path.resolve(__dirname, 'client');
  path.resolve(__dirname, 'client/components');
  return paths;
};
