import { subPageCheck } from '../../fixtures/utilities/subPageUtil'
import {
  STATE_CLIENT,
  STATE_SERVER,
  PAGE_WEB_INTEGRATION,
} from '../../fixtures/utilities/util'

export function webIntegrationUnitTest() {
  subPageCheck(STATE_CLIENT, PAGE_WEB_INTEGRATION)
  subPageCheck(STATE_SERVER, PAGE_WEB_INTEGRATION)
}

webIntegrationUnitTest()
