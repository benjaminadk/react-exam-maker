export default function removeTypename(obj) {
  Object.keys(obj).forEach(key1 => {
    key1 === '__typename' && delete obj[key1]
    Array.isArray(obj[key1]) &&
      obj[key1].forEach(el => {
        typeof el === 'object' && removeTypename(el)
      })
  })
  return obj
}
