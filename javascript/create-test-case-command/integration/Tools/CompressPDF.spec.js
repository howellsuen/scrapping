import standardHeaderFooter from '../../fixtures/standardHeaderFooter'
import globalTools from '../../fixtures/tools'

import { checkPaymentModal } from '../../fixtures/utilities/modalUtil'

import {
  uploadBasicFile,
  resetConversion,
  checkAdSense,
  checkFileNameSizeIcon,
  checkGeneralTool,
} from '../../fixtures/utilities/toolsUtil'

import singleDownload from '../../fixtures/singledownload'

const toolName = 'compress-pdf'

const upSellingTools = [
  { name: 'jpg2pdf', title: 'To JPG' },
  { name: 'esign', title: 'eSign' },
  { name: 'merge', title: 'Merge' },
  { name: 'split', title: 'Split' },
]

describe('Compress PDF Page', () => {
  checkGeneralTool(toolName)
  globalTools(toolName, true)

  // **************************
  // Drop Zone End to End tests
  // **************************

  describe('Compress PDF Dropzone E2E tests', () => {
    // ? -----------------------------
    // ? Compress PDF E2E tests
    // ? -----------------------------
    describe('Upload basic file', () => {
      it('should upload basic file and goes to option', () => {
        uploadBasicFile()

        cy.get('[data-test="upload_progress_box"]').should('be.visible')

        cy.get('[data-test="adsbygoogle-option-banner"]', {
          timeout: 10000,
        }).should('be.visible')
      })
    })

    describe('Options component', () => {
      checkAdSense()

      checkFileNameSizeIcon()

      it('should have "choose option" button', () => {
        cy.get('[data-test="compressOptions_choose_option"]').contains(
          'CHOOSE OPTION'
        )
      })

      // basic compression
      it('should have basic compression selecting radio button', () => {
        cy.get('[data-test="compressOptions_bc_radio_btn"]')
      })

      it('should have basic compression title, text', () => {
        cy.get('[data-test="compressOptions_bc_title"]').contains(
          'Basic Compression'
        )
        cy.get('[data-test="compressOptions_bc_text"]').contains(
          'Medium file size, high quality.'
        )
      })

      it('should have basic compression info icon and file size', () => {
        cy.get('[data-test="compressOptions_bc_info_icon"]')
        cy.get('[data-test="compressOptions_bc_info_file_size"]').contains(
          'Estimated'
        )
      })

      // Strong compression (pro feature)
      it('should have Strong compression pro indicator', () => {
        cy.get('[data-test="compressOptions_sc_pro_icon"]').contains('PRO')
      })

      it('should have Strong compression selecting radio button and being active', () => {
        cy.get('[data-test="compressOptions_sc_radio_btn"]')
        cy.get('[data-test="compressOptions_sc_container"]').should(
          'have.attr',
          'class',
          'btn active'
        )
      })

      it('should have Strong compression title, text', () => {
        cy.get('[data-test="compressOptions_sc_title"]').contains(
          'Strong Compression'
        )
        cy.get('[data-test="compressOptions_sc_text"]').contains(
          'Smallest file size, good quality.'
        )
      })

      it('should have Strong compression info icon and file size', () => {
        cy.get('[data-test="compressOptions_sc_info_icon"]')
        cy.get('[data-test="compressOptions_sc_info_file_size"]').contains(
          'Estimated'
        )
      })
    })

    describe('Compress the PDF  ', () => {
      //TODO payment Modal PostMessage Error blocks other tests
      /*
      checkPaymentModal('[data-test="compressOptions_choose_option"]')
      */
      it('should compress the PDF file with Basic Compression for free users', () => {
        cy.get('[data-test="compressOptions_bc_radio_btn"]').click({
          force: true,
        })
        cy.get('[data-test="compressOptions_choose_option"').click({
          force: true,
        })
      })
    })
  })

  describe('Download Page Unit Test', () => {
    singleDownload(upSellBox, upSellingTools)

    resetConversion()
  })
})
