import standardHeaderFooter from '../../fixtures/standardHeaderFooter'

import globalTools from '../../fixtures/tools'
import {
  uploadBasicFile,
  resetConversion,
  checkAdSense,
  checkGeneralTool,
} from '../../fixtures/utilities/toolsUtil'

import singleDownload from '../../fixtures/singledownload'

import { checkPaymentModal } from '../../fixtures/utilities/modalUtil'

const toolName = 'pdf-to-jpg'

describe('PDF to JPG Page', () => {
  checkGeneralTool(toolName)
  globalTools(toolName, true, true, false, 'How To Convert PDF to JPG')

  //  ********************
  //  PDF to JPG E2E tests
  //  ********************

  describe('Convert Pdf to Jpg Dropzone', { retries: 5 }, () => {
    describe('Upload basic file', () => {
      it('should upload basic file and goes to option', () => {
        uploadBasicFile()

        cy.get('[data-test="upload_progress_box"]').should('be.visible')

        cy.get('[data-test="adsbygoogle-option-banner"]', {
          timeout: 10000,
        }).should('be.visible')
      })
    })
  })

  describe('Options component', () => {
    checkAdSense()

    it('should have file name, size and tool icon', () => {
      cy.get('[data-test="pdfToJpg_options_choose_option"]').contains(
        'CHOOSE OPTION'
      )
    })

    it('should have "choose option" button', () => {
      cy.get('[data-test="converted-tool-icon"]')
      cy.get('[data-test="uploaded-file-name"]').contains('pdf_main.pdf')
    })

    // Free option
    it('should have basic selecting radio button', () => {
      cy.get('[data-test="pdfToJpgOptions_free_radio_btn"]')
    })

    it('should have basic title, text', () => {
      cy.get('[data-test="pdfToJpgOptions_free_title"]').contains(
        'Convert entire pages'
      )
    })

    // Pro Feature
    it('should have pro indicator', () => {
      cy.get('[data-test="pdfToJpgOptions_pro_icon"]').contains('PRO')
    })
    it('should have Pro option selecting radio button and being active', () => {
      cy.get('[data-test="pdfToJpgOptions_pro_radio_btn"]')
      cy.get('[data-test="pdfToJpgOptions_pro_container"]').should(
        'have.attr',
        'class',
        'btn active'
      )
    })

    it('should have Strong compression title, text', () => {
      cy.get('[data-test="pdfToJpgOptions_pro_title"]').contains(
        'Extract single images'
      )
    })
  })

  describe('convert the PDF ', () => {
    //TODO payment Modal PostMessage Error blocks other tests
    /*
    checkPaymentModal('[data-test="pdfToJpg_options_choose_option"]')
    */

    it('should convert the PDF file for free users', () => {
      cy.get('[data-test="pdfToJpgOptions_free_radio_btn"]').click({
        force: true,
      })
      cy.get('[data-test="pdfToJpg_options_choose_option"').click({
        force: true,
      })
    })
  })

  // **************************
  // Download Page Unit tests
  // **************************
  describe('Download Page Unit Test', () => {
    singleDownload(toolName, 'pdf_main.jpg')

    resetConversion()
  })
})
