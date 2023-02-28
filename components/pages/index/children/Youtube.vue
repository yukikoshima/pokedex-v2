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
            v-for="(youtube, i) in youtubes"
            :key="i"
            cols="12"
            lg="6"
            md="6"
            sm="12"
            xs="12"
          >
            <div class="youtube">
              <!-- v-imgだと動画を読み込めない -->
              <img
                :id="`youtube_${i}`"
                ref="youtubeRefs"
                :src="youtube.url"
                :alt="youtube.title"
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
  data: youtubes,
  pending,
  error,
} = await useFetch('/api/youtube/youtube')

const youtubeRefs = ref([])
const youtubePlay = (i: number) => {
  const el = youtubeRefs.value[i] as HTMLImageElement

  if (!youtubes.value) return
  el.outerHTML =
    `<iframe src="https://www.youtube.com/embed/${youtubes.value[i].videoId}"` +
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
