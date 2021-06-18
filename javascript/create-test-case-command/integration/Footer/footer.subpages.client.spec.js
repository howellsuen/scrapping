import {
  STATE_CLIENT,
  PAGE_SECONDARY
} from '../../fixtures/utilities/util'
import FooterCheck from '../../fixtures/utilities/FooterUtil'

export function footerTestForSubpage() {
  describe(`Header Unit Test for Home Page (Index Page) :: ${STATE_CLIENT}`, () => {
    FooterCheck(STATE_CLIENT, PAGE_SECONDARY)
  })
}

footerTestForSubpage()