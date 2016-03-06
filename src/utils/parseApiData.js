export default function parseApiData(data) {
  let xs = []
  let ys = []
  data.hits.forEach((hit) => {
    xs.push(hit.key)
    ys.push(hit.doc_count + Math.random() * 10)
  })

  return {
    xs,
    ys
  }
}
