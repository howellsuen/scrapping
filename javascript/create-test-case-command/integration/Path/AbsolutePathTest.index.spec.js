import { absolutePathCheckForIndex } from '../../fixtures/utilities/AbsolutePathTestUtil'
import { STATE_CLIENT, STATE_SERVER } from './../../fixtures/utilities/util'

describe('Absolute Path Test for Index Pages', () => {
  describe('Server Side Test', () => {
    absolutePathCheckForIndex(STATE_SERVER)
  })
  describe('Client Side Test', () => {
    absolutePathCheckForIndex(STATE_CLIENT)
  })
})
