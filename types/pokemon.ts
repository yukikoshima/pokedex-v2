import { z } from 'zod'

const typesSchema = z
  .object({
    name: z.string().nullable(),
    link: z.string().nullable(),
  })
  .array()
  .nullable()

export type Types = z.infer<typeof typesSchema>

export const pokemonInfoSchema = z.object({
  id: z.number().nullable(),
  img: z.string().nullable(),
  typesJa: typesSchema,
  name: z.string().nullable(),
  genera: z.string().nullable(),
  height: z.number().nullable(),
  weight: z.number().nullable(),
  flavorText: z.string().nullable(),
})

export type PokemonInfo = z.infer<typeof pokemonInfoSchema>
