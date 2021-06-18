import { absolutePathCheckForTools} from '../../fixtures/utilities/AbsolutePathTestUtil'
import { STATE_CLIENT, STATE_SERVER } from './../../fixtures/utilities/util'

describe('Absolute Path Test for Tool Pages', () => {
  describe('Server Side Test', () => {
    absolutePathCheckForTools(STATE_SERVER)
  })
})
