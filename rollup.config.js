import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.ts',
  external: ['react'],
  plugins: [typescript(), nodeResolve()],
  output: [
    {
      file: 'dist/index.js',
      format: 'esm'
    },
    {
      file: 'dist/index.cjs',
      format: 'cjs'
    }
  ]
};
