import typescript from 'rollup-plugin-typescript2'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      exports: 'named',
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
    },
    {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'transmit',
    },
  ],
  plugins: [typescript()],
  external: [],
}
