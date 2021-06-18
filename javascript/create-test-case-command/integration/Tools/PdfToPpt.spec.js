import standardHeaderFooter from '../../fixtures/standardHeaderFooter'

import globalTools from '../../fixtures/tools'
import {
  uploadBasicFile,
  resetConversion,
  checkAdSense,
  checkGeneralTool,
} from '../../fixtures/utilities/toolsUtil'

import singleDownload from '../../fixtures/singledownload'

const toolName = 'pdf-to-ppt'

describe('PDF to PPT Page', () => {
  checkGeneralTool(toolName)
  globalTools(toolName, true, true, false, 'How To Convert PDF to PPT')

  // **************************
  // Drop Zone End to End tests
  // **************************

  describe('convert excel to pdf Dropzone', { retries: 5 }, () => {
    describe('Uploading', () => {
      it('should upload basic file and goes to option', () => {
        uploadBasicFile()

        cy.get('[data-test="upload_progress_box"]').should('be.visible')

        cy.get('[data-test="adsbygoogle-option-banner"]', {
          timeout: 10000,
        }).should('be.visible')
      })
    })
  })

  // **************************
  // Download Page Unit tests
  // **************************
  describe('Download Page Unit Test', () => {
    singleDownload(toolName, 'pdf_main.pptx')

    resetConversion()
  })
})
