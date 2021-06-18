import { subPageCheck } from '../../fixtures/utilities/subPageUtil'
import { STATE_CLIENT, STATE_SERVER, PAGE_WHYLINUXISBETTER } from '../../fixtures/utilities/util'

export function SharePageTest() {
  subPageCheck(STATE_CLIENT, PAGE_WHYLINUXISBETTER)
  subPageCheck(STATE_SERVER, PAGE_WHYLINUXISBETTER)
}
SharePageTest()



// describe('[WhyLinuxIsBetter Page]: Tests', () => {
//   load(false, 'whylinuxisbetter')
//   standardHeaderFooter(false, 'whylinuxisbetter', false)
//   checkHeadings(headingData)

//   describe('Unit Test', () => {
//     it('Each Link has the correct link linked to it', () => {
//       cy.get('[data-test=whyLinusIsBetterPage_container] a')
//         .eq(0)
//         .contains('PDF Compress')
//         .should('have.attr', 'href', `${locationHref}compress-pdf`)

//       cy.get('[data-test=whyLinusIsBetterPage_container] a')
//         .eq(1)
//         .contains('PDF Merge')
//         .should('have.attr', 'href', `${locationHref}merge-pdf`)

//       cy.get('[data-test=whyLinusIsBetterPage_container] a')
//         .eq(2)
//         .contains('PDF Protect')
//         .should('have.attr', 'href', `${locationHref}protect-pdf`)

//       cy.get('[data-test=whyLinusIsBetterPage_container] a')
//         .eq(3)
//         .contains('PDF Split')
//         .should('have.attr', 'href', `${locationHref}split-pdf`)

//       cy.get('[data-test=whyLinusIsBetterPage_container] a')
//         .eq(4)
//         .contains('Word to PDF')
//         .should('have.attr', 'href', `${locationHref}word-to-pdf`)

//       cy.get('[data-test=whyLinusIsBetterPage_container] a')
//         .eq(5)
//         .contains('PDF Repair')
//         .should('have.attr', 'href', `${locationHref}repair-pdf`)

//       cy.get('[data-test=whyLinusIsBetterPage_container] a')
//         .eq(6)
//         .contains('HTML to PDF')
//         .should('have.attr', 'href', `${locationHref}html-to-pdf`)
//     })
//   })
// })
