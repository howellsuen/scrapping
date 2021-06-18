import {
  STATE_CLIENT,
  PAGE_TOOL
} from '../../fixtures/utilities/util'
import HeaderCheck from '../../fixtures/utilities/HeaderUtil'


export function headerTestForTools() {
  describe(`Header Unit Test for Tool Page :: ${STATE_CLIENT}`, () => {
    HeaderCheck(STATE_CLIENT, PAGE_TOOL)
  })
}

headerTestForTools()