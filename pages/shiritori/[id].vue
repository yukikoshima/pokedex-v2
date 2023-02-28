<template>
  <v-main>
    <v-container fluid>
      <header class="text-center">
        <h1>ポケモンしりとり</h1>
      </header>
      <template v-if="pending">
        <p>ポケモンダウンロード中</p>
      </template>
      <template v-else-if="error">
        <p>ポケモンをロードできませんでした。</p>
        <v-btn @click="refresh"> 再取得 </v-btn>
      </template>
      <template v-else-if="data">
        <main class="pt-10">
          <v-row justify="center">
            <v-col cols="12" md="6" lg="6">
              <v-text-field
                v-model="word"
                label="だすポケモンをきめよう！！"
                hide-details
                clearable
                dense
                @keypress.enter="myTurn"
              >
                <template #append>
                  <v-btn color="primary" variant="outlined" @click="myTurn"
                    >きみにきめた！</v-btn
                  >
                </template>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" md="3" lg="3">
              <div class="text-center">
                <v-btn color="green" variant="outlined" @click="reStart"
                  >はじめから</v-btn
                >
              </div>
            </v-col>
            <v-col cols="12" md="3" lg="3">
              <div class="text-center">
                <v-btn color="red" variant="outlined" @click="giveUp"
                  >こうさんする</v-btn
                >
              </div>
            </v-col>
          </v-row>
        </main>
        <footer>
          <v-row justify="center">
            <v-col cols="12" md="6" lg="6">
              <table width="100%">
                <tbody>
                  <tr v-for="(name, i) in reverseSavePokemons" :key="i">
                    <td>{{ reverseSavePokemons.length - i }}</td>
                    <td>
                      {{ i % 2 === 0 ? 'CPU' : 'あなた' }}
                    </td>
                    <td>{{ name }}</td>
                  </tr>
                </tbody>
              </table>
            </v-col>
          </v-row>
        </footer>
      </template>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
const reverseSavePokemons = computed(() => {
  return savePokemons.value.slice().reverse()
})

/** データ取得 */
type Type = {
  name: String
}
const { data, error, pending, refresh } = await useFetch(
  '/api/pokemon/pokemonsNameQuery'
)
const allPokemonsName = ref<string[]>([])
const pokemonsNameEndNNot = ref<string[]>([])
if (data.value) {
  allPokemonsName.value = data.value.map((v: Type) => v.name)
  const res = data.value
    .filter((v: Type) => !v.name.endsWith('ン'))
    .map((v: Type) => v.name)

  pokemonsNameEndNNot.value = res
}

/** 敵の強さ */
const route = useRoute()
const enemyLavel = route.params.id
let enemyTurnMax = 0 // 敵のターンの回数
switch (enemyLavel) {
  case 'veryEasy':
    enemyTurnMax = 20
    break
  case 'easy':
    enemyTurnMax = 60
    break
  case 'normal':
    enemyTurnMax = 151
    break
  case 'hard':
    enemyTurnMax = 350
    break
  case 'veryHard':
    enemyTurnMax = 500
    break
  default:
    break
}

const { $bus } = useNuxtApp()
const savePokemons = ref<string[]>([]) // しりとりで出たポケモンを保存
const prevPokemon = ref('') // 次の人が参照するため
const enemyTurnTimes = ref(0)

// CPU: 取得するポケモンのidを生成
const getId = (n: number) => {
  return Math.floor(Math.random() * n)
}

// CPU: しりとりで出したポケモンをセット
const addSavePokemons = (names: string[]) => {
  const id = getId(names.length)
  const name = names[id]
  savePokemons.value.push(name)
  prevPokemon.value = name
  const res = pokemonsNameEndNNot.value.filter(v => v !== name)
  pokemonsNameEndNNot.value = res
  enemyTurnTimes.value++
}

/** CPU: 初手 */
onMounted(() => {
  addSavePokemons(pokemonsNameEndNNot.value)
})

/** cpu: ランダムでポケモンを取得する */
const enemyTurn = () => {
  const removeEndName = removeEndNameIfNeeded(prevPokemon.value)
  const first = removeEndName.slice(-1)
  const res = pokemonsNameEndNNot.value.filter(v => v.startsWith(first))

  if (res.length) {
    addSavePokemons(res)
  } else {
    // TODO 負けの処理
    navigateTo('/shiritori/lose')
  }
}

// 自分のターンの処理
const word = ref('')
const myTurn = () => {
  // 空文字、空白文字の場合はエラー
  if (!word.value || !word.value.trim().length) {
    $bus.$emit('showSnackbar', 'ポケモンの名前をいれてみてね。')
    word.value = ''
    return
  }

  const kana = hiraToKana(word.value)
  let isExists = true

  // 入力したポケモン名が存在しない場合
  isExists = allPokemonsName.value.includes(kana)
  if (!isExists) {
    $bus.$emit('showSnackbar', `「${kana}」はそんざいしないポケモンだよ！`)
    word.value = ''
    return
  }
  // すでにいったポケモンの場合
  isExists = savePokemons.value.includes(kana)
  if (isExists) {
    $bus.$emit('showSnackbar', `「${kana}」はすでにいったポケモンだよ!`)
    word.value = ''
    return
  }
  // 末尾が「長音」や「すてがな」、特殊なポケモンなら加工する 例: ニドラン♂やカイリュー
  const removeEndName = removeEndNameIfNeeded(prevPokemon.value)
  // 末尾に「ン」がついていたら負け
  if (removeEndName.endsWith('ン')) {
    $bus.$emit('showSnackbar', '君の負けだよ！またチャンレンジしてみよう！')
    navigateTo('/shiritori')
    return
  }
  // しりとりが成立していない場合
  const end = removeEndName.slice(-1)
  if (!kana.startsWith(end)) {
    $bus.$emit('showSnackbar', `「${end}」からはじまるポケモンをいってね！`)
    word.value = ''
    return
  }

  savePokemons.value.push(kana)
  prevPokemon.value = kana
  word.value = ''

  const res = pokemonsNameEndNNot.value.filter(v => v !== kana)
  pokemonsNameEndNNot.value = res

  if (enemyTurnTimes.value < enemyTurnMax) {
    enemyTurn()
  } else {
    // TODO 勝利
    navigateTo('/shiritori/win')
  }
}

// 変数を初期化する
const variableClear = () => {
  savePokemons.value.length = 0
  prevPokemon.value = ''
  enemyTurnTimes.value = 0
  word.value = ''
}

const reStart = () => {
  variableClear()
  pokemonsNameEndNNot.value = allPokemonsName.value
  addSavePokemons(pokemonsNameEndNNot.value)
}

const giveUp = () => {
  navigateTo('/shiritori/lose')
}
</script>

<style scoped>
table {
  border-collapse: collapse;
}
th,
td {
  padding: 5px;
  border: 1px solid #333;
}
</style>
