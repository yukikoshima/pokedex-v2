import { gql } from 'graphql-request'

export const getPokemonNameQueryById = (id: string) => {
  return gql`
    {
      pokemon_v2_pokemon(where: { id: { _eq: ${id} } }) {
        id
        height
        weight
        pokemon_v2_pokemontypes {
          pokemon_v2_type {
            name
          }
        }
      }
      pokemon_v2_pokemonspeciesname(
        where: { language_id: { _eq: 1 }, pokemon_species_id: { _eq: ${id} } }
      ) {
        name
        genus
      }
      pokemon_v2_pokemonspeciesflavortext(
        where: { language_id: { _eq: 1 }, pokemon_species_id: { _eq: ${id} } }
        limit: 1
      ) {
        flavor_text
      }
    }
  `
}

export const getPokemonNameQueryByName = (name: string) => {
  return gql`
    {
      pokemon_v2_pokemonspeciesname(
        where: { language_id: { _eq: 1 }, name: { _iregex: "${name}" } }
      ) {
        pokemon_species_id
        name
        genus
        pokemon_v2_pokemonspecy {
          pokemon_v2_pokemons(limit: 1) {
            height
            weight
            pokemon_v2_pokemontypes {
              pokemon_v2_type {
                name
              }
            }
          }
          pokemon_v2_pokemonspeciesflavortexts(
            where: { language_id: { _eq: 1 } }
            limit: 1
          ) {
            flavor_text
          }
        }
      }
    }
  `
}

/**
 * ここからはしりとり用のクエリ
 */
// 全ポケモンの名前のみ取得
export const getAllPokemonsNameQuery = gql`
  {
    pokemon_v2_pokemonspeciesname(where: { language_id: { _eq: 1 } }) {
      name
    }
  }
`
