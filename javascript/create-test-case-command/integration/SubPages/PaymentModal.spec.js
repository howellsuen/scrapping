import { subPageCheck } from '../../fixtures/utilities/subPageUtil'
import { STATE_CLIENT, MODAL_PAYMENT } from '../../fixtures/utilities/util'

export function paymentModalUnitTest() {
    subPageCheck(STATE_CLIENT, MODAL_PAYMENT)
}

paymentModalUnitTest()