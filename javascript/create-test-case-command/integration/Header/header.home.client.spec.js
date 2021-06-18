import {
  STATE_CLIENT,
  PAGE_INDEX
} from '../../fixtures/utilities/util'
import HeaderCheck from '../../fixtures/utilities/HeaderUtil'

export function headerTestForIndex() {
  describe(`Header Unit Test for Home Page (Index Page) :: ${STATE_CLIENT}`, () => {
    HeaderCheck(STATE_CLIENT, PAGE_INDEX)
  })
}

headerTestForIndex()