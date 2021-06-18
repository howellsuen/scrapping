import { absolutePathCheckForSubPages } from '../../fixtures/utilities/AbsolutePathTestUtil'
import { STATE_CLIENT, STATE_SERVER } from './../../fixtures/utilities/util'

describe('Absolute Path Test for SubPage', () => {
  describe('Client Side Test', () => {
    absolutePathCheckForSubPages(STATE_SERVER)
  })
})
