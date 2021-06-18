import {
  STATE_CLIENT,
  PAGE_INDEX,
  PROFILE_PROFILE
} from '../../fixtures/utilities/util'
import FooterCheck from '../../fixtures/utilities/FooterUtil'

export function footerTestForProfile() {
  describe(`Header Unit Test for Home Page (Index Page) :: ${STATE_CLIENT}`, () => {
    FooterCheck(STATE_CLIENT, PROFILE_PROFILE)
  })
}

footerTestForProfile()