import {
  iterateEachLocale,
  STATE_CLIENT,
  STATE_SERVER,
  loadPage,
  checkIfSupportedLocale
} from '../../fixtures/utilities/util'
import { locationHref, locationHrefAuth } from '../../fixtures/headers'
import { SupportedLocales } from '@tellgistry/locale-commons'

//state, subPageName, subPageUrl, customCheck


const siteMapTest = () => {
  before(() => {
    let urls = {}
    cy.request(`${locationHrefAuth}sitemap.xml`)
      .its('body')
      .then(response => {
        Cypress.$(response)
          .find('url')
          .each(function () {
            let alternateList = {}
            Cypress.$(this)
              .find('[rel=alternate]')
              .toArray()
              .forEach(xhtml => {
                let localeLink = {}
                localeLink['href'] = xhtml.getAttribute('href')
                localeLink['hreflang'] = xhtml.getAttribute('hreflang')
                alternateList[localeLink['href']] = localeLink
              })
            urls[Cypress.$(this).find('loc').text()] = alternateList
          })
        cy.writeFile('cypress/fixtures/data/siteMap.json', urls)
      })
  })

  describe('Site Map Response Test', () => {
    it(`should be able to visit Sitemap page`, () => {
      cy.request(`${locationHrefAuth}sitemap.xml`, {
        headers: {
          'user-agent':
            'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        },
      }).then(response => {
        expect(response.status).to.eq(200)
        expect(response.headers['content-type']).to.eq('application/xml')
      })
    })
    it(`should be able to get Valid Sitemap Json Data`, () => {
      cy.request(`${locationHrefAuth}sitemap.json`, {
        headers: {
          'user-agent':
            'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        },
      }).then(response => {
        expect(response.status).to.eq(200)
        expect(response.headers['content-type']).to.eq('application/json')
        try {
          JSON.parse(response.body)
        } catch (e) {
          throw new Error(`❗️Sitemap Json file is Not Valid ${e.message}`)
        }
      })
    })
  })

  describe('Site Map Unit Test', () => {
    let FailingTestList = []
    const siteMapJson = require('../../fixtures/data/siteMap.json')
    Object.keys(siteMapJson).map(loc => {
      if (loc !== locationHref) {
        if (loc.split('')[loc.length - 1] == '/') {
          FailingTestList.push({
            description: function () {
              return 'Loc Link Should not have tailing / (slash) at the end of the link'
            },
            object: function () {
              return loc
            },
            equal: function () {
              return loc.substring(0, loc.length - 1)
            },
          })
        }
      }
      //xhtml check
      Object.keys(siteMapJson[loc])
        .filter(xhtml => {
          if (xhtml !== locationHref) {
            return xhtml
          }
        })
        .map(xhtml => {
          let hreflang = siteMapJson[loc][xhtml]['hreflang']
          if (xhtml.split('')[xhtml.length - 1] == '/') {
            FailingTestList.push({
              description: function () {
                return `xhtml Link ${xhtml} Should not have tailing / (slash) at the end of the link`
              },
              object: function () {
                return xhtml
              },
            })
          }
          if (xhtml.split('/')[3] == 'en') {
            FailingTestList.push({
              description: function () {
                return `xhtml Link ${xhtml} Should not have /en locale tag`
              },
              object: function () {
                return xhtml
              },
            })
          }
          if(hreflang=='x-default' &&  checkIfSupportedLocale(xhtml.split('/')[3])){
            if(xhtml.split('/')[5] == 'how-to' || xhtml.split('/')[5] == 'news'){
              FailingTestList.push({
                description: function () {
                  return `xhtml Link ${xhtml} is x-default and should only have an en locale`
                },
                object: function () {
                  return xhtml
                },
              })
            }else if(xhtml.search('blog/') == -1){ //if it is not blog articles, should be an error.
              FailingTestList.push({
                description: function () {
                  return `xhtml Link ${xhtml} is x-default and should only have an en locale`
                },
                object: function () {
                  return xhtml
                },
              })
            }
          }
        })
    })
    FailingTestList.map(test => {
      it(`${test.description()}`, () => {
        throw new Error(test.description())
      })
    })
    if (FailingTestList.length == 0) {
      it('Every Href is Correct :D', () => {
        expect('🎉').to.equal('🎉')
      })
    }
  })
}

siteMapTest()
