<template>
  <v-navigation-drawer v-model="isDrawer" app clipped bottom>
    <v-list nav>
      <v-list-group v-for="routeList in routeLists" :key="routeList.name">
        <template #activator="{ props }">
          <v-list-item
            v-if="routeList.routes"
            v-bind="props"
            :title="routeList.name"
            :prepend-avatar="`/img/${routeList.icon}.png`"
          >
          </v-list-item>
          <v-list-item
            v-else
            :title="routeList.name"
            :subtitle="routeList.isDisabled ? 'ポケモンダウンロード中' : ''"
            :to="routeList.link"
            :disabled="routeList.isDisabled"
            :prepend-avatar="`/img/${routeList.icon}.png`"
            append-icon=""
          >
          </v-list-item>
        </template>
        <v-list-item
          v-for="route in routeList.routes"
          :key="route.name"
          :title="route.name"
          :subtitle="route.isDisabled ? 'ポケモンダウンロード中' : ''"
          :to="route.link"
          :disabled="route.isDisabled"
          exact
        >
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useDisplay } from 'vuetify'
// import { routeLists } from '@/assets/js/routeLists.js'

// drawerの表示・非表示
const isDrawer = ref(true)
onMounted(() => {
  const { $bus } = useNuxtApp()
  $bus.$on('switchDrawer', switchDrawer)
})
const switchDrawer = () => {
  isDrawer.value = !isDrawer.value
}

// mobaileのときは初期表示しない
const { mobile } = useDisplay()
if (mobile.value) isDrawer.value = false

const routeLists = [
  {
    name: 'ポケモン図鑑',
    icon: 'icon_pokemonzukan',
    routes: [
      {
        name: '全世代',
        link: '/zukan',
        isDisabled: false,
      },
      {
        name: '赤・緑・青・ピカチュー',
        link: '/zukan/rgbp',
        isDisabled: true,
      },
      {
        name: '金・銀',
        link: '/zukan/gs',
        isDisabled: true,
      },
      {
        name: 'ルビー・サファイア',
        link: '/zukan/rs',
        isDisabled: true,
      },
      {
        name: 'ダイヤモンド・パール',
        link: '/zukan/dp',
        isDisabled: true,
      },
      {
        name: 'ブラック・ホワイト',
        link: '/zukan/bw',
        isDisabled: true,
      },
      {
        name: 'X・Y',
        link: '/zukan/xy',
        isDisabled: true,
      },
      {
        name: 'サン・ムーン',
        link: '/zukan/sm',
        isDisabled: true,
      },
      {
        name: 'Lets Go! ピカブイ',
        link: '/zukan/pv',
        isDisabled: true,
      },
      {
        name: 'ソード・シールド',
        link: '/zukan/swsh',
        isDisabled: true,
      },
    ],
  },
  {
    name: 'しりとり',
    icon: 'icon_pikachu',
    link: '/shiritori',
    isDisabled: true,
  },
]

// computed: {
//     ...mapGetters({ pokemons: pokemonZukanType.GETTER_POKEMONS }),
// },

// watch: {
//   pokemons(newValue: PokemonInfo[]) {
//     if (newValue.length >= 151) {
//       this.routeLists[0].routes[1].isDisabled = false
//     }
//     if (newValue.length >= 251) {
//       this.routeLists[0].routes[2].isDisabled = false
//     }
//     if (newValue.length >= 386) {
//       this.routeLists[0].routes[3].isDisabled = false
//     }
//     if (newValue.length >= 493) {
//       this.routeLists[0].routes[4].isDisabled = false
//     }
//     if (newValue.length >= 649) {
//       this.routeLists[0].routes[5].isDisabled = false
//     }
//     if (newValue.length >= 721) {
//       this.routeLists[0].routes[6].isDisabled = false
//     }
//     if (newValue.length >= 807) {
//       this.routeLists[0].routes[7].isDisabled = false
//     }
//     if (newValue.length >= 809) {
//       this.routeLists[0].routes[8].isDisabled = false
//     }
//     if (newValue.length >= 898) {
//       this.routeLists[0].routes[9].isDisabled = false
//     }
//     if (newValue.length >= 350) {
//       this.routeLists[1].isDisabled = false
//     }
//   },
// },
</script>
