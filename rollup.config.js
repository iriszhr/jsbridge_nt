import resolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import commonjs from '@rollup/plugin-commonjs'
import sourcemaps from 'rollup-plugin-sourcemaps'
import camelCase from 'lodash.camelcase'

const pkg = require('./package.json')
const libraryName = 'NTBridge'

export default {
    input: 'src/main.js',
    output: [
        { file: pkg.main, name: camelCase(libraryName), format: 'umd', sourcemap: true },
        { file: pkg.module, format: 'es', sourcemap: true }
    ],
    external: [],
    watch: {
        include: 'src/**'
    },
    plugins: [
        json(),
        commonjs(),
        resolve(),
        sourceMaps()
    ]
};