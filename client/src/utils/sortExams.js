export default function(a, b) {
  const textA = a.node.title.toUpperCase()
  const textB = b.node.title.toUpperCase()
  return textA < textB ? -1 : textA > textB ? 1 : 0
}
