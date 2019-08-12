const fs = require("fs");

const fitnessData = require('./fitness-all.json');
// const fileNames = ['a', 'b', 'c', 'd'];

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
    for (let i = 0; i < 580; i += 145) {
      await fs.writeFile(`./fitness-${i}.json`,
        JSON.stringify(shuffledJson.slice(i, i + 145)),
        function(err) {
          if (err) throw err;
        }
      )
    }
  } catch (err) {
    console.error(err);
  }
}

splitJson();