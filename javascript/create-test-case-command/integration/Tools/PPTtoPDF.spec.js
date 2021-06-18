import standardHeaderFooter from '../../fixtures/standardHeaderFooter'

import globalTools from '../../fixtures/tools'
import {
  uploadBasicFile,
  resetConversion,
  checkAdSense,
  checkGeneralTool,
} from '../../fixtures/utilities/toolsUtil'

import singleDownload from '../../fixtures/singledownload'

const toolName = 'ppt-to-pdf'

describe('PPT to PDF Page', () => {
  checkGeneralTool(toolName)
  globalTools(toolName, true)

  // **************************
  // Drop Zone End to End tests
  // **************************

  describe('convert PPT to PDF Dropzone', { retries: 2 }, () => {
    describe('Uploading', () => {
      it('should upload basic file and goes to option', () => {
        //uploadBasicFile()
        //cypress-file-upload doesn't import pdf correctly
        cy.upload_file(
          'test_assets/ppt/ppt_test.pptx',
          'application/pptx',
          '#fileinput'
        )
        cy.get('[data-test="upload_progress_box"]').should('be.visible')

        cy.get('[data-test="upsell_box_free_trial_btn"]', {
          timeout: 20000,
        }).should('be.visible')
      })
    })
  })

  describe('Download Page Unit Test', () => {
    singleDownload(toolName, 'ppt_test.pdf')

    resetConversion()
  })
})
