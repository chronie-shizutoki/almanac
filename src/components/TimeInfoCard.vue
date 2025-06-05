<template>
  <div class="card">
    <h2 class="card-title"><i class="fas fa-clock"></i>{{ convertText('時辰信息') }}</h2>
    <div class="grid">
      <div class="info-item">
        <div class="info-label"><i class="fas fa-font"></i>{{ convertText('時辰天干') }}</div>
        <div class="info-value">{{ convertText(lunarData.timeGan) }}</div>
      </div>
      <div class="info-item">
        <div class="info-label"><i class="fas fa-paw"></i>{{ convertText('時辰地支') }}</div>
        <div class="info-value">{{ convertText(lunarData.timeZhi) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimeInfoCard',
  props: {
    lunarData: {
      type: Object,
      required: true
    }
  },
  inject: ['convertText']
}
</script>
