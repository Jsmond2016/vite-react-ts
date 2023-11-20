import transformerAttributifyJsx from '@unocss/transformer-attributify-jsx';
import react from '@vitejs/plugin-react';
import path from 'path';
import { presetAttributify, presetIcons, presetUno } from 'unocss';
// import styleImport, { AntdResolve } from "vite-plugin-style-import"
import Unocss from 'unocss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
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
    },
  },
});
