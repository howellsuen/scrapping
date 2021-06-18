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

const toolName = 'merge-pdf'

describe('Merge PDF Page', () => {
  checkGeneralTool(toolName)
  globalTools(toolName, true)

  //  *******************
  //  Merge PDF E2E tests
  //  *******************

  describe('MergePDF Dropzone', () => {
    describe('Uploading', () => {
      it('should upload a file and goes to option', () => {
        uploadBasicFile()

        cy.get('[data-test="upload_progress_box"]').should('be.visible')

        cy.get('[data-test="adsbygoogle-option-banner"]', {
          timeout: 10000,
        }).should('be.visible')
      })
    })

    describe('Options component', () => {
      checkAdSense()

      it('should have file name, size and tool icon', () => {
        cy.get('[data-test="converted-tool-icon"]')
        cy.get('[data-test="uploaded-file-name"]').contains('pdf_main.pdf')
        cy.get('[data-test="uploaded-file-size"]')
      })

      // Free option
      it('should have "Merge files" radio button', () => {
        cy.get('[data-test="merge_options_free_radio_btn"]')
      })

      it('should have "Merge files" title, text', () => {
        cy.get('[data-test="options_free_title"]').contains('Merge files')
        cy.get('[data-test="options_free_text"]').contains(
          'Arrange and combine entire PDFs anyway you like.'
        )
      })

      // Pro Feature
      it('should have "Merge Pages" pro indicator', () => {
        cy.get('[data-test="options_pro_icon"]').contains('PRO')
      })

      it('should have "Merge Pages" Pro option selecting radio button and being active', () => {
        cy.get('[data-test="options_pro_radio_btn"]')
      })

      it('should have "Merge Pages" title, text', () => {
        cy.get('[data-test="options_pro_title"]').contains('Merge pages')
        cy.get('[data-test="options_pro_text"]').contains(
          'Select, arrange, and combine individual pages of PDFs.'
        )
      })
    })

    describe('convert the PDF ', () => {
      //TODO payment Modal PostMessage Error blocks other tests
      /*
      checkPaymentModal('[data-test="options_pro_radio_btn"]')
      */
      it('should convert the PDF file for free users', () => {
        cy.get('[data-test="merge_options_free_radio_btn"]').click({
          force: true,
        })

        cy.get('[data-test="merge_options_choose_option"]').click({
          force: true,
        })
      })
    })

    describe('Preview Page', () => {
      it('should have preview upload box', () => {
        cy.get('[data-test="preview_upload_box"]')
      })

      it('should have "file mode" button', () => {
        cy.get('[data-test="merge_file_mode_button"]')
      })
      it('should have "page mode" button', () => {
        cy.get('[data-test="merge_page_mode_button"]')
      })

      //TODO payment Modal PostMessage Error blocks other tests
      /*
      checkPaymentModal('[data-test="merge_page_mode_button"]')
      */

      it('should resume the converting', () => {
        cy.get('[data-test="deleteMergeRotateSplit_submit_button"]').click({
          force: true,
        })
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
