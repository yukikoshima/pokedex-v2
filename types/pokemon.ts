export type Type = {
  [key: number]: {
    name: string
    link: string
  }
}

export type PokemonInfo = {
  id: number | undefined
  img: string | undefined
  typesJa: Type[] | undefined
  name: string | undefined
  genera: string | undefined
  height: number | undefined
  weight: number | undefined
  flavorText: string | undefined
}
