const fs = require("fs");

const blogTestCaseList = [
  "SEO/SEO.blogArticle.client.spec.js",
  "SEO/SEO.blogArticle.server.spec.js",
  "SEO/SEO.blogIndex.client.spec.js",
  "SEO/SEO.blogIndex.server.spec.js",
  "Blog/Blog.AllType.client.spec.js",
  "Blog/Blog.AllType.server.spec.js",
  "Blog/Blog.article.client.spec.js",
  "Blog/Blog.article.server.spec.js",
  "Blog/Blog.index.client.spec.js",
  "Blog/Blog.index.server.spec.js",
];
const seoTestCaseList = [
  "SEO/SEO.global.spec.js",
  "SEO/SEO.index.spec.js",
  "SEO/SEO.subpage.client.spec.js",
  "SEO/SEO.subpage.server.spec.js",
  "SEO/SEO.tool.client.spec.js",
  "SEO/SEO.tool.server.spec.js",
];
const footerList = [
  "Footer/footer.home.client.spec.js",
  "Footer/footer.home.server.spec.js",
  "Footer/footer.profile.client.spec.js",
  "Footer/footer.subpages.client.spec.js",
  "Footer/footer.subpages.server.spec.js",
  "Footer/footer.tools.client.spec.js",
  "Footer/footer.tools.server.spec.js",
];
const headerList = [
  "Header/header.home.client.spec.js",
  "Header/header.home.server.spec.js",
  "Header/header.profile.client.spec.js",
  "Header/header.subpages.client.spec.js",
  "Header/header.subpages.server.spec.js",
  "Header/header.tools.client.spec.js",
  "Header/header.tools.server.spec.js",
];
const pathList = [
  "Path/AbsolutePathTest.blog_articles.client.spec.js",
  "Path/AbsolutePathTest.blog_articles.server.spec.js",
  "Path/AbsolutePathTest.blog_feature.client.spec.js",
  "Path/AbsolutePathTest.blog_index.server.spec.js",
  "Path/AbsolutePathTest.index.spec.js",
  "Path/AbsolutePathTest.subpage.client.spec.js",
  "Path/AbsolutePathTest.subpage.server.spec.js",
  "Path/AbsolutePathTest.tool.client.spec.js",
  "Path/AbsolutePathTest.tool.server.spec.js",
];
const profileList = ["Profile/Profile.spec.js"];
const sitemapList = ["Sitemap/sitemap.spec.js"];
const subpageList = [
  "SubPages/404.spec.js",
  "SubPages/Archived",
  "SubPages/Contact.spec.js",
  "SubPages/EmailVerificationModal.spec.js",
  "SubPages/Home.spec.js",
  "SubPages/LanguageSwitchModal.client.spec.js",
  "SubPages/LanguageSwitchModal.server.spec.js",
  "SubPages/LinuxBios.spec.js",
  "SubPages/LoginModal.spec.js",
  "SubPages/PaymentModal.spec.js",
  "SubPages/Pricing.spec.js",
  "SubPages/Privacy.spec.js",
  "SubPages/Pro.spec.js",
  "SubPages/Profile.spec.js",
  "SubPages/ResetPassword.spec.js",
  "SubPages/Share.spec.js",
  "SubPages/Terms.spec.js",
  "SubPages/WebIntegration.spec.js",
  "SubPages/WhyLinuxIsBetter.spec.js",
];
const toolList = [
  "Tools/AddWatermark.spec.js",
  "Tools/CompressPDF.spec.js",
  "Tools/DeletePages.spec.js",
  "Tools/ESignPDF.spec.js",
  "Tools/ExcelToPDF.spec.js",
  "Tools/HtmlToPdf.spec.js",
  "Tools/JpgToPdf.spec.js",
  "Tools/MergePDF.spec.js",
  "Tools/NumberPages.spec.js",
  "Tools/PDFtoWord.spec.js",
  "Tools/PPTtoPDF.spec.js",
  "Tools/PdfConverter.spec.js",
  "Tools/PdfReader.spec.js",
  "Tools/PdfToExcel.spec.js",
  "Tools/PdfToJpg.spec.js",
  "Tools/PdfToPdfa.spec.js",
  "Tools/PdfToPng.spec.js",
  "Tools/PdfToPpt.spec.js",
  "Tools/ProtectPDF.spec.js",
  "Tools/RepairPDF.spec.js",
  "Tools/RotatePDF.spec.js",
  "Tools/ShareDocument.spec.js",
  "Tools/SplitPDF.spec.js",
  "Tools/UnlockPDF.spec.js",
  "Tools/WordToPDF.spec.js",
];
const blogLangList = ["en", "de", "es", "gr", "it", "pt"];
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
    let env = "dev";

    // let blogCommandText = "";
    // blogTestCaseList.forEach((name) => {
    //   blogLangList.forEach((lang) => {
    //     blogCommandText = `${blogCommandText} npm run cy:run -- --env language=${lang},NODE_ENV=${env} --spec cypress/integration/${name} >> Output.txt;\n`;
    //   });
    //   blogCommandText = `${blogCommandText}\n\n`;
    //   // return true;
    //   // return name === "Blog/Blog.AllType.server.spec.js";
    // });
    // console.log("blogCommandText", blogCommandText);
    // await fs.writeFile("./blog-command.txt", blogCommandText, function (err) {
    //   if (err) throw err;
    // });

    // let seoCommandText = "";
    // seoTestCaseList.forEach((name) => {
    //   seoLangList.forEach((lang) => {
    //     seoCommandText = `${seoCommandText} npm run cy:run -- --env language=${lang},NODE_ENV=${env} --spec cypress/integration/${name} >> Output.txt;\n`;
    //   });
    //   seoCommandText = `${seoCommandText}\n\n`;
    //   // return true;
    //   // return name === "SEO/SEO.blogArticle.server.spec.js";
    // });
    // console.log("seoCommandText", seoCommandText);
    // await fs.writeFile("./seo-command.txt", seoCommandText, function (err) {
    //   if (err) throw err;
    // });

    let lang = "en";
    let commandText = "";
    seoTestCaseList.forEach((name) => {
      commandText = `${commandText} npm run cy:run -- --env language=${lang},NODE_ENV=${env} --spec cypress/integration/${name} >> Output.txt;\n`;
    });
    commandText = `${commandText}\n`;
    blogTestCaseList.forEach((name) => {
      commandText = `${commandText} npm run cy:run -- --env language=${lang},NODE_ENV=${env} --spec cypress/integration/${name} >> Output1.txt;\n`;
    });
    commandText = `${commandText}\n`;
    footerList.forEach((name) => {
      commandText = `${commandText} npm run cy:run -- --env language=${lang},NODE_ENV=${env} --spec cypress/integration/${name} >> Output2.txt;\n`;
    });
    commandText = `${commandText}\n`;
    headerList.forEach((name) => {
      commandText = `${commandText} npm run cy:run -- --env language=${lang},NODE_ENV=${env} --spec cypress/integration/${name} >> Output3.txt;\n`;
    });
    commandText = `${commandText}\n`;
    pathList.forEach((name) => {
      commandText = `${commandText} npm run cy:run -- --env language=${lang},NODE_ENV=${env} --spec cypress/integration/${name} >> Output4.txt;\n`;
    });
    commandText = `${commandText}\n`;
    profileList.forEach((name) => {
      commandText = `${commandText} npm run cy:run -- --env language=${lang},NODE_ENV=${env} --spec cypress/integration/${name} >> Output5.txt;\n`;
    });
    sitemapList.forEach((name) => {
      commandText = `${commandText} npm run cy:run -- --env language=${lang},NODE_ENV=${env} --spec cypress/integration/${name} >> Output5.txt;\n`;
    });
    commandText = `${commandText}\n`;
    subpageList.forEach((name) => {
      commandText = `${commandText} npm run cy:run -- --env language=${lang},NODE_ENV=${env} --spec cypress/integration/${name} >> Output6.txt;\n`;
    });
    commandText = `${commandText}\n`;
    toolList.forEach((name) => {
      commandText = `${commandText} npm run cy:run -- --env language=${lang},NODE_ENV=${env} --spec cypress/integration/${name} >> Output7.txt;\n`;
    });
    await fs.writeFile(
      `./${lang}-${env}-command.txt`,
      commandText,
      function (err) {
        if (err) throw err;
      }
    );
  } catch (err) {
    console.error(err);
  }
};

createTestCaseCommand();
