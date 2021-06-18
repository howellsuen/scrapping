import { SEOCheck } from '../../fixtures/utilities/SEOUtil'
import { STATE_SERVER, PAGE_TOOL } from '../../fixtures/utilities/util'

export default function CheckSEOForToolsServer() {
describe('Check SEO for Tool Pages', () => {
  describe('should matches canonical and meta for all locale Server Side', () => {
    SEOCheck(STATE_SERVER, PAGE_TOOL)
  })
})
}
CheckSEOForToolsServer()