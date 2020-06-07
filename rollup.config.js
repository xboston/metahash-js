import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import { terser } from "rollup-plugin-terser";

export default {
    input: 'src/index.js',
    output: [
        {
            name: 'MetaHash',
            file: "dist/metahash.js",
            format: "umd",
        },
        {
            name: 'MetaHash',
            file: "dist/metahash.min.js",
            format: "iife",
            plugins: [terser()]
        },
    ],
    plugins: [
        json({
            compact: true,
        }),
        resolve({
            main: true,
            browser: true,
            // preferBuiltins: true
        }),
        commonjs(),
        globals(),
        builtins(),
    ]
};