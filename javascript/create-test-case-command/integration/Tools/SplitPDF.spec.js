import standardHeaderFooter from '../../fixtures/standardHeaderFooter'
import globalTools from '../../fixtures/tools'
import {
  uploadBasicFile,
  resetConversion,
  checkAdSense,
  checkGeneralTool,
} from '../../fixtures/utilities/toolsUtil'

import singleDownload from '../../fixtures/singledownload'

const toolName = 'split-pdf'

describe('Split PDF Page', () => {
  checkGeneralTool(toolName)
  globalTools(toolName, true)

  // **************************
  // Drop Zone End to End tests
  // **************************

  describe('MergePDF Dropzone', { retries: 2 }, () => {
    before(() => {
      cy.reload()
    })

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

  describe('Option Page', () => {
    describe('Options component', () => {
      checkAdSense()

      it('should have file name, size and tool icon', () => {
        cy.get('[data-test="converted-tool-icon"]')
        cy.get('[data-test="uploaded-file-name"]').contains('pdf_main.pdf')
        cy.get('[data-test="uploaded-file-size"]')
      })

      // Free option
      it('should have basic selecting radio button', () => {
        cy.get('[data-test="split_options_free_radio_btn"]')
      })

      it('should have basic title, text', () => {
        cy.get('[data-test="split_options_free_title"]').contains('Extract')
        cy.get('[data-test="split_options_free_text"]').contains(
          'For instance, extract a single chapter or page from a book. You get 1 PDF.'
        )
      })

      // Pro Feature
      it('should have pro indicator', () => {
        cy.get('[data-test="split_options_pro_icon"]').contains('PRO')
      })
      it('should have Pro option selecting radio button and being active', () => {
        cy.get('[data-test="split_options_pro_radio_btn"]')
      })

      it('should have Strong compression title, text', () => {
        cy.get('[data-test="split_options_pro_title"]').contains(
          'Split 1 PDF into many'
        )
        cy.get('[data-test="split_options_pro_text"]').contains(
          'For instance, split a book into chapters or individual pages. You get multiple PDFs.'
        )
      })
    })

    describe('convert the PDF ', () => {
      //TODO payment Modal PostMessage Error blocks other tests
      /*
        checkPaymentModal('[data-test="split_options_choose_option"]')
        */

      it('should convert the PDF file for free users', () => {
        cy.get('[data-test="split_options_free_radio_btn"]').click({
          force: true,
        })

        cy.get('[data-test="split_options_choose_option"]').click({
          force: true,
        })
      })
    })
  })

  describe('Preview Page', () => {
    it('should have preview upload box', () => {
      cy.get('[data-test="preview_upload_box"]')
    })
    it('Extract button should be disabled, if user hasnt selected a file.', () => {
      cy.get('[data-test="deleteMergeRotateSplit_submit_button"]').should(
        'have.attr',
        'disabled'
      )
    })
    it('should have extract mode button', () => {
      cy.get('[data-test="split_options_extract_mode_button"]')
    })
    it('should have split mode button', () => {
      cy.get('[data-test="split_options_split_mode_button"]')
    })

    //TODO payment Modal PostMessage Error blocks other tests
    /*
        checkPaymentModal('[data-test="split_options_split_mode_button"]')
        */

    it('clicking Merge Pdf button should resume the converting', () => {
      cy.get('[data-test="split_select_extract_all_button"]').click({
        force: true,
      })
      cy.get('[data-test="deleteMergeRotateSplit_submit_button"]').click({
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
