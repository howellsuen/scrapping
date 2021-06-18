import standardHeaderFooter from '../../fixtures/standardHeaderFooter'

import globalTools from '../../fixtures/tools'
import {
  uploadBasicFile,
  resetConversion,
  checkAdSense,
  checkGeneralTool,
} from '../../fixtures/utilities/toolsUtil'

import singleDownload from '../../fixtures/singledownload'

const toolName = 'share-document'

describe('Share Document Page', () => {
  checkGeneralTool(toolName)
  globalTools(toolName, false)

  // **************************
  // Drop Zone End to End tests
  // **************************

  describe('Share Document Dropzone', { retries: 2 }, () => {
    it('should upload basic file and goes to option', () => {
      uploadBasicFile()

      cy.get('[data-test="upload_progress_box"]').should('be.visible')

      cy.get('[data-test="upsell_box_free_trial_btn"]', {
        timeout: 15000,
      }).should('be.visible')
    })
  })

  // **************************
  // Download Page Unit tests
  // **************************
  describe('Download Page Unit Test', () => {
    singleDownload(toolName, 'pdf_main.pdf', false)

    resetConversion()
  })
})
