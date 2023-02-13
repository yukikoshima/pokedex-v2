import { z } from 'zod'

const ohterSchema = z.object({
  'official-artwork': z.object({
    front_default: z.string().nullable(),
  }),
})

const spritesSchema = z.object({
  other: ohterSchema,
})

const typesSchema = z
  .object({
    type: z.object({
      name: z.string().nullable(),
    }),
  })
  .array()

export const pokemonSchema = z.object({
  id: z.number().nullable(),
  sprites: spritesSchema,
  types: typesSchema,
  height: z.number().nullable(),
  weight: z.number().nullable(),
})
export type Pokemon = z.infer<typeof pokemonSchema>

export const pokemonsSchema = z.array(pokemonSchema)
export type Pokemons = z.infer<typeof pokemonsSchema>
