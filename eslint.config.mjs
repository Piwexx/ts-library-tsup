import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import globals from "globals";

export default defineConfig([
  {
    files: ["**/*.{ts}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
      },
      globals: globals.browser,
    },
    plugins: {
      prettier: require("eslint-plugin-prettier"),
      "simple-import-sort": require("eslint-plugin-simple-import-sort"),
    },
    rules: {
      ...tseslint.configs.recommended.rules,
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
]);