import { z } from 'zod'

const nameSchema = z.object({
  name: z.string().nullable(),
  // url: z.string().nullable(),
})

const flavorTextSchema = z.object({
  flavor_text: z.string().nullable(),
  language: nameSchema,
  // version: nameSchema,
})
export type FlavorText = z.infer<typeof flavorTextSchema>

const generaSchema = z.object({
  genus: z.string().nullable(),
  language: nameSchema,
})
export type Genera = z.infer<typeof generaSchema>

const namesSchema = z.object({
  name: z.string().nullable(),
  language: nameSchema,
})
export type Names = z.infer<typeof namesSchema>

export const pokemonSpeciesSchema = z.object({
  id: z.number().nullable(),
  flavor_text_entries: z.array(flavorTextSchema),
  genera: z.array(generaSchema),
  names: z.array(namesSchema),
})
export type PokemonSpecies = z.infer<typeof pokemonSpeciesSchema>

export const pokemonsSpeciesSchema = z.array(pokemonSpeciesSchema)
export type PokemonsSpecies = z.infer<typeof pokemonsSpeciesSchema>

export type T = FlavorText | Genera | Names
