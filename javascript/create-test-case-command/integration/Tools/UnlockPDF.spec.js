import standardHeaderFooter from '../../fixtures/standardHeaderFooter'
import globalTools from '../../fixtures/tools'
import {
  uploadBasicFile,
  resetConversion,
  checkAdSense,
  checkGeneralTool,
} from '../../fixtures/utilities/toolsUtil'

import singleDownload from '../../fixtures/singledownload'

const toolName = 'unlock-pdf'

describe('Unlock PDF Page', () => {
  checkGeneralTool(toolName)
  globalTools(toolName, false)

  // **************************
  // Drop Zone End to End tests
  // **************************
  describe('Unlock PDF Dropzone', { retries: 2 }, () => {
    describe('Uploading', () => {
      it('should upload password protected file and goes to option', () => {
        uploadBasicFile('pdf/pdf_password_protected.pdf')

        cy.get('[data-test="upload_progress_box"]').should('be.visible')

        cy.get('[data-test="adsbygoogle-option-banner"]', {
          timeout: 15000,
        }).should('be.visible')
      })
    })
  })

  describe('Options component', () => {
    checkAdSense()

    it('should have file name, tool icon', () => {
      cy.get('[data-test="ProtectUnlock_OptionsBox_fileName"]').contains(
        'pdf_password_protected.pdf'
      )
      cy.get('[data-test="ProtectUnlock_OptionsBox_fileIcon"]').should(
        'have.class',
        'pdf'
      )
    })

    it('unlock PDF should be disabled before agreeing to statement', () => {
      cy.get('[data-test="unlockPDF_submit_button"]').should(
        'have.attr',
        'disabled'
      )
    })

    it('should have agree disclaimer', () => {
      cy.get('[data-test="unlockPdf_agree_disclaimer"]').contains(
        'I agree that I am authorized to edit this file as well as remove its protection.'
      )
      cy.get('[data-test="unlockPdf_agree_chkbox"]').click({
        force: true,
      })
    })

    //after agreeing to the disclaimer, free user should be able to go to the next step.
    it('should be able to continue with unlocking PDF', () => {
      cy.get('[data-test="unlockPDF_submit_button"]').click({
        force: true,
      })
    })
  })

  describe('Second Options component : Choose Password', () => {
    it('should have file name, tool icon', () => {
      cy.get('[data-test="ProtectUnlock_OptionsBox_fileName"]').contains(
        'pdf_password_protected.pdf'
      )
      cy.get('[data-test="ProtectUnlock_OptionsBox_fileIcon"]').should(
        'have.class',
        'locked'
      )
    })
    it('should have description about the password', () => {
      cy.get('[data-test="unlockPDF_secondOption_description_title"]').contains(
        'We can unlock most files. However, this file cannot, its strongly protected by encryption. It would take forever in order to remove the passcode.'
      )

      cy.get('[data-test="unlockPDF_secondOption_description"]').contains(
        'But it will only take a few seconds if you have the password.'
      )
    })

    it('before password, submit button is disabled', () => {
      cy.get('[data-test="unlockPdf_secondOption_submit_button"]').should(
        'have.attr',
        'disabled'
      )
    })

    it('should be able to type in the password', () => {
      cy.get('[data-test="unlockPdf_choose_your_password_input"').type('3')
    })

    it('if wrong password, error message is shown', { retries: 2 }, () => {
      cy.get('[data-test="unlockPdf_secondOption_submit_button"]').click({
        force: true,
      })
      cy.get('[data-test="unlockPdf_invalid_feedback"]')
        .contains('Sorry, wrong password. Try again.')
        .should('have.css', 'display', 'block')
    })

    it('if right password, continue decrypting PDF', () => {
      cy.get('[data-test="unlockPdf_choose_your_password_input"')
        .clear()
        .type('1')
      cy.get('[data-test="unlockPdf_secondOption_submit_button"]').click({
        force: true,
      })
      cy.get('[data-test="convert_progress_box"]')
    })
  })

  // **************************
  // Download Page Unit tests
  // **************************
  describe('Download Page Unit Test', () => {
    singleDownload(toolName, 'pdf_password_protected.pdf')

    resetConversion()
  })
})
