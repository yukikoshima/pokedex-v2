type NameAndUrl = {
  name: string | null
  url: string | null
}

export type FlavorText = {
  flavor_text: string | null
  language: NameAndUrl
  version: NameAndUrl
}

export type Genera = {
  genus: string | null
  language: NameAndUrl
}

export type Names = {
  language: NameAndUrl
  name: string | null
}

export type PokemonSpecies = {
  flavor_text_entries: FlavorText[]
  genera: Genera[]
  id: number | null
  names: Names[]
}

export type T = FlavorText | Genera | Names
