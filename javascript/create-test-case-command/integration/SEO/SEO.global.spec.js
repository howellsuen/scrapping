import { locationHref } from '../../fixtures/headers'
import { loadPage } from '../../fixtures/utilities/util'

export default function CheckSEOForGlobalFeature(){
  describe('Check SEO for Global variables', () => {
    //   describe('should go to /blog in Nederlands and expect English Blog ', () => {
    //     it('should be able to goto /nl/blog', () => {
    //       cy.visit(locationHref + 'nl/blog', {
    //         auth: { 
    //           username: 'pdfbear', 
    //           password: '95232303' 
    //         }, 
    //       })
    //       cy.get('[data-test="blogPath-sitepath-link"] a').contains(/Blog/i)
    //     })
    
    //     it('should be able to home and keeps Nederlands language', () => {
    //  //     const language = require(`@tellgistry/pdfbear-locale/data/nl.json`)
    //       cy.get('[data-test="headerToolsMenu_Compress_link"]').click({force:true})
    //       cy.get('html[lang="nl"]').should('exist')
    //     })
    //   })
    
      it('should matches robots.txt', () => {
        loadPage('robots.txt', 'server', 'robots.txt')
        cy.get('body').snapshot({ name: 'robots.txt' })
      })
    
      it('should matches ads.txt', () => {
        loadPage('robots.txt', 'server', 'robots.txt')
        cy.get('body').snapshot({ name: 'robots.txt' })
      })
    
      it('should matches manifest.json', () => {
        loadPage('manifest.json', 'server', 'manifest.json')
        cy.get('body').snapshot({ name: 'manifest.json' })
      })
    
      it('should matches browserconfig.xml', () => {
        loadPage('browserconfig.xml', 'server', 'browserconfig.xml')
        cy.get('body').snapshot({ name: 'browserconfig.xml' })
      })
    
      //When navigating to pdfbear.com/jp should redirect to pdfbear.com/ja
      it('should go to /jp when navigating to "/ja"', () => {
        cy.visit(locationHref + 'jp', { failOnStatusCode: false, auth: { 
          username: 'pdfbear', 
          password: '95232303' 
        },  })
        cy.get('html[lang="ja"]').should('exist')
      })
    
      //When navigating to pdfbear.com/xxx for instance it should 404 (if the page doesn't exist) (Defcon 1)
      it('should go to 404 when navigating to "/xxx"', () => {
        cy.visit(locationHref + 'xxx', { failOnStatusCode: false, auth: { 
          username: 'pdfbear', 
          password: '95232303' 
        },  })
        cy.get('[data-test="404_container"]').should('exist')
      })
      //When navigating to pdfbear.com/[lang]/xx for instance it should 404 WHEN the [lang] is not a valid or enabled language code (Defcon 1)
      it('should go to 404 when navigating to "/zz/xxx"', () => {
        cy.visit(locationHref + 'zz/xxx', { failOnStatusCode: false, auth: { 
          username: 'pdfbear', 
          password: '95232303' 
        },  })
        cy.get('[data-test="404_container"]').should('exist')
      })
    })
}


CheckSEOForGlobalFeature()