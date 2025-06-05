<template>
  <div class="card">
    <h2 class="card-title"><i class="fas fa-medal"></i>{{ convertText('禄神信息') }}</h2>
    <div class="grid">
      <div class="info-item">
        <div class="info-label"><i class="fas fa-dice"></i>{{ convertText('日禄') }}</div>
        <div class="info-value">{{ convertText(lunarData.lu) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LuCard',
  props: {
    lunarData: {
      type: Object,
      required: true
    }
  },
  inject: ['convertText']
}
</script>
