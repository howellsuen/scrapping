import standardHeaderFooter from '../../fixtures/standardHeaderFooter'
import globalTools from '../../fixtures/tools'

import {
  uploadBasicFile,
  resetConversion,
  checkGeneralTool,
} from '../../fixtures/utilities/toolsUtil'

import singleDownload from '../../fixtures/singledownload'

const toolName = 'pdf-converter'

describe('PDF Converter Page', () => {
  checkGeneralTool(toolName)
  globalTools(toolName, true)

  // **************************
  describe('Drop Zone E2E tests', () => {
    // ? -----------------------------
    // ? convert PDF to Word E2E tests
    // ? -----------------------------
    describe('convert PDF to Word', () => {
      describe('Upload PDF file', () => {
        it('should upload PDF file and goes to option', () => {
          uploadBasicFile()

          cy.get('[data-test="upload_progress_box"]').should('be.visible')

          cy.get('[data-test="adsbygoogle-option-banner"]', {
            timeout: 10000,
          }).should('be.visible')
        })
      })

      describe('Options component', () => {
        it('should have google adsense for options component', () => {
          cy.get('[data-test="adsbygoogle-option-banner"]').should(
            'have.css',
            'display',
            'block'
          )
          cy.get('#task-container .top_adbox')
          cy.get('#adsbygoogle-option-banner .adsbygoogle')
            .should('have.attr', 'data-ad-slot', '7939385061')
            .should('have.css', 'display', 'inline-block')
        })

        it('should have file name, size and tool icon', () => {
          cy.get('[data-test="converted-tool-icon"]')
          cy.get('[data-test="uploaded-file-name"]').contains('pdf_main.pdf')
          cy.get('[data-test="uploaded-file-size"]')
        })

        it('should have "To Word" button', () => {
          cy.get('[data-test="convert_to_doc_btn"]')
          cy.get('[data-test="convert_to_doc_btn_icon"]')
          cy.get('[data-test="convert_to_doc_btn_text"]').contains('To Word')
          cy.get('[data-test="convert_to_doc_btn"]').contains('Convert')
        })
      })

      describe('Converting PDF to Word', () => {
        it('should convert PDF file to Word', () => {
          cy.get('[data-test="convert_to_doc_btn"]').click()
        })
      })

      describe('Download Page Unit Test', () => {
        singleDownload(toolName, 'pdf_main.docx')

        resetConversion()
      })
    })

    // ? ------------------------------
    // ? convert PDF to Excel E2E tests
    // ? ------------------------------
    describe('convert PDF to Excel', () => {
      before(() => {
        cy.reload()
      })

      describe('Upload PDF file', () => {
        it('should upload PDF file and goes to option', () => {
          uploadBasicFile()

          cy.get('[data-test="upload_progress_box"]').should('be.visible')

          cy.get('[data-test="adsbygoogle-option-banner"]', {
            timeout: 10000,
          }).should('be.visible')
        })
      })

      describe('Options component', () => {
        it('should have google adsense for options component', () => {
          cy.get('[data-test="adsbygoogle-option-banner"]').should(
            'have.css',
            'display',
            'block'
          )
          cy.get('#task-container .top_adbox')
          cy.get('#adsbygoogle-option-banner .adsbygoogle')
            .should('have.attr', 'data-ad-slot', '7939385061')
            .should('have.css', 'display', 'inline-block')
        })

        it('should have "To Excel" button', () => {
          cy.get('[data-test="convert_to_xls_btn"]')
          cy.get('[data-test="convert_to_xls_btn_icon"]')
          cy.get('[data-test="convert_to_xls_btn_text"]').contains('To Excel')
          cy.get('[data-test="convert_to_xls_btn"]').contains('Convert')
        })
      })

      describe('Converting PDF to Excel', () => {
        it('should convert PDF file to Excel', () => {
          cy.get('[data-test="convert_to_xls_btn"]').click()
        })
      })
    })

    // ? ------------------------------
    // ? convert PDF E2E tests
    // ? ------------------------------
    describe('convert PDF to PPT', () => {
      before(() => {
        cy.reload()
      })

      describe('Upload PDF file', () => {
        it('should upload PDF file and goes to option', () => {
          uploadBasicFile()

          cy.get('[data-test="upload_progress_box"]').should('be.visible')

          cy.get('[data-test="adsbygoogle-option-banner"]', {
            timeout: 10000,
          }).should('be.visible')
        })
      })
      describe('Options component', () => {
        it('should have google adsense for options component', () => {
          cy.get('[data-test="adsbygoogle-option-banner"]').should(
            'have.css',
            'display',
            'block'
          )
          cy.get('#task-container .top_adbox')
          cy.get('#adsbygoogle-option-banner .adsbygoogle')
            .should('have.attr', 'data-ad-slot', '7939385061')
            .should('have.css', 'display', 'inline-block')
        })

        it('should have "To PPT" button', () => {
          cy.get('[data-test="convert_to_ppt_btn"]')
          cy.get('[data-test="convert_to_ppt_btn_icon"]')
          cy.get('[data-test="convert_to_ppt_btn_text"]').contains('To PPT')
          cy.get('[data-test="convert_to_ppt_btn"]').contains('Convert')
        })
      })

      describe('Converting PDF to PPT', () => {
        it('should convert PDF file to PPT', () => {
          cy.get('[data-test="convert_to_ppt_btn"]').click()
        })
      })

      after(() => {
        cy.reload()
      })
    })
  })
})
