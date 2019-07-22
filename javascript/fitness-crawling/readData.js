const data = require('./fitness.json');

const readData = () => {
	console.log("count", data.length)
	console.log("type", data.reduce((acc, v) => {
		v.workoutDetails.trainingType.forEach((t) => {
			if (typeof acc[t] !== 'number') {
				acc[t] = 1
			}
			acc[t]++
		})
		return acc
	}, {}))

	console.log("equipment", data.reduce((acc, v) => {
		v.workoutDetails.equipment.forEach((t) => {
			if (typeof acc[t] !== 'number') {
				acc[t] = 1
			}
			acc[t]++
		})
		return acc
	}, {}))
}

readData()