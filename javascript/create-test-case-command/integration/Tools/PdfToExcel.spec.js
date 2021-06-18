import standardHeaderFooter from '../../fixtures/standardHeaderFooter'

import globalTools from '../../fixtures/tools'
import {
  uploadBasicFile,
  resetConversion,
  checkAdSense,
  checkGeneralTool,
} from '../../fixtures/utilities/toolsUtil'

import singleDownload from '../../fixtures/singledownload'

import checkPaymentModal from '../../fixtures/utilities/modalUtil'
//TODO

const toolName = 'pdf-to-excel'

describe('PDF to EXCEL Page', () => {
  checkGeneralTool(toolName)
  globalTools(toolName, true, true, false, 'How To Convert PDF to EXCEL')

  // **************************
  // Drop Zone End to End tests
  // **************************

  describe(
    'convert PDF to Excel Dropzone',
    {
      retries: 5,
    },
    () => {
      describe('Uploading', () => {
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
          cy.get('[data-test="converted-tool-icon"]')
          cy.get('[data-test="uploaded-file-name"]').contains('pdf_main.pdf')
          cy.get('[data-test="uploaded-file-size"]')
        })

        it('should have "choose option" button', () => {
          cy.get('[data-test="pdfToOffice_options_choose_option"]').contains(
            'CHOOSE OPTION'
          )
        })

        // without OCR
        it('should have without OCR selecting radio button', () => {
          cy.get('[data-test="pdfToOfficeOptions_free_radio_btn"]')
        })

        it('should have without OCR title and text', () => {
          cy.get('[data-test="pdfToOfficeOptions_free_title"]').contains(
            'Convert to Excel'
          )
          cy.get('[data-test="pdfToOfficeOptions_free_text"]').contains(
            'Scanned pages will appear as images.'
          )
        })

        // With OCR
        it('should have With OCR pro indicator', () => {
          cy.get('[data-test="pdfToOfficeOptions_pro_icon"]').contains('PRO')
        })

        it('should have With OCR selecting radio button and being active', () => {
          cy.get('[data-test="pdfToOfficeOptions_pro_radio_btn"]')
          cy.get('[data-test="pdfToOfficeOptions_pro_container"]').should(
            'have.attr',
            'class',
            'btn active'
          )
        })

        it('should have With OCR title, text', () => {
          cy.get('[data-test="pdfToOfficeOptions_pro_title"]').contains(
            'Convert to Excel with OCR'
          )
          cy.get('[data-test="pdfToOfficeOptions_pro_text"]').contains(
            'Scanned pages will be converted to editable documents. Formatting may change.'
          )
        })
      })

      describe('convert with OCR for free users  ', () => {
        //TODO payment Modal PostMessage Error blocks other tests
        /*
        checkPaymentModal('[data-test="pdfToOffice_options_choose_option"')
        */

        it('should convert the PDF file without OCR for free users', () => {
          cy.get('[data-test="pdfToOfficeOptions_free_radio_btn"]').click({
            force: true,
          })
          cy.get('[data-test="pdfToOffice_options_choose_option"').click({
            force: true,
          })
        })
      })
    }
  )

  // **************************
  // Download Page Unit tests
  // **************************
  describe('Download Page Unit Test', () => {
    singleDownload(toolName, 'pdf_main.xlsx')

    resetConversion()
  })
})
