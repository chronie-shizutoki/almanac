<template>
  <div class="loading-container">
    <div class="loading-spinner"></div>
    <div class="loading-text">{{ loadingText }}</div>
  </div>
</template>

<script>
export default {
  name: 'LoadingComponent',
  props: {
    loadingText: {
      type: String,
      default: '正在載入黃曆數據，請稍候...'
    }
  }
}
</script>
