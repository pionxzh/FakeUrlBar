import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import { string } from "rollup-plugin-string";
import { eslint } from 'rollup-plugin-eslint';
import uglify from 'rollup-plugin-uglify-es';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/fakeurlbar.js',
    format: 'iife',
    name: 'FakeUrlBar',
  },
  plugins: [
    eslint({
      throwOnError: true,
      throwOnWarning: true,
      include: ['src/**'],
      exclude: ['node_modules/**'],
    }),
    string({
      include: ["**/*.html", "**/*.css"],
      exclude: [],
    }),
    resolve(),
    commonjs({
      include: 'node_modules/**'
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    uglify(),
  ],
};
