import standardHeaderFooter from '../../fixtures/standardHeaderFooter'

import globalTools from '../../fixtures/tools'
import {
  uploadBasicFile,
  resetConversion,
  checkAdSense,
  checkGeneralTool,
} from '../../fixtures/utilities/toolsUtil'

import singleDownload from '../../fixtures/singledownload'

const toolName = 'pdf-to-pdfa'

describe('PDF to PDF/A Page', () => {
  checkGeneralTool(toolName)
  globalTools(toolName, true, true, false, 'How To Convert PDF to PDF/A')

  // **************************
  // Drop Zone End to End tests
  // **************************

  describe('Convert to PDF/A Dropzone', { retries: 5 }, () => {
    describe('Uploading', () => {
      describe('Upload basic file', () => {
        it('should upload basic file and goes to option', () => {
          //uploadBasicFile()
          //cypress-file-upload doesn't import pdf correctly
          cy.upload_file(
            '/test_assets/pdf/pdf_main.pdf',
            'application/pdf',
            '#fileinput'
          )
          cy.get('[data-test="upload_progress_box"]').should('be.visible')

          cy.get('[data-test="adsbygoogle-option-banner"]', {
            timeout: 10000,
          }).should('be.visible')
        })
      })
    })
  })

  describe('Options component', () => {
    checkAdSense()

    it('should have PDFa options description', () => {
      cy.get('[data-test="PDFa_Options_description"]').contains(
        'PDF/A is an ISO-standardized version of the PDF document that ensures a document can be reproduced exactly the same way, regardless of what software is used.'
      )
    })

    it('should have PDFa conformance description', () => {
      cy.get(
        '[data-test="PDFa_Options_select_conformance_description"]'
      ).contains(
        'Please select the conformance level you want your PDF/A document to be.'
      )
    })

    it('should have PDFa conformance select input label', () => {
      cy.get('[data-test="PDFa_Options_select_input_label"]').contains(
        'Set the PDF/A conformance level'
      )
    })

    it('should select PDFa-1b and show related details', () => {
      cy.get('[data-test="PDFa_Options_select_input"]').click()
      cy.get('[data-test="PDFa_Options_select_value_1b"]').click({
        force: true,
      })

      cy.get('[data-test="PDFa_Options_conformance_detail_head_1b"]').contains(
        'According to PDF1.4 level B (basic) conformance with mandatory requirements:'
      )
      cy.get('[data-test="PDFa_Options_conformance_detail_list_1b"]')
        .first()
        .contains('Include guidelines of color management')
        .next()
        .contains('Comprise embed word fonts')
        .next()
        .contains('Include Metadata')
        .next()
        .contains('For more forbidden elements')
    })

    it('should select PDFa-1a and show related details', () => {
      cy.get('[data-test="PDFa_Options_select_input"]').click()
      cy.get('[data-test="PDFa_Options_select_value_1a"]').click({
        force: true,
      })

      cy.get('[data-test="PDFa_Options_conformance_detail_head_1a"]').contains(
        'According to PDF1.4 level A (accessible) conformance with additional requirements:'
      )
      cy.get('[data-test="PDFa_Options_conformance_detail_list_1a"]')
        .first()
        .contains('Certain grades of document structure')
        .next()
        .contains('Comprise language criterion and tagged text spans')
        .next()
        .contains('Enable character mapping function')
        .next()
        .contains('Include description for symbols and images')
    })

    it('should select PDFa-2b and show related details', () => {
      cy.get('[data-test="PDFa_Options_select_input"]').click()
      cy.get('[data-test="PDFa_Options_select_value_2b"]').click({
        force: true,
      })

      cy.get('[data-test="PDFa_Options_conformance_detail_head_2b"]').contains(
        'According to PDF1.7 (ISO-32000-1) level B (basic) conformance with additional features:'
      )
      cy.get('[data-test="PDFa_Options_conformance_detail_list_2b"]')
        .first()
        .contains('Enable layers feature and transparency effects.')
        .next()
        .contains('JPEG 2000 (JP2) image compression')
        .next()
        .contains('Comprise OpenType fonts and eSign features')
        .next()
        .contains('Include character mapping')
        .next()
        .contains(
          'The option of PDF/A documents to archiving of sets of documents with a single file'
        )
    })

    it('should select PDFa-2u and show related details', () => {
      cy.get('[data-test="PDFa_Options_select_input"]').click()
      cy.get('[data-test="PDFa_Options_select_value_2u"]').click({
        force: true,
      })

      cy.get('[data-test="PDFa_Options_conformance_detail_head_2u"]').contains(
        'According to PDF1.7 (ISO-32000-1) level B (basic) conformance with additional features:'
      )
      cy.get('[data-test="PDFa_Options_conformance_detail_list_2u"]')
        .first()
        .contains('Enable layers feature and transparency effects')
        .next()
        .contains('JPEG 2000 (JP2) image compression')
        .next()
        .contains('Comprise OpenType fonts and eSign features')
        .next()
        .contains('Include character mapping')
        .next()
        .contains(
          'The option of PDF/A documents to archiving of sets of documents with a single file'
        )
        .next()
        .contains('Include unicode mapping for text')
    })

    it('should select PDFa-2a and show related details', () => {
      cy.get('[data-test="PDFa_Options_select_input"]').click()
      cy.get('[data-test="PDFa_Options_select_value_2a"]').click({
        force: true,
      })

      cy.get('[data-test="PDFa_Options_conformance_detail_head_2a"]').contains(
        'According to PDF1.7 (ISO-32000-1) level A (accessible) conformance with additional features:'
      )
      cy.get('[data-test="PDFa_Options_conformance_detail_list_2a"]')
        .first()
        .contains('Enable layers feature and transparency effects')
        .next()
        .contains('JPEG 2000 (JP2) image compression')
        .next()
        .contains('Comprise OpenType fonts and eSign features')
        .next()
        .contains('Include character mapping')
        .next()
        .contains(
          'The option of PDF/A documents to archiving of sets of documents with a single file'
        )
    })

    it('should select PDFa-3b and show related details', () => {
      cy.get('[data-test="PDFa_Options_select_input"]').click()
      cy.get('[data-test="PDFa_Options_select_value_3b"]').click({
        force: true,
      })

      cy.get('[data-test="PDFa_Options_conformance_detail_head_3b"]').contains(
        'According to PDF1.7 (ISO-32000-1) level B (basic) conformance with additional features:'
      )
      cy.get('[data-test="PDFa_Options_conformance_detail_list_3b"]')
        .first()
        .contains('Enable layers feature and transparency effects')
        .next()
        .contains('JPEG 2000 (JP2) image compression')
        .next()
        .contains('Comprise OpenType fonts and eSign features')
        .next()
        .contains('Include character mapping')
        .next()
        .contains(
          'The option of PDF/A documents to archiving of sets of documents with a single file'
        )
        .next()
        .contains(
          'Allow CSV, CAD, XML, spreadsheet, word documents and other formats into PDF/A documents.'
        )
    })

    it('should select PDFa-3u and show related details', () => {
      cy.get('[data-test="PDFa_Options_select_input"]').click()
      cy.get('[data-test="PDFa_Options_select_value_3u"]').click({
        force: true,
      })

      cy.get('[data-test="PDFa_Options_conformance_detail_head_3u"]').contains(
        'According to PDF1.7 (ISO-32000-1) level B (basic) conformance with additional features:'
      )
      cy.get('[data-test="PDFa_Options_conformance_detail_list_3u"]')
        .first()
        .contains('Enable layers feature and transparency effects')
        .next()
        .contains('Include JPEG 2000 (JP2) image compression')
        .next()
        .contains('Comprise OpenType fonts and eSign features')
        .next()
        .contains('Include character mapping')
        .next()
        .contains(
          'The option of PDF/A documents to archiving of sets of documents with a single file'
        )
        .next()
        .contains('Include unicode mapping for text')
        .next()
        .contains(
          'Allow CSV, CAD, XML, spreadsheet, word documents and other formats into PDF/A documents'
        )
    })

    it('should select PDFa-3a and show related details', () => {
      cy.get('[data-test="PDFa_Options_select_input"]').click()
      cy.get('[data-test="PDFa_Options_select_value_3a"]').click({
        force: true,
      })

      cy.get('[data-test="PDFa_Options_conformance_detail_head_3a"]').contains(
        'According to PDF1.7 (ISO-32000-1) level A (accessible) conformance with additional features:'
      )
      cy.get('[data-test="PDFa_Options_conformance_detail_list_3a"]')
        .first()
        .contains('Enable layers feature and transparency effects')
        .next()
        .contains('JPEG 2000 (JP2) image compression')
        .next()
        .contains('Comprise OpenType fonts and eSign features')
        .next()
        .contains('Include character mapping')
        .next()
        .contains(
          'The option of PDF/A documents to archiving of sets of documents with a single file'
        )
        .next()
        .contains(
          'Allow CSV, CAD, XML, spreadsheet, word documents and other formats into PDF/A documents.'
        )
    })

    it('should select PDFa-2b', () => {
      cy.get('[data-test="PDFa_Options_select_input"]').click()
      cy.get('[data-test="PDFa_Options_select_value_2b"]').click({
        force: true,
      })
    })

    it('should have downgrade head and description', () => {
      cy.get('[data-test="PDFa_Options_checkbox_label"]').contains(
        'Allow Downgrade of PDF/A Compliance Level'
      )
      cy.get('[data-test="PDFa_Options_checkbox_description"]').contains(
        "In order to convert to PDF/A, when certain elements are found in the original PDF, it's possible that a conformance downgrade is needed to be able to perform the conversion."
      )
    })
  })

  describe('converting to the PDFa', () => {
    it('should have PDFa options description', () => {
      cy.get('[data-test="PDFa_Options_description"]', {
        timeout: 15000,
      }).contains(
        'PDF/A is an ISO-standardized version of the PDF document that ensures a document can be reproduced exactly the same way, regardless of what software is used.'
      )
    })

    it('should convert file to PDFa', () => {
      cy.get('[data-test="PDFa_Options_convert_btn"]').click({
        force: true,
      })
    })
  })

  describe('Download Page Unit Test', () => {
    singleDownload(toolName, 'pdf_main.pdf')

    resetConversion()
  })
})
