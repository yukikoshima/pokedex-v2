<template>
  <v-main>
    <v-container>
      <h1>index.vue</h1>
      {{ dd.id }}
      <div v-for="post in posts" :key="post.id">
        <h2>{{ post.id }}:{{ post.title }}</h2>
        <p>{{ post.body }}</p>
      </div>
      <div ref="observe_element">この要素を監視します</div>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { PokemonClient } from 'pokenode-ts'

const posts = ref([])
const page = ref(1)

const api = new PokemonClient()
const dd = await api.getPokemonById(1)
const getPosts = async () => {
  const res = await $fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page.value++}`
  )
  posts.value = [...posts.value, ...res]
  return posts
}

const observe_element = ref(null)
onMounted(() => {
  const observer = new IntersectionObserver(entries => {
    const entry = entries[0]
    if (entry && entry.isIntersecting) {
      console.log('画面に入ったよ')
      getPosts()
    }
  })
  observer.observe(observe_element.value)
  return observe_element
})
</script>
