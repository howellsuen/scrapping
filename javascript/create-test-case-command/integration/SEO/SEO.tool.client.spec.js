import { SEOCheck } from '../../fixtures/utilities/SEOUtil'
import { STATE_CLIENT, PAGE_TOOL } from '../../fixtures/utilities/util'

export default function CheckSEOForToolsClient() {
  describe('Check SEO for Tool Pages', () => {
    describe('should matches canonical and meta for all locale Client Side', () => {
      SEOCheck(STATE_CLIENT, PAGE_TOOL)
    })
  })
}
CheckSEOForToolsClient()