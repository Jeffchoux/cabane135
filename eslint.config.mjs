import { FlatCompat } from "@eslint/eslintrc";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "public/**",
      ".vercel/**",
      "prisma/**",
      "*.config.{js,mjs,cjs,ts}",
    ],
  },
  {
    rules: {
      "react/no-unescaped-entities": "off",
    },
  },
];

export default eslintConfig;
