<template>
  <div>
    <h1>index.vue</h1>
    <v-btn variant="elevated">ボタン</v-btn>
  </div>
</template>

<script setup lang="ts">
const { data: pokemon } = useFetch('/api/getPokemon')

console.log(pokemon.value)
</script>
