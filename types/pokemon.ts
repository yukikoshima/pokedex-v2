export type Type = {
  name: string
  link: string
}

export type PokemonInfo = {
  id: number | null
  img: string | null
  typesJa: Type[] | null
  name: string | null
  genera: string | null
  height: number | null
  weight: number | null
  flavorText: string | null
}
