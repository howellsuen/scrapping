import standardHeaderFooter from '../../fixtures/standardHeaderFooter'

import globalTools from '../../fixtures/tools'
import {
  uploadBasicFile,
  resetConversion,
  checkAdSense,
  checkGeneralTool,
} from '../../fixtures/utilities/toolsUtil'

import singleDownload from '../../fixtures/singledownload'

const toolName = 'repair-pdf'

describe('Repair PDF Page', () => {
  checkGeneralTool(toolName)
  globalTools(toolName, true)

  // **************************
  // Drop Zone End to End tests
  // **************************

  describe('Compress PDF Dropzone', { retries: 2 }, () => {
    describe('Uploading', () => {
      it('should upload a file', () => {
        cy.get('.dropzone')
          .scrollIntoView({ offset: { top: -100, left: 0 } })
          .attachFile('test_assets/pdf/pdf_main.pdf', {
            subjectType: 'drag-n-drop',
          })
        // as the toolUploader and UploadProgressBox lazy load, sometimes
        // the dropping file test gets passed, but in fact toolUploader not loading
        // the file, therefore the uploadProgressBox is not loading and the rest of
        // the tests will get failed. To fix this problem, we check for the
        // UploadProgressBox existence with this line of code and if it does
        // not exist we retry the dropping the file.
        cy.get('[data-test="upload_progress_box"]').should('be.visible')
      })
    })
  })

  // **************************
  // Download Page Unit tests
  // **************************
  describe('Download Page Unit Test', () => {
    singleDownload(toolName, [])

    resetConversion()
  })
})
