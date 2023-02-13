<template>
  <v-dialog v-model="isDialog" max-height="490px" max-width="490px">
    <v-card class="pa-10">
      <div class="text-right">
        <button @click="isDialog = false">
          <v-icon :icon="mdiClose"></v-icon>
        </button>
      </div>
      <v-img :src="pokemon?.img!" :alt="pokemon?.name!" />
      <div class="text-center mb-5">
        <p>{{ `No.${pokemon?.id}` }}</p>
        <p>{{ pokemon?.name }}</p>
      </div>
      <p class="mb-5">
        {{ `分類 : ${pokemon?.genera}` }}
      </p>
      <template v-if="pokemon?.typesJa">
        <div class="d-flex mb-5 text-center">
          <p class="mr-5">タイプ :</p>
          <template v-for="(type, index) in pokemon.typesJa" :key="index">
            <div class="mr-5">
              <v-img
                :src="`/img/type/${type.link}`"
                max-width="40px"
                class="ma-auto"
                :alt="pokemon.name!"
              ></v-img>
              <p>{{ type.name }}</p>
            </div>
          </template>
        </div>
      </template>
      <p class="mb-5">{{ `高さ : ${pokemon?.height! / 10}m` }}</p>
      <p class="mb-5">{{ `重さ : ${pokemon?.weight! / 10}kg` }}</p>
      <p>{{ pokemon?.flavorText }}</p>
      <div class="text-right">
        <button @click="isDialog = false">
          <v-icon :icon="mdiClose"></v-icon>
        </button>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { mdiClose } from '@mdi/js'
import { PokemonInfo } from '@/types/pokemon'

const isDialog = ref(false)
const pokemon = ref<PokemonInfo>()

const showPokemon = (pokemonData: PokemonInfo) => {
  if (objIsEmpty(pokemonData)) return

  isDialog.value = true
  pokemon.value = pokemonData
}

defineExpose({
  showPokemon,
})
</script>
