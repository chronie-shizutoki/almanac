<template>
  <div class="card">
    <h2 class="card-title"><i class="fas fa-star"></i>{{ convertText('八字基礎') }}</h2>
    <div class="grid">
      <div class="info-item">
        <div class="info-label"><i class="fas fa-user"></i>{{ convertText('四柱八字') }}</div>
        <div class="info-value">{{ convertText(lunarData.eightChar) }}</div>
      </div>
      <div class="info-item">
        <div class="info-label"><i class="fas fa-hourglass"></i>{{ convertText('精確年干支') }}</div>
        <div class="info-value">{{ convertText(lunarData.ganzhiYearExact) }}</div>
      </div>
      <div class="info-item">
        <div class="info-label"><i class="fas fa-hourglass-half"></i>{{ convertText('精確月干支') }}</div>
        <div class="info-value">{{ convertText(lunarData.ganzhiMonthExact) }}</div>
      </div>
      <div class="info-item">
        <div class="info-label"><i class="fas fa-hourglass-end"></i>{{ convertText('精確日干支') }}</div>
        <div class="info-value">{{ convertText(lunarData.ganzhiDayExact) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EightCharCard',
  props: {
    lunarData: {
      type: Object,
      required: true
    }
  },
  inject: ['convertText']
}
</script>
