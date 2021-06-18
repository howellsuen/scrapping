import { subPageCheck } from '../../fixtures/utilities/subPageUtil'
import { STATE_CLIENT, STATE_SERVER, PAGE_SHARE } from '../../fixtures/utilities/util'

export function SharePageTest() {
  subPageCheck(STATE_CLIENT, PAGE_SHARE)
}
SharePageTest()

