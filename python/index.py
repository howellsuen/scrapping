import asyncio
from pyppeteer import launch


async def main():
    browser = await launch(headless=False)
    page = await browser.newPage()
    await page.goto('http://www.hkexnews.hk/hyperlink/hyperlist.HTM')
    stocks = await page.xpath('//*[@id="ctl00_PlaceHolderMain_ctl03__ControlWrapper_RichHtmlField"]/table/tbody/tr[2]/td/table/tbody/tr/td[1]')
    # print(stocks)
    # await browser.close()

    codes = []
    for stock in stocks:
        code = await page.evaluate('(element) => element.innerText', stock)
        code = code.strip()
        codes.append(code)
    del codes[0]

    print(codes)

    while True:
        pass

asyncio.get_event_loop().run_until_complete(main())
