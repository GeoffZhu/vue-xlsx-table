# vue-xlsx-table

> 无需上传，在浏览器中查看xlsx或xls表格，由[js-xlsx](https://github.com/SheetJS/js-xlsx)驱动.
> [在线例子](http://geoffzhu.cn/vue-xlsx-table/)

[![npm version](https://img.shields.io/npm/v/vue-xlsx-table.svg)](https://www.npmjs.com/package/vue-xlsx-table)

## 依赖
- vue: ^2.0.0

## 用法
#### install

``` sh
 npm install vue-xlsx-table --save
```

#### main.js

```javascript
import vueXlsxTable from 'vue-xlsx-table'
Vue.use(vueXlsxTable, {rABS: false}) //浏览器的FileReader API 有两个方法可以读取本地文件 readAsBinaryString 和 readAsArrayBuffer, 默认rABS为false，也就是使用readAsArrayBuffer
```

#### file.vue

```vue
<template>
  <div id="app">
    <h1>vue-xlsx-table</h1>
    <vue-xlsx-table @on-select-file="handleSelectedFile"></vue-xlsx-table>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    handleSelectedFile (convertedData) {
      console.log(convertedData)
    }
  }
}
</script>
```

## 开发
```
npm run dev  //develop
npm run build //production
```


