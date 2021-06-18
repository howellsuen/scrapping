import standardHeaderFooter from '../../fixtures/standardHeaderFooter'
import globalTools from '../../fixtures/tools'

import {
  uploadBasicFile,
  resetConversion,
  checkAdSense,
  checkFileNameSizeIcon,
  checkBlogGuidSection,
  checkGeneralTool,
} from '../../fixtures/utilities/toolsUtil'

import singleDownload from '../../fixtures/singledownload'

const toolName = 'esign-pdf'

describe('Esign PDF Page', () => {
  checkGeneralTool(toolName)
  globalTools(toolName, false, true)

  // **************************
  // Drop Zone End to End tests
  // **************************
  describe('Esign PDF Dropzone E2E tests', () => {
    describe('Upload basic file', () => {
      it('should upload basic file and goes to option', () => {
        uploadBasicFile()

        //cy.get('[data-test="upload_progress_box"]').should('be.visible')

        cy.get('.simply-click', {
          timeout: 15000,
        }).should('be.visible')
      })
    })
  })

  describe('Options component', () => {
    //check rotate
    //check fit
    //check zoom in
    //check zoom out
    //check I need to sign
    // check create signature
    // Draw/Type
    // color
    // name
    //check save signature pro feature
    //login as pro user
    //check add initials
    //check others need to sign
    // check add signer
    // check add first name, last name, email
    // check add signer
    // delete signer
    //add initial sticker
    //add sign sticker
    // check personal message
    // review & send
    //press sign pdf now
    //received signed pdf
  })

  describe('Download Page Unit Test', () => {
    //singleDownload(tooName)
    //resetConversion()
  })
})
