import { Ref } from 'vue'
import { Pokemon } from '@/types/pokeapi/pokemon'
import { PokemonSpecies } from '@/types/pokeapi/pokemonSpecies'
import { PokemonInfo } from '@/types/pokemon'

// ポケモンのラストid
// 剣盾まで取得
const LAST_ID = 898

// ポケモンの情報保持
const usePokemons = () => {
  const id = useState('id', () => 1)
  const pokemons = useState<PokemonInfo[]>('pokemons', () => [])
  // const pokemonsByVersion = useState<PokemonInfo[]>('version', () => [])

  return {
    id: readonly(id),
    LAST_ID,
    pokemons: readonly(pokemons),
    countId: countId(id),
    getId: getId(id),
    setPokemons: setPokemons(pokemons),
    getPokemons: getPokemons(id),
  }
}

const countId = (id: Ref<number>) => () => id.value++

const getId = (id: Ref<number>) => {
  return () => {
    return id
  }
}

const setPokemons = (pokemons: Ref<PokemonInfo[]>) => {
  return (pokemon: PokemonInfo) => {
    pokemons.value.push(pokemon)
  }
}

// pokeapiからデータ取得
const getPokemons = (id: Ref<number>) => {
  const { $convertToJa, $toTypeJa } = useNuxtApp()

  return () => {
    return Promise.all([
      $fetch(`https://pokeapi.co/api/v2/pokemon/${id.value}`),
      $fetch(`https://pokeapi.co/api/v2/pokemon-species/${id.value}`),
    ])
      .then(values => {
        const poke = values[0] as Pokemon
        const pokeSp = values[1] as PokemonSpecies

        // id、画像、身長、体重、タイプを取得
        const id = poke.id || undefined
        const img =
          poke.sprites.other['official-artwork'].front_default || undefined
        const height = poke.height || undefined
        const weight = poke.weight || undefined
        const types = poke.types.map(v => v.type.name)
        // 英語で返ってくるので日本語に変換
        const typesJa = $toTypeJa(types)
        // 名前、種類、説明を取得
        // 英語で返ってくるので日本語に変換
        const name = $convertToJa(pokeSp.names)
        const genera = $convertToJa(pokeSp.genera)
        const flavorText = $convertToJa(pokeSp.flavor_text_entries)

        const pokemon: PokemonInfo = {
          id,
          img,
          typesJa,
          name,
          genera,
          height,
          weight,
          flavorText,
        }
        return pokemon
      })
      .catch(err => {
        console.error('エラーだよん', err)
      })
  }
}

export default usePokemons
