<template>
  <div class="card">
    <h2 class="card-title"><i class="fas fa-table"></i>{{ convertText('干支紀時') }}</h2>
    <div class="grid">
      <div class="info-item">
        <div class="info-label"><i class="fas fa-hourglass-start"></i>{{ convertText('年干支') }}</div>
        <div class="info-value">{{ convertText(lunarData.ganzhiYear) }}</div>
      </div>
      <div class="info-item">
        <div class="info-label"><i class="fas fa-hourglass-half"></i>{{ convertText('月干支') }}</div>
        <div class="info-value">{{ convertText(lunarData.ganzhiMonth) }}</div>
      </div>
      <div class="info-item">
        <div class="info-label"><i class="fas fa-hourglass-end"></i>{{ convertText('日干支') }}</div>
        <div class="info-value">{{ convertText(lunarData.ganzhiDay) }}</div>
      </div>
      <div class="info-item">
        <div class="info-label"><i class="fas fa-clock"></i>{{ convertText('時辰干支') }}</div>
        <div class="info-value">{{ convertText(lunarData.timeGanzhi) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GanzhiCard',
  props: {
    lunarData: {
      type: Object,
      required: true
    }
  },
  inject: ['convertText']
}
</script>
