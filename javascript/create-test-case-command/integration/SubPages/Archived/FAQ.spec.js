import { subPageCheck } from '../../../fixtures/utilities/subPageUtil'
import {
  STATE_CLIENT,
  STATE_SERVER,
  PAGE_FAQ,
} from '../../../fixtures/utilities/util'

export function pageFaqUnitTest() {
  subPageCheck(STATE_CLIENT, PAGE_FAQ)
  subPageCheck(STATE_SERVER, PAGE_FAQ)
}

pageFaqUnitTest()
