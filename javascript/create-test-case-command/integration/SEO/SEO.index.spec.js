import { SEOCheck } from '../../fixtures/utilities/SEOUtil'
import { STATE_SERVER,STATE_CLIENT, PAGE_INDEX } from '../../fixtures/utilities/util'

export default function CheckSEOForIndexPages(){
  describe('Check SEO for Index Pages', () => {
    describe('should matches canonical and meta for all locale Server Side', () => {
      SEOCheck(STATE_SERVER, PAGE_INDEX)
    })
    describe('should matches canonical and meta for all locale Client Side', () => {
      SEOCheck(STATE_CLIENT, PAGE_INDEX)
    })
  })
}

CheckSEOForIndexPages()


