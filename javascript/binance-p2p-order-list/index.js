const axios = require("axios")
const { parse } = require("json2csv")
const fs = require("fs")
const moment = require("moment")

const data = JSON.stringify({
  page: 1,
  rows: 300,
})
/*
use Google Chrome network inspector to copy order-list API call as cURL,
and then paste to Postman to get the Axio code
*/
const config = {
  method: "post",
  url: "https://c2c.binance.com/bapi/c2c/v2/private/c2c/order-match/order-list",
  headers: {
    authority: "c2c.binance.com",
    pragma: "no-cache",
    "cache-control": "no-cache",
    "x-trace-id": "ee8bc713-74ff-4a85-9a3a-08c69ef162ad",
    csrftoken: "e84cef53cb63279e00d982f8bfcb1b65",
    "x-ui-request-trace": "ee8bc713-74ff-4a85-9a3a-08c69ef162ad",
    "user-agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36",
    "content-type": "application/json",
    lang: "en",
    "fvideo-id": "31fdd03a7006a478b017e19f8508f69714770df1",
    "sec-ch-ua-mobile": "?0",
    "device-info":
      "eyJzY3JlZW5fcmVzb2x1dGlvbiI6IjE2ODAsMTA1MCIsImF2YWlsYWJsZV9zY3JlZW5fcmVzb2x1dGlvbiI6IjE2ODAsMTA1MCIsInN5c3RlbV92ZXJzaW9uIjoiTWFjIE9TIDEwLjE1LjciLCJicmFuZF9tb2RlbCI6InVua25vd24iLCJzeXN0ZW1fbGFuZyI6ImVuLVVTIiwidGltZXpvbmUiOiJHTVQrOCIsInRpbWV6b25lT2Zmc2V0IjotNDgwLCJ1c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKE1hY2ludG9zaDsgSW50ZWwgTWFjIE9TIFggMTBfMTVfNykgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzkwLjAuNDQzMC45MyBTYWZhcmkvNTM3LjM2IiwibGlzdF9wbHVnaW4iOiJDaHJvbWUgUERGIFBsdWdpbixDaHJvbWUgUERGIFZpZXdlcixOYXRpdmUgQ2xpZW50IiwiY2FudmFzX2NvZGUiOiJjY2QxMGRmYSIsIndlYmdsX3ZlbmRvciI6IkludGVsIEluYy4iLCJ3ZWJnbF9yZW5kZXJlciI6IkludGVsKFIpIFVIRCBHcmFwaGljcyA2MzAiLCJhdWRpbyI6IjEyNC4wNDM0NzY1NzgwODEwMyIsInBsYXRmb3JtIjoiTWFjSW50ZWwiLCJ3ZWJfdGltZXpvbmUiOiJBc2lhL0hvbmdfS29uZyIsImRldmljZV9uYW1lIjoiQ2hyb21lIFY5MC4wLjQ0MzAuOTMgKE1hYyBPUykiLCJmaW5nZXJwcmludCI6ImY5N2M0MTMwNDVlNzk2YTc2MjNkZmU2NDM0Zjc2ZGFlIiwiZGV2aWNlX2lkIjoiIiwicmVsYXRlZF9kZXZpY2VfaWRzIjoiMTYxNTkxMjUwMjkwNnRMU3M2TklNc3lBRTlMUjdpWGMifQ==",
    "bnc-uuid": "3859fbae-3c73-4227-a98e-3c37d4dc857c",
    clienttype: "web",
    "sec-ch-ua":
      '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
    accept: "*/*",
    origin: "https://c2c.binance.com",
    "sec-fetch-site": "same-origin",
    "sec-fetch-mode": "cors",
    "sec-fetch-dest": "empty",
    referer: "https://c2c.binance.com/en/fiatOrder",
    "accept-language":
      "en-US,en;q=0.9,vi;q=0.8,zh-TW;q=0.7,zh;q=0.6,el;q=0.5,de;q=0.4,cs;q=0.3,hr;q=0.2,nl;q=0.1,pl;q=0.1,nb;q=0.1,sl;q=0.1,hu;q=0.1,th;q=0.1,ar;q=0.1,sk;q=0.1,da;q=0.1,sr;q=0.1",
    cookie:
      'cid=PLOchcZ2; bnc-uuid=3859fbae-3c73-4227-a98e-3c37d4dc857c; _ga=GA1.2.1028710687.1610123423; userPreferredCurrency=USD_USD; source=referral; campaign=www.binance.com; fiat-user-save-currency=USD; fiat-prefer-currency=HKD; __BINANCE_USER_DEVICE_ID__={"66a172172fd645f22ff080dfa982c4c2":{"date":1615912503169,"value":"1615912502906tLSs6NIMsyAE9LR7iXc"}}; home-ui-ab=A; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%2264008025%22%2C%22first_id%22%3A%22176e2d5aedffa-030001e163eb17-32677007-1764000-176e2d5aee0a12%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%7D%2C%22%24device_id%22%3A%22176e2d5aedffa-030001e163eb17-32677007-1764000-176e2d5aee0a12%22%7D; defaultMarketTab=favorite; crypto_withdrawal_refactor=56; sys_mob=no; common_fiat=HKD; noticeCache={"HKD":true}; _gid=GA1.2.2027760438.1621699165; BNC_FV_KEY=31fdd03a7006a478b017e19f8508f69714770df1; BNC_FV_KEY_EXPIRE=1621785566792; lang=en; gtId=296e84db-a74a-492b-a5ec-dbbb4ee49818; cr00=095296DCE11A10E3340B86D6E94224D1; d1og=web.64008025.6BEC9EBF4771E84B89D9AD309D33BFE8; r2o1=web.64008025.7186B333439CD699561813855CEB466E; f30l=web.64008025.09B69AB78F5DADE41E6374A00BCFE236; logined=y; p20t=web.64008025.3303D2DDD044E9CA550910FDDFEB0EED',
  },
  data: data,
}

const fields = [
  "date",
  "credit",
  "debit",
  "coin_type",
  "coin_price",
  "coin_amount",
]
const opts = { fields }
const jsonToCsv = async (data) => {
  try {
    const array = []
    data.forEach((e) => {
      if (e.orderStatus === 4) {
        array.push({
          date: moment(e.createTime).format("YYYY-MM-DD HH:mm:ss"),
          credit: e.tradeType === "SELL" ? e.totalPrice : null,
          debit: e.tradeType === "BUY" ? e.totalPrice : null,
          coin_type: e.asset,
          coin_price: e.price,
          coin_amount: e.amount,
        })
      }
    })
    // console.log("array", array)
    const csv = parse(array.reverse(), opts)
    // console.log(csv);
    await fs.writeFile(`./order.csv`, csv, function (err) {
      if (err) throw err
    })
  } catch (err) {
    console.error(err)
  }
}

axios(config)
  .then((response) => {
    const responseDataObj = response.data.data
    // console.log(responseDataObj)
    jsonToCsv(responseDataObj)
  })
  .catch((error) => {
    console.log(error)
  })
