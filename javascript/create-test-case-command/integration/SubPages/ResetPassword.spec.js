import { subPageCheck } from '../../fixtures/utilities/subPageUtil'
import { STATE_CLIENT, MODAL_RESET_PASSWORD} from '../../fixtures/utilities/util'

export function loginModalUnitTest() {
    subPageCheck(STATE_CLIENT, MODAL_RESET_PASSWORD)
}

loginModalUnitTest()