export default function parseApiData(data) {
  let xs = []
  let ys = []
  data.hits.forEach((hit) => {
    xs.push(hit.key)
    ys.push(hit.doc_count + Math.random() * 10000)
  })

  return {
    xs,
    ys
  }
}
