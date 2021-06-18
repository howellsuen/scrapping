import { blogsPagesSEO } from '../../fixtures/utilities/SEOUtil'
import { STATE_CLIENT, PAGE_BLOG_FEATURE } from '../../fixtures/utilities/util'

describe('Check SEO for Blog Pages', () => {
  describe('should matches canonical and meta for all locale Client Side', () => {
    blogsPagesSEO(STATE_CLIENT, PAGE_BLOG_FEATURE)
  })
})
