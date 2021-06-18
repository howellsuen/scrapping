import standardHeaderFooter from '../../fixtures/standardHeaderFooter'
import globalTools from '../../fixtures/tools'

import {
  uploadBasicFile,
  resetConversion,
  checkAdSense,
} from '../../fixtures/utilities/toolsUtil'

import singleDownload from '../../fixtures/singledownload'

const toolName = 'jpg-to-pdf'

describe('JPG to PDF Page', () => {
  checkGeneralTool(toolName)
  globalTools(toolName, true)

  // **************************
  // Drop Zone End to End tests
  // **************************

  describe('Convert jpg to pdf Dropzone', () => {
    describe('Upload basic file', () => {
      it('should upload jpg file and goes to option', () => {
        uploadBasicFile('jpg/jpg_main.jpg')

        cy.get('[data-test="upload_progress_box"]').should('be.visible')

        cy.get('[data-test="adsbygoogle-option-banner"]', {
          timeout: 10000,
        }).should('be.visible')
      })
    })
  })

  // **************************
  // Options End to End tests
  // **************************
  describe('Convert jpg to pdf Options', () => {
    checkAdSense()

    it('should have the file name', () => {
      cy.get('[data-test="imageToPDF_file_namebox"]').contains('jpg_main.jpg')
    })

    it('should have letter sizes dropdown', () => {
      cy.get('[data-test="imageToPDF_custom_selectbox_letter_sizes"]').click({
        force: true,
      })
      cy.get(
        '[data-test="imageToPDF_custom_selectbox_letter_sizes_dropdown"]'
      ).should('have.css', 'display', 'block')
    })

    it(' should have orientation dropdown', () => {
      cy.get(
        '[data-test="imageToPDF_custom_selectbox_doc_orientation"]'
      ).click({ force: true })
      cy.get(
        '[data-test="imageToPDF_custom_selectbox_doc_orientation_dropdown"]'
      ).should('have.css', 'display', 'block')
      cy.get(
        '[data-test="imageToPDF_custom_selectbox_doc_orientation"]'
      ).click({ force: true })
    })

    it('should have margin dropdown', () => {
      cy.get('[data-test="imageToPDF_custom_selectbox_margin"]').click({
        force: true,
      })
      cy.get(
        '[data-test="imageToPDF_custom_selectbox_margin_dropdown"]'
      ).should('have.css', 'display', 'block')
      cy.get('[data-test="imageToPDF_custom_selectbox_margin"]').click({
        force: true,
      })
    })

    it('should click "CREATE PDF NOW" button and proceed with conversion', () => {
      cy.get('[data-test="imageToPDF_createPDFNow_button"]').click({
        force: true,
      })
    })
  })

  // **************************
  // Download Page Unit tests
  // **************************
  describe('Download Page Unit Test', () => {
    singleDownload(toolName, 'jpg_main.pdf')

    resetConversion()
  })
})
