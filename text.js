jsonArray.forEach((e, index) => {
  let now = jsonArray[index].stats.map((e) => {
    return {
      name: e.stat.name,
      valor:  e.base_stat
    }
  })
  attributes.push(now)
})

