import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"
// import styleImport, { AntdResolve } from "vite-plugin-style-import"
import Unocss from 'unocss/vite'
import { presetUno, presetAttributify, presetIcons } from 'unocss'
import transformerAttributifyJsx from '@unocss/transformer-attributify-jsx'

export default defineConfig({
  plugins: [
    react(),
    Unocss({
      presets: [
          presetUno(), 
          presetAttributify(), 
          presetIcons(),
      ],
      transformers: [
        transformerAttributifyJsx(),
      ],
      rules: [
        ['w-100', {width: '100%'}],
        ['h-100', {height: '100vh'}],
        /** margin */
        [/^m-([\.\d]+)$/, ([_, num]) => ({ margin: `${num}px` })],
        // 考虑使用工具转换 样式属性名：https://www.npmjs.com/package/kebabcase
        [/^mh-([\.\d]+)$/, ([_, num]) => ({ 'margin-left': `${num}px`, 'margin-right': `${num}px` })],
        [/^mv-([\.\d]+)$/, ([_, num]) => ({ 'margin-top': `${num}px`, 'margin-bottom': `${num}px` })],
        [/^mb-([\.\d]+)$/, ([_, num]) => ({ 'margin-bottom': `${num}px` })],
        [/^mt-([\.\d]+)$/, ([_, num]) => ({ 'margin-top': `${num}px` })],
        [/^ml-([\.\d]+)$/, ([_, num]) => ({ 'margin-left': `${num}px` })],
        [/^mr-([\.\d]+)$/, ([_, num]) => ({ 'margin-right': `${num}px` })],
        /** padding */ 
        [/^ph-([\.\d]+)$/, ([_, num]) => ({ 'padding-left': `${num}px`, 'padding-right': `${num}px`  })],
        [/^pv-([\.\d]+)$/, ([_, num]) => ({ 'padding-top': `${num}px`, 'padding-bottom': `${num}px` })],
        [/^pd-([\.\d]+)$/, ([_, num]) => ({ padding: `${num}px` })],
        [/^pl-([\.\d]+)$/, ([_, num]) => ({ 'padding-left': `${num}px` })],
        [/^pr-([\.\d]+)$/, ([_, num]) => ({ 'padding-right': `${num}px` })],
        [/^pt-([\.\d]+)$/, ([_, num]) => ({ 'padding-top': `${num}px` })],
        [/^pb-([\.\d]+)$/, ([_, num]) => ({ 'padding-bottom': `${num}px` })],
        /** textAlign:  */ 
        ['tac', {'text-align': 'center'}],
        ['tar', {'text-align': 'right'}],
        ['tal', {'text-align': 'left'}],
        /** vertical */
        ['vac', {'vertical-align': 'middle'}],
        ['vat', {'vertical-align': 'top'}],
        ['vab', {'vertical-align': 'bottom'}],
        /** background-color */
        ['bg-white', {'background-color': '#fff'}],
      ]
    }),
  ],
    // 配置 ant 样式按需加载
    // styleImport({
    //   resolves: [ AntdResolve() ]
    // })
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
})
