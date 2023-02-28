<template>
  <v-main>
    <v-container fluid>
      <template v-if="isPending">
        <p class="text-center">ロード中</p>
      </template>
      <template v-else-if="isError">
        <p>エラーで取得できませんでした</p>
      </template>
      <template v-else>
        <PokemonCard :pokemons="pokemons" />
      </template>
      <div ref="observeLoading"></div>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import { FetchError } from 'ofetch'
import PokemonCard from '@/components/pages/zukan/children/PokemonCard.vue'
import { PokemonInfo } from '@/types/pokemon'
import ZukanVer from '@/assets/json/zukanVersion.json'

const {
  setId,
  setLastId,
  countId,
  setIdToUrl,
  resetUrl,
  canGetPokemons,
  getPokemons,
  createPokemonData,
} = usePokemons()

// バージョンのstartNoとlastNoを取得してセット
const route = useRoute()
const key = route.params.id as string

const zukanVer = JSON.parse(JSON.stringify(ZukanVer))
setId(zukanVer[key].startNo)
setLastId(zukanVer[key].lastNo)

const pokemons = ref<PokemonInfo[]>([])
const isPending = ref(true)
const isError = ref<FetchError<any> | null>(null)

/*
IntersectionObserverで無限ローディング
*/
const options = {
  rootMargin: '100px',
}
const observeLoading = ref<HTMLElement | null>(null)
onMounted(() => {
  const observer = new IntersectionObserver(async entries => {
    const entry = entries[0]
    if (entry && entry.isIntersecting) {
      // 48件分のurlを作成
      for (let i = 0; i < 48; i++) {
        if (!canGetPokemons()) break
        setIdToUrl()
        countId()
      }
      // 48件ずつ取得
      const { data, pending, error } = await getPokemons()

      if (!data.value) return
      resetUrl()

      pokemons.value.push(
        ...createPokemonData(data.value.pokemons, data.value.species)
      )

      isPending.value = pending.value
      isError.value = error.value
    }
  }, options)

  observer.observe(observeLoading.value!)
  return observeLoading
})
</script>
