import {
  STATE_SERVER,
  PAGE_SECONDARY
} from '../../fixtures/utilities/util'
import FooterCheck from '../../fixtures/utilities/FooterUtil'

export function footerTestForSubpage() {
  describe(`Header Unit Test for Home Page (Index Page) :: ${STATE_SERVER}`, () => {
    FooterCheck(STATE_SERVER, PAGE_SECONDARY)
  })
}

footerTestForSubpage()