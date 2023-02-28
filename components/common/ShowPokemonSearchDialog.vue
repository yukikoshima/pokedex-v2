<template>
  <v-row justify="center">
    <v-dialog
      v-model="isDialog"
      fullscreen
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar color="yellow">
          <template #append>
            <button @click="isDialog = false">
              <v-icon :icon="mdiClose"></v-icon>
            </button>
          </template>
        </v-toolbar>
        <v-container fluid>
          <v-row dense>
            <v-col
              v-for="pokemon in pokemons"
              :key="pokemon.id!"
              cols="4"
              lg="2"
              md="2"
              sm="2"
              xs="1"
            >
              <v-card @click="showDialog(pokemon)">
                <v-img :src="pokemon.img!" :alt="pokemon.name!" />
              </v-card>
              <p>{{ pokemon.name }}</p>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </v-row>
  <ShowPokemonDialog ref="showPokemon" />
</template>

<script setup lang="ts">
import { Ref } from 'vue'
import { mdiClose } from '@mdi/js'
import { PokemonInfo } from '@/types/pokemon'
import ShowPokemonDialog from '@/components/common/ShowPokemonDialog.vue'

onMounted(() => {
  const { $bus } = useNuxtApp()
  $bus.$on('openDialog', data => {
    openDialog(data)
  })
})

const isDialog = ref(false)
const pokemons = ref<PokemonInfo[]>([])

const openDialog = (data: Ref<PokemonInfo[]>) => {
  isDialog.value = true
  pokemons.value = data.value
}

const showPokemon = ref()
const showDialog = (pokemon: PokemonInfo) => {
  showPokemon.value.showPokemon(pokemon)
}
</script>
