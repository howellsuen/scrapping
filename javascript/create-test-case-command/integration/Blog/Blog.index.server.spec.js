import { testBlogIndexPage } from '../../fixtures/utilities/BlogUtil'
import { STATE_SERVER,iterateEachLocale,PAGE_BLOG_INDEX } from '../../fixtures/utilities/util'

//state, subPageName, subPageUrl, customCheck
iterateEachLocale(STATE_SERVER, PAGE_BLOG_INDEX, false, testBlogIndexPage)
