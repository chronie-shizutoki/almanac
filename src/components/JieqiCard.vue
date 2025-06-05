<template>
  <div class="card">
    <h2 class="card-title"><i class="fas fa-sun"></i>{{ convertText('節氣信息') }}</h2>
    <div class="grid">
      <div class="info-item">
        <div class="info-label"><i class="fas fa-arrow-left"></i>{{ convertText('上一節氣') }}</div>
        <div class="info-value">{{ convertText(lunarData.prevJieqi) }}（{{ lunarData.prevJieqiDate }}）</div>
      </div>
      <div class="info-item">
        <div class="info-label"><i class="fas fa-arrow-right"></i>{{ convertText('下一節氣') }}</div>
        <div class="info-value">{{ convertText(lunarData.nextJieqi) }}（{{ lunarData.nextJieqiDate }}）</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JieqiCard',
  props: {
    lunarData: {
      type: Object,
      required: true
    }
  },
  inject: ['convertText']
}
</script>
