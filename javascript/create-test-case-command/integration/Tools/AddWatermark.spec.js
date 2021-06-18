import globalTools from '../../fixtures/tools'

import {
  uploadBasicFile,
  resetConversion,
  checkAdSense,
  checkGeneralTool,
} from '../../fixtures/utilities/toolsUtil'

import singleDownload from '../../fixtures/singledownload'

const toolName = 'add-watermark-pdf'

describe('Add Watermark', () => {
  checkGeneralTool(toolName)
  globalTools(toolName, false)

  describe('Drop Zone E2E tests', { retries: 2 }, () => {
    describe('Upload basic file', () => {
      it('should upload basic file and goes to option', () => {
        uploadBasicFile()

        cy.get('[data-test="upload_progress_box"]').should('be.visible')

        cy.get('[data-test="adsbygoogle-option-banner"]', {
          timeout: 10000,
        }).should('be.visible')
      })
    })

    //TODO select from Google Drive
    //TODO select from Dropbox
    //TODO Select from Device
    //TODO Types format check
  })

  describe('Convert Option Page E2E Test', () => {
    describe('Options component', () => {
      checkAdSense()

      it('should have file name, size and tool icon', () => {
        cy.get('[data-test="converted-tool-icon"]')
        cy.get('[data-test="uploaded-file-name"]').contains('pdf_main.pdf')
        cy.get('[data-test="uploaded-file-size"]')
      })

      it('should have add watermark input label', () => {
        cy.get('[data-test="watermarkOptions_input_label"]').contains('Text')
      })

      it('should have add watermark input', () => {
        cy.get('[data-test="watermarkOptions_input"]')
      })

      it('should show an error if the language is not English', () => {
        cy.get('[data-test="watermarkOptions_input"]').type(
          'ما میتوانیم{enter}'
        )
        cy.get('[data-test="watermarkOptions_english_only_error"]')
          .should('be.visible')
          .contains('Text only accepts english characters and common symbols')
      })

      const positions = [
        'top-left',
        'top-center',
        'top-right',
        'middle-left',
        'middle-center',
        'middle-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ]
      it('should have 9 position inputs', () => {
        cy.get('[data-test="watermarkOptions_position_label"]').contains(
          'Position'
        )
        positions.forEach(position => {
          if (position === 'top-left') {
            cy.get(`[data-test=watermarkOptions_position_${position}`).should(
              'have.attr',
              'checked'
            )
          }
          cy.get(`[data-test=watermarkOptions_position_${position}`)
        })
      })

      it('Watermark must be disabled in empty inputs', () => {
        cy.get('[data-test="watermarkOptions_input"]')
          .clear()
          .should('be.empty')
        cy.get('[data-test="watermarkOptions_add_watermark_btn"]').should(
          'have.attr',
          'disabled'
        )
      })
    })

    describe('Add watermark to PDF', () => {
      it('should add watermark to top right position', () => {
        cy.get('[data-test="watermarkOptions_input"]').type('test')
        cy.get('[data-test=watermarkOptions_position_top-right').click({
          force: true,
        })
        cy.get('[data-test="watermarkOptions_add_watermark_btn"]').click({
          force: true,
        })
      })
    })
  })

  describe('Download Page Unit Test', () => {
    singleDownload(toolName)

    resetConversion()
  })
})
