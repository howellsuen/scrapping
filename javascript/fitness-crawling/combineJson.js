const fs = require("fs");

const fitnessData = require('./fitness.json');
const sortedData = require('./fitness-sorted.json');

const combineJson = async() => {
  try {
    const results = fitnessData.map(x => {
      x.workoutPlan = sortedData.find(y => {
        return y.id === x.id;
      })["Workout Plan"].split(",").map(e => e.toLowerCase().trim());
      return x;
    });
    await fs.writeFile('./fitness-all.json',
      JSON.stringify(results),
      function(err) {
        if (err) throw err;
      }
    )
  } catch (err) {
    console.error(err);
  }
}

combineJson();