import resolve from '@rollup/plugin-node-resolve';
// import replace from '@rollup/plugin-replace';
// import { terser } from 'rollup-plugin-terser';

export default [
    {
        input: './src/core.js',
        output: { file: './dist/core.js', format: 'iife', name: 'CORE' },
        plugins: [
            resolve(),
            // replace({
            //     'process.env.NODE_ENV': JSON.stringify('production'),
            // }),
            // terser(),
        ],
    },
    {
        input: './src/hud.js',
        output: { file: './dist/hud.js', format: 'iife', name: 'HUD' },
        plugins: [
            // replace({
            //     'process.env.NODE_ENV': JSON.stringify('development'),
            // }),
            resolve(),
            // terser(),
        ],
    },
];
