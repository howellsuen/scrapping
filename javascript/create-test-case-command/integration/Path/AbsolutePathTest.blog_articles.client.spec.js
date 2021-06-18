import { absolutePathCheckForBlogArticles } from '../../fixtures/utilities/AbsolutePathTestUtil'
import { apiUpdateBlog, STATE_CLIENT} from './../../fixtures/utilities/util'

describe('Absolute Path Test for Blog Articles', () => {

  before(() => {
    apiUpdateBlog()
  })
  describe('Client Side Test', () => {
    absolutePathCheckForBlogArticles(STATE_CLIENT)
  })
})
