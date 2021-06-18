import standardHeaderFooter from '../../fixtures/standardHeaderFooter'
import globalTools from '../../fixtures/tools'

import { checkPaymentModal } from '../../fixtures/utilities/modalUtil'

import {
  uploadBasicFile,
  resetConversion,
  checkAdSense,
  checkFileNameSizeIcon,
  checkGeneralTool,
} from '../../fixtures/utilities/toolsUtil'

import singleDownload from '../../fixtures/singledownload'

const toolName = 'delete-pages-from-pdf'

describe('Delete Pages Page', () => {
  checkGeneralTool(toolName)
  globalTools(toolName, false)

  // **************************
  // Drop Zone End to End tests
  // **************************

  describe(
    'Delete PDF Dropzone',
    {
      retries: 5,
    },
    () => {
      // ? --------------------------
      // ? Delete PDF pages E2E tests
      // ? --------------------------

      describe('Uploading', () => {
        it('should upload a file', () => {
          uploadBasicFile('pdf/pdf_multiple.pdf')

          cy.get('[data-test="upload_progress_box"]').should('be.visible')

          cy.get('[data-test="adsbygoogle-option-banner"]', {
            timeout: 10000,
          }).should('be.visible')
        })
      })

      describe('Options component', () => {
        checkAdSense()

        it('should split the pdf file', () => {
          cy.get('[data-test="SeparatePDF_page_1"]')
          cy.get('[data-test="SeparatePDF_page_2"]')
          cy.get('[data-test="SeparatePDF_page_3"]')
          cy.get('[data-test="SeparatePDF_img_1"]')
          cy.get('[data-test="SeparatePDF_img_2"]')
          cy.get('[data-test="SeparatePDF_img_3"]')
        })

        it('should have zoom icon and zoom the file on click', () => {
          cy.get('[data-test="SeparatePDF_page_zoom_icon_1"]').click({
            force: true,
          })
          cy.get('[data-test="SeparatePDF_zoomed_image_1"]').should(
            'be.visible'
          )
        })

        it('should close zoomed file', () => {
          cy.get('[data-test="SeparatePDF_zoom_close"]').click({
            force: true,
          })
        })

        it('should delete a file', () => {
          cy.get('[data-test="SeparatePDF_page_delete_icon_3"]').click({
            force: true,
          })
          cy.get('[data-test="SeparatePDF_page_3"]').should('not.exist')
        })

        it('should apply changes and go to download page', () => {
          cy.get('[data-test="SeparatePDF_apply_changes_btn"]').click({
            force: true,
          })
        })
      })
    }
  )

  describe('Download Page Unit Test', () => {
    singleDownload(toolName, 'pdf_multiple.pdf')

    resetConversion()
  })
})
