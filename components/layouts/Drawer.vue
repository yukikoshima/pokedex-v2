<template>
  <v-navigation-drawer v-model="isDrawer" width="265">
    <v-list nav>
      <v-list-group v-for="routeList in zukanRouteLists" :key="routeList.name">
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
            :to="routeList.link"
            :prepend-avatar="`/img/${routeList.icon}.png`"
            append-icon=""
          >
          </v-list-item>
        </template>
        <v-list-item
          v-for="route in routeList.routes"
          :key="route.name"
          :title="route.name"
          :to="route.link"
          exact
        >
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify'
import { zukanRouteLists } from '@/assets/js/zukanRouteLists.js'

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
</script>
