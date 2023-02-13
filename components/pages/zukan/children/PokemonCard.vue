<template>
  <div>
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
    <ShowDialog ref="showPokemon" />
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { PokemonInfo } from '@/types/pokemon'
import ShowDialog from '@/components/common/ShowDialog.vue'
// TODO lazy-loadの対応
defineProps({
  pokemons: {
    type: Array as PropType<PokemonInfo[]>,
    default: () => [],
  },
})

const showPokemon = ref()
const showDialog = (pokemon: PokemonInfo) => {
  showPokemon.value.showPokemon(pokemon)
}
</script>
