import standardHeaderFooter from '../../fixtures/standardHeaderFooter'
import globalTools from '../../fixtures/tools'
import {
  uploadBasicFile,
  resetConversion,
  checkAdSense,
  checkGeneralTool,
} from '../../fixtures/utilities/toolsUtil'

import singleDownload from '../../fixtures/singledownload'

const toolName = 'word-to-pdf'

describe('Word to PDF Page', () => {
  checkGeneralTool(toolName)
  globalTools(toolName, true, true, false, 'How To Convert WORD to PDF')
  // **************************
  // Drop Zone End to End tests
  // **************************

  describe('Convert word to pdf Dropzone', { retries: 2 }, () => {
    describe('Uploading', () => {
      it('should upload word file and goes to download page', () => {
        uploadBasicFile('word/word_main.doc')

        cy.get('[data-test="upload_progress_box"]').should('be.visible')

        cy.get('[data-test="upsell_box_free_trial_btn"]', {
          timeout: 20000,
        }).should('be.visible')
      })
    })
  })

  // **************************
  // Download Page Unit tests
  // **************************
  describe('Download Page Unit Test', () => {
    singleDownload(toolName, 'word_main.pdf')

    resetConversion()
  })
})
