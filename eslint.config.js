import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReactRefresh from 'eslint-plugin-react-refresh';
import pluginPrettier from 'eslint-plugin-prettier';

export default [
  js.configs.recommended,
  prettier,
  {
    plugins: {
      'react-hooks': pluginReactHooks,
      'react-refresh': pluginReactRefresh,
      prettier: pluginPrettier,
    },
    rules: {
      'prettier/prettier': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
];
