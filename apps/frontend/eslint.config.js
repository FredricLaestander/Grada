//  @ts-check
import pluginJsxA11y from 'eslint-plugin-jsx-a11y'
import globals from 'globals'

import { tanstackConfig } from '@tanstack/eslint-config'

export default [
  ...tanstackConfig,
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: { globals: globals.browser },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  pluginJsxA11y.flatConfigs.recommended,
  {
    // turn off legacy rule that requires React to be imported in every file
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  },
  {
    ignores: ['dist'],
  },
]
