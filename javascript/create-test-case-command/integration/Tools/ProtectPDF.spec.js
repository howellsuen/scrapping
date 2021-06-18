import standardHeaderFooter from '../../fixtures/standardHeaderFooter'
import globalTools from '../../fixtures/tools'
import {
  uploadBasicFile,
  resetConversion,
  checkAdSense,
  checkGeneralTool,
} from '../../fixtures/utilities/toolsUtil'

import singleDownload from '../../fixtures/singledownload'

const toolName = 'compress-pdf'

describe('Protect PDF Page', () => {
  checkGeneralTool(toolName)
  globalTools(toolName, false)

  // **************************
  // Drop Zone End to End tests
  // **************************

  describe('Protect PDF Dropzone', { retries: 2 }, () => {
    describe('Uploading', () => {
      it('should upload basic file and goes to option', () => {
        uploadBasicFile()

        cy.get('[data-test="upload_progress_box"]').should('be.visible')

        cy.get('[data-test="adsbygoogle-option-banner"]', {
          timeout: 15000,
        }).should('be.visible')
      })
    })
  })

  describe('Options component', () => {
    checkAdSense()

    it('should have file name and icon', () => {
      cy.get('[data-test="ProtectUnlock_OptionsBox_fileIcon"]')
      cy.get('[data-test="ProtectUnlock_OptionsBox_fileName"]')
    })

    it('should have acknowledgement text', () => {
      cy.get(
        '[data-test="ProtectUnlock_OptionsBox_acknowledgement_1"]'
      ).contains(
        'All files are secured with a strong 256-bit SSL encryption. The files can only be opened with the correct password.'
      )
      cy.get(
        '[data-test="ProtectUnlock_OptionsBox_acknowledgement_2"]'
      ).contains(
        'Your password and your file will not be saved in our server. For further information, please check our Privacy Policy.'
      )
    })

    it('should deactivate the "ENCRYPT PDF" on only first pass input being entered', () => {
      cy.get('[data-test="ProtectUnlock_OptionsBox_setPass"]').type('1')
      cy.get('[data-test="ProtectUnlock_OptionsBox_btn"]').should(
        'have.attr',
        'disabled'
      )
      cy.get('[data-test="ProtectUnlock_OptionsBox_setPass"]').clear()
    })

    it('should deactivate the "ENCRYPT PDF" on only second pass input being entered', () => {
      cy.get('[data-test="ProtectUnlock_OptionsBox_setPassRepeat"]').type('1')
      cy.get('[data-test="ProtectUnlock_OptionsBox_btn"]').should(
        'have.attr',
        'disabled'
      )
      cy.get('[data-test="ProtectUnlock_OptionsBox_setPassRepeat"]').clear()
    })

    it('should deactivate the "ENCRYPT PDF" on not matching passwords', () => {
      cy.get('[data-test="ProtectUnlock_OptionsBox_setPass"]').type('1')
      cy.get('[data-test="ProtectUnlock_OptionsBox_setPassRepeat"]').type('2')
      cy.get('[data-test="ProtectUnlock_OptionsBox_btn"]').should(
        'have.attr',
        'disabled'
      )
      cy.get('[data-test="ProtectUnlock_OptionsBox_setPass"]').clear()
      cy.get('[data-test="ProtectUnlock_OptionsBox_setPassRepeat"]').clear()
    })

    it('should deactivate the "ENCRYPT PDF" on not matching passwords', () => {
      cy.get('[data-test="ProtectUnlock_OptionsBox_setPass"]').type('1')
      cy.get('[data-test="ProtectUnlock_OptionsBox_setPassRepeat"]').type('2')
      cy.get('[data-test="ProtectUnlock_OptionsBox_btn"]').should(
        'have.attr',
        'disabled'
      )
      cy.get('[data-test="ProtectUnlock_OptionsBox_setPass"]').clear()
      cy.get('[data-test="ProtectUnlock_OptionsBox_setPassRepeat"]').clear()
    })

    it('should show low level password', () => {
      cy.get('[data-test="ProtectUnlock_OptionsBox_security_level_1"]').should(
        'have.css',
        'background-color',
        'rgb(221, 226, 239)'
      )
      cy.get('[data-test="ProtectUnlock_OptionsBox_setPass"]').type('a1q13e4rf')
      cy.get('[data-test="ProtectUnlock_OptionsBox_security_level_1"]').should(
        'have.css',
        'background-color',
        'rgb(255, 51, 0)'
      )
      cy.get('[data-test="ProtectUnlock_OptionsBox_setPass"]').clear()
    })

    it('should show mid level password', () => {
      cy.get('[data-test="ProtectUnlock_OptionsBox_security_level_2"]').should(
        'have.css',
        'background-color',
        'rgb(221, 226, 239)'
      )
      cy.get('[data-test="ProtectUnlock_OptionsBox_setPass"]').type(
        'a1q13e4rfasdf'
      )
      cy.get('[data-test="ProtectUnlock_OptionsBox_security_level_1"]').should(
        'have.css',
        'background-color',
        'rgb(255, 51, 0)'
      )
      cy.get('[data-test="ProtectUnlock_OptionsBox_security_level_2"]').should(
        'have.css',
        'background-color',
        'rgb(255, 255, 51)'
      )
      cy.get('[data-test="ProtectUnlock_OptionsBox_setPass"]').clear()
    })

    it('should show high level password', () => {
      cy.get('[data-test="ProtectUnlock_OptionsBox_security_level_3"]').should(
        'have.css',
        'background-color',
        'rgb(221, 226, 239)'
      )
      cy.get('[data-test="ProtectUnlock_OptionsBox_setPass"]').type(
        'a1q13e4rfasdfasdfasdfv3?3'
      )
      cy.get('[data-test="ProtectUnlock_OptionsBox_security_level_1"]').should(
        'have.css',
        'background-color',
        'rgb(255, 51, 0)'
      )
      cy.get('[data-test="ProtectUnlock_OptionsBox_security_level_2"]').should(
        'have.css',
        'background-color',
        'rgb(255, 255, 51)'
      )
      cy.get('[data-test="ProtectUnlock_OptionsBox_security_level_3"]').should(
        'have.css',
        'background-color',
        'rgb(102, 204, 0)'
      )
      cy.get('[data-test="ProtectUnlock_OptionsBox_setPass"]').clear()
    })
  })

  describe('Encrypting the PDF  ', () => {
    it('should activate encrypt button on matching passwords', () => {
      cy.get('[data-test="ProtectUnlock_OptionsBox_setPass"]').type('1')
      cy.get('[data-test="ProtectUnlock_OptionsBox_setPassRepeat"]').type('1')
      cy.get('[data-test="ProtectUnlock_OptionsBox_btn"]').should(
        'not.have.attr',
        'disabled'
      )
    })

    it('should encrypt the pdf file', () => {
      cy.get('[data-test="ProtectUnlock_OptionsBox_btn"]').click({
        force: true,
      })
    })
  })

  // **************************
  // Download Page Unit tests
  // **************************
  describe('Download Page Unit Test', () => {
    singleDownload(toolName)

    resetConversion()
  })
})
