<template>
  <div class="card">
    <h2 class="card-title"><i class="fas fa-gift"></i>{{ convertText('传统节日') }}</h2>
    <div v-if="lunarData.festivals.length > 0" class="grid">
      <div class="info-item">
        <div class="info-label">节日</div>
        <div class="items">
          <div v-for="(item, index) in lunarData.festivals" :key="'festival-'+index" class="item">
            {{ convertText(item) }}
          </div>
        </div>
      </div>
    </div>
    <div v-if="lunarData.otherFestivals.length > 0" class="grid">
      <div class="info-item">
        <div class="info-label">其他节日</div>
        <div class="items">
          <div v-for="(item, index) in lunarData.otherFestivals" :key="'other-festival-'+index" class="item">
            {{ convertText(item) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FestivalCard',
  props: {
    lunarData: {
      type: Object,
      required: true
    }
  },
  inject: ['convertText']
}
</script>
