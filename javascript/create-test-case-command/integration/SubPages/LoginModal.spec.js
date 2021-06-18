import { subPageCheck } from '../../fixtures/utilities/subPageUtil'
import { STATE_CLIENT, MODAL_LOGIN, } from '../../fixtures/utilities/util'

export function loginModalUnitTest() {
    subPageCheck(STATE_CLIENT, MODAL_LOGIN)
}

loginModalUnitTest()