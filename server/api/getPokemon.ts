import Pokedex from 'pokedex-promise-v2'

export default defineEventHandler(async event => {
  const P = new Pokedex()
  const urlList1 = []
  const urlList2 = []
  for (let i = 1; i <= 30; i++) {
    urlList1.push(`/api/v2/pokemon/${i}`)
    urlList2.push(`/api/v2/pokemon-species/${i}`)
  }

  const res = await Promise.all([
    P.getResource(urlList1),
    P.getResource(urlList2),
  ])
    .then(res => {
      return res
    })
    .catch(err => {
      console.log('エラーだよん')
      console.log(err)
    })

  return res
})
