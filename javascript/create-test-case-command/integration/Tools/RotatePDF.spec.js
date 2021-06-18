import standardHeaderFooter from '../../fixtures/standardHeaderFooter'

import globalTools from '../../fixtures/tools'
import {
  uploadBasicFile,
  resetConversion,
  checkAdSense,
  checkGeneralTool,
} from '../../fixtures/utilities/toolsUtil'

import singleDownload from '../../fixtures/singledownload'

const toolName = 'rotate-pdf'

describe('Rotate PDF Page', () => {
  checkGeneralTool(toolName)
  globalTools(toolName, true)

  // **************************
  // Drop Zone End to End tests
  // **************************

  describe('Rotate PDF Dropzone', { retries: 2 }, () => {
    describe('Uploading', () => {
      it('should upload multiple pages file and goes to option', () => {
        uploadBasicFile('pdf/pdf_multiple.pdf')

        cy.get('[data-test="upload_progress_box"]').should('be.visible')

        cy.get('[data-test="adsbygoogle-option-banner"]', {
          timeout: 15000,
        }).should('be.visible')
      })
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

    it('should split the pdf file', () => {
      cy.get('[data-test="SeparatePDF_page_1"]')
      cy.get('[data-test="SeparatePDF_page_2"]')
      cy.get('[data-test="SeparatePDF_page_3"]')
      cy.get('[data-test="SeparatePDF_img_1"]')
      cy.get('[data-test="SeparatePDF_img_2"]')
      cy.get('[data-test="SeparatePDF_img_3"]')
    })

    it('should have "Add More" button and its fallback input', () => {
      cy.get('[data-test="SeparatePDF_options_addMore"]').should('be.visible')
      cy.get('[data-test="SeparatePDF_options_addMore_icon"]').should(
        'be.visible'
      )
      cy.get('[data-test="SeparatePDF_options_addMore_text"]')
        .should('be.visible')
        .contains('Add more')
      cy.get('[data-test="SeparatePDF_options_addMore_fallback"]').should(
        'have.css',
        'display',
        'none'
      )
    })

    it('should have zoom icon and zoom the file on click', () => {
      cy.get('[data-test="SeparatePDF_page_zoom_icon_1"]').click({
        force: true,
      })
      cy.get('[data-test="SeparatePDF_zoomed_image_1"]').should('be.visible')
    })

    it('should close zoomed file', () => {
      cy.get('[data-test="SeparatePDF_zoom_close"]').click({
        force: true,
      })
    })

    it('should have rotate left and right buttons and icons', () => {
      // left buttons and icons
      cy.get('[data-test="SeparatePDF_page_rotate_left_btn_1"]')
      cy.get('[data-test="SeparatePDF_page_rotate_left_btn_2"]')
      cy.get('[data-test="SeparatePDF_page_rotate_left_btn_3"]')
      cy.get('[data-test="SeparatePDF_page_rotate_left_icon_1"]')
      cy.get('[data-test="SeparatePDF_page_rotate_left_icon_2"]')
      cy.get('[data-test="SeparatePDF_page_rotate_left_icon_3"]')

      // right buttons and icons
      cy.get('[data-test="SeparatePDF_page_rotate_right_btn_1"]')
      cy.get('[data-test="SeparatePDF_page_rotate_right_btn_2"]')
      cy.get('[data-test="SeparatePDF_page_rotate_right_btn_3"]')
      cy.get('[data-test="SeparatePDF_page_rotate_right_icon_1"]')
      cy.get('[data-test="SeparatePDF_page_rotate_right_icon_2"]')
      cy.get('[data-test="SeparatePDF_page_rotate_right_icon_3"]')
    })

    // for the first page:
    //
    // matrix(1, 0, 0, 1, 0, 0) means transform: rotate(0deg)
    // matrix(6.12323e-17, -1, 1, 6.12323e-17, 0, 0) means transform: rotate(-90deg)
    // matrix(-1, -1.22465e-16, 1.22465e-16, -1, 0, 0) means transform: rotate(-180deg)
    // matrix(-1.83697e-16, 1, -1, -1.83697e-16, 0, 0) means transform: rotate(-270deg)
    // matrix(1, 2.44929e-16, -2.44929e-16, 1, 0, 0) means transform: rotate(-360deg)
    it('should rotate to left, then right', () => {
      cy.get('[data-test="SeparatePDF_img_container_1"]').should(
        'have.css',
        'transform',
        'matrix(1, 0, 0, 1, 0, 0)'
      )
      // rotate first page by -90 degree
      cy.get('[data-test="SeparatePDF_page_rotate_left_btn_1"]').click({
        force: true,
      })
      cy.get('[data-test="SeparatePDF_img_container_1"]').should(
        'have.css',
        'transform',
        'matrix(6.12323e-17, -1, 1, 6.12323e-17, 0, 0)'
      )

      // rotate first page by right 90 degree
      cy.get('[data-test="SeparatePDF_page_rotate_right_btn_1"]').click({
        force: true,
      })
      cy.get('[data-test="SeparatePDF_img_container_1"]').should(
        'have.css',
        'transform',
        'matrix(1, 0, 0, 1, 0, 0)'
      )
    })

    it('should have rotate all label, left and right buttons and icons', () => {
      cy.get('[data-test="SeparatePDF_options_rotate_all_label"]')
        .should('be.visible')
        .contains('Rotate all')
      cy.get('[data-test="SeparatePDF_options_rotate_all_left"]').should(
        'be.visible'
      )
      cy.get('[data-test="SeparatePDF_options_rotate_all_left_icon"]').should(
        'be.visible'
      )
      cy.get('[data-test="SeparatePDF_options_rotate_all_right"]').should(
        'be.visible'
      )
      cy.get('[data-test="SeparatePDF_options_rotate_all_right_icon"]').should(
        'be.visible'
      )
    })

    // for the second page:
    //
    // matrix(1, 0, 0, 1, 0, 0) means transform: rotate(0deg)
    // matrix(-1.83697e-16, -1, 1, -1.83697e-16, 0, 0) means transform: rotate(-90deg)

    // for the third page:
    //
    // matrix(1, 0, 0, 1, 0, 0) means transform: rotate(0deg)
    // matrix(-1.83697e-16, -1, 1, -1.83697e-16, 0, 0) means transform: rotate(-90deg)

    it('should rotate all pages to left', () => {
      cy.get('[data-test="SeparatePDF_options_rotate_all_left"]').click({
        force: true,
      })

      cy.get('[data-test="SeparatePDF_img_container_1"]').should(
        'have.css',
        'transform',
        'matrix(6.12323e-17, -1, 1, 6.12323e-17, 0, 0)'
      )

      cy.get('[data-test="SeparatePDF_img_container_2"]').should(
        'have.css',
        'transform',
        'matrix(-1.83697e-16, -1, 1, -1.83697e-16, 0, 0)'
      )

      cy.get('[data-test="SeparatePDF_img_container_3"]').should(
        'have.css',
        'transform',
        'matrix(-1.83697e-16, -1, 1, -1.83697e-16, 0, 0)'
      )
    })

    it('should rotate all pages to right', () => {
      cy.get('[data-test="SeparatePDF_options_rotate_all_right"]').click({
        force: true,
      })

      cy.get('[data-test="SeparatePDF_img_container_1"]').should(
        'have.css',
        'transform',
        'matrix(1, 0, 0, 1, 0, 0)'
      )

      cy.get('[data-test="SeparatePDF_img_container_2"]').should(
        'have.css',
        'transform',
        'matrix(1, 0, 0, 1, 0, 0)'
      )

      cy.get('[data-test="SeparatePDF_img_container_3"]').should(
        'have.css',
        'transform',
        'matrix(1, 0, 0, 1, 0, 0)'
      )
    })

    it('should apply changes and go to download page', () => {
      cy.get('[data-test="SeparatePDF_apply_changes_btn"]').click({
        force: true,
      })
    })
  })

  // **************************
  // Download Page Unit tests
  // **************************
  describe('Download Page Unit Test', () => {
    singleDownload(toolName, 'pdf_multiple.pdf')

    resetConversion()
  })
})
