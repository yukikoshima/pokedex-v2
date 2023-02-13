import pokemonType from '@/assets/json/pokemonType.json'
import { Type } from '@/types/pokemon'
import { T } from '@/types/pokeapi/pokemonSpecies'

type keys = keyof typeof pokemonType

export default defineNuxtPlugin(() => {
  return {
    provide: {
      toTypeJa(types: (string | null)[]): Type[] | null {
        const stringTypes = types.filter(
          (type): type is string => typeof type === 'string'
        )
        if (!stringTypes.length) return null

        const typesJa: Type[] = []
        for (const type of stringTypes) {
          const key = type as keys
          typesJa.push(pokemonType[key])
        }
        return typesJa
      },
      convertToJa(array: T[]): string | null {
        if (!array.length) return null

        const obj = array.find(v => v.language.name === 'ja-Hrkt')

        if (!obj) return null

        if ('name' in obj) {
          return obj.name || null
        } else if ('genus' in obj) {
          return obj.genus || null
        } else {
          return obj.flavor_text || null
        }
      },
    },
  }
})