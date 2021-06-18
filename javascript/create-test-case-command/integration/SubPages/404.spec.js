import { subPageCheck } from '../../fixtures/utilities/subPageUtil'
import { STATE_CLIENT,STATE_SERVER, PAGE_404 } from '../../fixtures/utilities/util'

export function FourOFourPageUnitTest() {
  subPageCheck(STATE_CLIENT, PAGE_404)
}

FourOFourPageUnitTest()