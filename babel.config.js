module.exports = function babelConfig(api) {
  api.cache.forever();
  return {
    babelrcRoots: [
      // Keep the root as a root
      '.',
      // Also consider monorepo packages "root" and load their .babelrc files.
      './packages/component/*'
    ],
    presets: [
      [
        '@babel/env',
        {
          modules: false,
          useBuiltIns: 'usage',
          corejs: '3',
          targets: {
            browsers: ['> 1%']
          }
        }
      ],
      '@babel/typescript'
    ],
    plugins: [
      '@babel/syntax-dynamic-import',
      '@babel/plugin-proposal-object-rest-spread'
    ],
    env: {
      test: {
        presets: [
          [
            '@babel/env',
            {
              useBuiltIns: 'usage',
              corejs: '3', 
              targets: {
                browsers: ['> 1%']
              }
            }
          ],
          '@babel/typescript'
        ]
      }
    }
  };
};
