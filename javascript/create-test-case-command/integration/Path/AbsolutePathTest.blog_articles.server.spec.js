import { absolutePathCheckForBlogArticles } from '../../fixtures/utilities/AbsolutePathTestUtil'
import { apiUpdateBlog, STATE_SERVER} from './../../fixtures/utilities/util'

describe('Absolute Path Test for Blog Articles', () => {

  before(() => {
    //update list of pages for blog
    apiUpdateBlog()
  })
  describe('Client Side Test', () => {
    absolutePathCheckForBlogArticles(STATE_SERVER)
  })
})
