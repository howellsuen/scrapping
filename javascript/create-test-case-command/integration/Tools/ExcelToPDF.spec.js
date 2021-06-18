import standardHeaderFooter from '../../fixtures/standardHeaderFooter'
import globalTools from '../../fixtures/tools'

import {
  uploadBasicFile,
  resetConversion,
  checkToolContent,
  checkGeneralTool,
} from '../../fixtures/utilities/toolsUtil'

import singleDownload from '../../fixtures/singledownload'

const toolName = 'excel-to-pdf'

describe('Excel to PDF Page', () => {
  checkGeneralTool(toolName)

  globalTools(toolName, true, true, false, 'How To Convert EXCEL')

  // **************************
  // Drop Zone End to End tests
  // **************************
  describe('Convert excel to pdf Dropzone', { retries: 5 }, () => {
    //   ------------------------------
    //   convert Excel to PDF E2E tests
    //   ------------------------------

    describe('Upload excel file', () => {
      it('should upload excel file and goes to option', () => {
        uploadBasicFile('excel/excel_main.xlsx')

        cy.get('[data-test="upload_progress_box"]').should('be.visible')

        cy.get('[data-test="upsell_box_free_trial_btn"]', {
          timeout: 20000,
        }).should('be.visible')
      })
    })

    describe('Download Page Unit Test', () => {
      singleDownload(toolName, 'excel_main.pdf')
      resetConversion()
    })
  })
})
