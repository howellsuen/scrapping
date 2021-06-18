import {
  STATE_SERVER,
  PAGE_TOOL
} from '../../fixtures/utilities/util'
import FooterCheck from '../../fixtures/utilities/FooterUtil'

export function footerTestForTools() {
  describe(`Header Unit Test for Home Page (Index Page) :: ${STATE_SERVER}`, () => {
    FooterCheck(STATE_SERVER, PAGE_TOOL)
  })
}

footerTestForTools()