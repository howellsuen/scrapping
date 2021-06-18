import { subPageCheck } from '../../fixtures/utilities/subPageUtil'
import { STATE_CLIENT, MODAL_EMAIL_VERIFICATION } from '../../fixtures/utilities/util'

export function emailVerificationUnitTest() {
    subPageCheck(STATE_CLIENT, MODAL_EMAIL_VERIFICATION)
}

emailVerificationUnitTest() 