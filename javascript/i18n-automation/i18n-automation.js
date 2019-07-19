const fs = require("fs");

const convertViewsToi18n = async (domain, views) => {
	try {
		await fs.mkdir(`./i18n-views/${domain}`, (err) => {
			if (err) return console.log(err);
		});
		views.map(e => {
			// console.log('e', e)
			fs.readFile(`./mainsite-views/${domain}/${e}`, 'utf8', (err, data) => {
				if (err) return console.log(err);

				let _json = require(`./mainsite-views/language/uk.json`);
				let _html = data;
				// console.log('_html', _html)
				Object.keys(_json).forEach(function (key, idx) {
					regKey = key.replace(new RegExp(/\|/, 'g'), '\\|');
					regKey = regKey.replace(new RegExp(/\?/, 'g'), '\\?');

					_html = _html.replace(new RegExp(`^\'${regKey}\'$`, 'g'), `"<%= t('${key}') %>"`);
					_html = _html.replace(new RegExp(`^\"${regKey}\"$`, 'g'), `"<%= t('${key}') %>"`);
					_html = _html.replace(new RegExp(`placeholder="${regKey}"`, 'g'), `placeholder="<%= t('${key}') %>"`);
					_html = _html.replace(new RegExp(`>${regKey}</`, 'g'), `><%= t('${key}') %></`);
					_html = _html.replace(new RegExp(`<%- t("<%= t('${regKey}') %>") %>`, 'g'), `<%- t('${key}') %>`);
				});

				fs.writeFile(`./i18n-views/${domain}/${e}.html`, _html, 'utf8', function (err) {
					if (err) return console.log(err);
				});
			})
		})
	} catch (err) {
		return console.log(err);
	}
};
const mfoodpassViews = [
	"index.html",
	"result.html",
	"favorite_cuisines.html",
	"featured_collection.html",
	"classic_recipe.html",
	"recipe_ingredients.html",
	"recipebook.html",
	"privacy.html",
	"terms.html",
	"contactus.html",
]
convertViewsToi18n('mfoodpass', mfoodpassViews);

// convertViewsToi18n().then(result => {
// 	console.log('result', result);
// 	fs.writeFile(
// 		`./i18n-views/${result.view}.html`,
// 		result.data,
// 		function (err) {
// 			if (err) throw err;
// 			console.log(`Done converting ${result.view}!`);
// 		}
// 	);
// });