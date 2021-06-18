import standardHeaderFooter from '../../fixtures/standardHeaderFooter'

import globalTools from '../../fixtures/tools'
import {
  uploadBasicFile,
  resetConversion,
  checkGeneralTool,
} from '../../fixtures/utilities/toolsUtil'

import singleDownload from '../../fixtures/singledownload'

const toolName = 'add-page-numbers-to-pdf'

describe('Number Pages Page', () => {
  checkGeneralTool(toolName)
  globalTools(toolName, false)

  // ********************
  // Drop zone unit tests
  // ********************
  describe('Drop zone unit tests', () => {
    it('should have Select file button', () => {
      cy.get('[data-test="dropzone_upload_btn"]').contains('Select a File ...')
    })

    it('should have drop file hint', () => {
      cy.get('[data-test="dropzone_hint"]').contains(
        'or drop a file here to start uploading'
      )
    })

    it('should have drop zone icon', () => {
      cy.get('[data-test="dropzone_icon"]')
    })
  })

  // **************************
  // Drop Zone End to End tests
  // **************************

  describe(
    'Add number pages Dropzone',
    {
      retries: 5,
    },
    () => {
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

      describe('Options component', () => {
        it('should have google adsense for options component', () => {
          cy.get('[data-test="adsbygoogle-option-banner"]').should(
            'have.css',
            'display',
            'block'
          )
          cy.get('#task-container .top_adbox')
          cy.get('#adsbygoogle-option-banner .adsbygoogle')
            .should('have.attr', 'data-ad-slot', '7939385061')
            .should('have.css', 'display', 'inline-block')
        })

        it('should have file name and icon', () => {
          cy.get('[data-test="NumberPages_options_file_icon"]').should(
            'be.visible'
          )
        })

        it('should show six position to insert page number', () => {
          cy.get(
            '[data-test="NumberPages_options_insert_container_top-left"]'
          ).should('be.visible')
          cy.get(
            '[data-test="NumberPages_options_insert_container_top-center"]'
          ).should('be.visible')
          cy.get(
            '[data-test="NumberPages_options_insert_container_top-right"]'
          ).should('be.visible')
          cy.get(
            '[data-test="NumberPages_options_insert_container_bottom-left"]'
          ).should('be.visible')
          cy.get(
            '[data-test="NumberPages_options_insert_container_bottom-center"]'
          ).should('be.visible')
          cy.get(
            '[data-test="NumberPages_options_insert_container_bottom-right"]'
          ).should('be.visible')
        })

        //todo shoud have first umber
        //todo should have from page number to page number
        //todo should have text format dropdown

        //should have bates numbering
        //should open pro page feature

        //should be able to login as pro user and use the feature
      })

      describe('add page number', () => {
        it('should add page number to each page', () => {
          cy.get('[data-test="NumberPages_options_submit_button"]').click()
        })
      })
    }
  )

  // **************************
  // Download Page Unit tests
  // **************************
  describe('Download Page Unit Test', () => {
    singleDownload(toolName)

    resetConversion()
  })

  // ***************************
  // Footer unit tests
  // ***************************
  //globalFooter(true, details.url)
})
