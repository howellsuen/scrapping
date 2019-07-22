const fs = require("fs");
const ytdl = require('ytdl-core');
const data = require('./fitness.json');

async function asyncSleep(t) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve()
		}, t)
	})
}

const videoDownload = async () => {
	for (let e of data) {
		try {
			if (fs.existsSync(`./videos/${e.id}_video.mp4`)) {
				console.log(`Skip downloading ${e.videoUrl}, existing file found`);
				continue;
			}
			console.log(`Start async sleep`);
			await asyncSleep(10000)
			ytdl(e.videoUrl, { filter: (format) => format.container === 'mp4', quality: 'highest' }).pipe(
				fs.createWriteStream(`./videos/${e.id}_video.mp4`));
			console.log(`Done downloading ${e.videoUrl}`);
		} catch (err) {
			console.error(`${e.videoUrl} has errors`, err.message)
		}
	}

}

videoDownload();