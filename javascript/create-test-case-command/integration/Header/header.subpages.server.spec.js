import {
  STATE_SERVER,
  PAGE_SECONDARY
} from '../../fixtures/utilities/util'
import HeaderCheck from '../../fixtures/utilities/HeaderUtil'


export function headerTestForSubpage() {
  describe(`Header Unit Test for Tool Page :: ${STATE_SERVER}`, () => {
    HeaderCheck(STATE_SERVER, PAGE_SECONDARY)
  })
}

headerTestForSubpage()