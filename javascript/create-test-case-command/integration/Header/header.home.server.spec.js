import {
  STATE_SERVER,
  PAGE_INDEX
} from '../../fixtures/utilities/util'
import HeaderCheck from '../../fixtures/utilities/HeaderUtil'


export function headerTestForIndex() {
  describe(`Header Unit Test for Home Page (Index Page) :: ${STATE_SERVER}`, () => {
    HeaderCheck(STATE_SERVER, PAGE_INDEX)
  })
}

headerTestForIndex()