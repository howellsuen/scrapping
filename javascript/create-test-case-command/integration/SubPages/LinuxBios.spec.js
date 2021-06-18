import { subPageCheck } from '../../fixtures/utilities/subPageUtil'
import { STATE_CLIENT,STATE_SERVER, PAGE_LINUXBIOS } from '../../fixtures/utilities/util'

export function linuxBiosUnitTest() {
  subPageCheck(STATE_CLIENT, PAGE_LINUXBIOS)
  subPageCheck(STATE_SERVER, PAGE_LINUXBIOS)
}
linuxBiosUnitTest()