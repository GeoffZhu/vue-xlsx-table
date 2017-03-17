# vue-xlsx-table

## Requirements
- vue: ^2.0.0

## Usage
#### install

``` sh
 npm install vue-xlsx-table --save
```

#### main.js

```javascript
import 'vue-xlsx-table/dist/style.css'
import vueXlsxTable from 'vue-xlsx-table'
Vue.use(vueXlsxTable)
```

#### file.vue

```vue
<template>
  <div id="app">
    <h1>vue-xlsx</h1>
    <vue-xlsx-table @on-click-ok="handleOk"></vue-xlsx-table>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    handleOk (data) {
      console.log(data)
    }
  }
}
</script>
```

## Develop
```
npm run dev  //develop
npm run build //production
```


