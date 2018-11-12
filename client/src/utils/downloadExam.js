export default function(exam) {
  const { author, title, code, pass, time, image, cover, test } = exam
  let examDL = {
    author,
    title,
    code,
    pass,
    time,
    image,
    cover,
    test
  }
  let filename =
    title
      .toLowerCase()
      .trim()
      .replace(/\s/g, '-') + '.json'
  let str = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(examDL))}`
  let node = document.createElement('a')
  node.setAttribute('href', str)
  node.setAttribute('download', filename)
  document.body.appendChild(node)
  node.click()
  node.remove()
}
