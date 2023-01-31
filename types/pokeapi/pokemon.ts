type Other = {
  'official-artwork': {
    front_default: string | null
  }
}

type Sprites = {
  other: Other
}

type NameAndUrl = {
  name: string | null
  url: string | null
}

type Types = {
  slot: number | null
  type: NameAndUrl
}

export type Pokemon = {
  id: number | null
  name: string | null
  sprites: Sprites
  types: Types[]
  height: number | null
  weight: number | null
}
