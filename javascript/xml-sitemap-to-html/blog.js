const moment = require('moment');
const exec = require('child_process').exec;

const toolList = [
    'sign-pdf',
    'pdf-to-word',
    'pdf-to-excel',
    'pdf-to-ppt',
    'pdf-to-png',
    'pdf-to-pdfa',
    'merge-pdf',
    'split-pdf',
    'word-to-pdf',
    'jpg-to-pdf',
    'excel-to-pdf',
    'ppt-to-pdf',
    'compress-pdf',
    'add-page-numbers-to-pdf'
];

const curlBlog = (domain) => {
    const now = moment().format()
    const directoryName = `blog-${domain}-${now}`
    toolList.forEach(e => {
        const url = `https://${domain}/blog/how-to/${e}`
        const regex = /\//g
        const resultName = url.replace(regex, '-')
        const command = `mkdir -p results/${directoryName}; cd results/${directoryName}; curl --user-agent "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/W.X.Y.Z Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" -k ${url} > ${resultName}.html`
        exec(command, function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });
    })
}

curlBlog("uat.pdfbear.com");