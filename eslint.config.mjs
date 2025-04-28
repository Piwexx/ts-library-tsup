import tseslint from "typescript-eslint";
import globals from "globals";
import prettier from "eslint-plugin-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import { defineConfig } from "eslint/config";

export default defineConfig(
  {
    files: ["src/**/*.{ts}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
      },
      globals: globals.browser,
    },
    plugins: {
      prettier,  // Aquí usamos la importación correcta
      "simple-import-sort": simpleImportSort,  // Y aquí también
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json"
        }
      }
    },
    rules: {
      ...tseslint.configs.recommended,
      "prettier/prettier": "error",
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^@?\\w"],  // Librerías externas (sin React ni JSX)
            ["^@/"],
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            ["^.+\\.s?css$"],
            ["^"]
          ],
        },
      ],
      "simple-import-sort/exports": "error",
    },
  },
);