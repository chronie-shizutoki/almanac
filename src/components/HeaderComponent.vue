<template>
  <div class="header">
    <h1>今日黃曆</h1>
    <div class="date-display">{{ dateDisplay }}</div>
  </div>
</template>

<script>
export default {
  name: 'HeaderComponent',
  props: {
    dateDisplay: {
      type: String,
      default: '加载中...'
    }
  }
}
</script>
