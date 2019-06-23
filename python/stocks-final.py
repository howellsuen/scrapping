import asyncio
from pyppeteer import launch


async def main():
    browser = await launch(headless=False)
    page = await browser.newPage()
    await page.goto('http://www.hkexnews.hk/hyperlink/hyperlist.HTM')
    rows = await page.xpath('//*[@id="ctl00_PlaceHolderMain_ctl03__ControlWrapper_RichHtmlField"]/table/tbody/tr[2]/td/table/tbody/tr/td[1]')

    codes = []
    for r in rows:
        code = await page.evaluate('(element) => element.innerText', r)
        code = code.strip()
        codes.append(code)
    del codes[0]

    await page._client.send('Page.setDownloadBehavior', {'behavior': 'allow', 'downloadPath': './stocks'})
    for code in codes:
        await page.goto('https://hk.finance.yahoo.com/quote/{0}.HK/history?period1=971020800&period2=1534262400&interval=1d&filter=history&frequency=1d'.format(code))
        button = await page.waitFor('//*[contains(text(), "下載數據")]')
        await button.click()
        await asyncio.sleep(1)

    await browser.close()

asyncio.get_event_loop().run_until_complete(main())
