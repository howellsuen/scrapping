import {
  STATE_SERVER,
  PAGE_TOOL
} from '../../fixtures/utilities/util'
import HeaderCheck from '../../fixtures/utilities/HeaderUtil'


export function headerTestForTools() {
  describe(`Header Unit Test for Tool Page :: ${STATE_SERVER}`, () => {
    HeaderCheck(STATE_SERVER, PAGE_TOOL)
  })
}

headerTestForTools()