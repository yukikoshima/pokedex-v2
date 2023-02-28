import { z } from 'zod'

const itemsSchema = z.object({
  items: z.array(
    z.object({
      id: z.object({
        videoId: z.string(),
      }),
      snippet: z.object({
        title: z.string(),
        thumbnails: z.object({
          medium: z.object({
            url: z.string(),
          }),
        }),
      }),
    })
  ),
})

const youtubeSchema = z.object({
  title: z.string(),
  videoId: z.string(),
  url: z.string(),
})

const youtubesSchema = z.array(youtubeSchema).nullable()

type Youtubes = z.infer<typeof youtubesSchema>

export default defineEventHandler(async () => {
  console.log('api/youtube: 実行')

  const key = useRuntimeConfig().public.youtube
  const url =
    'https://www.googleapis.com/youtube/v3/search?part=snippet&q=ポケモンSV&order=rating&key='

  const youtubes: Youtubes = await $fetch(`${url}${key}`).then(res => {
    const items = itemsSchema.safeParse(res)
    if (!items.success) return null

    const data = items.data.items.map(v => {
      return {
        title: v.snippet.title,
        videoId: v.id.videoId,
        url: v.snippet.thumbnails.medium.url,
      }
    })

    return data
  })

  return youtubes
})
