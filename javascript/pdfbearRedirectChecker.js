// require :
// npm install axios url colors minimist
// run:
// node pdfbearRedirectChecker.js --display=all
// --display=all will show all, if not will show not matching only

"use strict";
const axios = require("axios");
const colors = require("colors");
const url_parse = require("url");
const minimist = require('minimist');
var urls = [
    "https://dev.pdfbear.com/blog/GlobeImages-Convert-classic-JPG-files-into-a-PDF-with-PDFBear",
    "https://dev.pdfbear.com/pdf-to-jpg/downloader/206599efcd6590dee81981c3f66776dc",
];
const args = minimist(process.argv.slice(2))
const display = args["display"];
asyncForEach(urls);
// const timer = (ms) => new Promise((resolve, reject) => {
//     setTimeout(() => {
//     }, 1000);
// });
async function asyncForEach(urls) {
    // We need to wrap the loop into an async function for this to work
    for (var i = 0; i < urls.length; i++) {
        var url = urls[i];
        // url = "https://dev.pdfbear.com/cn/pdf-to-png"
        await callUrl(url);
        // await timer(100); // then the created Promise can be awaited
    }
}
async function callUrl(url) {
     axios.get(encodeURI(url), {
        auth: {
            username: "pdfbear",
            password: "95232303",
        },
    })
        .then((response) => {
            const pathname = url_parse.parse(url).pathname;
            const querystring = url_parse.parse(url).query;
            let split_pathname = pathname.split("/");
            split_pathname = split_pathname.filter(n => n)
            const split_pathname_length = split_pathname.length;
            var redirect_url = response.request._redirectable._currentUrl;
            var redirect_pathname = url_parse.parse(redirect_url).pathname;
            let is_matched = isEn(pathname, redirect_pathname);
            is_matched = is_matched ? is_matched : isTw(pathname, redirect_pathname)
            is_matched = is_matched ? is_matched : isCn(pathname, redirect_pathname)
            is_matched = is_matched ? is_matched : isJp(pathname, redirect_pathname)
            is_matched = is_matched ? is_matched : segmentCheck(split_pathname_length, querystring, pathname, redirect_pathname)
            const text_color = textColor(is_matched);
            if (isDisplay(is_matched)) {
                console.log(".")
                return;
            }
            console.log(text_color("request: " + url) + " , " + text_color.bold("response: " + redirect_url))
        })
        .catch((error) => {
            const text_color = colors.red;
            console.log(text_color("error request: " + url));
            console.log(text_color("error: " + error.message));
        });
}
function isJp(pathname, redirect_pathname) {
    let substr_count = pathname.split('/jp');
    substr_count = substr_count.length - 1
    if (substr_count === 1) {
        const assume_path = pathname.replace("/jp", "/ja")
        if (assume_path === redirect_pathname) {
            return true
        }
    }
    return false
}
function isTw(pathname, redirect_pathname) {
    let substr_count = pathname.split('/zh');
    substr_count = substr_count.length - 1
    if (substr_count === 1) {
        const assume_path = pathname.replace("/zh", "/zh-TW")
        if (assume_path === redirect_pathname) {
            return true
        }
    }
    return false
}
function isCn(pathname, redirect_pathname) {
    let substr_count = pathname.split('/cn');
    substr_count = substr_count.length - 1
    if (substr_count === 1) {
        const assume_path = pathname.replace("/cn", "/zh-CN")
        if (assume_path === redirect_pathname) {
            return true
        }
    }
    return false
}
function isEn(pathname, redirect_pathname) {
    let substr_count = pathname.split('/en');
    substr_count = substr_count.length - 1
    if (substr_count === 1) {
        const assume_path = pathname.replace("/en", "")
        if (assume_path === redirect_pathname) {
            return true
        }
    }
    return false
}
function segmentCheck(split_pathname_length, querystring, pathname, redirect_pathname) {
    if (split_pathname_length > 1 && !querystring) {
        const regex = /(\/[a-zA-Z-\d]+\/[a-zA-Z-\d]+)$/gm;
        const matched_seg = regex.exec(pathname);
        const assume_path = matched_seg ? matched_seg[0] : null
        if (assume_path === redirect_pathname) {
            return true
        }
    }
    return false
}
function textColor(is_matched) {
    let text_color = colors.green;
    if (is_matched) {
        text_color = colors.gray
    }
    if (is_matched) {
        text_color = colors.gray
    }
    return text_color;
}
function isDisplay(is_matched) {
    return (display !== "all" && is_matched);
}