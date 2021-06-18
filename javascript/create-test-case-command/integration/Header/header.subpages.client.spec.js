import {
  STATE_CLIENT,
  PAGE_SECONDARY
} from '../../fixtures/utilities/util'
import HeaderCheck from '../../fixtures/utilities/HeaderUtil'

export function headerTestForSubpage() {
  describe(`Header Unit Test for Tool Page :: ${STATE_CLIENT}`, () => {
    HeaderCheck(STATE_CLIENT, PAGE_SECONDARY)
  })
}

headerTestForSubpage()