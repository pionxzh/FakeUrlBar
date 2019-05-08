import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs'
import { eslint } from 'rollup-plugin-eslint';
import { uglify } from 'rollup-plugin-uglify';
import uglify from 'rollup-plugin-uglify-es';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/fakeurlbar.min.js',
    format: 'iife',
    name: 'FakeUrlBar',
  },
  plugins: [
    eslint({
      throwOnError: true,
      throwOnWarning: true,
      include: ['src/**'],
      exclude: ['node_modules/**']
    }),
    string({
      include: ["**/*.html", "**/*.css"],
      exclude: [],
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**'
    }),
    uglify(),
  ],
};
