<template>
  <div id="app">
    <h1>Vue-xlsx-table</h1>
    <vue-xlsx-table @on-click-ok="handleOk"></vue-xlsx-table>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    handleOk (tableData) {
      console.log(tableData)
      window.alert(JSON.stringify(tableData))
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 30px;
}

h1, h2, h3 {
  font-weight: normal;
  margin: 0;
  padding: 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.t-center{
  text-align: center;
  margin: 20px;
}
.mt150{
  margin-top: 150px;
}
</style>
