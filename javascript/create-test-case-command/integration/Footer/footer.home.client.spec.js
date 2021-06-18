import {
  STATE_CLIENT,
  PAGE_INDEX
} from '../../fixtures/utilities/util'
import FooterCheck from '../../fixtures/utilities/FooterUtil'

export function footerTestForIndex() {
  describe(`Header Unit Test for Home Page (Index Page) :: ${STATE_CLIENT}`, () => {
    FooterCheck(STATE_CLIENT, PAGE_INDEX)
  })
}

footerTestForIndex()