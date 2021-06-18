import { subPageCheck } from '../../../fixtures/utilities/subPageUtil'
import { STATE_CLIENT, PAGE_PAYMENT_THANKYOU } from '../../../fixtures/utilities/util'

export function loginModalUnitTest() {
    subPageCheck(STATE_CLIENT, PAGE_PAYMENT_THANKYOU)
}
loginModalUnitTest()