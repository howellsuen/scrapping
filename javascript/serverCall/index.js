const axios = require('axios')
const originalData = require('./data')
const specificData = require('./specificData')

const serverCall = async () => {
	const data = specificData
	try {
		for (let i = 0; i < data.length; i++) {
			// development
			// const res = await axios.post('http://payment-kw.mfoodpass.local/countries/kw/callback/notify/refire', data[i].json)
			// staging
			const res = await axios.post('https://payment-staging.mfoodpass.com/countries/kw/callback/notify/refire', data[i].json)
			// production
			// const res = await axios.post('https://payment-kw.mfoodpass.com/countries/kw/callback/notify/refire', data[i].json)
			console.log(i, res.data)
		}
	} catch (err) {
		console.log('Error:', err.response)
	}
	// const newData = data.filter(item => {
	// 	var b = item.json.root.action === "REN";
	// 	if (b) {
	// 		console.log(item.json.root.smsid);
	// 	}

	// 	return b;
	// })
	// console.log(newData)
}

serverCall()
