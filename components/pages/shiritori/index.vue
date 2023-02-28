<template>
  <v-main>
    <v-container fluid>
      <header class="text-center">
        <h1>ポケモンしりとり</h1>
      </header>
      <main class="mt-5">
        <section>
          <h3 class="text-center">てきのつよさ</h3>
          <div
            class="d-flex justify-center align-center flex-sm-row flex-column"
          >
            <v-btn
              v-for="route in routeList"
              :key="route.name"
              :to="route.link"
              :color="route.color"
              variant="outlined"
              class="ma-2"
              >{{ route.name }}</v-btn
            >
          </div>
        </section>
        <section class="mt-5">
          <h3 class="text-center">るーる</h3>
          <div class="d-flex justify-center align-center">
            <ul class="pt-2">
              <li
                v-for="(rule, i) in ruleList"
                :key="i"
                class="pb-3"
                v-html="rule"
              ></li>
            </ul>
          </div>
        </section>
        <section class="mt-5">
          <h3 class="text-center">はんてい</h3>
          <div class="d-flex justify-center align-center">
            <ul class="pt-2">
              <li v-for="(judg, i) in judgList" :key="i" class="pb-3">
                {{ judg }}
              </li>
            </ul>
          </div>
        </section>
      </main>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import { routeList } from '~~/assets/js/shiritori/routeList.js'
import { ruleList } from '~~/assets/js/shiritori/ruleList.js'
import { judgList } from '~~/assets/js/shiritori/judgList.js'
</script>
