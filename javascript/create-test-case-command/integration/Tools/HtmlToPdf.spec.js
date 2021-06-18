import standardHeaderFooter from '../../fixtures/standardHeaderFooter'
import globalTools from '../../fixtures/tools'

import {
  uploadBasicFile,
  resetConversion,
  checkGeneralTool,
} from '../../fixtures/utilities/toolsUtil'

import singleDownload from '../../fixtures/singledownload'

const toolName = 'html-to-pdf'

describe('HTMLto PDF Page', () => {
  checkGeneralTool(toolName)
  globalTools(toolName, false, false, true)

  // **************************
  // Drop Zone End to End tests
  // **************************

  describe('HTML to PDF Dropzone', { retries: 5 }, () => {
    describe('Define URL', () => {
      it('should type a url and convert the page', () => {
        cy.get('[data-test="HtmlToPDF_URL_input"]').type(
          'https://www.google.ca/'
        )

        cy.get('[data-test="convert_to_pdf_btn"]').click()
      })
    })
  })

  describe('Download Page Unit Test', () => {
    singleDownload(toolName, 'website.pdf')
    resetConversion(
      '[data-test="single_download_restart"]',
      '[data-test="convert_to_pdf_btn"]'
    )
  })
})
