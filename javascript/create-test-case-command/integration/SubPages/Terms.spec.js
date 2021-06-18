import { subPageCheck } from '../../fixtures/utilities/subPageUtil'
import { STATE_CLIENT, STATE_SERVER, PAGE_TERMS } from '../../fixtures/utilities/util'

export function SharePageTest() {
  subPageCheck(STATE_CLIENT, PAGE_TERMS)
  subPageCheck(STATE_SERVER, PAGE_TERMS)
}
SharePageTest()

