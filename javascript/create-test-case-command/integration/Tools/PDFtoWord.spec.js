import standardHeaderFooter from '../../fixtures/standardHeaderFooter'

import globalTools from '../../fixtures/tools'
import {
  uploadBasicFile,
  resetConversion,
  checkAdSense,
  checkGeneralTool,
} from '../../fixtures/utilities/toolsUtil'

import singleDownload from '../../fixtures/singledownload'

const toolName = 'pdf-to-word'

const upSellBox = [
  {
    description: 'should have up sell box header',
    text: 'Get your unlimited access today',
    selector: '[data-test="upsell_box_header"]',
  },
  {
    description: 'should have up sell box list header',
    text: 'Becoming a PRO includes:',
    selector: '[data-test="upsell_box_list_head"]',
  },
  {
    description: 'should have first up sell reason',
    text: 'Unlimited tasks',
    selector: '[data-test="upsell_box_list_first"]',
  },
  {
    description: 'should have second up sell reason',
    text: 'Maximum files per task',
    selector: '[data-test="upsell_box_list_second"]',
  },
  {
    description: 'should have third up sell reason',
    text: 'Largest file size per task',
    selector: '[data-test="upsell_box_list_third"]',
  },
  {
    description: 'should have forth up sell reason',
    text: 'No Ads',
    selector: '[data-test="upsell_box_list_forth"]',
  },
  {
    description: 'should have fifth up sell reason',
    text: 'Unlimited amount of OCR tasks',
    selector: '[data-test="upsell_box_list_fifth"]',
  },
  {
    description: 'should have sixth up sell reason',
    text: 'Unlimited storage for supported files',
    selector: '[data-test="upsell_box_list_sixth"]',
  },
  {
    description: 'should have free trial button',
    text: 'FREE 14 DAYS TRIAL',
    selector: '[data-test="upsell_box_free_trial_btn"]',
  },
]

describe('PDF to Word Page', () => {
  checkGeneralTool(toolName)
  globalTools(toolName, true, true, false, 'How To Convert PDF to WORD')

  // **************************
  // Drop Zone End to End tests
  // **************************
  describe('Convert Pdf to Word Dropzone', { retries: 5 }, () => {
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

    it('should have file name, size and tool icon', () => {
      cy.get('[data-test="pdfToOffice_options_choose_option"]').contains(
        'CHOOSE OPTION'
      )
    })

    it('should have "choose option" button', () => {
      cy.get('[data-test="converted-tool-icon"]')
      cy.get('[data-test="uploaded-file-name"]').contains('pdf_main.pdf')
      cy.get('[data-test="uploaded-file-size"]')
    })

    // Free option
    it('should have basic selecting radio button', () => {
      cy.get('[data-test="pdfToOfficeOptions_free_radio_btn"]')
    })

    it('should have basic title, text', () => {
      cy.get('[data-test="pdfToOfficeOptions_free_title"]').contains(
        'Convert to Word'
      )
      cy.get('[data-test="pdfToOfficeOptions_free_text"]').contains(
        'Scanned pages will appear as images.'
      )
    })

    // Pro Feature
    it('should have pro indicator', () => {
      cy.get('[data-test="pdfToOfficeOptions_pro_icon"]').contains('PRO')
    })
    it('should have Pro option selecting radio button and being active', () => {
      cy.get('[data-test="pdfToOfficeOptions_pro_radio_btn"]')
      cy.get('[data-test="pdfToOfficeOptions_pro_container"]').should(
        'have.attr',
        'class',
        'btn active'
      )
    })

    it('should have Strong compression title, text', () => {
      cy.get('[data-test="pdfToOfficeOptions_pro_title"]').contains(
        'Convert to Word with OCR'
      )
      cy.get('[data-test="pdfToOfficeOptions_pro_text"]').contains(
        'Scanned pages will be converted to editable documents. Formatting may change.'
      )
    })
  })

  describe('convert the PDF ', () => {
    //TODO payment Modal PostMessage Error blocks other tests
    /*
      checkPaymentModal('[data-test="pdfToOffice_options_choose_option"]')
      */

    it('should convert the PDF file for free users', () => {
      cy.get('[data-test="pdfToOfficeOptions_free_radio_btn"]').click({
        force: true,
      })
      cy.get('[data-test="pdfToOffice_options_choose_option"').click({
        force: true,
      })
    })
  })

  // **************************
  // Drop Zone End to End tests
  // **************************
  describe('Convert Pdf to Word Dropzone', { retries: 5 }, () => {
    describe('Uploading', () => {
      it('should upload a file', () => {
        cy.get('.dropzone')
          .scrollIntoView({ offset: { top: -100, left: 0 } })
          .attachFile('test_assets/pdf/pdf_main.pdf', {
            subjectType: 'drag-n-drop',
          })
        cy.get('[data-test="upload_progress_box"]')
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
        cy.get('[data-test="pdfToOffice_options_choose_option"]').contains(
          'CHOOSE OPTION'
        )
      })

      it('should have "choose option" button', () => {
        cy.get('[data-test="converted-tool-icon"]')
        cy.get('[data-test="uploaded-file-name"]').contains('pdf_main.pdf')
        cy.get('[data-test="uploaded-file-size"]')
      })

      // Free option
      it('should have basic selecting radio button', () => {
        cy.get('[data-test="pdfToOfficeOptions_free_radio_btn"]')
      })

      it('should have basic title, text', () => {
        cy.get('[data-test="pdfToOfficeOptions_free_title"]').contains(
          'Convert to Word'
        )
        cy.get('[data-test="pdfToOfficeOptions_free_text"]').contains(
          'Scanned pages will appear as images.'
        )
      })

      // Pro Feature
      it('should have pro indicator', () => {
        cy.get('[data-test="pdfToOfficeOptions_pro_icon"]').contains('PRO')
      })
      it('should have Pro option selecting radio button and being active', () => {
        cy.get('[data-test="pdfToOfficeOptions_pro_radio_btn"]')
        cy.get('[data-test="pdfToOfficeOptions_pro_container"]').should(
          'have.attr',
          'class',
          'btn active'
        )
      })

      it('should have Strong compression title, text', () => {
        cy.get('[data-test="pdfToOfficeOptions_pro_title"]').contains(
          'Convert to Word with OCR'
        )
        cy.get('[data-test="pdfToOfficeOptions_pro_text"]').contains(
          'Scanned pages will be converted to editable documents. Formatting may change.'
        )
      })
    })

    describe('convert the PDF ', () => {
      //TODO payment Modal PostMessage Error blocks other tests
      /*
      checkPaymentModal('[data-test="pdfToOffice_options_choose_option"]')
      */

      it('should convert the PDF file for free users', () => {
        cy.get('[data-test="pdfToOfficeOptions_free_radio_btn"]').click({
          force: true,
        })
        cy.get('[data-test="pdfToOffice_options_choose_option"').click({
          force: true,
        })
      })
    })

    singleDownload(toolName, 'pdf_main.docx')

    resetConversion()
  })
})
