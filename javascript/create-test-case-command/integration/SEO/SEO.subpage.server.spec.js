import { SEOCheck } from '../../fixtures/utilities/SEOUtil'
import { STATE_SERVER, PAGE_SECONDARY } from '../../fixtures/utilities/util'

export default function CheckSEOForSubPagesServer() {
  describe('Check SEO for Sub-pages', () => {
    describe('should matches canonical and meta for all locale Server Side', () => {
      SEOCheck(STATE_SERVER, PAGE_SECONDARY)
    })
  })
}

CheckSEOForSubPagesServer()