import { Ref } from 'vue'

const useShiritori = () => {
  // 全ポケモンの名前
  const pokemonsName = useState<string[]>('pokemonsName', () => [])
  // 「ン]で終わらないポケモンの名前
  const pokemonsNameEndNNot = useState<string[]>(
    'pokemonsNameEndNNot',
    () => []
  )
  // const id = ref(0)
  // const searchWord = ref('')
  // const prevPokemon = ref('')
  // const savePokemons = ref<string[]>([]) // しりとりで出たポケモンを保存
  // const enemyLavel = ref('') // 敵のレベル
  // const myTurnTimes = ref(0) // 自分のターンの回数
  // const enemyTurnTimes = ref(0) // 敵のターンの回数
  // const enemyTurnMax = ref(0) // 敵の強さによってターンの上限を決める
  // const errMsg = ref('')
  return {
    pokemonsName,
    pokemonsNameEndNNot,
    setPokemonsName: setPokemonsName(pokemonsName),
    setPokemonsNameEndNNot: setPokemonsNameEndNNot(pokemonsNameEndNNot),
  }
}

const setPokemonsName = (pokemonsName: Ref<string[]>) => {
  return (pokemonsNameData: string[]) => {
    pokemonsName.value = pokemonsNameData
  }
}

const setPokemonsNameEndNNot = (pokemonsNameEndNNot: Ref<string[]>) => {
  return (pokemonsNameData: string[]) => {
    pokemonsNameEndNNot.value = pokemonsNameData
  }
}

export default useShiritori
