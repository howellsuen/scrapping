import { absolutePathCheckForBlogFeaturePages } from '../../fixtures/utilities/AbsolutePathTestUtil'
import { apiUpdateBlog, STATE_CLIENT, STATE_SERVER } from '../../fixtures/utilities/util'

describe('Absolute Path Test for Blog Index Page', () => {
  before(() => {
    //TODO get the latest blog
    apiUpdateBlog()
  })

  describe('Client Side Test', () => {
    absolutePathCheckForBlogFeaturePages(STATE_CLIENT)
  })

  describe('Server Side Test', () => {
    absolutePathCheckForBlogFeaturePages(STATE_SERVER)
  })
})
