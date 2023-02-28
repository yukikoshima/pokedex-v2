<template>
  <!-- min-width: iPhone5,se用に設定 -->
  <v-snackbar
    v-model="isSnackbar"
    timeout="1500"
    :location="location"
    min-width="304"
    color="error"
  >
    <p>{{ errMsg }}</p>
    <template #actions>
      <v-btn color="white" @click="hideSnackbar"> ✖️ </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify'

onMounted(() => {
  const { $bus } = useNuxtApp()
  $bus.$on('showSnackbar', msg => showSnackbar(msg))
})

const errMsg = ref('')
const isSnackbar = ref(false)

// デバイスによってbarを表示する位置を決定
const { width } = useDisplay()
const location = computed(() => {
  return width.value <= 414 ? 'center' : 'top right'
})

const showSnackbar = (msg: string) => {
  errMsg.value = msg
  isSnackbar.value = true
}

const hideSnackbar = () => {
  isSnackbar.value = false
}
</script>
