<template>
  <v-main>
    <v-container app fluid>
      <header class="text-center headline">
        <p class="shine text-lg-h2 text-md-h2 text-sm-h4 text-h6 pb-sm-6">
          ようこそポケモンあそびばへ
        </p>
        <p class="text-lg-h4 text-md-h4 text-sm-h6 text-caption">
          ポケモンをみたり、ポケモンしりとりができるよ！
        </p>
      </header>
      <main>
        <Youtube />
      </main>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import Youtube from '@/components/pages/index/children/Youtube.vue'
</script>

<style scoped>
.headline {
  animation: SlideIn 1.6s;
}
@keyframes SlideIn {
  0% {
    opacity: 0;
    transform: translateX(100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
.shine {
  background-image: linear-gradient(70deg, black 45%, #fff 50%, black 55%);
  background-size: 450% 100%;
  background-clip: text;
  color: transparent;
  animation: shine 3s infinite;
}
@keyframes shine {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
