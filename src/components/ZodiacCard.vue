<template>
  <div class="card">
    <h2 class="card-title"><i class="fas fa-hourglass-half"></i>{{ convertText('生肖紀時') }}</h2>
    <div class="grid">
      <div class="info-item">
        <div class="info-label"><i class="fas fa-dragon"></i>{{ convertText('年生肖') }}</div>
        <div class="info-value">{{ convertText(lunarData.zodiacYear) }}</div>
      </div>
      <div class="info-item">
        <div class="info-label"><i class="fas fa-wolf-pack-battalion"></i>{{ convertText('月生肖') }}</div>
        <div class="info-value">{{ convertText(lunarData.zodiacMonth) }}</div>
      </div>
      <div class="info-item">
        <div class="info-label"><i class="fas fa-cat"></i>{{ convertText('日生肖') }}</div>
        <div class="info-value">{{ convertText(lunarData.zodiacDay) }}</div>
      </div>
      <div class="info-item">
        <div class="info-label"><i class="fas fa-clock"></i>{{ convertText('时辰生肖') }}</div>
        <div class="info-value">{{ convertText(lunarData.timeShengxiao) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZodiacCard',
  props: {
    lunarData: {
      type: Object,
      required: true
    }
  },
  inject: ['convertText']
}
</script>
