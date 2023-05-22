import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import globals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';
import { babel } from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import uglify from "@lopatnov/rollup-plugin-uglify";
// import { terser } from '@rollup/plugin-terser'; // Uglify for ES6

import pluginList from './plugin-list.js';
// const pluginList = {};
// {name: path}           // pure javascript
// {name: [path, true]}   // javascript + typescript

let outputs = [];

for (var key in pluginList) {
    let inputConfig = pluginList[key];
    let inputFile, useTypescript;
    if (typeof (inputConfig) === 'string') {
        inputFile = inputConfig;
        useTypescript = false;
    } else {
        inputFile = inputConfig[0];
        useTypescript = inputConfig[1];
    }

    // Export no-uglify files
    let outFile = `./dist/rex${key}.js`;
    let libName = `rex${key}`;
    // console.log(inputFile)
    // console.log(outFile)
    // console.log(libName)

    outputs.push({
        input: inputFile,
        output: {
            file: outFile,
            name: libName,
            format: 'umd',
        },
        external: ['phaser'],
        plugins: [
            nodeResolve({
                browser: true,
                preferBuiltins: true
            }),

            commonjs(),

            globals(),

            builtins(),

            (useTypescript) ? typescript({
                target: 'es5',
            }) : undefined,

            babel({
                // babelHelpers: 'runtime',
                exclude: 'node_modules/**'
            }),
        ]
    })

    // Export uglify files
    let inputFile2 = outFile;
    let outFile2 = `./dist/rex${key}.min.js`;
    outputs.push({
        input: inputFile2,
        output: {
            file: outFile2,
            // name: libName,
            // format: 'umd',
        },
        external: ['phaser'],
        plugins: [
            uglify()
        ]
    })
}

export default outputs;