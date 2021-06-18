import testProfilePage from '../../fixtures/utilities/profileUtil'
import {
  STATE_CLIENT,
  PROFILE_PROFILE,
  PROFILE_SUBSCRIPTION,
  PROFILE_FILE_MANAGEMENT,
  PROFILE_INVITE_FRIENDS,
  PROFILE_SIGN_REQUEST,
} from '../../fixtures/utilities/util'

export function profilePageTest() {
  testProfilePage(STATE_CLIENT, PROFILE_PROFILE)
  // testProfilePage(STATE_CLIENT, PROFILE_SUBSCRIPTION)
  // testProfilePage(STATE_CLIENT, PROFILE_FILE_MANAGEMENT)
  testProfilePage(STATE_CLIENT, PROFILE_INVITE_FRIENDS)
  // testProfilePage(STATE_CLIENT, PROFILE_SIGN_REQUEST)
}
profilePageTest()




