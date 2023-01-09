<template>
  <v-app>
    <AppBar />
    <Drawer />
    <NuxtPage />
  </v-app>
</template>

<script setup lang="ts">
import AppBar from '@/components/layouts/AppBar.vue'
import Drawer from '@/components/layouts/Drawer.vue'
</script>
