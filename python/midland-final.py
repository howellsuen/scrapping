import asyncio
import csv
from pyppeteer import launch

async def main():
    browser = await launch(headless=False)
    page = await browser.newPage()
    await page.goto('https://proptx.midland.com.hk/tx/index.jsp')

    navigation = page.waitForNavigation()
    button = await page.waitFor('//*[@id="mlrec"]/table[1]/tbody/tr/td[3]//*[contains(text(), "30")]')
    await button.click()

    data = []

    try:
        has_more = True
        while has_more:
            await navigation

            rows = await page.xpath('//*[@id="mlrec"]/table[2]/tbody/tr')
            for i, row in enumerate(rows):
                if i < 3:
                    continue
                tds = await row.xpath('./td')

                row_data = []
                for j, td in enumerate(tds):
                    value = await page.evaluate('(element) => element.innerText', td)
                    row_data.append(value.strip())

                data.append(row_data)

            next_button = await page.xpath('//*[@id="mlrec"]//*[contains(text(), "下一頁")]')

            if len(next_button) > 0:
                navigation = page.waitForNavigation()
                await next_button[0].click()
            else:
                has_more = False
    except:
        pass

    with open('./midland.csv','w') as csvfile:
        wr = csv.writer(csvfile)
        wr.writerows(data)

    while True:
        pass

    await browser.close()


asyncio.get_event_loop().run_until_complete(main())