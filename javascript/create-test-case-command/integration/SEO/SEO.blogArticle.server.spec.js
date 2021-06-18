import { blogsPagesSEO } from '../../fixtures/utilities/SEOUtil'
import { STATE_SERVER, PAGE_BLOG_ARTICLE } from '../../fixtures/utilities/util'

export default function CheckSEOForBlogArticlesServer() {
  describe('Check SEO for Blog Pages', () => {
    describe('should matches canonical and meta for all locale Server Side', () => {
      blogsPagesSEO(STATE_SERVER, PAGE_BLOG_ARTICLE)
    })
  })
}

CheckSEOForBlogArticlesServer()
