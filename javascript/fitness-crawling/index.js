const puppeteer = require("puppeteer");
const fs = require("fs");
// const ytdl = require('ytdl-core');
const uuidv1 = require('uuid/v1');

const crawlFitnessData = async () => {
	try {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		const results = []

		for (let pageNum = 1; pageNum <= 29; pageNum++) {
			await page.goto(
				`https://www.fitnessblender.com/videos?page=${pageNum}`
			);
			// execute standard javascript in the context of the page.
			const videoPageLinks = await page.$$eval('div.video-item a.contents', anchors => [].map.call(anchors, a => a.href));
			console.log(`videoPageLinks-${pageNum}`, videoPageLinks);
			for (const videoPageLink of videoPageLinks) {
				console.log('videoPageLink', videoPageLink)
				await page.goto(
					videoPageLink
				);
				const workoutDetails = await page.evaluate(() => {
					const detailList = document.querySelector("ul.details-list");
					const detailObject = {}
					detailObject.duration = detailList.children[0].children[1].textContent
					detailObject.calorieBurn = detailList.children[1].children[1].textContent
					detailObject.difficulty = detailList.children[2].children[1].textContent
					detailObject.equipment = detailList.children[3].children[1].textContent.split(",").map(e => e.trim())
					detailObject.trainingType = detailList.children[4].children[1].textContent.split(",").map(e => e.trim())

					const bodyFocus = document.querySelector("div.core-focus span.demi").textContent;
					const bodyFocusIconClassName = document.querySelector("div.core-focus i").classList[1]
					detailObject.bodyFocus = bodyFocus
					detailObject.bodyFocusIconClassName = bodyFocusIconClassName

					return detailObject
				})
				const id = uuidv1()
				const title = await page.$eval('header#videoArticle h1.heading', h1 => h1.textContent)
				const videoUrl = await page.$eval('div.responsive-video iframe', iframe => iframe.src)
				// await ytdl(videoUrl, { filter: (format) => format.container === 'mp4', quality: 'highest' })
				// 	.pipe(fs.createWriteStream(`./videos/${id}_video.mp4`));
				// const videoStoragePath = `videos/${id}_video.mp4`
				results.push({
					id,
					title,
					workoutDetails,
					videoUrl,
					// videoStoragePath
				})
			}
			await fs.writeFile('./fitness.json',
				JSON.stringify(results),
				function (err) {
					if (err) throw err;
				}
			)
		}
		await browser.close();
	} catch (err) {
		console.log('err', err)
	}
}

crawlFitnessData();