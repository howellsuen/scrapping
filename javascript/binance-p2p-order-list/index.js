const axios = require('axios');
const { parse } = require('json2csv');
const fs = require("fs");

const data = JSON.stringify({
  "page": 1,
  "rows": 10
});

const config = {
  method: 'post',
  url: 'https://c2c.binance.com/bapi/c2c/v2/private/c2c/order-match/order-list',
  headers: { 
    'authority': 'c2c.binance.com', 
    'x-trace-id': '757790da-f777-42f7-a954-75420fcd2ba0', 
    'csrftoken': 'e3b1b2e500fc8926e9f6e70358297718', 
    'x-ui-request-trace': '757790da-f777-42f7-a954-75420fcd2ba0', 
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36', 
    'content-type': 'application/json', 
    'lang': 'en', 
    'fvideo-id': '312fabfc2d2da8acaaf2fdce4c9452c7142b8529', 
    'sec-ch-ua-mobile': '?0', 
    'device-info': 'eyJzY3JlZW5fcmVzb2x1dGlvbiI6IjE5MjAsMTA4MCIsImF2YWlsYWJsZV9zY3JlZW5fcmVzb2x1dGlvbiI6IjE5MjAsMTA4MCIsInN5c3RlbV92ZXJzaW9uIjoiTWFjIE9TIDEwLjE1LjciLCJicmFuZF9tb2RlbCI6InVua25vd24iLCJzeXN0ZW1fbGFuZyI6ImVuLVVTIiwidGltZXpvbmUiOiJHTVQrOCIsInRpbWV6b25lT2Zmc2V0IjotNDgwLCJ1c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKE1hY2ludG9zaDsgSW50ZWwgTWFjIE9TIFggMTBfMTVfNykgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzkwLjAuNDQzMC45MyBTYWZhcmkvNTM3LjM2IiwibGlzdF9wbHVnaW4iOiJDaHJvbWUgUERGIFBsdWdpbixDaHJvbWUgUERGIFZpZXdlcixOYXRpdmUgQ2xpZW50IiwiY2FudmFzX2NvZGUiOiI3NmE3Mzk1OCIsIndlYmdsX3ZlbmRvciI6IkFUSSBUZWNobm9sb2dpZXMgSW5jLiIsIndlYmdsX3JlbmRlcmVyIjoiQU1EIFJhZGVvbiBQcm8gNTYwIE9wZW5HTCBFbmdpbmUiLCJhdWRpbyI6IjEyNC4wNDM0NzY1NzgwODEwMyIsInBsYXRmb3JtIjoiTWFjSW50ZWwiLCJ3ZWJfdGltZXpvbmUiOiJBc2lhL0hvbmdfS29uZyIsImRldmljZV9uYW1lIjoiQ2hyb21lIFY5MC4wLjQ0MzAuOTMgKE1hYyBPUykiLCJmaW5nZXJwcmludCI6ImQ2MzE5MzNiYzIwOGU0NjM4OGRlNzY1MzA2OGEyYjM2IiwiZGV2aWNlX2lkIjoiIiwicmVsYXRlZF9kZXZpY2VfaWRzIjoiMTYxNzg1ODMwMTAwNjFmREpRSERTQXN1WnZrdnJuMVQifQ==', 
    'bnc-uuid': '3b63332f-d3d1-4715-8ee9-79b7e3022ba1', 
    'clienttype': 'web', 
    'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"', 
    'accept': '*/*', 
    'origin': 'https://c2c.binance.com', 
    'sec-fetch-site': 'same-origin', 
    'sec-fetch-mode': 'cors', 
    'sec-fetch-dest': 'empty', 
    'referer': 'https://c2c.binance.com/en/fiatOrder', 
    'accept-language': 'en-US,en;q=0.9,vi;q=0.8,zh-TW;q=0.7,zh;q=0.6,el;q=0.5,de;q=0.4,cs;q=0.3,hr;q=0.2,nl;q=0.1,pl;q=0.1,nb;q=0.1,sl;q=0.1,hu;q=0.1,th;q=0.1,ar;q=0.1,sk;q=0.1,da;q=0.1,sr;q=0.1', 
    'cookie': 'cid=j1H2ahIE; __BINANCE_USER_DEVICE_ID__={"66a172172fd645f22ff080dfa982c4c2":{"date":1617858301151,"value":"16178583010061fDJQHDSAsuZvkvrn1T"}}; sys_mob=no; common_fiat=HKD; noticeCache={"HKD":true}; cr00=74F360F328D5C8970F40D9B51C38CFE5; d1og=web.64008025.64D0562FA1D1EFCFEC30B49BBCBC3055; r2o1=web.64008025.C855392D85F185E6B7A893DAF40196AA; f30l=web.64008025.19A9E3C586E8FF1131BF1D071990D58D; p20t=web.64008025.39EAF8DD2E59B80B33BC814C468DA8A1; fiat-prefer-currency=HKD; userPreferredCurrency=USD_USD; _ga=GA1.2.1866977835.1621484663; _gid=GA1.2.745726183.1621484663; bnc-uuid=3b63332f-d3d1-4715-8ee9-79b7e3022ba1; source=referral; campaign=www.binance.com; BNC_FV_KEY=312fabfc2d2da8acaaf2fdce4c9452c7142b8529; BNC_FV_KEY_EXPIRE=1621568284163; sajssdk_2015_cross_new_user=1; home-ui-ab=A; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%2264008025%22%2C%22first_id%22%3A%221798804736dbc9-0e2bc88d646212-113a6054-2073600-1798804736ef66%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%7D%2C%22%24device_id%22%3A%221798804736dbc9-0e2bc88d646212-113a6054-2073600-1798804736ef66%22%7D; _gat=1'
  },
  data : data
};

const fields = ['date', 'credit', 'debit', 'coin_type', 'coin_price', 'remarks'];
const opts = { fields };
const jsonToCsv = async(data) => {
  try {
    data.forEach(element => {
        
    });
    const json = []
    const csv = parse(json, opts);
    // console.log(csv);
    await fs.writeFile(`./${filename}.csv`,
      csv,
      function(err) {
        if (err) throw err;
      }
    )
  } catch (err) {
    console.error(err);
  }
}

axios(config)
.then((response) => {
    const responseData = response.data
    console.log(responseData);
})
.catch((error) => {
    console.log(error);
});