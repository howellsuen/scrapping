import {
  STATE_SERVER,
  PAGE_INDEX
} from '../../fixtures/utilities/util'
import FooterCheck from '../../fixtures/utilities/FooterUtil'

export function footerTestForIndex() {
  describe(`Header Unit Test for Home Page (Index Page) :: ${STATE_SERVER}`, () => {
    FooterCheck(STATE_SERVER, PAGE_INDEX)
  })
}

footerTestForIndex()