import transformerAttributifyJsx from '@unocss/transformer-attributify-jsx';
import react from '@vitejs/plugin-react';
import path from 'path';
// import commonjs from 'vite-plugin-commonjs';
// import commonjsExternals from 'vite-plugin-commonjs-externals';
// const externals = ['path', /^electron(\/.+)?$/];
// import nodePolyfills from 'rollup-plugin-polyfill-node';
import { presetAttributify, presetIcons, presetUno } from 'unocss';
// import styleImport, { AntdResolve } from "vite-plugin-style-import"
import Unocss from 'unocss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    // commonjs(),
    // commonjsExternals({ externals }),
    // nodePolyfills({ include: null }),
    react(),
    Unocss({
      presets: [presetUno(), presetAttributify(), presetIcons()],
      // @ts-ignore
      transformers: [transformerAttributifyJsx()],
    }),
  ],
  // 配置 ant 样式按需加载
  // styleImport({
  //   resolves: [ AntdResolve() ]
  // })
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // process: 'process/browser',
      // stream: 'stream-browserify',
      // zlib: 'browserify-zlib',
      // util: 'util/',
    },
  },
});
