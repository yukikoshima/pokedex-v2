<template>
  <v-app-bar app color="yellow" clipped-left flat height="70">
    <v-btn @click="switchDrawer">
      <v-icon :icon="mdiMenu" />
    </v-btn>
    <div class="logo__header">
      <NuxtLink to="/">
        <v-img class="hidden-sm-and-down" src="/img/logo.svg" alt="logo" />
      </NuxtLink>
    </div>
    <!-- <Search /> -->
    <!-- <v-spacer /> -->
    <!-- <ErrorSnackbar />
    <Dialog /> -->
  </v-app-bar>
</template>

<script setup lang="ts">
// import Search from '@/components/Search.vue'
// import ErrorSnackbar from '@/components/Common/ErrorSnackbar.vue'
// import Dialog from '@/components/Dialog.vue'
import { mdiMenu } from '@mdi/js'

const switchDrawer = () => {
  const { $bus } = useNuxtApp()
  $bus.$emit('switchDrawer')
}
</script>

<style scoped>
.logo__header {
  width: calc((196.9 / 1280) * 100vw);
  max-width: 196.9px;
}
</style>
