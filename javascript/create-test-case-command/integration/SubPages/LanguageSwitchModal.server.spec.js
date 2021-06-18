import { subPageCheck } from '../../fixtures/utilities/subPageUtil'
import { STATE_SERVER, MODAL_LOGIN,MODAL_LANGUAGE_SWITCH } from '../../fixtures/utilities/util'

export function langaugeSwitchModalTest() {
    subPageCheck(STATE_SERVER, MODAL_LANGUAGE_SWITCH)
}

langaugeSwitchModalTest()