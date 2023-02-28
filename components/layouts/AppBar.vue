<template>
  <v-app-bar color="yellow" flat height="70">
    <v-btn class="ml-0" @click="switchDrawer">
      <v-icon :icon="mdiMenu" />
    </v-btn>
    <div class="logo__header hidden-sm-and-down">
      <NuxtLink to="/">
        <v-img src="/img/logo.svg" alt="logo" />
      </NuxtLink>
    </div>
    <PokemonSearch />
    <v-spacer />
    <ErrorSnackbar />
    <ShowPokemonSearchDialog />
  </v-app-bar>
</template>

<script setup lang="ts">
import { mdiMenu } from '@mdi/js'
import PokemonSearch from '@/components/common/PokemonSearch.vue'
import ErrorSnackbar from '@/components/common/ErrorSnackbar.vue'
import ShowPokemonSearchDialog from '@/components/common/ShowPokemonSearchDialog.vue'

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
