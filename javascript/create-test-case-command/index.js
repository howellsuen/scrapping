const fs = require('fs');

const blogTestCaseList = [
    'SEO/SEO.blogArticle.client.spec.js',
    'SEO/SEO.blogArticle.server.spec.js',
    'SEO/SEO.blogIndex.client.spec.js',
    'SEO/SEO.blogIndex.server.spec.js',
    'Blog/Blog.AllType.localTest.client.spec.js',
    'Blog/Blog.AllType.localTest.server.spec.js',
    'Blog/Blog.article.localTest.client.spec.js',
    'Blog/Blog.article.localTest.server.spec.js',
    'Blog/Blog.index.localTest.client.spec.js',
    'Blog/Blog.index.localTest.server.spec.js',
];
const seoTestCaseList = [
    'SEO/SEO.global.spec.js',
    'SEO/SEO.index.spec.js',
    'SEO/SEO.subpage.client.spec.js',
    'SEO/SEO.subpage.server.spec.js',
    'SEO/SEO.tool.client.spec.js',
    'SEO/SEO.tool.server.spec.js',
];
const blogLangList = [
    "de",
    "en",
    "es",
    "gr",
    "it",
    "pt"
];
const seoLangList = [
    "en",
    "de",
    "zh-CN",
    "zh-TW",
    "ko",
    "es",
    "fr",
    "hi",
    "id",
    "it",
    "ms-MY",
    "nb",
    "pl",
    "pt",
    "ru",
    "th",
    "tr",
    "uk",
    "vi",
    "ja",
    "nl",
    "sv",
    "da",
    "gr",
    // "ar",
];

const createTestCaseCommand = async () => {
    try {
        let env = 'dev';
        let blogCommandText = '';
        blogTestCaseList.forEach(name => {
            blogLangList.forEach(lang => {
                blogCommandText = `${blogCommandText} npm run cy:run -- --env language=${lang},NODE_ENV=${env} --spec cypress/integration/${name} >> Output.txt;\n`
            })
            blogCommandText = `${blogCommandText}\n\n`
            // return true;
            // return name === "Blog/Blog.AllType.localTest.server.spec.js";
        })
        console.log('blogCommandText', blogCommandText)
        await fs.writeFile('./blog-command.txt',
            blogCommandText,
            function(err) {
            if (err) throw err;
            }
        )
        let seoCommandText = '';
        seoTestCaseList.forEach(name => {
            seoLangList.forEach(lang => {
                seoCommandText = `${seoCommandText} npm run cy:run -- --env language=${lang},NODE_ENV=${env} --spec cypress/integration/${name} >> Output.txt;\n`
            })
            seoCommandText = `${seoCommandText}\n\n`
            // return true;
            // return name === "SEO/SEO.blogArticle.server.spec.js";
        })
        console.log('seoCommandText', seoCommandText)
        await fs.writeFile('./seo-command.txt',
            seoCommandText,
            function(err) {
            if (err) throw err;
            }
        )
        let enCommandText = '';
        seoTestCaseList.forEach(name => {
            enCommandText = `${enCommandText} npm run cy:run -- --env language=en,NODE_ENV=${env} --spec cypress/integration/${name} >> Output.txt;\n`
        })
        blogTestCaseList.forEach(name => {
            enCommandText = `${enCommandText} npm run cy:run -- --env language=en,NODE_ENV=${env} --spec cypress/integration/${name} >> Output.txt;\n`
        })
        await fs.writeFile('./en-command.txt',
            enCommandText,
            function(err) {
            if (err) throw err;
        }
    )
    } catch (err) {
        console.error(err);
    }
}

createTestCaseCommand();