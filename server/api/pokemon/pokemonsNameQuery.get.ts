import { request } from 'graphql-request'
import { getAllPokemonsNameQuery } from '@/queries/pokemonQuery'

const url = 'https://beta.pokeapi.co/graphql/v1beta'

export default defineEventHandler(async event => {
  console.log(`api/pokemon/pokemonsNameQuery start`)

  const result = await request(url, getAllPokemonsNameQuery)

  if (!result) return null

  return result.pokemon_v2_pokemonspeciesname
})
