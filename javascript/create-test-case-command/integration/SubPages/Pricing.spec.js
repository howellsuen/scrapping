import { subPageCheck } from '../../fixtures/utilities/subPageUtil'
import {
  STATE_CLIENT,
  STATE_SERVER,
  PAGE_PRICING,
} from '../../fixtures/utilities/util'

export function PricingPageUnitTest() {
  subPageCheck(STATE_CLIENT, PAGE_PRICING)
  subPageCheck(STATE_SERVER, PAGE_PRICING)
}
PricingPageUnitTest()
