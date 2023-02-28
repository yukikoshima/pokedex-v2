import { Ref } from 'vue'
import { Pokemons } from '@/types/pokeapi/pokemon'
import { PokemonsSpecies } from '@/types/pokeapi/pokemonSpecies'
import { PokemonInfo } from '@/types/pokemon'

// ポケモンの情報保持
const usePokemons = () => {
  const id = useState('id', () => 0)
  const lastId = useState('lastId', () => 0)
  const pokemonUrls: string[] = []
  const speciesUrls: string[] = []
  const pokemons = useState<PokemonInfo[]>('pokemons', () => [])
  // const pokemonsByVersion = useState<PokemonInfo[]>('version', () => [])

  return {
    id: readonly(id),
    setId: setId(id),
    lastId: readonly(lastId),
    setLastId: setLastId(lastId),
    countId: countId(id),
    canGetPokemons: canGetPokemons(id, lastId),
    setIdToUrl: setIdToUrl(id, pokemonUrls, speciesUrls),
    resetUrl: resetUrl(pokemonUrls, speciesUrls),
    createPokemonData: createPokemonData(),
    pokemons: readonly(pokemons),
    getPokemons: getPokemons(pokemonUrls, speciesUrls),
    // getPokemons: getPokemons(id),
    // setPokemons: setPokemons(pokemons),
  }
}

const setId = (id: Ref<number>) => (n: number) => (id.value = n)

const setLastId = (lastId: Ref<number>) => (n: number) => (lastId.value = n)

const countId = (id: Ref<number>) => () => id.value++

const canGetPokemons = (id: Ref<number>, lastId: Ref<number>) => {
  return () => {
    return id.value < lastId.value
  }
}

const setIdToUrl = (
  id: Ref<number>,
  pokemonUrls: string[],
  speciesUrls: string[]
) => {
  return () => {
    pokemonUrls.push(`/api/v2/pokemon/${id.value}`)
    speciesUrls.push(`/api/v2/pokemon-species/${id.value}`)
  }
}

const resetUrl = (pokemonUrls: string[], speciesUrls: string[]) => {
  return () => {
    //* pokemonUrls = []だと初期化されないので下記の方法で対応
    pokemonUrls.length = 0
    speciesUrls.length = 0
  }
}

// const setPokemons = (pokemons: Ref<PokemonInfo[]>) => {
//   return (pokemon: PokemonInfo) => {
//     pokemons.value.push(pokemon)
//   }
// }

const getPokemons = (pokemonUrls: string[], speciesUrls: string[]) => {
  return async () => {
    return await useFetch('/api/pokemon/pokemons', {
      method: 'post',
      body: { pokemonUrls, speciesUrls },
    })
  }
}

const createPokemonData = () => {
  return (pokemons: Pokemons, species: PokemonsSpecies) => {
    const pokemonsData: PokemonInfo[] = []

    for (let i = 0; i < pokemons.length; i++) {
      // id、画像、身長、体重、タイプを取得
      const id = pokemons[i].id || null
      const img =
        pokemons[i].sprites.other['official-artwork'].front_default || null
      const height = pokemons[i].height || null
      const weight = pokemons[i].weight || null
      const types = pokemons[i].types.map(v => v.type.name)
      // 英語で返ってくるので日本語に変換
      const typesJa = toTypeJa(types)
      // 名前、種類、説明を取得
      // 英語で返ってくるので日本語に変換
      const name = convertToJa(species[i].names)
      const genera = convertToJa(species[i].genera)
      const flavorText = convertToJa(species[i].flavor_text_entries)

      pokemonsData.push({
        id,
        img,
        typesJa,
        name,
        genera,
        height,
        weight,
        flavorText,
      })
    }
    return pokemonsData
  }
}

// pokeapiからデータ取得
// const getPokemons = (id: Ref<number>) => {
//   const { $convertToJa, $toTypeJa } = useNuxtApp()

//   return () => {
//     return Promise.all([
//       $fetch(`https://pokeapi.co/api/v2/pokemon/${id.value}`),
//       $fetch(`https://pokeapi.co/api/v2/pokemon-species/${id.value}`),
//     ])
//       .then(values => {
//         const poke = values[0] as Pokemon
//         const pokeSp = values[1] as PokemonSpecies

//         // id、画像、身長、体重、タイプを取得
//         const id = poke.id || undefined
//         const img =
//           poke.sprites.other['official-artwork'].front_default || undefined
//         const height = poke.height || undefined
//         const weight = poke.weight || undefined
//         const types = poke.types.map(v => v.type.name)
//         // 英語で返ってくるので日本語に変換
//         const typesJa = $toTypeJa(types)
//         // 名前、種類、説明を取得
//         // 英語で返ってくるので日本語に変換
//         const name = $convertToJa(pokeSp.names)
//         const genera = $convertToJa(pokeSp.genera)
//         const flavorText = $convertToJa(pokeSp.flavor_text_entries)

//         const pokemon: PokemonInfo = {
//           id,
//           img,
//           typesJa,
//           name,
//           genera,
//           height,
//           weight,
//           flavorText,
//         }
//         return pokemon
//       })
//       .catch(err => {
//         console.error('エラーだよん', err)
//       })
//   }
// }

export default usePokemons
