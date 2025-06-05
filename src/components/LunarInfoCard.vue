<template>
  <div class="card">
    <h2 class="card-title"><i class="fas fa-calendar-day"></i>{{ convertText('農曆信息') }}</h2>
    <div class="grid">
      <div class="info-item">
        <div class="info-label"><i class="fas fa-moon"></i>{{ convertText('農曆日期') }}</div>
        <div class="info-value">{{ convertText(lunarData.date) }}</div>
      </div>
      <div class="info-item">
        <div class="info-label"><i class="fas fa-dragon"></i>{{ convertText('干支紀年') }}</div>
        <div class="info-value">{{ convertText(lunarData.ganzhiYear) }} ({{ convertText(lunarData.zodiacYear) }})</div>
      </div>
      <div class="info-item">
        <div class="info-label"><i class="fas fa-calendar-week"></i>{{ convertText('星期') }}</div>
        <div class="info-value">{{ convertText(lunarData.week) }}</div>
      </div>
      <div class="info-item">
        <div class="info-label"><i class="fas fa-leaf"></i>{{ convertText('節氣') }}</div>
        <div class="info-value">{{ convertText(lunarData.jieqi) }}</div>
      </div>
      <div class="info-item">
        <div class="info-label"><i class="fas fa-moon"></i>{{ convertText('月相') }}</div>
        <div class="info-value">{{ convertText(lunarData.moonPhase) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LunarInfoCard',
  props: {
    lunarData: {
      type: Object,
      required: true
    }
  },
  inject: ['convertText']
}
</script>
