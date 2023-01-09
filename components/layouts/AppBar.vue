<template>
  <v-app-bar app color="yellow" clipped-left flat height="70">
    <v-app-bar-nav-icon @click="switchDrawer"></v-app-bar-nav-icon>
    <NuxtLink to="/">
      <nuxt-img
        class="hidden-sm-and-down"
        src="/img/logo.svg"
        alt="logo"
        width="200px"
      />
    </NuxtLink>
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

const switchDrawer = () => {
  const { $bus } = useNuxtApp()
  $bus.$emit('switchDrawer')
}
</script>
