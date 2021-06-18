import { absolutePathCheckForBlogIndex } from '../../fixtures/utilities/AbsolutePathTestUtil'
import { apiUpdateBlog, STATE_CLIENT, STATE_SERVER } from './../../fixtures/utilities/util'

describe('Absolute Path Test for Blog Index Page', () => {
  //TODO before is not going to update promptly before the describe test to run.
  before(() => {
    //TODO get the latest blog
    apiUpdateBlog() 
  })
  describe('Client Side Test', () => {
    absolutePathCheckForBlogIndex(STATE_CLIENT)
  })
  describe('Server Side Test', () => {
    absolutePathCheckForBlogIndex(STATE_SERVER)
  })
})
