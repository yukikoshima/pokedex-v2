export default defineEventHandler(async event => {
  console.log('api/youtube: 実行')

  const config = useRuntimeConfig()
  const key = config.public.youtube

  const url =
    'https://www.googleapis.com/youtube/v3/search?part=snippet&q=ポケモンユナイト&order=rating&key='

  const youtube = await $fetch(`${url}${key}`)
    .then(res => res)
    .catch(err => err)

  return youtube
})
