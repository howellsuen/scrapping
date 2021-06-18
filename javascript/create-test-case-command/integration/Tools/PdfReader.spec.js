import standardHeaderFooter from '../../fixtures/standardHeaderFooter'
import globalTools from '../../fixtures/tools'
import {
  uploadBasicFile,
  resetConversion,
  checkGeneralTool,
} from '../../fixtures/utilities/toolsUtil'

import singleDownload from '../../fixtures/singledownload'

const toolName = 'pdf-reader'

describe('PDF Reader Page', () => {
  checkGeneralTool(toolName)
  globalTools(toolName, false)

  // ? -----------------------------
  // ? PDF Reader E2E tests
  // ? -----------------------------
  describe('PDF Reader E2E tests', () => {
    describe('Uploading', () => {
      it('should upload a file and goes to option', () => {
        uploadBasicFile()

        cy.get('[data-test="upload_progress_box"]').should('be.visible')

        cy.get('.preview_panel', {
          timeout: 10000,
        }).should('be.visible')
      })
    })
  })

  //todo Page numbers
  //todo goes to next page
  //todo goes to previous page
  //todo print
  //todo rotate
  //todo fit page
  //todo zone in
  //todo zone out

  //todo share button goto single download

  /*
  describe('Download Page Unit Test', () => {
    singleDownload(toolName, 'pdf_main.docx')

    resetConversion()
  })
  */
})
