import { blogsPagesSEO } from '../../fixtures/utilities/SEOUtil'
import { STATE_CLIENT, PAGE_BLOG_INDEX } from '../../fixtures/utilities/util'

export default function CheckSEOForBlogIndexClient(){
  describe('Check SEO for Blog Index', () => {
    describe('should matches canonical and meta for all locale Client Side', () => {
      blogsPagesSEO(STATE_CLIENT, PAGE_BLOG_INDEX)
    })
  })
}

CheckSEOForBlogIndexClient()
