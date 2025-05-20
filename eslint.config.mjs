import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Import the base configs
const baseConfigs = compat.extends("next/core-web-vitals", "next/typescript");

// Create our modified config
const eslintConfig = [
  ...baseConfigs,
  {
    rules: {
      // Disable the unescaped entities rule that's causing issues with apostrophes
      "react/no-unescaped-entities": "off",

      // Set unused vars to warn instead of error, and ignore variables that start with _
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
];

export default eslintConfig;
