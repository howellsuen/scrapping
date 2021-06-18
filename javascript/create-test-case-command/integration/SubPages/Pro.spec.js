import { subPageCheck } from '../../fixtures/utilities/subPageUtil'
import { STATE_CLIENT, STATE_SERVER, PAGE_PRO } from '../../fixtures/utilities/util'

export function proPageTest() {
  subPageCheck(STATE_CLIENT, PAGE_PRO)
}

proPageTest()