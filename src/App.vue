<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  provide() {
    return {
      convertText: this.convertText
    }
  },
  data() {
    return {
      converter: null,
      isTraditional: true
    }
  },
  methods: {
    // 文本转换
    convertText(text) {
      return this.isTraditional && this.converter ? this.converter(text) : text;
    }
  }
}
</script>
