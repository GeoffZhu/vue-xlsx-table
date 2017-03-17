<template>
  <div class="xlsx-table-wrapper">
    <table>
      <thead>
        <tr>
          <td v-for="td in header">{{td}}</td>
        </tr>
      </thead>
      <tbody>
        <tr  v-for="row in body">
          <td v-for="td in row">{{td}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props: {
    header: {
      type: Array,
      required: true
    },
    body: {
      type: Array,
      required: true
    }
  }
}
</script>