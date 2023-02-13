import Pokedex from 'pokedex-promise-v2'
import { pokemonsSchema } from '@/types/pokeapi/pokemon'
import { pokemonsSpeciesSchema } from '@/types/pokeapi/pokemonSpecies'

const P = new Pokedex()

const getPokemons = (urls: string[]): Promise<any[]> => {
  return P.getResource(urls)
}

export default defineEventHandler(async event => {
  console.log(`api/pokemon/pokemons start`)

  const { pokemonUrls, speciesUrls } = await readBody(event)

  // pokemonUrlsがfalseならspeciesUrlsもfalse
  if (!pokemonUrls.length) return

  const values = await Promise.all([
    getPokemons(pokemonUrls),
    getPokemons(speciesUrls),
  ])
  const pokemons = pokemonsSchema.safeParse(values[0])
  const species = pokemonsSpeciesSchema.safeParse(values[1])

  if (!pokemons.success || !species.success) return null

  return {
    pokemons: pokemons.data,
    species: species.data,
  }
})
