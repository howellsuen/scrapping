import { SEOCheck } from '../../fixtures/utilities/SEOUtil'
import { STATE_CLIENT, PAGE_SECONDARY } from '../../fixtures/utilities/util'

export default function CheckSEOForSubPagesClient() {
  describe('Check SEO for Sub-pages', () => {
    describe('should matches canonical and meta for all locale Client Side', () => {
      SEOCheck(STATE_CLIENT, PAGE_SECONDARY)
    })
  })
}

CheckSEOForSubPagesClient()
