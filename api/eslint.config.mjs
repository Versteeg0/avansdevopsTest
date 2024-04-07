import globals from 'globals'
import path from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import pluginJs from '@eslint/js'

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({ baseDirectory: __dirname, recommendedConfig: pluginJs.configs.recommended })

export default [
  {
    files: ['__tests__/**/*.js'],
    languageOptions: {
      globals: {
        it: 'readonly',
        describe: 'readonly',
        beforeEach: 'readonly',
        afterAll: 'readonly',
        expect: 'readonly'
      }
    }
  },
  { languageOptions: { globals: globals.browser } },
  ...compat.extends('standard'),
  ...compat.extends('eslint:recommended'),
  {
    files: ['**/*.spec.js', '**/*.spec.jsx'],
    env: {
      'jest/globals': true
    },
    languageOptions: { env: { jest: true, node: true } },
    globals: { beforeEach: 'readonly', afterAll: 'readonly', describe: 'readonly', it: 'readonly', expect: 'readonly' }
  }
]
