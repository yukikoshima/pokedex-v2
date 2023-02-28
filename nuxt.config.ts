// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'ja',
      },
      title: 'ポケモン図鑑',
      meta: [
        {
          name: 'description',
          content: 'ポケモンを見たり調べたり、しりとりもできるよ！',
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      youtube: process.env.YOUTUBE_API_KEY,
    },
  },
  modules: [
    // https://next.vuetifyjs.com/en/features/treeshaking/
    async (_, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', config => {
        config?.plugins?.push(
          vuetify({
            styles: { configFile: 'assets/scss/settings.scss' },
          })
        )
      })
    },
    '@nuxtjs/google-fonts',
  ],
  css: ['vuetify/styles'],
  build: {
    transpile: ['vuetify'],
  },
  vite: { ssr: { noExternal: ['vuetify'] } },
  googleFonts: {
    families: {
      Yomogi: [400],
    },
    download: false,
    useStylesheet: false,
  },
})
