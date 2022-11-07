module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'react/jsx-no-leaked-render': ['error', {validStrategies: ['ternary']}],
    eqeqeq: 'error',
    // Quite a few issues with this rule not recognising imported prop types, we use TS so it will error anyway if we try and use a prop type thats not defined
    'react/prop-types': [0],
    'no-shadow': 'off',
    'consistent-return': ['error'],
    'no-console': ['error'],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-shadow': ['error'],
    // TODO: Add back in at some point
    '@typescript-eslint/no-var-requires': 'off',
    // remove eslint dot-notion rule in favour of typescripts eslint rule
    'dot-notation': 'off',
    '@typescript-eslint/dot-notation': ['error'],
    // remove eslint dot-notion rule in favour of typescripts eslint rule
    'no-unused': 'off',
    '@typescript-eslint/dot-notation': ['error'],
    // error if prettier complains
    'prettier/prettier': 'error',

    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          '{}': false,
        },
      },
    ],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'], // Only lint typescript files
      parserOptions: {
        project: ['tsconfig.json'], // Specify it only for TypeScript files
      },
      rules: {
        // Don't delay - Make your React hooks reliable today!
        // having this rule here also makes ESLINT extensions in some editors to autofill hook dependencies.
        'react-hooks/exhaustive-deps': 'error',
        'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
