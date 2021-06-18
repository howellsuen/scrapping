import { subPageCheck } from '../../fixtures/utilities/subPageUtil'
import { STATE_CLIENT,STATE_SERVER, PAGE_PRIVACY } from '../../fixtures/utilities/util'

export function privacyUnitTest() {
  subPageCheck(STATE_CLIENT, PAGE_PRIVACY)
  subPageCheck(STATE_SERVER, PAGE_PRIVACY)
}
privacyUnitTest()
