<template>
  <div class="text-center">
    <div class="mt-10">
      <template v-if="pending">
        <p class="text-lg-h4 text-md-h4 text-sm-h6 text-caption">
          youtube動画をダウンロード中だよ
        </p>
      </template>
      <template v-else-if="error">
        <p class="text-lg-h5 text-md-h5 text-sm-h6 text-caption">
          動画をダウンロードできなかったよ
        </p>
      </template>
      <template v-else>
        <p class="text-md-h5">youtubeで評価が高い動画</p>
        <v-row dense>
          <v-col
            v-for="(url, i) in urls"
            :key="i"
            cols="12"
            lg="6"
            md="6"
            sm="12"
            xs="12"
          >
            <div class="youtube">
              <img
                :id="`youtube_${i}`"
                ref="youtubeRefs"
                :src="url"
                :alt="url.name"
                loading="lazy"
                @click="youtubePlay(i)"
              />
            </div>
          </v-col>
        </v-row>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
const {
  data: youtube,
  pending,
  error,
} = await useFetch('/api/youtube/youtube', { pick: ['items'] })

let urls: string[] = []
let ids: string[] = []
console.log(youtube.value)
if (youtube.value) {
  urls = youtube.value.items.map(v => v.snippet.thumbnails.medium.url)
  ids = youtube.value.items.map(v => v.id.videoId)
}

const youtubeRefs = ref([])
const youtubePlay = (i: string) => {
  const el = youtubeRefs.value[+i] as HTMLImageElement

  if (!el) return
  el.outerHTML =
    `<iframe src="https://www.youtube.com/embed/${ids[i]}"` +
    'title="YouTube video player" frameborder="0" allow="accelerometer;' +
    'autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"' +
    'allowfullscreen></iframe>'
}
</script>

<style>
.youtube img {
  width: 100%;
  aspect-ratio: 16 / 9;
  cursor: pointer;
}

.youtube iframe {
  width: 100%;
  aspect-ratio: 16 / 9;
}
</style>
