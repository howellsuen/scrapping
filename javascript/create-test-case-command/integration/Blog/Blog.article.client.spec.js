import { locationHref } from '../../fixtures/headers'
import { testBlogArticlePage } from '../../fixtures/utilities/BlogUtil'
import { apiUpdateBlog } from '../../fixtures/utilities/util'
import { STATE_SERVER, STATE_CLIENT } from '../../fixtures/utilities/util'
describe('Blog Article Unit Test', () => {
  const { blogLocales, blogTypes } = require(`../../fixtures/data/blogDataFile.json`)

  //Load Test Data.
  before(() => {
    //update list of pages for blog
    apiUpdateBlog()
  })

  //TODO create ways to store blog articles first and then visit them.
  describe(`Client Side Test`, () => {
    testBlogArticlePage(STATE_CLIENT, blogLocales, blogTypes)
  })
})
