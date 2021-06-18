import { subPageCheck } from '../../fixtures/utilities/subPageUtil'
import { STATE_CLIENT,STATE_SERVER, PAGE_INDEX } from '../../fixtures/utilities/util'

export function homePageUnitTest() {
  subPageCheck(STATE_CLIENT, PAGE_INDEX)
  subPageCheck(STATE_SERVER, PAGE_INDEX)
  // describe('Navigation', () => {
  //   it('Terms & Conditions Must Go To /terms', () => {
  //     cy.scrollTo('bottom')
  //     cy.wait(1000)
  //     cy.scrollTo('bottom')
  //     cy.get('.terms_conditions').should('have.attr', 'href', '/terms').click()
  //     cy.wait(1000)
  //     cy.get('h1').contains(/terms & conditions/i)
  //     cy.visit(locationHref, {
  //       auth: {
  //         username: 'pdfbear',
  //         password: '95232303'
  //       },
  //     })
  //     cy.wait(1000)
  //   })

  //   it('Header Pricing Button Must Go To /pricing', () => {
  //     cy.get('[data-test="navbar_pricing_btn"]')
  //       .should('have.attr', 'href', '/pricing')
  //       .click()
  //     cy.wait(1000)
  //     cy.get('h1').contains(/membership plan/i)
  //     cy.visit(locationHref, {
  //       auth: {
  //         username: 'pdfbear',
  //         password: '95232303'
  //       },
  //     })
  //     cy.wait(3000)
  //   })

  //   it('Footer Locale List Should Change Locale When Clicking', () => {
  //     cy.scrollTo('bottom')
  //     cy.wait(1000)
  //     cy.scrollTo('bottom')
  //     cy.get('[data-test="footerLanguages_de"]').click({ force: true })
  //     if (cy.url !== locationHref + 'de', {
  //       auth: {
  //         username: 'pdfbear',
  //         password: '95232303'
  //       },
  //     }) {
  //       throw new Error('Bad Language Routing')
  //     }
  //     cy.get('.headline').contains(/Gemeinsam PDF besser machen!/i)
  //     cy.clearLocalStorage()
  //     cy.visit(locationHref + 'en', {
  //       auth: {
  //         username: 'pdfbear',
  //         password: '95232303'
  //       },
  //     })
  //     cy.wait(1000)
  //     cy.visit(locationHref, {
  //       auth: {
  //         username: 'pdfbear',
  //         password: '95232303'
  //       },
  //     })
  //     // eslint-disable-next-line cypress/no-unnecessary-waiting
  //     cy.wait(1000)
  //   })

  //   describe('Tool Navigation From Index', () => {
  //     renderToolList.forEach(([tool, toolData]) => {
  //       if (toolData.complete) {
  //         it(`[${tool}]: Should Navigate To`, () => {
  //           cy.clearLocalStorage()
  //           cy.visit(locationHref + toolData.url, {
  //             auth: {
  //               username: 'pdfbear',
  //               password: '95232303'
  //             },
  //           })
  //           cy.get('h1').contains(
  //             new RegExp(
  //               `${
  //                 english[`${toolData.list.title}_h1`] ??
  //                 english[toolData.list.title]
  //               }`,
  //               'i'
  //             )
  //           )
  //           cy.wait(1000)
  //           cy.visit(locationHref, {
  //             auth: {
  //               username: 'pdfbear',
  //               password: '95232303'
  //             },
  //           })
  //         })
  //       }
  //     })
  //   })
  // })
}

homePageUnitTest()
