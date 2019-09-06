const fs = require("fs");

const extractObjectValue = async(fileName, writeFileName) => {
  try {
    await fs.readFile(`./storage/${fileName}`, 'utf8', (err, data) => {
      if (err) return console.log(err)
      const target = JSON.parse(data)
      const results = []
      Object.keys(target).forEach(function (x, i) {
        Object.keys(target[x]).forEach(function (y, i) {
          if (typeof target[x][y] === 'object') {
            Object.keys(target[x][y]).forEach(function (z, i) {
              if (typeof target[x][y][z] === 'object') {
                Object.keys(target[x][y][z]).forEach(function (a, i) {
                  results.push(target[x][y][z][a])
                })
              } else {
                results.push(target[x][y][z])
              }
            })
          } else {
            results.push(target[x][y])
          }
        })
      })
      fs.writeFile(`./storage/${writeFileName}`, JSON.stringify(results), 'utf8', function (err) {
        if (err) return console.log(err)
      });
    })
  } catch (err) {
    return console.log(err)
  }
}

extractObjectValue('uk.json', 'uk-extracted.csv')