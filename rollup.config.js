import pkg from "./package.json"
import commonjs from "@rollup/plugin-commonjs";
import json from '@rollup/plugin-json';

export default {
    input: "index.js",
    output: [
        {
            file: 'bin/' + pkg.main,
            format: "cjs",
            banner: '#! /usr/bin/env node',
        }
    ],
    external: [pkg.peerDependencies, pkg.dependencies],
    plugins: [ commonjs(), json()],
}