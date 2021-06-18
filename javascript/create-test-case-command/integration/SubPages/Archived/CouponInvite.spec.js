/* eslint-disable no-import-assign */
/* eslint-disable quotes */
/* eslint-disable quotes */
import { standardHeaderFooter, load } from '../../../fixtures/standardHeaderFooter'
import { login, logout } from '../../../fixtures/loginLogout'
import globalFooter from '../../fixtures/globalFooter'
import globalMetaTags from '../../../fixtures/globalMetaTags'
import checkHeadings from '../../../fixtures/headings'

const metaDetails = {
  page: 'coupon-invite',
}
//Coupon Invite page doesn't have standard header/footer
describe('[Coupon Invite Page]: Tests', () => {
  //run base for local
  load(false, 'coupon-invite')
  globalMetaTags(metaDetails)

  describe('Unit Test', () => {
    it('Has Title', () => {
      cy.get('[data-test="couponInvitePage_heading"] p:first-child').contains(
        /welcome to our/i
      )
    })

    it('reCaptcha Explanation with Link', () => {
      cy.get('[data-test=couponInvitePage_recaptcha_note]').contains(
        /This site is protected by reCAPTCHA and the Google/i
      )
      cy.get('[data-test=couponInvitePage_recaptcha_note] a')
        .eq(0)
        .should('have.attr', 'href', 'https://policies.google.com/privacy')
      cy.get('[data-test=couponInvitePage_recaptcha_note] a')
        .eq(1)
        .should('have.attr', 'href', 'https://policies.google.com/terms')
    })
  })

  describe('Validation', () => {
    it('Should show error on invalid/empty email', () => {

      cy.get('[data-test=couponInvitePage_email_input]').clear().type('test{enter}')
      cy.get('[data-test=couponInvitePage_email_error]')
        .contains(/Invalid email/i)

      cy.get('[data-test=couponInvitePage_email_input]').clear().type('{enter}')
      cy.get('[data-test=couponInvitePage_email_error]')
        .contains(/enter your email/i)
      cy.get('[data-test=couponInvitePage_email_input]')
        .clear()
        .type('test{enter}')
      cy.get('[data-test=couponInvitePage_email_error]').contains(
        /Invalid email/i
      )

      cy.get('[data-test=couponInvitePage_email_input]').clear().type('{enter}')
      cy.get('[data-test=couponInvitePage_email_error]').contains(
        /enter your email/i
      )
    })

    it('Should show error on invalid/empty coupon code', () => {
      cy.get('[data-test=couponInvitePage_email_input]')
        .clear()
        .type('unit-test@pdfbear.com{enter}')
      cy.get('[data-test=couponInvitePage_couponCode_input]').type('000{enter}')
      cy.wait(1000)
      cy.get('body').then(body => {
        if (
          body.find('[data-test=couponInvitePage_couponCode_error]').length > 0
        ) {
          cy.get('.coupon.error')
            .should('be.visible')
            .contains(/Invalid coupon/i)
        } else {
          cy.get('[data-test=couponInvitePage_recaptcha_error]')
            .should('be.visible')
            .contains(/request cannot/i)
        }
      })

      cy.get('[data-test=couponInvitePage_couponCode_input]')
        .clear()
        .type('{enter}')
      cy.get('[data-test=couponInvitePage_couponCode_error]')
        .should('be.visible')
        .contains(/enter your coupon/i)
    })
  })

  describe('Can submit Correct (Test) coupon code and get Result Message', () => {
    //todo: can't test the coupon pass more than once since it promote the user to pro right away.
    it('Type in the right info', () => {
      cy.get('[data-test=couponInvitePage_email_input]')
        .clear()
        .type('test@test.com{enter}') //testCouponCode for testing
      cy.get('[data-test=couponInvitePage_couponCode_input]')
        .clear()
        .type('ho7695')

      cy.get('[data-test=couponInvitePage_submit_button]').contains(
        'Apply Code & Upgrade'
      )
    })
    //TODO in case the build is not production, recaptcha error should be shown
    if (process.env.NEXT_ENV === 'production') {
      it('Submit information', { timeout: 5000, retires: 2 }, () => {
        cy.get('[data-test=couponInvitePage_submit_button]').click({
          force: true,
        })
        cy.get('[paymentThankYouModal_payment_container]')
      })

      it('Thank You Modal Unit Test', () => {
        cy.get('[data-test=paymentThankYouModal_h1]').contains('Thank You!')
        cy.get(
          '[data-test=paymentThankYouModal_welcomeToPdfbearFreePro]'
        ).contains(
          'Welcome to PDFBEAR FREE Pro membership. You may check the expiry date in My Profile. Now go and have fun with your new PDF journey.'
        )
      })

      it('Close Thank you Modal', () => {
        cy.get('[data-test=paymentThankYouModal_continue_button]')
          .contains('CONTINUE')
          .click({ force: true })
        cy.get(
          '[data-test=paymentThankYouModal_overlayPayment_overlay]'
        ).should('have.css', 'opacity', 0)
      })
    }
  })

  describe('Footer', () => {
    it('Should Only Have Copyright', () => {
      cy.get('[data-test=couponInvitePage_copyright_text]').contains(
        /Copyright © 2020 PDFBEAR. All rights reserved./i
      )
      cy.get('[data-test=footer_language_button]').should('not.be.visible')
    })
  })

  describe('Header', () => {
    it('Should Only Have Logo', () => {
      cy.get('[data-test="header_embeddedLogoPro_logo"]').should('be.visible')
      cy.get('[data-test="header_dropdown_button"]').should('not.be.visible')
      cy.get('[data-test="Navbar_login_btn"]').should('not.be.visible')
    })
  })
})
