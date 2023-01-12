module.exports = {
  prettier: true,
  space: true,
  extends: ['xo-lass'],
  overrides: [
    {
      files: '*.mjs',
      parserOptions: {
        sourceType: 'module'
      },
      rules: {
        'import/no-anonymous-default-export': 'off'
      }
    }
  ]
};
