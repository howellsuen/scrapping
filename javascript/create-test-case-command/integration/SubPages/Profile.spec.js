import { SupportedLocales } from '@tellgistry/locale-commons'
import { locationHref, locationHrefAuth, locationHrefIndex } from '../headers'
import {
  globalContentCheck,
  STATE_CLIENT,
  STATE_SERVER,
  languageFilter,
  loadPage,
  PROFILE_PROFILE,
  PROFILE_SUBSCRIPTION,
  PROFILE_FILE_MANAGEMENT,
  PROFILE_INVITE_FRIENDS,
  PROFILE_SIGN_REQUEST,
  USER_TYPE_FREE,
  getAccount,
} from './util'
import { checkHeadings } from './../headings'
import getHeadingData from './headingData'
import { login, logout } from '../../fixtures/loginLogout'

const profile_profile_tab = 'profile_tab_profile'
const profile_subscription_tab = 'profile_tab_subscription'
const profile_fileManagement_tab = 'profile_tab_fileManagement'
const profile_inviteFriends_tab = 'profile_tab_inviteFriends'
const profile_signRequest_tab = 'profile_tab_signRequest'

const coupon_code = 'te2988'

//data-test tags
const iyf_title = 'modal_referral_header'
const copyCode_button = 'modal_referral_copycode_button'
const copyLink_button = 'modal_referral_copylink_button'
const firstName_input = 'first_name_input'
const lastName_input = 'last_name_input'
const email_input = 'email_input'
const saveChanges_button = 'update_profile_button'
const currentPassword_input = 'current_password_input'
const newPassword_input = 'new_password_input'
const confirmPassword_input = 'confirm_password_input'
const currentPassword_error = 'current_password_error'
const newPassword_error = 'new_password_input'
const confirmPassword_error = 'confirm_password_error'
const changePassword_button = 'update_password_button'
const updatePassword_error = 'update_password_error'
const showHideNewPassword_button = 'show_hide_password_button_newPassword'
const showHideConfirmPassword_button = 'show_hide_password_button_repeatPassword'
const showHideCurrentPassword_button = 'show_hide_password_button_currentPassword'

export function testProfilePage(locale) {
  const language = require(`@tellgistry/pdfbear-locale/data/${locale.code}`)

  describe('[My Account: Profile Page]', () => {
    it('That the page contains the correct "My Profile", sidebar tab content for every language', () => {
      cy.get(`[data-test=${profile_profile_tab}]`).contains(language['profile'])
      cy.get(`[data-test=${profile_subscription_tab}]`).contains(
        language['subscription']
      )
      cy.get(`[data-test=${profile_fileManagement_tab}]`).contains(
        language['fileManagement']
      )
      cy.get(`[data-test=${profile_inviteFriends_tab}]`).contains(
        language['inviteFriends']
      )
      cy.get(`[data-test=${profile_signRequest_tab}]`).contains(
        language['signRequest']
      )
    })

    //Change Information Test
    describe('Profile Validation', { timeout: 3000 }, () => {
      it('Input Email box is invalid, and pre-filled with the users email', () => {
        cy.get(`[data-test=${email_input}]`).should('have.attr', 'disabled')
        cy.get(`[data-test=${email_input}]`).contains(getAccount().email)
      })
    })
    
    describe('Change Profile Information', () => {
      it('Can Change Profile Information', { timeout: 3000 }, () => {
        cy.get(`[data-test=${firstName_input}]`).clear().type('Test')
        cy.get(`[data-test=${lastName_input}]`).clear().type('Free{enter}')
        cy.get(`[data-test=${saveChanges_button}]`)
          .contains(language['processing'])
          .and.should('have.attr', 'disabled')
        cy.get(`[data-test=${saveChanges_button}]`).contains(
          language['changesSaved']
        )
        cy.get(`[data-test=${saveChanges_button}]`).contains(
          language['saveChanges']
        )
      })
    })

    //Change Password Test
    describe('Change Password Validation', () => {
      it('Minimum Letters Validation', () => {
        cy.get(`[data-test=${currentPassword_input}]`).clear().type('1')
        cy.get(`[data-test=${newPassword_input}]`).type('123123123')
        cy.get(`[data-test=password_strength_newPassword] span`)
          .eq(1)
          .should('have.css', 'background', 'rgb(243, 245, 249')
        cy.get(`[data-test=${confirmPassword_input}]`).type('123123123{enter}')
        cy.get(`[data-test=${currentPassword_error}]`).contains(
          language['errorCurrentPasswordMustBeAtLeast8Characters']
        )
      })

      it('Wrong current password, New and Confirm Pwd match, min length pwd Validation', () => {
        cy.get(`[data-test=${currentPassword_input}]`).clear().type('122222222')
        cy.get(`[data-test=${newPassword_input}]`).type('123123123')
        cy.get(`[data-test=${confirmPassword_input}]`).type('123123121')
        cy.get()
        cy.get(`[data-test=${changePassword_button}]`).click({
          force: true,
        })
        cy.get(`[data-test=${updatePassword_error}]`).contains(
          language['api_error']
        )
        cy.get(`[data-test=${confirmPassword_error}]`).contains(
          language['errorConfirmPassword']
        )

        cy.get(`[data-test=${newPassword_input}]`).clear().type('1')
        cy.get(`[data-test=${confirmPassword_input}]`).clear().type('1{enter}')
        cy.get(`[data-test=${confirmPassword_error}]`).contains(
          language['errorPasswordCharacters']
        )
      })

      it('password show/hide button works (separately)',()=>{
        cy.get(`[data-test=${showHideCurrentPassword_button}]`).click({force:true})
        cy.get(`[data-test=${showHideNewPassword_button}]`).click({force:true})
        cy.get(`[data-test=${showHideConfirmPassword_button}]`).click({force:true})
        cy.get(`[data-test=${currentPassword_input}]`).should('have.attr','type','text')
        cy.get(`[data-test=${newPassword_input}]`).should('have.attr','type','text')
        cy.get(`[data-test=${confirmPassword_input}]`).should('have.attr','type','text')

        cy.get(`[data-test=${showHideCurrentPassword_button}]`).click({force:true})
        cy.get(`[data-test=${showHideNewPassword_button}]`).click({force:true})
        cy.get(`[data-test=${showHideConfirmPassword_button}]`).click({force:true})
        cy.get(`[data-test=${currentPassword_input}]`).should('have.attr','type','password')
        cy.get(`[data-test=${newPassword_input}]`).should('have.attr','type','password')
        cy.get(`[data-test=${confirmPassword_input}]`).should('have.attr','type','password')
      })

      it('That the new password must not be equal to the current password', () => {
        cy.get(`[data-test=${currentPassword_input}]`).clear().type('123123123')
        cy.get(`[data-test=${newPassword_input}]`).type('123123123')
        cy.get(`[data-test=${confirmPassword_input}]`).type('123123121')
        cy.get(`[data-test=${changePassword_button}]`).click({
          force: true,
        })
        cy.get(`[data-test=${newPassword_error}]`).contains(
          language['errorNewPasswordCannotBeTheSameAsTheCurrentPassword']
        )
      })

      /*     it('Save Changes Button should be disabled with New password and Repeat New password doesnt match', () => {
        cy.get(`[data-test=${newPassword_input}]`)
          .clear()
          .type('111')
        cy.get('[data-test=account_change_password_submit_button]').should(
          'have.attr',
          'disabled'
        )
      }) */
    })
    //TODO this is temporarily blocked because it will fail mid way and change password. will only check once after all the other tests are done.
    /*  describe('Password Change', () => {
            it('Can Change Password', { retries: 2 }, () => {
              cy.get('[data-test=account_change_password_current_password_input]')
                .clear()
                .type('12345678')
              cy.get('[data-test=account_change_password_new_password_input]')
                .clear()
                .type('12345679')
              cy.get('[data-test=account_change_password_repeat_new_password_input]')
                .clear()
                .type('12345679')
      
              //show password function works
              it('Show Input Button works', () => {
                cy.get(
                  '[data-test=account_change_password_current_password_pwdShow_btn]'
                ).click({ force: true })
                cy.get(
                  '[data-test=account_change_password_new_password_pwdShow_btn]'
                ).click({ force: true })
                cy.get(
                  '[data-test=account_change_password_repeat_new_password_pwdShow_btn]'
                ).click({ force: true })
                cy.get(
                  '[data-test=account_change_password_current_password_input]'
                ).contains('12345678')
                cy.get(
                  '[data-test=account_change_password_new_password_input]'
                ).contains('12345679')
                cy.get(
                  '[data-test=account_change_password_repeat_new_password_input]'
                ).contains('12345679')
              })
      
              cy.get('[data-test=account_change_password_submit_button]').click({
                force: true,
              })
              cy.get('[data-test=account_change_password_submit_button]').contains(
                'Changes Saved'
              )
            })
      
            it('Change it back to the original Password', { retries: 2 }, () => {
              cy.get('[data-test=account_change_password_current_password_input]')
                .clear()
                .type('12345679')
              cy.get('[data-test=account_change_password_new_password_input]')
                .clear()
                .type('12345678')
              cy.get('[data-test=account_change_password_repeat_new_password_input]')
                .clear()
                .type('12345678')
              cy.get('[data-test=account_change_password_submit_button]').click({
                force: true,
              })
              cy.get('[data-test=account_change_password_submit_button]').contains(
                'Changes Saved'
              )
            })
          }) */
  })
}

export function testSubscriptionPage(userType) {
  /** Custom Options for the Custom Modal */
  const modalOptionForMonth = () => {
    it('run the original route', () => {
      cy.get('[data-test=initialModal_changePlan_radioBtn]').click({
        force: true,
      })
      cy.get('[data-test=initialModal_switchAnnualBtn_button]').click({
        force: true,
      })
      cy.get('[data-test=prePaymentModal_title]').contains(
        'Change Billing Cycle'
      )
      cy.get('[data-test=prePaymentModal_cardTitle_text]').contains('PDFBEAR')
      cy.get('[data-test=prePaymentModal_node_text]').contains(
        'You will be charged US$59.99/year now'
      )
      cy.get('[data-test=modal_closeBtn]').click({ force: true })
    })
    /**todo: DOM element not mounting fast enough problem (Can't find the annual button)  */
    it('open the second route', { retries: 3 }, () => {
      cy.get('[data-test=account_subscription_switch_to_annual_button]').click({
        force: true,
      })
      cy.get('[data-test=initialModal_cancelPlan_radioBtn]')
    })

    it('run the second route', () => {
      cy.get('[data-test=initialModal_cancelPlan_radioBtn]').click({
        force: true,
      })
      cy.get('[data-test=initialModal_switchAnnualBtn_button]').click({
        force: true,
      })
      cy.get('[data-test=preCancelModal_precancelTitle_text]').contains(
        'Thinking of Cancelling?'
      )
      cy.get('[data-test=preCancelModal_optionsParagraph_text]').contains(
        'There are several options. Choose the one that works best for you!'
      )
      cy.get('[data-test=preCancelModal_changePlan_button]').click({
        force: true,
      })
      cy.get('[data-test=preCancelModal_submit_button]').contains(
        'APPLY 50% DISCOUNT'
      )
      cy.get('[data-test=preCancelModal_cancel_button]').click({
        force: true,
      })
      cy.get('[data-test=preCancelModal_submit_button]').contains('CONTINUE')
    })
  }
  /** Custom Options for the Custom Modal */
  const modalOptionForYear = () => {
    it('run the original route', () => {
      cy.get('[data-test=initialModal_changePlan_radioBtn]').click({
        force: true,
      })
      cy.get('[data-test=initialModal_switchAnnualBtn_button]').click({
        force: true,
      })
      cy.get('[data-test=prePaymentModal_title]').contains(
        'Change Billing Cycle'
      )
      cy.get('[data-test=prePaymentModal_cardTitle_text]').contains('PDFBEAR')
      cy.get('[data-test=prePaymentModal_node_text]').contains(
        'You will be charged US$5.99/month now'
      )

      cy.get('[data-test=modal_closeBtn]').click({ force: true })
    })
    /**todo: DOM element not mounting fast enough problem (Can't find the annual button)  */
    //Second route to test cancel route
    it('open the second route', { retries: 3 }, () => {
      cy.get('[data-test=account_subscription_switch_to_monthly_button]').click(
        {
          force: true,
        }
      )
      cy.get('[data-test=initialModal_cancelPlan_radioBtn]')
    })

    it('run the second route', () => {
      cy.get('[data-test=initialModal_cancelPlan_radioBtn]').click({
        force: true,
      })
      cy.get('[data-test=initialModal_switchAnnualBtn_button]').click({
        force: true,
      })
      cy.get('[data-test=preCancelModal_precancelTitle_text]').contains(
        'Thinking of Cancelling?'
      )
      cy.get('[data-test=preCancelModal_optionsParagraph_text]').contains(
        'There are several options. Choose the one that works best for you!'
      )
      cy.get('[data-test=preCancelModal_changePlan_button]').click({
        force: true,
      })
      cy.get('[data-test=preCancelModal_submit_button]').contains(
        'APPLY 50% DISCOUNT'
      )
      cy.get('[data-test=preCancelModal_cancel_button]').click({
        force: true,
      })
      cy.get('[data-test=preCancelModal_submit_button]').contains('CONTINUE')
    })
    //TODO actual processing to go through canceling and payment.
  }

  describe('[My Account: Subscription Page]', () => {
    it('Click the Subscription Tab Button', () => {
      cy.get(`[data-test=${tabList[1]}]`).click({ force: true })
      cy.get('[data-test="profile_subscription_h3"]')
        .eq(0)
        .contains(tabHeadings[1].h3[0])
    })
    //Route for free
    if (userType === 'free') {
      describe('Subscription Page Unit Test', () => {
        checkHeadings(tabHeadings[1])
        it('Page has Subscription Status ', () => {
          cy.get('[data-test=profile_subscription_status]').contains(
            'Your account was successfully activated.'
          )
        })
        it('Page has Explanation about Upgrading account', () => {
          cy.get('[data-test=subscription_subtitle_text]').contains(
            'Upgrade your PDFBEAR experience to the next level!'
          )
          cy.get('[data-test=subscription_subtitle_text2]').contains(
            'Become a Pro member to maximize the tools'
          )
          cy.get('[data-test=subscription_subtitle_text3]').contains(
            'Click the button below to upgrade'
          )
        })

        it('Page has <Upgrade Now> button and links to /pricing Href', () => {
          cy.get('[data-test=subscription_upgradeNow_button]').contains(
            'Upgrade Now'
          )
          cy.get('[data-test=subscription_upgradeNow_button]').should(
            'have.attr',
            'href',
            `${locationHref}pricing`
          )
        })
      })
    }

    //Route for pro-month
    if (userType === 'pro-month') {
      describe('Subscription Page Unit Test', () => {
        checkHeadings(tabHeadings[1])
        it('Page has <Switch to Annual PDF Pro> button', () => {
          cy.get(
            '[data-test=account_subscription_switch_to_annual_button]'
          ).contains('Switch to Annual PDFBEAR Pro')
        })
        it('Page has <Membership> button', () => {
          cy.get('[data-test=account_subscription_membership_button]').contains(
            'Membership'
          )
        })
        it('Page has <Change Plan> button', () => {
          cy.get('[data-test=account_subscription_changePlan_button]').contains(
            'Change Plan'
          )
        })
      })

      describe('Subscription Page e2e Test Including Modal popup', () => {
        describe('<Switch to Annual PDF Pro> button shows Modal', () => {
          /*      cy.get(
                  '[data-test=account_subscription_switch_to_annual_button]'
                ).click({ force: true }) */
          modal_check(
            'account_subscription_switch_to_annual_button',
            'initialModal_change_plan_title',
            'modal_closeBtn',
            'profile_subscription_h3',
            modalOptionForMonth
          )
        })
        it('<Change Plan> button shows Modal', () => {
          cy.get('[data-test=account_subscription_changePlan_button]').click({
            force: true,
          })
          //Change Plan uses the same modal component as <switch to annual pdf pro> button.
          cy.get('[data-test=modal_closeBtn]').click({ force: true })
        })
        it('<Membership> button leads to the pricing link', () => {
          cy.get('[data-test=account_subscription_membership_button]').should(
            'have.attr',
            'href',
            `${locationHref}pricing`
          )
        })
      })
    }

    //Route for pro-year
    if (userType === 'pro-year') {
      describe('Subscription Page Unit Test', () => {
        checkHeadings(tabHeadings[1])
        it('Page has <Switch to Monthly PDF Pro> button', () => {
          cy.get(
            '[data-test=account_subscription_switch_to_monthly_button]'
          ).contains('Switch to Monthly PDFBEAR Pro')
        })
        it('Page has <Membership> button', () => {
          cy.get('[data-test=account_subscription_membership_button]').contains(
            'Membership'
          )
        })
        it('Page has <Unsubscribe> button', () => {
          cy.get(
            '[data-test=account_subscription_unsubscribe_button]'
          ).contains('Unsubscribe')
        })
      })

      describe('Subscription Page e2e Test Including Modal popup', () => {
        describe('<Switch to Monthly PDF Pro> button shows Modal', () => {
          modal_check(
            'account_subscription_switch_to_monthly_button',
            'initialModal_change_plan_title',
            'modal_closeBtn',
            'profile_subscription_h3',
            modalOptionForYear
          )
        })
        it('<Unsubscribe> button shows Modal', () => {
          cy.get('[data-test=account_subscription_unsubscribe_button]').click({
            force: true,
          })
          //Change Plan uses the same modal component as <switch to annual pdf pro> button.
          cy.get('[data-test=modal_closeBtn]').click({ force: true })
        })
        it('<Membership> button leads to the pricing link', () => {
          cy.get('[data-test=account_subscription_membership_button]').should(
            'have.attr',
            'href',
            `${locationHref}pricing`
          )
        })
      })
    }
  })
}

export function testFileManagementPage(userType) {
  describe('[My Account: File Management Page]', () => {
    it('Click the Subscription Tab Button', () => {
      cy.get(`[data-test=${tabList[2]}]`).click({ force: true })
      cy.get('[data-test="profile_file_management_h3"]')
        .eq(0)
        .contains(tabHeadings[2].h3[0])
    })

    it('File Management page unit test', () => {
      if (userType === 'free') {
        cy.get('[data-test=fileManagement_premiumbox]')
        cy.get('[data-test=fileManagement_premiumbox_h3]').contains(
          'Why go PDFBEAR Pro?'
        )
        cy.get('[data-test=fileManagement_upgradeToPro_button]').contains(
          'Upgrade to PDFBEAR Pro to keep your files forever.'
        )
        cy.get('[data-test=fileManagement_upgradeToPro_a]').should(
          'have.attr',
          'href',
          `${locationHref}pricing`
        )
      } else {
        cy.get('[data-test=fileManagement_processedFiles_button]').contains(
          'Processed Files'
        )
        cy.get('[data-test=fileManagement_uploadedFiles_button]').contains(
          'Uploaded Files'
        )
      }
      //todo : when there is no file, can show the 'currently no files available' button
    })
  })
}
export function testInviteFriendsPage(locale) {
  const language = require(`@tellgistry/pdfbear-locale/data/${locale.code}`)

  describe('[My Account: Invite Friends Page]', () => {
    it('Click the Subscription Tab Button', () => {
      cy.get(`[data-test=${profile_inviteFriends_tab}]`).click({ force: true })
      cy.get(`[data-test=${iyf_title}]`).contains(language['inviteYourFriends'])
    })
    it('Can click Copy Code button and can Copy the code', () => {
      cy.get(`[data-test=${copyCode_button}]`).contains(language['copyCode'])
      cy.get(`[data-test=${copyCode_button}]`).click({ force: true })
      cy.get(`[data-test=${copyCode_button}]`).contains(language['copied'])
    })

    it('The link matches with the coupon code and can copy it', () => {
      cy.get(`[data-test=${copyLink_button}]`).contains(
        `${locationHref}coupon-invite/code/${coupon_code}`
      )
    })

    it('That the url in the location bar matches [lang]/profile/invite-friends', () => {
      cy.url().should(
        'eq',
        `${locationHref}${urlLocaleCode}/profile/invite-friends`
      )
    })
  })
}
export function testSignRequestPage(userType) {
  describe('[My Account: Sign Request Page]', () => {
    it('Click the Sign Request Tab Button', () => {
      cy.get(`[data-test=${tabList[4]}]`).click({ force: true })
    })
    it('Sign Request have right content', () => {
      if (userType === 'free') {
        cy.get('[data-test=signatures_premiumbox]')
        cy.get('[data-test=signatures_premiumbox_h3]').contains(
          'Why go PDFBEAR Pro?'
        )
        cy.get('[data-test=signatures_upgradeToPro_a]').should(
          'have.attr',
          'href',
          `${locationHref}pricing`
        )
        cy.get('[data-test=signatures_upgradeToPro_button]').contains(
          'Upgrade to PDFBEAR Pro to keep your files forever.'
        )
      } else {
        cy.get(`[data-test=signatures_sectionName_text]`).contains('History')
        cy.get(`[data-test=signatures_signNewSignature_button]`)
          .contains('New Signature')
          .should('have.attr', 'href', `${locationHref}sign-pdf`)
      }
    })
  })
}

export function visitProfilePage() {
  describe('Visit Profile Page', { timeout: 5000 }, () => {
    it('Visit Profile Page', () => {
      cy.get('[data-test=header_account_button]').click({ force: true })
      cy.get('[data-test=profilePage_profile_h1]').contains('My Account')
    })
  })
}

export default function profileUtil(state, profileType) {
  SupportedLocales?.filter(locale => {
    return languageFilter(locale)
  }).map(locale => {
    const urlLocaleCode = locale.code === 'en' ? '' : locale.code + '/'

    describe('Load Index Page and Login', () => {
      loadPage(profileType, state, `${locationHrefAuth}${urlLocaleCode}`)
      login()
    })
    switch (profileType) {
      case PROFILE_PROFILE: {
        describe(`Load page :: ${profileType}`, () => {
          loadPage(
            profileType,
            state,
            `${locationHrefAuth}${urlLocaleCode}profile`
          )
        })
        checkHeadings(getHeadingData(profileType), locale.code)
        globalContentCheck(locale, state, profileType)
        break
      }
      case PROFILE_INVITE_FRIENDS: {
        describe(`Load page :: ${profileType}`, () => {
          loadPage(
            profileType,
            state,
            `${locationHrefAuth}${urlLocaleCode}profile/invite-friends`
          )
        })
        checkHeadings(getHeadingData(profileType), locale.code)
        testProfilePage(locale)
        break
      }
    }
  })
}
