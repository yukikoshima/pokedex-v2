<template>
  <v-text-field
    v-model="keyword"
    label="ポケモン検索"
    placeholder="なまえやずかん番号でさがす"
    hide-details
    variant="outlined"
    clearable
    class="ml-md-12"
    :append-inner-icon="mdiMagnify"
    @click:append-inner="pokemonSearch"
    @keypress.enter="pokemonSearch"
  >
  </v-text-field>
</template>

<script setup lang="ts">
// FIXME server/apiに処理を移す予定
import { request } from 'graphql-request'
import { mdiMagnify } from '@mdi/js'
import { PokemonInfo, pokemonInfoSchema } from '@/types/pokemon'
import {
  getPokemonNameQueryById,
  getPokemonNameQueryByName,
} from '@/queries/pokemonQuery'

const { $bus } = useNuxtApp()
const keyword = ref('')
const pokemons = ref<PokemonInfo[]>([])
const url = 'https://beta.pokeapi.co/graphql/v1beta'

const pokemonSearch = () => {
  // 初期化
  pokemons.value = []

  // 空文字、空白文字チェック
  if (!keyword.value || !keyword.value.trim().length) {
    $bus.$emit(
      'showSnackbar',
      '何も入力してないよ！図鑑番号や名前を入力してみよう!'
    )
    return
  }

  // 数字じゃないものはそのまま返される
  const hankakuSuji = numberZenkakuToHankaku(keyword.value)
  // 数字の場合
  if (isNumber(hankakuSuji)) {
    request(url, getPokemonNameQueryById(hankakuSuji))
      .then(res => {
        const { id, height, weight } = res.pokemon_v2_pokemon[0]
        const typeList = res.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes
        const types = typeList.map(v => v.pokemon_v2_type.name)
        const typesJa = toTypeJa(types)
        const { name, genus: genera } = res.pokemon_v2_pokemonspeciesname[0]
        const flavorText =
          res.pokemon_v2_pokemonspeciesflavortext[0].flavor_text
        const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png
        `
        const data = {
          id,
          img,
          typesJa,
          name,
          genera,
          height,
          weight,
          flavorText,
        }
        const result = pokemonInfoSchema.safeParse(data)

        if (!result.success)
          return $bus.$emit(
            'showSnackbar',
            '見つからなかったよ。ほかの条件で探してみよう!'
          )
        pokemons.value.push(result.data)

        $bus.$emit('openDialog', pokemons)
      })
      .catch(() => {
        $bus.$emit(
          'showSnackbar',
          '見つからなかったよ。ほかの条件で探してみよう!!'
        )
      })
  } else {
    // ひらがな、カタカナの場合
    const kana = hiraToKana(keyword.value)

    request(url, getPokemonNameQueryByName(kana)).then(res => {
      const species = res.pokemon_v2_pokemonspeciesname

      if (!species.length) {
        keyword.value = ''
        $bus.$emit(
          'showSnackbar',
          '見つからなかったよ。ほかの条件で探してみよう!!'
        )
      }

      for (let i = 0; i < species.length; i++) {
        const { pokemon_species_id: id, name, genus: genera } = species[i]
        const specy = species[i].pokemon_v2_pokemonspecy
        const { height, weight } = specy.pokemon_v2_pokemons[0]
        const typeList = specy.pokemon_v2_pokemons[0].pokemon_v2_pokemontypes
        const types = typeList.map(v => v.pokemon_v2_type.name)
        const typesJa = toTypeJa(types)
        const flavorText =
          specy.pokemon_v2_pokemonspeciesflavortexts[0].flavor_text
        const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png
  `
        const data = {
          id,
          img,
          typesJa,
          name,
          genera,
          height,
          weight,
          flavorText,
        }
        const result = pokemonInfoSchema.safeParse(data)
        if (!result.success)
          return $bus.$emit(
            'showSnackbar',
            '見つからなかったよ。ほかの条件で探してみよう!'
          )
        pokemons.value.push(result.data)

        $bus.$emit('openDialog', pokemons)
      }
    })
  }
}
</script>
