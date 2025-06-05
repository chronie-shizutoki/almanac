<template>
  <div class="card">
    <h2 class="card-title"><i class="fas fa-list-check"></i>{{ convertText('今日宜忌') }}</h2>
    <div class="yi-ji-container">
      <div class="yi-container">
        <div class="yi-title"><i class="fas fa-thumbs-up"></i>{{ convertText('宜') }}</div>
        <div class="items">
          <div v-for="(item, index) in lunarData.yi" :key="'yi-'+index" class="item">
            {{ convertText(item) }}
          </div>
        </div>
      </div>
      <div class="ji-container">
        <div class="ji-title"><i class="fas fa-ban"></i>{{ convertText('忌') }}</div>
        <div class="items">
          <div v-for="(item, index) in lunarData.ji" :key="'ji-'+index" class="item">
            {{ convertText(item) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'YiJiCard',
  props: {
    lunarData: {
      type: Object,
      required: true
    }
  },
  inject: ['convertText']
}
</script>
