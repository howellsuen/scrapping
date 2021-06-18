import { subPageCheck } from '../../fixtures/utilities/subPageUtil'
import {
  STATE_CLIENT,
  STATE_SERVER,
  PAGE_CONTACT,
} from '../../fixtures/utilities/util'

export function ContactPageUnitTest() {
  subPageCheck(STATE_CLIENT, PAGE_CONTACT)
  subPageCheck(STATE_SERVER, PAGE_CONTACT)
}

ContactPageUnitTest()
