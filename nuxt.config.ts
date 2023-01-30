// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  modules: [
    // https://next.vuetifyjs.com/en/features/treeshaking/
    // {styles: { configFile: 'assets/scss/settings.scss' }}
    async (_, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', config => {
        config?.plugins?.push(
          vuetify({ styles: { configFile: 'assets/scss/settings.scss' } })
        )
      })
    },
    '@nuxt/image-edge',
    '@nuxtjs/google-fonts',
  ],
  css: ['vuetify/styles', '@mdi/font/css/materialdesignicons.css'],
  // css: [
  //   'vuetify/lib/styles/main.sass',
  //   '@mdi/font/css/materialdesignicons.css',
  // ],
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
