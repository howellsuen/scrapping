const fs = require("fs");

const jsonToCsv = require('./jsonToCsv')
const fitnessData = require('./fitness-all.json');

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const splitJson = async() => {
  try {
    const shuffledJson = shuffleArray(fitnessData)
    const randomPool = shuffledJson.slice(0, 80)
    for (let i = 80; i < 580; i += 100) {
      const randomData = shuffleArray(randomPool).slice(0, 30)
      const uniqueData = shuffledJson.slice(i, i + 100)
      await fs.writeFile(`./fitness-${i}.json`,
        JSON.stringify(uniqueData.concat(randomData)),
        function(err) {
          if (err) throw err;
          jsonToCsv(`fitness-${i}`)
        }
      )
    }
  } catch (err) {
    console.error(err);
  }
}

splitJson();