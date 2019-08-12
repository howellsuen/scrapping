const data = require('./fitness-all.json');

const readData = () => {
  console.log("count", data.length)
  console.log("type", data.reduce((acc, v) => {
    v.workoutDetails.trainingType.forEach((t) => {
      if (typeof acc[t] !== 'number') {
        acc[t] = 0
      }
      acc[t]++
    })
    return acc
  }, {}))

  console.log("equipment", data.reduce((acc, v) => {
    v.workoutDetails.equipment.forEach((t) => {
      if (typeof acc[t] !== 'number') {
        acc[t] = 0
      }
      acc[t]++
    })
    return acc
  }, {}))

  console.log("plan", data.reduce((acc, v) => {
    v.workoutPlan.forEach((t) => {
      if (typeof acc[t] !== 'number') {
        acc[t] = 0
      }
      acc[t]++
    })
    return acc
  }, {}))
}

readData()